# AI Co-Creator

**High-Level Description:**
This project is a voice assistant designed to be paired with the CAD program Autodesk Fusion 360. Its primary function is to interact with designers during their design process, providing real-time assistance and feedback.

To use the voice assistant, you must install the Voice Assistant overlay and optionally the Wizard App for Wizard of Oz studies. An Autodesk Fusion 360 add-on may be needed for more advanced interactions in the future.

**Technical Description:**

AI Co-Creator is an Electron-based application that serves as an overlay for Autodesk Fusion 360. The app always listens for audio input and sends it to a server that communicates with the Whisper API for transcription. The app will also be capable of taking screenshots and sending both the audio and screenshots to another server, which queries the OpenAI API to generate a response. However, the screenshot functionality will be added later. The voice assistant then speaks the response. The Voice Assistant app can also highlight parts of the screen within Fusion 360 based on the interactions. For more precise control and interaction, an Autodesk Fusion 360 add-on may be developed in the future.

The Wizard App is used for Wizard of Oz studies, allowing a researcher or operator to control the voice assistant. The Wizard can pause the voice assistant, request generated responses from the backend, and manage the communication flow between the backend assistant and the client application.

**Features:**
- **Voice Assistant Integration:** Communicate with the AI assistant using voice commands to perform various tasks within Autodesk Fusion 360. The app continuously listens for audio input.
   - The voice assistant has 4 states: sleeping, listening, processing, and responding.
- **Overlay Functionality:** The app runs as an overlay on top of Autodesk Fusion 360, providing seamless integration and accessibility.
- **Real-time Interaction:** Receive real-time feedback and assistance from the AI as you work on your designs.
- **Wizard Control:** The Wizard App allows a human operator to control when the voice assistant generates and sends responses, facilitating Wizard of Oz studies.
- **Future Features:** The ability to take screenshots and further enhance interaction with Fusion 360 will be added later.

**Folder Structure:**
- **assistant-app:** Contains the frontend code for the voice assistant, using React technologies.
- **wizard-app:** Contains the frontend code for the Wizard client, using React technologies.
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
   cd assistant-app
   npm install 
   cd ../wizard-app
   npm install
   cd ../server
   npm install
   ```

**Usage:**
1. **Start Fusion 360:** Open Autodesk Fusion 360 on your computer.

2. **Launch AI Co-Creator Frontend:**
   ```bash
   cd assistant-app
   npm start
   ```
   This will start the Electron application. The app will run as an overlay on top of Fusion 360.

3. **Launch the Whisper and Assistant Servers:**
   ```bash
   cd ../server
   npm start 
   ```

4. **Launch the Wizard App (if using):**
   ```bash
   cd ../wizard-app
   npm start
   ```

5. **Activate Voice Assistant:** The app will continuously listen for audio input. The Wizard can then make the assistant generate and say responses.

6. **Perform Tasks:** Utilize the voice assistant to perform actions within Fusion 360, such as creating sketches, applying constraints, or generating designs. The voice assistant will also ask you questions to help you design better.

**Version History:**
- **Version 1.0.0:** Initial release with core functionality.