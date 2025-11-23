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


def generate_reply(input_text):
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


def get_reply_only(response):
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


@app.route("/chatter", methods=["POST"])
def chatter():
    try:
        data = request.get_json(force=True, silent=False)
        # data = request.json()
    except:
        return jsonify({"error": "Invalid JSON"}), 400

    if not data or "message" not in data:
        return jsonify({"error": "Field 'message' is required"}), 400

    user_message = data["message"]
    if not isinstance(user_message, str) or not user_message.strip():
        return jsonify({"error": "Field 'message' must be a non-empty string"}), 400

    try:
        reply = generate_reply(user_message)
    except Exception as e:

        return jsonify({"error": "LLM generation failed"}), 500

    return jsonify({"reply": get_reply_only(reply)}), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
