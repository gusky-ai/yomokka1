import './BookCard.css';

export default function BookCard({ book }) {
    return (
        <div className="book-card fade-in">
            <div className="book-cover-container">
                {/* 実際の画像がない場合はプレースホルダーを表示 */}
                {book.imageUrl ? (
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-cover"
                    />
                ) : (
                    <div className="book-cover-placeholder">
                        <span className="book-title-placeholder">{book.title}</span>
                    </div>
                )}
            </div>

            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="book-tags">
                    <span className="book-tag">{book.genre}</span>
                    {book.tags && book.tags.map((tag, index) => (
                        <span key={index} className="book-tag">{tag}</span>
                    ))}
                </div>
                <p className="book-description">{book.description}</p>
            </div>
        </div>
    );
}
