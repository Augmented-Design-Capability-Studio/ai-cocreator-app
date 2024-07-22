import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust the URL as needed

const STATES = {
  SLEEPING: 'sleeping',
  LISTENING: 'listening',
  PROCESSING: 'processing',
  RESPONDING: 'responding',
};

export default function VoiceAssistant() {
  const [state, setState] = useState(STATES.SLEEPING);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    socket.on('responseSent', (data) => {
      console.log('Response received from server:', data.response);
      setState(STATES.RESPONDING);
      // handle the response if needed
      setState(STATES.SLEEPING);
    });

    return () => {
      socket.off('responseSent');
    };
  }, []);

  useEffect(() => {
    if (state === STATES.LISTENING) {
      startRecording();
    } else if (state === STATES.PROCESSING && audioBlob) {
      sendAudioToServer();
    }
  }, [state, audioBlob]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(audioBlob);
      setState(STATES.PROCESSING);
    };

    mediaRecorderRef.current.start();

    setTimeout(() => {
      mediaRecorderRef.current.stop();
      setState(STATES.PROCESSING);
    }, 5000); // Record for 5 seconds
  };

  const sendAudioToServer = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await fetch('http://localhost:3001/api/whisper', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      socket.emit('sendResponse', { response: data.transcription });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setState(STATES.SLEEPING);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
      <AssistantStateIndicator state={state} />
      <button
        onClick={() => setState(STATES.LISTENING)}
        className="mt-4 h-10 w-32 rounded-full bg-green-500 text-white font-bold"
      >
        Start Listening
      </button>
    </div>
  );
}

const AssistantStateIndicator = ({ state }) => {
  let content;
  switch (state) {
    case STATES.LISTENING:
      content = 'Listening...';
      break;
    case STATES.PROCESSING:
      content = 'Processing...';
      break;
    case STATES.RESPONDING:
      content = 'Responding...';
      break;
    case STATES.SLEEPING:
    default:
      content = 'Sleeping...';
      break;
  }
  return <div className="text-lg font-bold">{content}</div>;
};
