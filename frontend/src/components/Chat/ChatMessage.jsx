import './ChatMessage.css';

export default function ChatMessage({ role, content, timestamp }) {
    const isUser = role === 'user';

    return (
        <div className={`chat-message ${isUser ? 'user' : 'assistant'} slide-in`}>
            <div className="message-content">
                {content}
            </div>
            <div className="message-timestamp">
                {timestamp && new Date(timestamp).toLocaleTimeString('ja-JP', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        </div>
    );
}
