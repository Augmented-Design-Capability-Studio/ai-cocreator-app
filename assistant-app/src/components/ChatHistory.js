export default function ChatHistory({chatHistory}) {

    return (
        <div className="bg-black text-white p-4 absolute right-0 top-0">
            {chatHistory.map((text, id) => (
                <div key={id} className="bg-gray-800 rounded p-2 my-2">
                    {text}
                </div>
            ))}
        </div>
    );

}