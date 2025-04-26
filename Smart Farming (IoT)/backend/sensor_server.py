from flask import Flask, jsonify
from flask_cors import CORS
import serial
import threading
import requests
import time
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

SERIAL_PORT = 'COM4'
BAUD_RATE = 9600

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
CITY_NAME = os.getenv("CITY_NAME", "Katpadi,IN")
RAIN_INTERVAL = 600

latest_data = {
    "temperature": 0,
    "humidity": 0,
    "soilMoisture": 0,
    "rainfall": 0
}

def fetch_rainfall_forecast():
    global latest_data
    while True:
        try:
            url = f"http://api.openweathermap.org/data/2.5/forecast?q={CITY_NAME}&appid={OPENWEATHER_API_KEY}&units=metric"
            response = requests.get(url)
            data = response.json()

            total_rain_5_days = 0.0
            forecast_days = set()

            for entry in data["list"]:
                if "rain" in entry and "3h" in entry["rain"]:
                    total_rain_5_days += entry["rain"]["3h"]
                    forecast_time = datetime.strptime(entry["dt_txt"], "%Y-%m-%d %H:%M:%S")
                    forecast_days.add(forecast_time.date())

            days_counted = len(forecast_days)
            daily_avg_rainfall = total_rain_5_days / days_counted if days_counted else 0

            crop_cycle_days = 90
            estimated_seasonal_rainfall = round(daily_avg_rainfall * crop_cycle_days, 2)

            latest_data["rainfall"] = estimated_seasonal_rainfall

            print(f"🌧️ Forecasted Rainfall over {crop_cycle_days} days: {estimated_seasonal_rainfall} mm (based on {days_counted} days of forecast)")
        
        except Exception as e:
            print(f"❌ Error fetching forecast rainfall: {e}")

        time.sleep(RAIN_INTERVAL)


def read_serial():
    global latest_data
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE)
        print(f"✅ Connected to Arduino on {SERIAL_PORT}")
        while True:
            try:
                line = ser.readline().decode('utf-8').strip()
                if line:
                    parts = line.split(',')
                    if len(parts) == 3:
                        temperature, humidity, soilMoisture = parts
                        if temperature != "NaN":
                            latest_data["temperature"] = float(temperature)
                            latest_data["humidity"] = float(humidity)
                            latest_data["soilMoisture"] = int(soilMoisture)
                            print("📡 Latest Sensor Data:", latest_data)
            except Exception as e:
                print(f"⚠️ Error reading serial: {e}")
    except serial.SerialException:
        print(f"🚫 Could not open serial port {SERIAL_PORT}. Make sure your Arduino is connected.")

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    return jsonify(latest_data)

if __name__ == '__main__':
    threading.Thread(target=read_serial, daemon=True).start()
    threading.Thread(target=fetch_rainfall_forecast, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
