import os
import base64
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re

# Load environment variables
load_dotenv()

# Get API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)


def encode_image(image_path):
    """Read and encode image file to base64."""
    with open(image_path, "rb") as image_file:
        return image_file.read()


def analyze_image_with_gemini(image_path):
    """
    Use Gemini API to:
    1. Verify if the image contains a jasmine leaf
    2. Identify any potential plant diseases or issues
    """
    try:
        # Initialize the Gemini Pro Vision model
        model = genai.GenerativeModel("gemini-2.0-flash")

        # Read the image
        image_data = encode_image(image_path)

        # Prepare the prompt
        prompt = """
        Please analyze this plant image and provide the following information:
        1. Is this a Night Jasmine leaf? (Yes/No/Unsure)
        2. If you can identify the plant type, what is it?
        3. Does the plant show signs of disease? If yes, what disease might it be?
        4. What's the overall health condition of the plant?
        
        Provide your response in JSON format with keys: 'is_jasmine', 'plant_type', 'disease', 'health_condition', and 'confidence_level'.
        """

        # Generate content using the model
        response = model.generate_content(
            [prompt, {"mime_type": "image/jpeg", "data": image_data}]
        )

        # Extract text from response
        generated_text = response.text

        # Try to extract JSON from the response
        json_match = re.search(r"```json\n(.*?)\n```", generated_text, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            # If no JSON block found, try to parse the entire text
            json_str = generated_text

        try:
            # Try to parse as JSON
            result = json.loads(json_str)
        except json.JSONDecodeError:
            # If parsing fails, create a structured result with the raw text
            result = {
                "is_jasmine": "Unsure",
                "plant_type": "Unknown",
                "disease": "Analysis error - couldn't parse JSON",
                "health_condition": "Unknown",
                "confidence_level": 0,
                "raw_analysis": generated_text,
            }

        return result

    except Exception as e:
        print(f"Error using Gemini API: {e}")
        return {
            "is_jasmine": "Unsure",
            "plant_type": "Unknown",
            "disease": "API error",
            "health_condition": "Unknown",
            "confidence_level": 0,
            "error": str(e),
        }


# Usage example:
if __name__ == "__main__":
    # Replace with your image path
    image_path = "path/to/your/plant_image.jpg"
    result = analyze_image_with_gemini(image_path)
    print(json.dumps(result, indent=2))
