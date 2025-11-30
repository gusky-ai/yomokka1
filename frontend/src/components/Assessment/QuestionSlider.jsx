import { useState } from 'react';
import './QuestionSlider.css';

export default function QuestionSlider({ value, onChange, labels }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="question-slider">
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="slider"
            />

            <div className="slider-labels">
                {Object.entries(labels).map(([score, label]) => (
                    <div
                        key={score}
                        className={`slider-label ${value === Number(score) ? 'active' : ''}`}
                    >
                        <div className="slider-label-dot"></div>
                        <span className="slider-label-text">{label}</span>
                    </div>
                ))}
            </div>

            <div className="slider-value">
                <span className="slider-value-text">{labels[value]}</span>
            </div>
        </div>
    );
}
