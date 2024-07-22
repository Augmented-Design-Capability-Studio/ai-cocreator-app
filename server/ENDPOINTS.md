# Express Server

**High-Level Description:**
This Express server is a critical component of the AI Co-Creator project. It handles the transcription of audio inputs, communicates with the OpenAI API to generate responses, and manages WebSocket connections between the Wizard App, the voice assistant, and the client application.

**Technical Description:**
The server processes audio inputs sent by the AI Co-Creator application, transcribes the audio using the Whisper API, and queries the OpenAI API to generate responses. It also handles WebSocket communication to facilitate real-time interactions and control between the Wizard App and the client application.

**Folder Structure:**
- **controllers/**: Contains the logic for handling requests.
  - `assistantController.js`: Handles the logic for generating AI responses.
  - `transcriptionController.js`: Handles the logic for transcribing audio files.
- **routes/**: Contains the endpoint definitions.
  - `assistantRoutes.js`: Defines routes related to AI response generation.
  - `transcriptionRoutes.js`: Defines routes related to audio transcription.
- **utils/**: Contains utility functions, including those for interacting with external APIs.
  - `openai.js`: Utility functions for interacting with the OpenAI API.
- **websockets/**: Contains the WebSocket server setup and logic.
  - `websocketServer.js`: Sets up the WebSocket server and handles events.
- **uploads/**: Directory to store uploaded audio files.
- `.env`: Environment variables configuration file.
- `index.js`: Main server file.

**Main Technologies:**
- **Express**: For creating the server and defining API endpoints.
- **WebSocket**: For real-time communication between the Wizard App and the client application.
- **node-fetch**: For making HTTP requests to external APIs.
- **OpenAI**: For generating AI responses.
- **Whisper API**: For transcribing audio inputs.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ai-cocreator-server.git
   cd ai-cocreator-server
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm installed. Then, install the required dependencies:
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   Create a `.env` file in the root directory and add your API keys and configuration variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

## API Endpoints

### 1. **Transcribe Audio**
- **Endpoint:** `/api/whisper`
- **Method:** `POST`
- **Description:** Receives audio data and transcribes it using the Whisper API.
- **Request Body:** Multipart form-data with an audio file.
- **Response:**
  ```json
  {
    "transcription": "transcribed_text"
  }
  ```

### 2. **Generate AI Response**
- **Endpoint:** `/api/generate-response`
- **Method:** `POST`
- **Description:** Receives transcribed text and generates a response using the OpenAI API.
- **Request Body:**
  ```json
  {
    "transcription": "transcribed_text"
  }
  ```
- **Response:**
  ```json
  {
    "response": "generated_response_text"
  }
  ```

## WebSocket Events

### 1. **Pause Assistant**
- **Event Name:** `pauseAssistant`
- **Description:** Pauses the voice assistant.
- **Payload:** `{}`

### 2. **Request Response**
- **Event Name:** `requestResponse`
- **Description:** Requests a generated response from the backend assistant.
- **Payload:** 
  ```json
  {
    "query": "user_input_query"
  }
  ```

### 3. **Send Response**
- **Event Name:** `sendResponse`
- **Description:** Sends the approved generated response to the client application.
- **Payload:** 
  ```json
  {
    "response": "generated_assistant_response"
  }
  ```

## Usage

1. **Start the Server:**
   ```bash
   npm start
   ```
   This will start the Express server and set up WebSocket communication.

2. **Handle Audio Inputs:**
   The server will receive audio inputs from the AI Co-Creator application, transcribe them using the Whisper API, and send the transcription to the OpenAI API to generate a response.

3. **WebSocket Communication:**
   The server manages real-time communication between the Wizard App and the client application, enabling the Wizard to control the voice assistant's responses.

**Version History:**
- **Version 1.0.0:** Initial release with core functionality.
