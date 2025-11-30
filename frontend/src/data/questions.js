// 12問の質問データ - 性格診断用
export const questions = [
  {
    id: 1,
    text: '疲れた金曜日の夜は、誰かと飲みに行くより、一人で趣味に没頭して回復したい。',
    dimension: 'EI', // E(外向) vs I(内向)
    direction: 'I' // 高スコア = I(内向)
  },
  {
    id: 2,
    text: '会話の中では、自分から話題を提供するよりも、聞き役に回るほうが居心地が良い。',
    dimension: 'EI',
    direction: 'I'
  },
  {
    id: 3,
    text: '新しい趣味を始めるときは、まずネットや本でじっくり情報を集めてから動きたい。',
    dimension: 'EI',
    direction: 'I'
  },
  {
    id: 4,
    text: '家電の説明書は、感覚で操作するのではなく、最初から順に読んで理解したい。',
    dimension: 'SN', // S(現実) vs N(直感)
    direction: 'S' // 高スコア = S(現実)
  },
  {
    id: 5,
    text: '道案内をするときは、「あの高いビルの方向」と言うより、「300m直進して右」と具体的に伝える方が得意だ。',
    dimension: 'SN',
    direction: 'S'
  },
  {
    id: 6,
    text: '「もしも宝くじが当たったら」という話より、現実的な節約や貯金の話のほうが建設的で好きだ。',
    dimension: 'SN',
    direction: 'S'
  },
  {
    id: 7,
    text: '悩み相談を受けた時、まずは「共感」するよりも「解決策」を提案したくなる。',
    dimension: 'TF', // T(論理) vs F(感情)
    direction: 'T' // 高スコア = T(論理)
  },
  {
    id: 8,
    text: '買い物をするときは、ブランドのストーリー性よりも、スペックやコスパの数値を重視する。',
    dimension: 'TF',
    direction: 'T'
  },
  {
    id: 9,
    text: '議論の場では、みんなの空気を読むことよりも、正しい結論を出すことのほうが優先されるべきだと思う。',
    dimension: 'TF',
    direction: 'T'
  },
  {
    id: 10,
    text: '旅行のスケジュールは、空白の時間があるよりも、きっちり埋まっている方が安心する。',
    dimension: 'JP', // J(規律) vs P(柔軟)
    direction: 'J' // 高スコア = J(規律)
  },
  {
    id: 11,
    text: '夏休みの宿題や仕事のタスクは、期限ギリギリではなく、前もって計画的に終わらせるタイプだ。',
    dimension: 'JP',
    direction: 'J'
  },
  {
    id: 12,
    text: '急な予定変更やサプライズは、ワクワクするよりも、ペースを乱されるのであまり好きではない。',
    dimension: 'JP',
    direction: 'J'
  }
];

// スライダーのラベル
export const sliderLabels = {
  1: '全くそう思わない',
  2: 'あまりそう思わない',
  3: 'どちらとも言えない',
  4: 'ややそう思う',
  5: '非常にそう思う'
};
