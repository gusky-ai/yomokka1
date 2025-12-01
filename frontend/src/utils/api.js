// バックエンドAPI通信ユーティリティ

const API_BASE_URL = 'https://yomokka1.onrender.com';

/**
 * チャットメッセージを送信してAI応答を取得
 * @param {string} message - ユーザーメッセージ
 * @param {string} personalityType - 性格タイプ (例: "INTJ")
 * @param {Array} history - 会話履歴
 * @returns {Promise<Object>} - AI応答
 */
export async function sendChatMessage(message, personalityType, history = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                personalityType,
                history
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Chat API Error:', error);
        throw error;
    }
}

/**
 * 書籍推薦を取得
 * @param {string} personalityType - 性格タイプ
 * @param {Object} traits - 性格特性
 * @param {string} conversationSummary - 会話サマリー
 * @param {Array} excludedBooks - 除外する書籍ID
 * @returns {Promise<Object>} - 推薦書籍データ
 */
export async function getBookRecommendation(
    personalityType,
    traits,
    conversationSummary,
    excludedBooks = []
) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                personalityType,
                traits,
                conversationSummary,
                excludedBooks
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Book Recommendation API Error:', error);
        throw error;
    }
}

/**
 * 初回メッセージを取得
 * @param {string} personalityType - 性格タイプ
 * @returns {string} - 初回メッセージ
 */
export function getInitialMessage(personalityType) {
    const isTType = personalityType.includes('T');

    if (isTType) {
        // T型: 論理的、分析的
        return '思考のクセが分かりました。今、解決したい課題を書き出してください。一緒に構造を分解しましょう。';
    } else {
        // F型: 共感的、優しい
        return '診断お疲れ様でした。少しお話ししましょう。今、心に引っかかっているモヤモヤはありますか？ うまく書こうとしなくて大丈夫ですよ。';
    }
}