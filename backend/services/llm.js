import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini
const apiKey = 'process.env.GOOGLE_API_KEY';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

/**
 * Generate chat response using Gemini
 * @param {string} userMessage - User's message
 * @param {string} personalityType - User's personality type (e.g., "INTJ")
 * @param {Array} history - Chat history
 * @returns {Promise<string>} - AI response
 */
export async function generateChatResponse(userMessage, personalityType, history) {
    if (!model) {
        console.warn('Google API Key missing, using mock response');
        return `[MOCK] ${personalityType}タイプの方ですね。APIキーが設定されていないため、モック応答を返しています。あなたの悩み「${userMessage}」について、もっと詳しく教えていただけますか？`;
    }

    try {
        // Determine system instruction based on personality type
        const isTType = personalityType.includes('T');
        const systemInstruction = isTType
            ? `あなたは「思考の整理を手伝う壁打ちパートナー」です。
         相手は「${personalityType}」タイプです。
         口調は論理的・分析的・簡潔に。「〜だ」「〜ですね」という語尾を使ってください。
         共感よりも「構造化」「分解」「解決策の提示」を優先してください。
         相手の悩みを深掘りし、本質的な課題を特定することが目的です。`
            : `あなたは「心に寄り添うカウンセラー」です。
         相手は「${personalityType}」タイプです。
         口調は共感的・優しく・柔らかく。「〜だよね」「〜ですか？」という語尾を使ってください。
         解決策を急ぐよりも「感情の受容」「共感」「安心感」を優先してください。
         相手の気持ちを言語化し、心を軽くすることが目的です。`;

        // Convert history to Gemini format
        // Note: Gemini API expects history in { role: 'user' | 'model', parts: [{ text: string }] } format
        // But for single-turn chat or simple history, we can just construct a prompt or use startChat

        const chat = model.startChat({
            history: history.slice(0, -1).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            })),
            generationConfig: {
                maxOutputTokens: 300,
            },
            systemInstruction: {
                role: "system",
                parts: [{ text: systemInstruction }]
            }
        });

        // Send message (Gemini doesn't support system instruction in startChat in all SDK versions yet, 
        // so we prepend it to the first message or rely on the model's ability to follow context if systemInstruction param isn't supported)
        // The latest SDK supports systemInstruction in getGenerativeModel, let's update initialization if needed.
        // For safety, let's prepend instructions to the prompt if we can't set system instruction easily in this flow.
        // Actually, let's use a simple prompt construction for robustness if systemInstruction is tricky.

        // Constructing a prompt with system instruction included
        const prompt = `${systemInstruction}\n\nユーザー: ${userMessage}`;

        // If history is empty, just send prompt. If history exists, use chat.
        // Let's try the chat.sendMessage approach which is standard.

        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('AI応答の生成に失敗しました。');
    }
}

/**
 * Generate prescription message for a book
 * @param {Object} book - Book object
 * @param {string} personalityType - User's personality type
 * @param {string} conversationSummary - Summary of user's concerns
 * @returns {Promise<string>} - Prescription message (aphorism)
 */
export async function generatePrescriptionMessage(book, personalityType, conversationSummary) {
    if (!model) {
        return `[MOCK] ${book.title}は、あなたの${personalityType}な魂に響く一冊です。(APIキー未設定)`;
    }

    try {
        const prompt = `
      以下のユーザーに対して、選定された本を紹介する「処方箋メッセージ（短いアフォリズム・格言）」を生成してください。
      
      【ユーザー情報】
      性格タイプ: ${personalityType}
      悩み・関心: ${conversationSummary}
      
      【選定された本】
      タイトル: ${book.title}
      著者: ${book.author}
      概要: ${book.description}
      
      【要件】
      - 30文字〜60文字程度
      - 本からの直接引用ではなく、AIが生成した言葉
      - ユーザーの心臓を鷲掴みにするような、深く刺さる言葉
      - 明朝体が似合うような文学的・哲学的なトーン
      - 「この本は〜です」という説明調はNG
    `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text().trim();
    } catch (error) {
        console.error('Gemini API Error (Prescription):', error);
        return `あなたの心に、${book.title}という灯火を。`; // Fallback
    }
}

/**
 * Analyze conversation to determine concern type
 * @param {string} conversationSummary 
 * @returns {Promise<string>} - 'practical' or 'story'
 */
export async function analyzeConcernType(conversationSummary) {
    if (!model) return 'story';

    try {
        const prompt = `
      以下の会話・悩み内容から、ユーザーが求めている本のタイプを判定してください。
      
      会話内容: ${conversationSummary}
      
      出力は以下のいずれか1単語のみにしてください：
      - PRACTICAL (実用書、ビジネス書、解決策、ノウハウ)
      - STORY (小説、エッセイ、物語、癒やし、逃避)
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim().toUpperCase();

        if (text.includes('PRACTICAL')) return 'practical';
        return 'story'; // Default to story
    } catch (error) {
        console.error('Gemini API Error (Analysis):', error);
        return 'story';
    }
}
