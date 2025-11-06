from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Flask on Render!"

@app.route("/weather")
def get_weather():
    city = request.args.get("city", "London")
    api_key = os.environ.get("OPENWEATHER_API_KEY")

    if not api_key:
        return jsonify({"error": "API key not set"}), 500

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
