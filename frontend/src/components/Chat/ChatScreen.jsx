import { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getInitialMessage } from '../../utils/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Button from '../Common/Button';
import './ChatScreen.css';

export default function ChatScreen({ personalityType, onComplete }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef(null);

    const isTType = personalityType.includes('T');
    const MIN_MESSAGES = 3; // 最低3往復

    useEffect(() => {
        // 初期メッセージを追加
        const initialMsg = getInitialMessage(personalityType);
        setMessages([{
            role: 'assistant',
            content: initialMsg,
            timestamp: new Date()
        }]);
    }, [personalityType]);

    useEffect(() => {
        // 自動スクロール
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (userMessage) => {
        // ユーザーメッセージを追加
        const newUserMessage = {
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            // バックエンドにリクエスト
            const history = [...messages, newUserMessage].map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await sendChatMessage(userMessage, personalityType, history);

            // AI応答を追加
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.message,
                timestamp: new Date()
            }]);

            setMessageCount(prev => prev + 1);
        } catch (error) {
            console.error('Chat error:', error);
            // エラー時のフォールバックメッセージ
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'すみません、接続に問題が発生しました。もう一度お試しください。',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleComplete = () => {
        // 会話履歴を渡して完了
        const conversationSummary = messages
            .filter(msg => msg.role === 'user')
            .map(msg => msg.content)
            .join(' ');

        onComplete(conversationSummary, messages);
    };

    const canComplete = messageCount >= MIN_MESSAGES;

    return (
        <div className="chat-screen">
            <div className="chat-container">
                <div className="chat-header glass">
                    <h2>AI カウンセリング</h2>
                    <p className="chat-subtitle">
                        {isTType ? '思考を整理しましょう' : '気持ちを聞かせてください'}
                    </p>
                </div>

                <div className="chat-messages glass">
                    {messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            role={message.role}
                            content={message.content}
                            timestamp={message.timestamp}
                        />
                    ))}

                    {isLoading && (
                        <div className="chat-loading">
                            <div className="loading"></div>
                            <span>考えています...</span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-footer">
                    <ChatInput
                        onSend={handleSendMessage}
                        disabled={isLoading}
                    />

                    {canComplete && (
                        <Button
                            variant="primary"
                            onClick={handleComplete}
                            className="complete-button fade-in"
                        >
                            書籍の処方を受ける
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
