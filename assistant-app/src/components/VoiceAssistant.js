import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import ChatHistory from './ChatHistory';

const socket = io('http://localhost:3001'); // Adjust the URL as needed

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    socket.on('responseSent', (data) => {
      setChatHistory((prevHistory) => [...prevHistory, { text: data.response, user: 'assistant' }]);
    });

    return () => {
      socket.off('responseSent');
    };
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
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
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (audioBlob) {
      sendAudioToServer();
    }
  }, [audioBlob]);

  const sendAudioToServer = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await fetch('http://localhost:3001/api/whisper', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setChatHistory((prevHistory) => [...prevHistory, { text: data.transcription, user: 'user' }]);
      socket.emit('sendResponse', { response: data.transcription });
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="mb-4">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <div className="flex justify-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`h-10 w-32 rounded-full ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white font-bold`}
        >
          {isRecording ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}
