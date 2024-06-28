import { useState, useRef, useEffect } from 'react';
import ChatHistory from './ChatHistory';

export default function VoiceAssistant() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        setIsRecording(true);
        audioChunksRef.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = event => {
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
            setChatHistory(prevHistory => [...prevHistory, data]);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="">
            <div onClick={isRecording ? stopRecording : startRecording} className="h-10 w-10 bg-[#C7FFE4] rounded-full absolute bottom-5 right-5 text-black flex items-center justify-center">
                {isRecording ? 'Stop' : 'Start'}
            </div>
            <ChatHistory chatHistory={chatHistory} />
        </div>
    );
}
