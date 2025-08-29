import os
import streamlit as st
from dotenv import load_dotenv, find_dotenv
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document
import google.generativeai as genai

# Load environment variables
load_dotenv(find_dotenv())
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
DB_PATH = "vectorstore/db_faiss"


# Custom CSS for sleek design
def load_css():
    st.markdown(
        """
    <style>
    .main .block-container { padding-top: 2rem; padding-bottom: 2rem; }
    .custom-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem 1rem; border-radius: 15px; margin-bottom: 2rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: fadeInDown 1s ease-out; }
    .custom-header h1 { color: white; font-size: 2.5rem; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
    .custom-header p { color: rgba(255,255,255,0.9); font-size: 1.1rem; }
    .status-card { background: #262730; color: #fff; padding: 1rem; border-radius: 10px; margin: 0.5rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.3); border-left: 4px solid #28a745; animation: slideInRight 0.5s ease-out; }
    .status-card.error { border-left-color: #dc3545; }
    .stButton > button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 25px; padding: 0.5rem 1.5rem; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: 0.3s ease; }
    .stButton > button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
    .disclaimer { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 10px; padding: 1rem; margin: 1rem 0; color: #856404; animation: fadeInUp 0.5s ease-out; }
    </style>
    """,
        unsafe_allow_html=True,
    )


@st.cache_resource
def get_vectorstore():
    try:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        return FAISS.load_local(
            DB_PATH, embeddings, allow_dangerous_deserialization=True
        )
    except Exception:
        return None


@st.cache_resource
def get_llm():
    try:
        if not GOOGLE_API_KEY:
            return None
        genai.configure(api_key=GOOGLE_API_KEY)
        return ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.2,
            max_tokens=1000,
            google_api_key=GOOGLE_API_KEY,
        )
    except Exception:
        return None


prompt_template = PromptTemplate(
    template="""You are a knowledgeable medical AI assistant. Only answer if the question is medically relevant.

Medical Context:
{context}

User Question: {question}

Instructions:
- If the question is casual, unrelated, or unclear (e.g., "Hi", "How are you?"), respond politely asking for a clear medical question.
- Provide evidence-based, precise medical answers using correct terminology.
- Mention if context is insufficient and advise consulting a healthcare professional.
- Summarize information clearly and cite the source if available.

Answer:""",
    input_variables=["context", "question"],
)


def format_response(result):
    answer = result.get("result", "No answer generated.").strip()
    sources = {
        doc.metadata.get("source", "Unknown source")
        for doc in result.get("source_documents", [])
    }
    if sources:
        answer += "\n\n📄 **Sources:**\n" + "\n".join(
            f"\u2022 {src}" for src in sources
        )
    return answer


def create_sample_medical_db():
    sample_docs = [
        Document("Type 2 diabetes...", metadata={"source": "Diabetes Reference"}),
        Document("Metformin is a...", metadata={"source": "Pharmacology Reference"}),
        Document("Hypertension...", metadata={"source": "Cardiology Reference"}),
        Document("ACE inhibitors...", metadata={"source": "Cardiology Pharmacology"}),
    ]
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return FAISS.from_documents(sample_docs, embeddings)


def display_status_sidebar():
    st.sidebar.markdown("## 🔧 System Status")
    db = get_vectorstore() or create_sample_medical_db()
    llm = get_llm()

    st.sidebar.markdown(
        """<div class='status-card'>✔️ Vector DB loaded</div>""",
        unsafe_allow_html=True if db else False,
    )
    st.sidebar.markdown(
        """<div class='status-card'>✔️ Gemini Model active</div>""",
        unsafe_allow_html=True if llm else False,
    )
    if not GOOGLE_API_KEY:
        st.sidebar.markdown(
            """<div class='status-card error'>❌ Missing API Key</div>""",
            unsafe_allow_html=True,
        )
        st.sidebar.info("""
            1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
            2. Add to `.env` as `GOOGLE_API_KEY=your_key_here`
            3. Restart the app
        """)


def main():
    st.set_page_config(page_title="Medical AI Assistant", page_icon="🩺", layout="wide")
    load_css()

    st.markdown(
        """
    <div class="custom-header">
        <h1>🩺 Medical AI Assistant</h1>
        <p>Accurate Answers. Context-Aware. Powered by Google Gemini.</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

    display_status_sidebar()

    if "msgs" not in st.session_state:
        st.session_state.msgs = []

    # Display previous messages with avatars
    for msg in st.session_state.msgs:
        avatar = "🧑‍💼" if msg["role"] == "user" else "🤖"
        with st.chat_message(msg["role"], avatar=avatar):
            st.markdown(msg["content"])

    prompt = st.chat_input("💬 Ask a medical question...")
    if prompt:
        st.chat_message("user", avatar="🧑‍💼").markdown(prompt)
        if "msgs" not in st.session_state:
            st.session_state.msgs = []
        st.session_state.msgs.append({"role": "user", "content": prompt})

        db = get_vectorstore() or create_sample_medical_db()
        llm = get_llm()

        if not db or not llm:
            error = "⚠️ System not ready. Check setup in sidebar."
            st.chat_message("assistant", avatar="🤖").markdown(error)
            if "msgs" not in st.session_state:
                st.session_state.msgs = []
            st.session_state.msgs.append({"role": "assistant", "content": error})
            return

        with st.chat_message("assistant", avatar="🤖"):
            with st.spinner("🔍 Analyzing medical data..."):
                qa = RetrievalQA.from_chain_type(
                    llm=llm,
                    chain_type="stuff",
                    retriever=db.as_retriever(
                        search_type="similarity", search_kwargs={"k": 4}
                    ),
                    return_source_documents=True,
                    chain_type_kwargs={"prompt": prompt_template},
                )

                try:
                    result = qa.invoke({"question": prompt})
                except Exception:
                    docs = db.similarity_search(prompt, k=3)
                    context = "\n".join(doc.page_content for doc in docs)
                    fallback_prompt = prompt_template.format(
                        context=context, question=prompt
                    )
                    response = llm.invoke(fallback_prompt).content
                    result = {"result": response, "source_documents": docs}

                response = format_response(result)
                st.markdown(response)
                if "msgs" not in st.session_state:
                    st.session_state.msgs = []
                st.session_state.msgs.append({"role": "assistant", "content": response})
                st.markdown(
                    """<div class='disclaimer'>⚠️ Disclaimer: Not a substitute for professional medical advice. Always consult a licensed healthcare provider.</div>""",
                    unsafe_allow_html=True,
                )


if __name__ == "__main__":
    main()
