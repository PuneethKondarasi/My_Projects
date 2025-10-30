# Hastara Store - E-commerce Website

A modern e-commerce platform built with React and Firebase, featuring product management, user testimonials, and secure admin authentication.

## 🚀 Features

- Product catalog with filtering
- Admin dashboard
- Customer testimonials
- WhatsApp integration for orders
- Image upload capabilities
- Responsive design

## 🛠️ Tech Stack

- React
- Firebase (Auth, Firestore, Storage)
- Vite
- React Router DOM

## 🏃‍♂️ Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hastara-store.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_WHATSAPP_NUMBER=your_whatsapp_number
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── assets/      # Static assets
├── components/  # Reusable components
├── contexts/    # React contexts
├── firebase/    # Firebase configuration
├── hooks/       # Custom hooks
├── layouts/     # Layout components
├── pages/       # Page components
├── services/    # API services
└── utils/       # Utility functions
```

## 🔐 Admin Access

Access the admin dashboard at `/admin` with authorized credentials.