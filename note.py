from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain.chains import retrieval 
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
# Step 1: Initialize the Model
model = OllamaLLM(model='llama3.2')

# Step 2: Initialize the Embedding Model and Vector Store
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

documents = [
    Document(page_content="Akshaj Alva is a driven professional with expertise in Data Science, Machine Learning, and Natural Language Processing (NLP)."),
    Document(page_content="Formerly a Salesforce developer at Accenture for 2.5 years, Akshaj transitioned to Data Science after a 1.5-year career gap."),
    Document(page_content="Akshaj explored diverse industries, including sports management, and aims to solve business challenges using innovative solutions."),
]
vector_store = FAISS.from_documents(documents, embedding = embedding_model)

# Step 3: Create the Retrieval-Augmented Generation (RAG) Chain
retriever = vector_store.as_retriever()

# Define the prompt template
template = """
You are a highly specialized chatbot that only provides answers based on the context given below. If the user's input does not relate to the provided context, or if the information is not available in the context, respond with: "I don't know."

Context:
{context}

Rules:
1. Only respond based on the provided context.
2. If the user's question is outside the scope of the context, reply with: "I don't know."
3. Be concise and accurate in your responses.

User Input: {input}
"""
prompt = ChatPromptTemplate.from_template(template)

# Define the Retrieval QA Chain
document_chain = create_stuff_documents_chain(model, prompt)
qa_chain = retrieval.create_retrieval_chain(retriever, document_chain)

# Step 4: Conversation Handling
def handle_conversation():
    print("Type 'exit' to end the conversation.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        
        # Retrieve relevant context and pass it to the model
        result = qa_chain.invoke({"input": user_input})
        print("Bot:", result.get('answer', "I don't know."))

        # Step 5: Define a Pydantic Model for Input
class ChatRequest(BaseModel):
    input: str

# Step 6: Create the API Endpoint
@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    user_input = request.input
    result = qa_chain.invoke({"input": user_input})
    return {"response": result.get('answer', "I don't know.")}

if __name__ == "__main__":
    handle_conversation()
