from flask import Flask, request, jsonify
import os, requests

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Flask on Render!"

@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    api_key = os.environ.get("OPENWEATHER_API_KEY")

    if not api_key:
        return jsonify({"error": "API key not configured"}), 500

    if city:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    elif lat and lon:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    else:
        return jsonify({"error": "Please provide city or coordinates"}), 400

    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
