import { useState } from 'react';
import AssessmentScreen from './components/Assessment/AssessmentScreen';
import ChatScreen from './components/Chat/ChatScreen';
import ResultScreen from './components/Result/ResultScreen';
import { calculatePersonality } from './utils/personality';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('assessment'); // assessment, chat, result
  const [answers, setAnswers] = useState({});
  const [personalityType, setPersonalityType] = useState('');
  const [conversationSummary, setConversationSummary] = useState('');

  // 診断完了ハンドラ
  const handleAssessmentComplete = (userAnswers) => {
    setAnswers(userAnswers);
    const type = calculatePersonality(userAnswers);
    setPersonalityType(type);
    setCurrentScreen('chat');
  };

  // チャット完了ハンドラ
  const handleChatComplete = (summary) => {
    setConversationSummary(summary);
    setCurrentScreen('result');
  };

  // リトライハンドラ
  const handleRetry = () => {
    setCurrentScreen('chat');
  };

  return (
    <div className="app">
      {currentScreen === 'assessment' && (
        <AssessmentScreen onComplete={handleAssessmentComplete} />
      )}

      {currentScreen === 'chat' && (
        <ChatScreen
          personalityType={personalityType}
          onComplete={handleChatComplete}
        />
      )}

      {currentScreen === 'result' && (
        <ResultScreen
          personalityType={personalityType}
          answers={answers}
          conversationSummary={conversationSummary}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}

export default App;
