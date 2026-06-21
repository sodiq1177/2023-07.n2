// JLPT N2 2023 July - Flashcard & Test App

let currentCards = [...flashcardData];
let currentIndex = 0;
let isFlipped = false;
let stats = JSON.parse(localStorage.getItem('jlpt_stats') || '{"easy":0,"ok":0,"hard":0,"testScore":0,"testAttempts":0}');

// Test data
const testQuestions = [
  // 問題1: 漢字の読み方
  { type: "問題1：漢字の読み方", q: "バスの <span class='highlight'>運賃</span> を払う。", options: ["うんしん", "うんちん", "うんにん", "うんりん"], answer: 1 },
  { type: "問題1：漢字の読み方", q: "髪が <span class='highlight'>乱れて</span> しまった。", options: ["くずれて", "あれて", "あばれて", "みだれて"], answer: 3 },
  { type: "問題1：漢字の読み方", q: "正しい泳ぎ方の <span class='highlight'>模範</span> を示した。", options: ["もうばん", "もうはん", "もばん", "もはん"], answer: 3 },
  { type: "問題1：漢字の読み方", q: "思った以上に <span class='highlight'>険しかった</span>。", options: ["けわしかった", "まぶしかった", "おそろしかった", "はげしかった"], answer: 0 },
  { type: "問題1：漢字の読み方", q: "<span class='highlight'>握手</span> していた人は誰ですか。", options: ["おくしゅ", "はくしゅ", "あくしゅ", "ほくしゅ"], answer: 2 },

  // 問題2: 漢字で書く
  { type: "問題2：漢字で書く", q: "その <span class='highlight'>ぬの</span> を広げてください。", options: ["布", "袋", "衣", "帯"], answer: 0 },
  { type: "問題2：漢字で書く", q: "<span class='highlight'>ふくし</span> の仕事に就く予定です。", options: ["福支", "副祉", "福祉", "副支"], answer: 2 },
  { type: "問題2：漢字で書く", q: "ごみが <span class='highlight'>すてられて</span> いる。", options: ["拾てられて", "投てられて", "採てられて", "捨てられて"], answer: 3 },
  { type: "問題2：漢字で書く", q: "<span class='highlight'>きげん</span> がよいときに頼もう。", options: ["機兼", "機嫌", "気嫌", "気兼"], answer: 1 },
  { type: "問題2：漢字で書く", q: "会社にとって大きな <span class='highlight'>そんしつ</span> だ。", options: ["消失", "隕失", "消失", "損失"], answer: 3 },

  // 問題3: 語形成
  { type: "問題3：語形成", q: "質問に（　）答の人もいた。", options: ["無", "空", "欠", "失"], answer: 0 },
  { type: "問題3：語形成", q: "日本（　）の家がたくさん載っている。", options: ["気", "類", "風", "状"], answer: 2 },
  { type: "問題3：語形成", q: "壁（　）のソファーに座る。", options: ["所（ところ）", "際（ぎわ）", "辺（へん）", "域（いき）"], answer: 1 },

  // 問題4: 文脈に合う語彙
  { type: "問題4：文脈に合う語彙", q: "冷たい人だとよく（　）される。", options: ["観測", "誤解", "決意", "承認"], answer: 1 },
  { type: "問題4：文脈に合う語彙", q: "売れ行きが（　）なので生産量を増やす。", options: ["温厚", "円満", "好調", "適切"], answer: 2 },
  { type: "問題4：文脈に合う語彙", q: "本当に（　）部下だと思う。", options: ["頼もしい", "たくましい", "輝かしい", "親しい"], answer: 0 },
  { type: "問題4：文脈に合う語彙", q: "食費を（　）するために外食をしない。", options: ["減量", "省略", "短縮", "節約"], answer: 3 },
  { type: "問題4：文脈に合う語彙", q: "もうかる話にすぐ（　）のはやめよう。", options: ["駆け込む", "触れ合う", "寄りかかる", "飛びつく"], answer: 3 },
  { type: "問題4：文脈に合う語彙", q: "仕事内容の（　）があったので応募した。", options: ["催促", "入社", "求人", "収集"], answer: 2 },
  { type: "問題4：文脈に合う語彙", q: "私のいないところで（　）と悪口を言っていた。", options: ["うとうと", "こそこそ", "ぶるぶる", "じろじろ"], answer: 1 },

  // 問題5: 類義語
  { type: "問題5：類義語", q: "建物を壊すには <span class='highlight'>惜しい</span>。", options: ["危ない", "もったいない", "めんどくさい", "難しい"], answer: 1 },
  { type: "問題5：類義語", q: "<span class='highlight'>テンポ</span> を合わせてください。", options: ["長さ", "高さ", "大きさ", "速さ"], answer: 3 },
  { type: "問題5：類義語", q: "ニュースは <span class='highlight'>たちまち</span> 広まった。", options: ["すぐに", "次第に", "確かに", "意外に"], answer: 0 },
  { type: "問題5：類義語", q: "研究の <span class='highlight'>概要</span> を述べる。", options: ["詳しい内容", "大体の内容", "主な目的", "最終的な目的"], answer: 1 },
  { type: "問題5：類義語", q: "あのときは <span class='highlight'>油断</span> していた。", options: ["慌てていた", "何も覚えていなかった", "気を付けていなかった", "迷っていた"], answer: 2 },

  // 問題6: 用法
  { type: "問題6：用法（正しい使い方）", q: "「早期」の正しい使い方はどれ？", options: ["夏休みの早期は旅行をした", "早期の飛行機の便", "一人暮らしの早期は苦労した", "病気を早期の段階で見つける"], answer: 3 },
  { type: "問題6：用法（正しい使い方）", q: "「偉大」の正しい使い方はどれ？", options: ["偉大なスピーチ", "偉大な画家がたくさんいる", "偉大な家です", "偉大な馬を飼っている"], answer: 1 },
  { type: "問題6：用法（正しい使い方）", q: "「続出」の正しい使い方はどれ？", options: ["けがをする人が続出している", "せきが続出して眠れない", "テレビに年間続出している", "商品が続出するらしい"], answer: 0 },
  { type: "問題6：用法（正しい使い方）", q: "「さまたげる」の正しい使い方はどれ？", options: ["テープでさまたげた", "値上げをさまたげた", "進行をさまたげないで", "事故をさまたげる"], answer: 2 },

  // 問題7: 文法
  { type: "問題7：文法", q: "物語が進む（　）心理が変化していく。", options: ["としても", "とはいえ", "につれて", "にあたって"], answer: 2 },
  { type: "問題7：文法", q: "味もサービスも最低だった。（　）行きたくない。", options: ["二度と", "必ずしも", "まさか", "あまりに"], answer: 0 },
  { type: "問題7：文法", q: "メダルは獲得できなかった（　）素晴らしい演技を見せた。", options: ["からといって", "どころか", "あげくに", "ものの"], answer: 3 },
  { type: "問題7：文法", q: "起きた（　）、パジャマの姿のままだった。", options: ["ところだったら", "ところらしく", "ばかりだったら", "ばかりらしく"], answer: 3 },
  { type: "問題7：文法", q: "避難訓練を（　）、火災時に行動できる。", options: ["しておくには", "しているとしても", "しておくことで", "しているかという"], answer: 2 },
  { type: "問題7：文法", q: "映画館は大学以来、約５年（　）だ。", options: ["まで", "など", "きり", "ぶり"], answer: 3 },
  { type: "問題7：文法", q: "睡眠時間を削ることは機会を奪うことに（　）のだ。", options: ["ほかならない", "欠かせない", "すぎない", "限らない"], answer: 0 },
  { type: "問題7：文法", q: "連絡してほしい（　）。", options: ["ことになりました", "とのことでした", "と助かるのですが", "ようにしてください"], answer: 1 },
  { type: "問題7：文法", q: "事前に確認しておく（　）。", options: ["しかなかった", "ほどではなかった", "べきだった", "せいだった"], answer: 2 },
  { type: "問題7：文法", q: "応援して（　）。ありがとうございました。", options: ["くださったおかげです", "いただいたおかげです", "くださったことだと思います", "いただいたことだと思います"], answer: 0 },

  // 問題9: 読解（穴埋め）
  { type: "問題9：文章の穴埋め", q: "香木（　）そのような名前の木がもともと存在するわけではない。", options: ["のように", "のほかに", "といっても", "であっても"], answer: 2 },
  { type: "問題9：文章の穴埋め", q: "人工的に生産できないため貴重なものと（　）。", options: ["しておきます", "されています", "しておく点です", "されている点です"], answer: 1 },
  { type: "問題9：文章の穴埋め", q: "需要が増えればなくなるおそれも。（　）弟子を受け入れない。", options: ["一方", "ちなみに", "ところが", "そのため"], answer: 3 },

  // 問題10: 読解
  { type: "問題10：読解", q: "相手に期待しなければどうなるか？", options: ["相手が変わる", "相手も変えられる", "相手といい関係が築ける", "穏やかな気持ちでいられる"], answer: 3 },
  { type: "問題10：読解", q: "メールで伝えたいことは？（休憩室について）", options: ["テーブルを増やしてほしい", "昼休みに会議室を休憩室として使いたい", "昼食の人に優先使用させたい", "昼休み以外も会議室で休憩したい"], answer: 1 },
  { type: "問題10：読解", q: "生物の競争について筆者の考えは？", options: ["別の環境で生き残れる", "自らを変化させないと勝てない", "場所を変えず変化する", "すべてで勝たないと生き残れない"], answer: 0 },
];

let currentQuestion = 0;
let testScore = 0;
let answered = false;

// ===== FLASHCARD FUNCTIONS =====

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    event.target.classList.add('active');
    if (section === 'stats') updateStats();
}

function filterCards(type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    if (type === 'all') {
        currentCards = [...flashcardData];
    } else {
        currentCards = flashcardData.filter(c => c.type === type);
    }
    currentIndex = 0;
    updateCard();
}

function updateCard() {
    if (currentCards.length === 0) return;
    
    const card = currentCards[currentIndex];
    document.getElementById('cardType').textContent = 
        card.type === 'goi' ? '語彙' : card.type === 'kanji' ? '漢字' : '文法';
    document.getElementById('cardFront').textContent = card.front;
    document.getElementById('cardReading').textContent = card.reading;
    document.getElementById('cardMeaning').textContent = card.meaning;
    document.getElementById('cardExample').textContent = card.example;
    document.getElementById('cardExampleUz').textContent = card.exampleUz;
    document.getElementById('currentCardNum').textContent = currentIndex + 1;
    document.getElementById('totalCards').textContent = currentCards.length;
    
    // Reset flip
    document.getElementById('flashcard').classList.remove('flipped');
    isFlipped = false;
}

function flipCard() {
    const card = document.getElementById('flashcard');
    card.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % currentCards.length;
    updateCard();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
    updateCard();
}

function shuffleCards() {
    for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
    }
    currentIndex = 0;
    updateCard();
}

function rateCard(rating) {
    stats[rating]++;
    localStorage.setItem('jlpt_stats', JSON.stringify(stats));
    nextCard();
}

// ===== TEST FUNCTIONS =====

function loadQuestion() {
    if (currentQuestion >= testQuestions.length) {
        showResult();
        return;
    }
    
    answered = false;
    document.getElementById('nextQuestionBtn').disabled = true;
    
    const q = testQuestions[currentQuestion];
    document.getElementById('questionType').textContent = q.type;
    document.getElementById('questionText').innerHTML = q.q;
    document.getElementById('testProgress').textContent = `Savol: ${currentQuestion + 1}/${testQuestions.length}`;
    document.getElementById('testScore').textContent = `Ball: ${testScore}`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = `${i + 1}. ${opt}`;
        btn.onclick = () => selectAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;
    
    const q = testQuestions[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    if (index === q.answer) {
        buttons[index].classList.add('correct');
        testScore++;
        document.getElementById('testScore').textContent = `Ball: ${testScore}`;
    } else {
        buttons[index].classList.add('wrong');
        buttons[q.answer].classList.add('correct');
    }
    
    document.getElementById('nextQuestionBtn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= testQuestions.length) {
        showResult();
    } else {
        loadQuestion();
    }
}

function showResult() {
    document.getElementById('testQuestion').style.display = 'none';
    document.getElementById('testResult').style.display = 'block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    const percent = Math.round((testScore / testQuestions.length) * 100);
    let emoji, message;
    
    if (percent >= 80) { emoji = '🎉'; message = 'Ajoyib! Siz N2 darajasini o\'tishga tayyor!'; }
    else if (percent >= 60) { emoji = '👍'; message = 'Yaxshi! O\'tish balliga yetdingiz!'; }
    else if (percent >= 40) { emoji = '📚'; message = 'Yaxshi harakat! Ko\'proq mashq qiling.'; }
    else { emoji = '💪'; message = 'Davom eting! Flashcardlarni takrorlang.'; }
    
    document.getElementById('resultTitle').textContent = `${emoji} ${percent}% (${testScore}/${testQuestions.length})`;
    document.getElementById('resultDetails').innerHTML = `
        <p style="margin:10px 0;font-size:1.2em;">${message}</p>
        <p style="color:#888;">O'tish balli: 60% (${Math.ceil(testQuestions.length * 0.6)} savol)</p>
    `;
    
    // Save stats
    stats.testScore = percent;
    stats.testAttempts++;
    localStorage.setItem('jlpt_stats', JSON.stringify(stats));
}

function resetTest() {
    currentQuestion = 0;
    testScore = 0;
    answered = false;
    document.getElementById('testQuestion').style.display = 'block';
    document.getElementById('testResult').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = '';
    document.getElementById('nextQuestionBtn').disabled = true;
    loadQuestion();
}

// ===== STATS FUNCTIONS =====

function updateStats() {
    document.getElementById('statTotal').textContent = flashcardData.length;
    document.getElementById('statEasy').textContent = stats.easy;
    document.getElementById('statOk').textContent = stats.ok;
    document.getElementById('statHard').textContent = stats.hard;
    document.getElementById('statTestScore').textContent = stats.testScore + '%';
    document.getElementById('statTestAttempts').textContent = stats.testAttempts;
}

function resetStats() {
    stats = { easy: 0, ok: 0, hard: 0, testScore: 0, testAttempts: 0 };
    localStorage.setItem('jlpt_stats', JSON.stringify(stats));
    updateStats();
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    const flashcardSection = document.getElementById('flashcards');
    if (flashcardSection.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    }
});

// ===== INIT =====
updateCard();
loadQuestion();
