// 実在する名著データベース
// 4軸パラメータ:
// direction: 外向(1) ⇔ 内向(-1)
// perspective: 地上/現実(1) ⇔ 宇宙/抽象(-1)
// material: 脳/論理(1) ⇔ 心/感情(-1)
// action: 鎮静/秩序(1) ⇔ 覚醒/自由(-1)

export const books = [
    // --- 内向・抽象・論理・覚醒 (INTJ/INTP的) ---
    {
        id: 'b001',
        title: '三体',
        author: '劉慈欣',
        genre: 'story',
        description: '物理学者の父を殺された女性科学者が、巨大なパラボラアンテナを通じて宇宙に向けて発信したメッセージ。それが全人類の運命を変えることになる。圧倒的なスケールで描かれる中国SFの金字塔。',
        traits: { direction: -0.8, perspective: -1.0, material: 0.9, action: -0.7 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B07T3H4L5L'
    },
    {
        id: 'b002',
        title: '利己的な遺伝子',
        author: 'リチャード・ドーキンス',
        genre: 'practical',
        description: '私たちは遺伝子の乗り物に過ぎないのか？生物学の常識を覆し、世界中で論争を巻き起こした衝撃の書。冷徹な論理で生命の謎に迫る。',
        traits: { direction: -0.5, perspective: -0.8, material: 1.0, action: -0.5 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B079Z2H8QJ'
    },

    // --- 内向・抽象・感情・鎮静 (INFJ/INFP的) ---
    {
        id: 'b003',
        title: '夜と霧',
        author: 'ヴィクトール・E・フランクル',
        genre: 'practical',
        description: 'ナチス強制収容所という極限状態において、人は何に絶望し、何に希望を見出すのか。精神科医である著者が自らの体験を綴った、魂の記録。',
        traits: { direction: -0.9, perspective: -0.7, material: -0.8, action: 0.8 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B009S088U8'
    },
    {
        id: 'b004',
        title: '星の王子さま',
        author: 'サン＝テグジュペリ',
        genre: 'story',
        description: '「大切なものは、目に見えない」。砂漠に不時着した飛行士と、遠い星から来た王子の対話。子供の心を忘れてしまった大人たちへ贈る、永遠の名作。',
        traits: { direction: -0.7, perspective: -1.0, material: -1.0, action: 0.5 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B009IXL0S6'
    },

    // --- 外向・現実・論理・秩序 (ESTJ/ENTJ的) ---
    {
        id: 'b005',
        title: '影響力の武器',
        author: 'ロバート・B・チャルディーニ',
        genre: 'practical',
        description: '人はなぜ動かされるのか？社会心理学の知見から、承諾誘導の6つの法則を解き明かす。ビジネスパーソン必須の説得の科学。',
        traits: { direction: 0.8, perspective: 0.7, material: 0.9, action: 0.9 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B00L9R8Y8W'
    },
    {
        id: 'b006',
        title: '7つの習慣',
        author: 'スティーブン・R・コヴィー',
        genre: 'practical',
        description: '人格主義に基づき、真の成功と幸福を手に入れるための原則を説く。全世界で4000万部以上売れた、自己啓発書の決定版。',
        traits: { direction: 0.6, perspective: 0.5, material: 0.7, action: 1.0 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B00H8X0D08'
    },

    // --- 外向・現実・感情・自由 (ESFP/ESTP的) ---
    {
        id: 'b007',
        title: '深夜特急',
        author: '沢木耕太郎',
        genre: 'story',
        description: 'インドのデリーからイギリスのロンドンまで、乗り合いバスで行く。若き日の著者の熱気と興奮、そして旅の孤独を描いた青春のバイブル。',
        traits: { direction: 0.9, perspective: 0.6, material: -0.5, action: -0.9 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B009S06K70'
    },
    {
        id: 'b008',
        title: 'アルケミスト',
        author: 'パウロ・コエーリョ',
        genre: 'story',
        description: '羊飼いの少年サンチャゴは、アンダルシアの平原からエジプトのピラミッドへ旅に出る。「前兆」に従い、夢を生きることの素晴らしさを描く物語。',
        traits: { direction: 0.7, perspective: -0.6, material: -0.7, action: -0.8 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B009S06K70'
    },

    // --- その他バランス型など ---
    {
        id: 'b009',
        title: '嫌われる勇気',
        author: '岸見一郎 / 古賀史健',
        genre: 'practical',
        description: 'アドラー心理学を対話形式で解説。「トラウマ」を否定し、他者の期待を満たすために生きるのではないと説く、劇薬のような一冊。',
        traits: { direction: -0.4, perspective: 0.2, material: 0.8, action: 0.6 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B00H7R2M70'
    },
    {
        id: 'b010',
        title: 'ノルウェイの森',
        author: '村上春樹',
        genre: 'story',
        description: '限りない喪失と再生を描いた、究極の恋愛小説。1960年代後半の東京を舞台に、主人公ワタナベと直子、緑の人間模様が交錯する。',
        traits: { direction: -0.8, perspective: -0.4, material: -0.9, action: 0.3 },
        amazonUrl: 'https://www.amazon.co.jp/dp/B009S06K70'
    }
];
