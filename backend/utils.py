import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment variables.")

genai.configure(api_key=GEMINI_API_KEY)

def get_model(model_name: str = "gemini-flash-latest"):
    """
    Returns a configured Gemini model instance.
    Using 2.0-flash-exp for speed and high reasoning capabilities suitable for this prototype.
    """
    return genai.GenerativeModel(model_name)
