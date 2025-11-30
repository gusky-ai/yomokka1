import { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend, disabled }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-form">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ここにメッセージを入力..."
                disabled={disabled}
                className="chat-input-textarea"
                rows={3}
            />
            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="chat-input-button btn btn-primary"
            >
                送信
            </button>
        </form>
    );
}
