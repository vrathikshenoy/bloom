import os
import numpy as np
import cv2
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Import Gemini integration
from gemini_integration import analyze_image_with_gemini

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Configure CORS properly

# Configuration
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
IMG_SIZE = 224

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB max upload

# Load the model
model = None
# Fixed to match the order in your prediction code
class_names = ["healthy", "multiple", "rust"]


def load_model():
    global model
    try:
        # Load model with compile=True to ensure all layers are properly initialized
        model = tf.keras.models.load_model(
            "cnn_finetuned_on_boxed_leaves.h5", compile=True
        )
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
        # For testing without model, you can create a dummy model
        model = DummyModel()
    return model


# Dummy model for testing without the actual model file
class DummyModel:
    def predict(self, img_array):
        # Return random predictions for testing
        predictions = np.random.random((1, len(class_names)))
        # Normalize to sum to 1
        predictions = predictions / np.sum(predictions)
        return predictions


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(image_path):
    # Read using OpenCV
    img = cv2.imread(image_path)
    # Convert to RGB (matching your prediction code)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize to match model input size
    img_resized = cv2.resize(img_rgb, (IMG_SIZE, IMG_SIZE))

    # Normalize pixel values to 0-1 range (as in your prediction code)
    img_array = np.expand_dims(img_resized / 255.0, axis=0)

    return img_array


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "class_names": class_names})


@app.route("/api/predict", methods=["POST"])
def predict():
    # Check if image is in request
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No image selected"}), 400

    if file and allowed_file(file.filename):
        # Save the uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        try:
            # First, use Gemini API to analyze the image
            gemini_analysis = analyze_image_with_gemini(filepath)

            # Ensure model is loaded for CNN prediction
            if model is None:
                load_model()

            # Load and preprocess the image using the same steps as your prediction code
            img_array = preprocess_image(filepath)

            # Make prediction with CNN model
            predictions = model.predict(img_array)

            # Get CNN prediction results
            predicted_class_idx = np.argmax(predictions[0])
            predicted_class = class_names[predicted_class_idx]
            confidence = float(predictions[0][predicted_class_idx]) * 100

            # Prepare JSON response including both CNN and Gemini results
            response_data = {
                # CNN model predictions
                "prediction": predicted_class,
                "confidence": float(confidence),
                "allPredictions": {
                    class_names[i]: float(predictions[0][i] * 100)
                    for i in range(len(class_names))
                },
                # Gemini analysis results
                "geminiAnalysis": {
                    "isJasmine": gemini_analysis.get("is_jasmine", "Unsure"),
                    "plantType": gemini_analysis.get("plant_type", "Unknown"),
                    "disease": gemini_analysis.get("disease", "Unknown"),
                    "healthCondition": gemini_analysis.get(
                        "health_condition", "Unknown"
                    ),
                    "confidenceLevel": gemini_analysis.get("confidence_level", 0),
                },
            }

            # Return combined prediction
            return jsonify(response_data)

        except Exception as e:
            import traceback

            print(traceback.format_exc())
            return jsonify({"error": str(e)}), 500
        finally:
            # Clean up uploaded file
            if os.path.exists(filepath):
                os.remove(filepath)

    return jsonify({"error": "Invalid file type"}), 400


if __name__ == "__main__":
    # Load model at startup
    load_model()
    app.run(debug=True, host="0.0.0.0", port=5000)
