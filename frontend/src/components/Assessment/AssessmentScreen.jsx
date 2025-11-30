import { useState } from 'react';
import { questions, sliderLabels } from '../../data/questions';
import QuestionSlider from './QuestionSlider';
import ProgressIndicator from './ProgressIndicator';
import Logo from '../Common/Logo';
import Button from '../Common/Button';
import './AssessmentScreen.css';

export default function AssessmentScreen({ onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const hasAnswer = answers[currentQuestion.id] !== undefined;

    const handleAnswer = (value) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(answers);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    return (
        <div className="assessment-screen">
            <div className="assessment-container">
                <Logo />

                <div className="assessment-card glass fade-in">
                    <ProgressIndicator
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                        progress={progress}
                    />

                    <div className="question-container">
                        <h2 className="question-number">
                            質問 {currentQuestionIndex + 1} / {questions.length}
                        </h2>

                        <p className="question-text">
                            {currentQuestion.text}
                        </p>

                        <QuestionSlider
                            value={answers[currentQuestion.id] || 3}
                            onChange={handleAnswer}
                            labels={sliderLabels}
                        />
                    </div>

                    <div className="button-group">
                        <Button
                            variant="ghost"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            ← 前へ
                        </Button>

                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={!hasAnswer}
                        >
                            {isLastQuestion ? '診断完了' : '次へ →'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
