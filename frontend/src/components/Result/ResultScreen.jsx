import { useState, useEffect } from 'react';
import { getBookRecommendation } from '../../utils/api';
import { getPoeticName, getRadarChartData, getShadowType, getPersonalityTraits } from '../../utils/personality';
import RadarChart from './RadarChart';
import BookCard from './BookCard';
import ShadowButton from './ShadowButton';
import Button from '../Common/Button';
import './ResultScreen.css';

export default function ResultScreen({
    personalityType,
    answers,
    conversationSummary,
    onRetry
}) {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isShadowMode, setIsShadowMode] = useState(false);
    const [excludedBooks, setExcludedBooks] = useState([]);

    const currentType = isShadowMode ? getShadowType(personalityType) : personalityType;
    const poeticName = getPoeticName(currentType);
    const traits = getPersonalityTraits(currentType);
    const radarData = getRadarChartData(currentType, answers);

    useEffect(() => {
        loadBookRecommendation();
    }, [isShadowMode]);

    const loadBookRecommendation = async () => {
        setIsLoading(true);
        try {
            const recommendation = await getBookRecommendation(
                currentType,
                traits,
                conversationSummary,
                excludedBooks
            );
            setBook(recommendation.book);
        } catch (error) {
            console.error('Failed to load book recommendation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleShadow = () => {
        setIsShadowMode(prev => !prev);
    };

    const handleRetry = () => {
        if (book) {
            setExcludedBooks(prev => [...prev, book.id]);
        }
        onRetry();
    };

    return (
        <div className="result-screen">
            <div className="result-container">
                <div className={`result-card glass fade-in ${isShadowMode ? 'shadow-mode' : ''}`}>
                    <div className="result-header">
                        <h1 className="poetic-name">{poeticName}</h1>
                        <p className="personality-type">
                            {isShadowMode && <span className="shadow-label">Shadow: </span>}
                            {currentType}
                        </p>
                    </div>

                    <RadarChart data={radarData} />

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loading"></div>
                            <p>あなただけの一冊を探しています...</p>
                        </div>
                    ) : book ? (
                        <>
                            <div className="prescription-message">
                                <p className="prescription-text">{book.prescription}</p>
                            </div>

                            <BookCard book={book} />

                            <div className="action-buttons">
                                <Button
                                    variant="primary"
                                    onClick={() => window.open(book.amazonUrl, '_blank')}
                                    className="action-button-primary"
                                >
                                    この本を読む
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={handleRetry}
                                    className="action-button-secondary"
                                >
                                    なんか違う（再相談）
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>書籍の推薦に失敗しました</p>
                    )}

                    <ShadowButton
                        isShadowMode={isShadowMode}
                        onToggle={handleToggleShadow}
                    />
                </div>
            </div>
        </div>
    );
}
