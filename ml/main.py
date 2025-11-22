import requests
import json

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer <apikey>",
    "Content-Type": "application/json",
  },
  data=json.dumps({
    "model": "tngtech/deepseek-r1t2-chimera:free",
    "messages": [
        {
          "role": "user",
          "content": "What is the meaning of life?"
        }
      ]
  })
)
print(response.json())