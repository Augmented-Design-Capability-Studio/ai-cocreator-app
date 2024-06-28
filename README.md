### AI Co-Creator

**High-Level Description:**
This project is a voice assistant designed to be paired with the CAD program Autodesk Fusion 360. Its primary function is to interact with designers during their design process, providing real-time assistance and feedback.

To use the voice assistant, you must install both the Autodesk add-on and the Voice Assistant overlay.

**Technical Description:**

There is an Autodesk Fusion 360 add-on that includes an HTTP server to communicate with the Voice Assistant. The code for this is in a separate repository [here](link_to_repository).

AI Co-Creator is an Electron-based application that serves as an overlay for Autodesk Fusion 360. A human user controls when the voice assistant is listening (by starting and stopping it). The audio is then sent to a server that communicates with the Whisper API for transcription. Additionally, the app takes screenshots and sends both the audio and screenshots to another server, which queries the OpenAI API to generate a response. The voice assistant then speaks the response. The Voice Assistant app can also communicate with the Autodesk Fusion 360 add-on to highlight parts of the screen.

**Features:**
- **Voice Assistant Integration:** Communicate with the AI assistant using voice commands to perform various tasks within Autodesk Fusion 360. The start and stop of audio and screenshot capture are controlled by the user.
   - The voice assistant has 4 states: sleeping, listening, processing, and responding
- **Overlay Functionality:** The app runs as an overlay on top of Autodesk Fusion 360, providing seamless integration and accessibility.
- **Real-time Interaction:** Receive real-time feedback and assistance from the AI as you work on your designs.

**Folder Structure:**
- **app:** Contains the frontend code, using React technologies.
- **server:** Contains an Express server that uses node-fetch and the OpenAI library to query the Whisper API, receive prompts, and generate responses for the Voice Assistant to speak back.

**Main Technologies:**
- **Electron:** For creating a transparent overlay.
- **Express:** For the backend server.
- **React:** For the frontend.
- **OpenAI:** For LLM technology.

**Installation:**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ai-cocreator-app.git
   cd ai-cocreator-app
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm installed. Then, install the required dependencies:
   ```bash
   npm install
   cd app
   npm install 
   cd ../server
   npm install
   ```

**Usage:**
1. **Start Fusion 360:** Open Autodesk Fusion 360 on your computer and ensure the add-on is running (more steps to be added soon).

2. **Launch AI Co-Creator Frontend:**
   ```bash
   npm start
   ```
   This will start the Electron application. The app will run as an overlay on top of Fusion 360.

3. **Launch the Whisper and Assistant Servers:**
   ```bash
   cd server
   npm start 
   ```

4. **Activate Voice Assistant:** Click start, say a command, and then click stop. Begin interacting with the AI assistant using voice commands.

5. **Perform Tasks:** Utilize the voice assistant to perform actions within Fusion 360, such as creating sketches, applying constraints, or generating designs. The voice assistant will also ask you questions to help you design better.

**Version History:**
- **Version 1.0.0:** Initial release with core functionality.

---