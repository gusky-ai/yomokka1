// 性格タイプ判定ロジック

/**
 * 12問の回答から4文字の性格タイプを算出
 * @param {Object} answers - { questionId: score(1-5) }
 * @returns {string} - 4文字タイプ (例: "INTJ")
 */
export function calculatePersonality(answers) {
    // Q1-3: E vs I (外向 vs 内向)
    const eiScore = (answers[1] + answers[2] + answers[3]) / 3;
    const ei = eiScore >= 3 ? 'I' : 'E';

    // Q4-6: S vs N (現実 vs 直感)
    const snScore = (answers[4] + answers[5] + answers[6]) / 3;
    const sn = snScore >= 3 ? 'S' : 'N';

    // Q7-9: T vs F (論理 vs 感情)
    const tfScore = (answers[7] + answers[8] + answers[9]) / 3;
    const tf = tfScore >= 3 ? 'T' : 'F';

    // Q10-12: J vs P (規律 vs 柔軟)
    const jpScore = (answers[10] + answers[11] + answers[12]) / 3;
    const jp = jpScore >= 3 ? 'J' : 'P';

    return `${ei}${sn}${tf}${jp}`;
}

/**
 * タイプから4軸パラメータを数値化 (-1 ~ 1)
 * @param {string} type - 4文字タイプ
 * @returns {Object} - 4軸パラメータ
 */
export function getPersonalityTraits(type) {
    const traits = {
        // 方向: 外向(1) ⇔ 内向(-1)
        direction: type[0] === 'E' ? 1 : -1,

        // 視点: 地上/現実(1) ⇔ 宇宙/抽象(-1)
        perspective: type[1] === 'S' ? 1 : -1,

        // 素材: 脳/論理(1) ⇔ 心/感情(-1)
        material: type[2] === 'T' ? 1 : -1,

        // 作用: 鎮静/秩序(1) ⇔ 覚醒/自由(-1)
        action: type[3] === 'J' ? 1 : -1
    };

    return traits;
}

/**
 * 詩的なタイプ名を返す
 * @param {string} type - 4文字タイプ
 * @returns {string} - 詩的な表現
 */
export function getPoeticName(type) {
    const names = {
        'INTJ': '孤独な戦略家',
        'INTP': '夢想する理論家',
        'ENTJ': '野心的な指揮官',
        'ENTP': '議論好きな発明家',
        'INFJ': '静かなる預言者',
        'INFP': '繊細な詩人',
        'ENFJ': 'カリスマの語り手',
        'ENFP': '自由な冒険家',
        'ISTJ': '誠実な管理者',
        'ISFJ': '心優しき守護者',
        'ESTJ': '厳格な執行者',
        'ESFJ': '社交的な世話焼き',
        'ISTP': '冷静な職人',
        'ISFP': '穏やかな芸術家',
        'ESTP': '大胆な起業家',
        'ESFP': '陽気なエンターテイナー'
    };

    return names[type] || '未知の探求者';
}

/**
 * 真逆のタイプ(Shadow)を返す
 * @param {string} type - 4文字タイプ
 * @returns {string} - 真逆のタイプ
 */
export function getShadowType(type) {
    const flip = {
        'E': 'I', 'I': 'E',
        'S': 'N', 'N': 'S',
        'T': 'F', 'F': 'T',
        'J': 'P', 'P': 'J'
    };

    return type.split('').map(char => flip[char]).join('');
}

/**
 * レーダーチャート用の6軸データを生成
 * @param {string} type - 4文字タイプ
 * @param {Object} answers - 回答データ
 * @returns {Object} - チャート用データ
 */
export function getRadarChartData(type, answers) {
    // Q1-3の平均
    const introversion = (answers[1] + answers[2] + answers[3]) / 3;

    // Q4-6の逆 (直感性)
    const intuition = 5 - ((answers[4] + answers[5] + answers[6]) / 3) + 1;

    // Q7-9の平均 (論理性)
    const logic = (answers[7] + answers[8] + answers[9]) / 3;

    // Q10-12の平均 (規律性)
    const discipline = (answers[10] + answers[11] + answers[12]) / 3;

    // 追加軸: 独創性 (N + P の要素)
    const creativity = type.includes('N') && type.includes('P') ? 4.5 :
        type.includes('N') || type.includes('P') ? 3.5 : 2.5;

    // 追加軸: 共感性 (F の要素)
    const empathy = type.includes('F') ? 4 : 2;

    return {
        labels: ['内向性', '直感性', '論理性', '規律性', '独創性', '共感性'],
        values: [introversion, intuition, logic, discipline, creativity, empathy]
    };
}
