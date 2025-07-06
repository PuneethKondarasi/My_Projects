# ✅ FINAL VERSION OF `create_memory_for_llm.py`

from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

DATA_PATH = "data/"


# Step 1: Load PDFs
def load_pdf_files(data):
    loader = DirectoryLoader(data, glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    return documents


documents = load_pdf_files(DATA_PATH)
print("✅ PDF Pages Loaded:", len(documents))


# Step 2: Create Chunks
def create_chunks(extracted_data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    text_chunks = text_splitter.split_documents(extracted_data)
    return text_chunks


text_chunks = create_chunks(documents)
print("✅ Text Chunks Created:", len(text_chunks))

# Step 3: Create Vector Embeddings
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Step 4: Store in FAISS
DB_FAISS_PATH = "vectorstore/db_faiss"
db = FAISS.from_documents(text_chunks, embedding_model)
db.save_local(DB_FAISS_PATH)
print("✅ Vectorstore saved at:", DB_FAISS_PATH)
