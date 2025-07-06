# 🩺 Medical AI Assistant

A sophisticated medical chatbot powered by Google Gemini AI and LangChain, designed to provide accurate medical information using a vector database of medical knowledge.

## Table of Contents

- [Features](#-features)
- [Prerequisites](#prerequisites)
- [Installation](#-installation)
- [Setup](#️-setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technical Details](#-technical-details)
- [Important Disclaimers](#️-important-disclaimers)

## ✨ Features

- **Medical Knowledge Base**: Powered by The Gale Encyclopedia of Medicine
- **AI-Powered Responses**: Uses Google Gemini 1.5 Flash for intelligent responses
- **Vector Search**: FAISS-based similarity search for relevant medical information
- **Modern UI**: Beautiful Streamlit interface with chat-like experience
- **Context-Aware**: Only responds to medically relevant questions

## Prerequisites

Before setting up this project, ensure you have:

- **Python 3.8+** installed on your system
- **Google AI Studio API Key** - Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Medical PDF Data** - The project includes The Gale Encyclopedia of Medicine PDF

## 🚀 Installation

### 1. Clone or Download the Project

```bash
git clone <repository>
cd "P02 Medical Chatbot"
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## ⚙️ Setup

### 1. Environment Configuration

Create a `.env` file in the project root:

```bash
touch .env
```

Add your Google API key to the `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

### 2. Initialize the Vector Database

Run the data processing script to create the vector database from your medical PDF:

```bash
python create_memory_for_llm.py
```

This script will:
- Load the PDF from `data/The_GALE_ENCYCLOPEDIA_of_MEDICINE_SECOND.pdf`
- Split the content into manageable chunks
- Create vector embeddings using HuggingFace
- Store the vectors in a FAISS database at `vectorstore/db_faiss`

## 🎯 Usage

### Starting the Application

```bash
streamlit run medibot.py
```

The application will open in your default web browser at `http://localhost:8501`

### Using the Chatbot

1. **Ask Medical Questions**: Type your medical question in the chat input
2. **Get Informed Responses**: The AI will provide evidence-based medical information
3. **View Sources**: Each response includes source references from the medical encyclopedia
4. **Monitor Status**: Check the sidebar for system status and API key configuration

### Example Questions

- "What are the symptoms of diabetes?"
- "How does methotrexate work?"
- "What is hypertension?"

## 📁 Project Structure

```
P02 Medical Chatbot/
├── medibot.py
├── create_memory_for_llm.py
├── requirements.txt
├── README.md
├── .env
├── data/
│   └── The_GALE_ENCYCLOPEDIA_of_MEDICINE_SECOND.pdf
├── vectorstore/
│   └── db_faiss/
│       ├── index.faiss
│       └── index.pkl
└── venv/
```

## 🔬 Technical Details

### Architecture

- **Frontend**: Streamlit web application
- **AI Model**: Google Gemini 1.5 Flash
- **Vector Database**: FAISS with HuggingFace embeddings
- **Knowledge Base**: The Gale Encyclopedia of Medicine (PDF)
- **Framework**: LangChain for AI orchestration

### Key Components

- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Store**: FAISS for efficient similarity search
- **Text Processing**: RecursiveCharacterTextSplitter with 500-character chunks
- **Prompt Engineering**: Custom medical prompt template with context filtering

### Dependencies

- **Core**: Streamlit, LangChain, Google Generative AI
- **Vector Database**: FAISS-CPU, Sentence Transformers
- **ML/AI**: Transformers, Torch, HuggingFace Hub
- **Utilities**: Python-dotenv, NumPy, SciPy

## ⚠️ Important Disclaimers

### Medical Information Disclaimer

**This application is for educational and informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.**

- **Not Medical Advice**: The information provided is not intended to replace consultation with qualified healthcare professionals
- **Accuracy**: While efforts are made to provide accurate information, medical knowledge evolves and may contain errors
- **Emergency Situations**: For medical emergencies, contact emergency services immediately
- **Professional Consultation**: Always consult with healthcare professionals for medical decisions
- **No Liability**: The developers are not responsible for any medical decisions made based on this application

### Technical Limitations

- **API Dependencies**: Requires active internet connection and valid Google API key
- **Data Scope**: Limited to the provided medical encyclopedia content
- **Response Quality**: Depends on the quality and relevance of the vector database
- **Processing Time**: Initial vector database creation may take several minutes

### Performance Tips

- **First Run**: Vector database creation may take 5-10 minutes
- **Subsequent Runs**: Application starts much faster once database is created
- **API Limits**: Monitor your Google AI API usage to avoid rate limits
- **Memory Usage**: The application uses significant memory for vector operations

## 🤝 Contributing

This is an educational project. If you find issues or have suggestions:

1. Ensure the issue is reproducible
2. Provide detailed error messages
3. Include system specifications
4. Follow medical information accuracy guidelines

---

**Remember**: This tool is designed to provide educational medical information, not professional medical advice. Always consult healthcare professionals for medical decisions.



