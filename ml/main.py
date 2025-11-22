from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)

message = "What is the meaning of life?"

API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise RuntimeError(
        "Set OPENROUTER_API_KEY environment variable before running the server"
    )


def call_chat_api(input_text):
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "model": "tngtech/deepseek-r1t2-chimera:free",
                "messages": [
                    {
                        "role": "user",
                        "content": f"User Input: {input_text}. Keep it short.",
                    }
                ],
            }
        ),
    )
    response.raise_for_status()
    return response.json()


def get_text(response):
    try:
        choices = response.get("choices", [])
        if not choices:
            return None
        choice0 = choices[0]
        message = choice0.get("message") or {}
        content = message.get("content") if isinstance(message, dict) else None
        if content is None:
            # fallback locations
            content = choice0.get("text") or (choice0.get("message") or {}).get(
                "content"
            )
        return content
    except Exception:
        return None


@app.route("/chatter")
def chatter():
    # accept query param ?q=... to pass custom prompt, otherwise use default
    user_input = request.args.get("q", message)
    api_resp = call_chat_api(user_input)
    text = get_text(api_resp) or "No response from API"
    return jsonify({"text": text})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
