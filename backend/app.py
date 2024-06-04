import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import openai

app = Flask(__name__)
CORS(app)

#chatbot
    # This Flask application serves as a handler for incoming messages for the chatbot.
    # It utilizes a specialized OpenAI API key to enhance the chatbot's responses tailored to specific conversation needs.
    # The code handles incoming POST requests at the "/chatbot" endpoint.
    # Upon receiving a message from the client, it interacts with the OpenAI API to generate a response.
    # The response, if generated successfully, has commas removed for better readability.
    # Finally, the processed response is returned to the client, or an error message is provided if no response is generated.
  
@app.route("/chatbot", methods=["POST"])

def api():
    # Set OpenAI API key
    openai.api_key = '#added api key here'
   
   # Get user message from request
    message = request.json.get("message")
    
    # Call OpenAI API to generate a response
    completion = openai.ChatCompletion.create(
        model="ft:gpt-3.5-turbo-0613:personal:yt:8xExL3LU",
        messages=[
            {"role": "user", "content": message}
        ]
    )
       
     # Check if a response is generated
    if completion.choices[0].message:

        # Remove commas from the response
        response = completion.choices[0].message.get("content")
        print("Response from OpenAI:", response)  

        if response:
            response_without_commas = re.sub(r',', '', response)
            print("Response without commas:", response_without_commas)

             # Return the processed response to the client
            return response_without_commas
        else:
            return 'Failed to generate response!'
    else:
        return 'Failed to generate response!'

#Croptime
    # This Flask application serves as a machine learning model for predicting apple plantation crop management activities based on planting time.
    # It defines a route "/ED-predict" to handle incoming POST requests.
    # The code loads a pre-trained machine learning model from a file called "model.joblib".
    # Upon receiving a POST request with planting time data, it extracts the time and checks for its presence.
    # If the planting time is provided, the model predicts the corresponding activity using the loaded model.
    # The predicted activity is then returned to the client as a JSON response.
    # In case of any errors during prediction, an appropriate error message is returned along with the HTTP status code.
@app.route('/ED-predict', methods=['POST'])
def predict():

    
    loaded_model = load('model.joblib')
   
    try:
        # Get planting time from the request data
        data = request.json
        planting_time = int(data.get('planting_time'))  

        # Check if planting time is provided
        if planting_time is None:
            return jsonify({'error': 'Planting time not provided'}), 400

       # Make prediction using the loaded model
        predicted_activity = loaded_model.predict([[planting_time]])[0]

         # Return the predicted activity to the client
        return jsonify({'predicted_activity': predicted_activity})

    except Exception as e:
        app.logger.error(f"Error predicting crop activity: {str(e)}")
        return jsonify({'error': 'An error occurred while predicting crop activity'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
