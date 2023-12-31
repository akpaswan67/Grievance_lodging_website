import streamlit as st
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationEntityMemory
from langchain.chains.conversation.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE
from langchain.llms import OpenAI

if "generated" not in st.session_state:
    st.session_state["generated"]=[]
if "past" not in st.session_state:
    st.session_state["past"]=[]
if "input" not in st.session_state:
    st.session_state["input"]=[]
if "stored_session" not in st.session_state:
    st.session_state["stored_session"]=[]



def get_text():
    input_text= st.text_input("You:",st.session_state["input"],key="input",
                             placholder="Your AI assistant here!",
                            label_visibility='hidden')
    return input_text



st.title("Memory Bot")
api=st.sidebar.text_input("API-key", type="password")
