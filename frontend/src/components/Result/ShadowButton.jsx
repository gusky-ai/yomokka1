import './ShadowButton.css';

export default function ShadowButton({ isShadowMode, onToggle }) {
    return (
        <button
            className={`shadow-button ${isShadowMode ? 'active' : ''}`}
            onClick={onToggle}
            title={isShadowMode ? "元の世界に戻る" : "影の世界を覗く"}
        >
            <div className="shadow-icon">
                {isShadowMode ? '👁️' : '🌑'}
            </div>
            <span className="shadow-text">
                {isShadowMode ? '元の世界に戻る' : '影(Shadow)を覗く'}
            </span>
        </button>
    );
}
