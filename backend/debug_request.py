import requests
import json

try:
    with open("debug_payload.json", "r") as f:
        payload = json.load(f)
    
    response = requests.post("http://localhost:8000/api/analyze-profile", json=payload)
    print(f"Status: {response.status_code}")
    print("Response Body:")
    print(response.text)
except Exception as e:
    print(e)
