import './ProgressIndicator.css';

export default function ProgressIndicator({ current, total, progress }) {
    return (
        <div className="progress-indicator">
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="progress-text">
                {current} / {total}
            </div>
        </div>
    );
}
