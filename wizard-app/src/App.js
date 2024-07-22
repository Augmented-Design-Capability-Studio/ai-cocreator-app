import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:3001/api/generate-response', {
        transcription: 'Example transcription text', // Replace with actual transcription text
      });
      setResponse(data.response);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendResponse = () => {
    // Implement WebSocket communication to send the response
  };

  const regenerateResponse = () => {
    generateResponse();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <button
          onClick={generateResponse}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-full"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Response'}
        </button>
      </div>
      {response && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <button
            onClick={generateResponse}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </button>
          <p className="mb-4 text-center">{response}</p>
          <div className="flex justify-between">
            <button
              onClick={regenerateResponse}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
            >
              Regenerate
            </button>
            <button
              onClick={sendResponse}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
