export default function ChatHistory({chatHistory}) {

    return (
        <div>
            {
                chatHistory.map((text, id) => {
                    return (
                        <div key={id}>
                            {text}
                        </div>
                    )
                })
            }
        </div>
    );

}