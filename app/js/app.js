// ===== JLPT N2 2023 Study App =====

// State
let currentExam = 'july';
let currentSection = 'moji-goi';
let currentMode = 'flashcard';
let currentCardIndex = 0;
let currentFilter = 'all';
let currentTestType = 'meaning';
let testCorrect = 0;
let testTotal = 0;
let isFlipped = false;

// Storage keys
const STORAGE_KEY = 'jlpt-n2-2023-progress';

// Get progress from localStorage
function getProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markCard(id, status) {
  const progress = getProgress();
  progress[id] = status;
  saveProgress(progress);
}

function getCardStatus(id) {
  const progress = getProgress();
  return progress[id] || 'new';
}

// Get current data based on exam and section
function getCurrentData() {
  if (currentExam === 'july') {
    if (currentSection === 'moji-goi') return july2023MojiGoi;
    if (currentSection === 'bunpo') return july2023Bunpo;
    if (currentSection === 'dokkai') return july2023Dokkai;
  } else {
    if (currentSection === 'moji-goi') return dec2023MojiGoi;
    if (currentSection === 'bunpo') return dec2023Bunpo;
    if (currentSection === 'dokkai') return dec2023Dokkai;
  }
  return [];
}

// Filter data based on known/unknown status
function getFilteredData() {
  const data = getCurrentData();
  if (currentFilter === 'all') return data;
  if (currentFilter === 'known') return data.filter(item => getCardStatus(item.id) === 'known');
  if (currentFilter === 'unknown') return data.filter(item => getCardStatus(item.id) === 'unknown');
  return data;
}


// ===== FLASHCARD FUNCTIONS =====

function renderFlashcard() {
  const data = getFilteredData();
  const flashcard = document.getElementById('flashcard');
  const kanjiDisplay = document.getElementById('kanji-display');
  const backContent = document.getElementById('back-content');
  const currentCardEl = document.getElementById('current-card');
  const totalCardsEl = document.getElementById('total-cards');

  totalCardsEl.textContent = data.length;

  if (data.length === 0) {
    kanjiDisplay.textContent = 'Ma\'lumot yo\'q';
    kanjiDisplay.style.fontSize = '1.2rem';
    backContent.innerHTML = '';
    currentCardEl.textContent = '0';
    return;
  }

  if (currentCardIndex >= data.length) currentCardIndex = 0;
  if (currentCardIndex < 0) currentCardIndex = data.length - 1;

  currentCardEl.textContent = currentCardIndex + 1;
  const item = data[currentCardIndex];

  // Reset flip
  flashcard.classList.remove('flipped');
  isFlipped = false;

  // Front side
  if (currentSection === 'moji-goi') {
    kanjiDisplay.textContent = item.kanji;
    kanjiDisplay.style.fontSize = '3.5rem';
  } else if (currentSection === 'bunpo') {
    kanjiDisplay.textContent = item.grammar;
    kanjiDisplay.style.fontSize = '2rem';
  } else {
    kanjiDisplay.textContent = item.title;
    kanjiDisplay.style.fontSize = '1.2rem';
  }

  // Back side
  backContent.innerHTML = generateBackContent(item);
}

function generateBackContent(item) {
  if (currentSection === 'moji-goi') {
    return `
      <div class="info-row">
        <div class="info-label">O'qilishi</div>
        <div class="info-value big">${item.reading}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Ma'nosi (UZ)</div>
        <div class="info-value">${item.meaning}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Ma'nosi (JP)</div>
        <div class="info-value">${item.meaningJP}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Ishlatilishi</div>
        <div class="info-value">${item.usage}<br><small style="color:#888">${item.usageTranslation}</small></div>
      </div>
      <div class="info-row">
        <div class="info-label">Misol</div>
        <div class="info-value">${item.example}</div>
      </div>
      <div class="info-row">
        <div class="info-label">O'xshash so'zlar</div>
        <div class="info-value">${item.similar.join(', ')}</div>
      </div>
    `;
  } else if (currentSection === 'bunpo') {
    return `
      <div class="info-row">
        <div class="info-label">Ma'nosi (UZ)</div>
        <div class="info-value">${item.meaning}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Ma'nosi (JP)</div>
        <div class="info-value">${item.meaningJP}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Struktura</div>
        <div class="info-value">${item.structure}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Misol</div>
        <div class="info-value">${item.example}<br><small style="color:#888">${item.exampleTranslation}</small></div>
      </div>
      <div class="info-row">
        <div class="info-label">O'xshash grammatika</div>
        <div class="info-value">${item.similar.join(', ')}</div>
      </div>
    `;
  } else {
    // Dokkai
    let html = `
      <div class="info-row">
        <div class="info-label">${item.title}</div>
        <div class="info-value" style="font-size:0.8rem; line-height:1.7">${item.passage}</div>
      </div>
    `;
    item.questions.forEach((q, i) => {
      html += `
        <div class="info-row">
          <div class="info-label">Savol ${i + 1}</div>
          <div class="info-value">${q.question}</div>
          <div class="info-value" style="color:#2ecc71; margin-top:4px">Javob: ${q.options[q.correct]}</div>
          <div class="info-value" style="color:#888; font-size:0.8rem">${q.explanation}</div>
        </div>
      `;
    });
    if (item.keyVocab) {
      html += `
        <div class="info-row">
          <div class="info-label">Kalit so'zlar</div>
          <div class="info-value" style="font-size:0.8rem">${item.keyVocab.join('<br>')}</div>
        </div>
      `;
    }
    return html;
  }
}


// ===== TEST FUNCTIONS =====

function generateTest() {
  const data = getCurrentData();
  if (data.length < 4) {
    document.getElementById('test-container').innerHTML = '<p style="text-align:center;color:#888">Test uchun kamida 4 ta element kerak.</p>';
    return;
  }

  const questionEl = document.getElementById('test-question');
  const optionsEl = document.getElementById('test-options');
  const feedbackEl = document.getElementById('test-feedback');
  const nextBtn = document.getElementById('test-next-btn');

  feedbackEl.className = 'test-feedback';
  feedbackEl.style.display = 'none';
  nextBtn.className = 'test-next-btn';

  // Pick random item
  const randomIndex = Math.floor(Math.random() * data.length);
  const correctItem = data[randomIndex];

  // Generate question based on section and test type
  let question = '';
  let correctAnswer = '';
  let options = [];

  if (currentSection === 'moji-goi') {
    if (currentTestType === 'meaning') {
      question = correctItem.kanji;
      correctAnswer = correctItem.meaning;
      options = getRandomOptions(data, randomIndex, 'meaning');
    } else if (currentTestType === 'reading') {
      question = correctItem.kanji;
      correctAnswer = correctItem.reading;
      options = getRandomOptions(data, randomIndex, 'reading');
    } else if (currentTestType === 'kanji') {
      question = correctItem.reading;
      correctAnswer = correctItem.kanji;
      options = getRandomOptions(data, randomIndex, 'kanji');
    } else if (currentTestType === 'usage') {
      question = correctItem.kanji;
      correctAnswer = correctItem.usage;
      options = getRandomOptions(data, randomIndex, 'usage');
    }
  } else if (currentSection === 'bunpo') {
    if (currentTestType === 'meaning') {
      question = correctItem.grammar;
      correctAnswer = correctItem.meaning;
      options = getRandomOptions(data, randomIndex, 'meaning');
    } else if (currentTestType === 'reading') {
      question = correctItem.meaning;
      correctAnswer = correctItem.grammar;
      options = getRandomOptions(data, randomIndex, 'grammar');
    } else if (currentTestType === 'kanji') {
      question = correctItem.grammar;
      correctAnswer = correctItem.structure;
      options = getRandomOptions(data, randomIndex, 'structure');
    } else if (currentTestType === 'usage') {
      question = correctItem.grammar;
      correctAnswer = correctItem.example;
      options = getRandomOptions(data, randomIndex, 'example');
    }
  } else {
    // Dokkai - use questions from the passage
    const passage = data[Math.floor(Math.random() * data.length)];
    const q = passage.questions[Math.floor(Math.random() * passage.questions.length)];
    question = q.question;
    questionEl.style.fontSize = '1rem';
    optionsEl.innerHTML = '';
    
    q.options.forEach((opt, i) => {
      const optEl = document.createElement('div');
      optEl.className = 'test-option';
      optEl.textContent = opt;
      optEl.addEventListener('click', () => handleDokkaiAnswer(optEl, i, q.correct, q.explanation));
      optionsEl.appendChild(optEl);
    });
    
    questionEl.textContent = question;
    return;
  }

  questionEl.style.fontSize = '1.8rem';
  questionEl.textContent = question;

  // Shuffle options
  const correctIndex = Math.floor(Math.random() * 4);
  options.splice(correctIndex, 0, correctAnswer);
  if (options.length > 4) options = options.slice(0, 4);

  optionsEl.innerHTML = '';
  options.forEach((opt, i) => {
    const optEl = document.createElement('div');
    optEl.className = 'test-option';
    optEl.textContent = opt;
    optEl.addEventListener('click', () => handleAnswer(optEl, i, correctIndex, correctItem));
    optionsEl.appendChild(optEl);
  });
}

function getRandomOptions(data, excludeIndex, field) {
  const options = [];
  const indices = [];
  while (indices.length < 3) {
    const idx = Math.floor(Math.random() * data.length);
    if (idx !== excludeIndex && !indices.includes(idx)) {
      indices.push(idx);
      options.push(data[idx][field]);
    }
  }
  return options;
}

function handleAnswer(clickedEl, clickedIndex, correctIndex, item) {
  const allOptions = document.querySelectorAll('.test-option');
  allOptions.forEach(el => el.style.pointerEvents = 'none');

  const feedbackEl = document.getElementById('test-feedback');
  const nextBtn = document.getElementById('test-next-btn');

  testTotal++;

  if (clickedIndex === correctIndex) {
    clickedEl.classList.add('correct');
    feedbackEl.className = 'test-feedback show correct';
    feedbackEl.textContent = 'To\'g\'ri!';
    testCorrect++;
  } else {
    clickedEl.classList.add('wrong');
    allOptions[correctIndex].classList.add('correct');
    feedbackEl.className = 'test-feedback show wrong';
    feedbackEl.textContent = `Noto'g'ri! To'g'ri javob: ${allOptions[correctIndex].textContent}`;
    markCard(item.id, 'unknown');
  }

  document.getElementById('test-correct').textContent = testCorrect;
  document.getElementById('test-total').textContent = testTotal;
  nextBtn.className = 'test-next-btn show';
}

function handleDokkaiAnswer(clickedEl, clickedIndex, correctIndex, explanation) {
  const allOptions = document.querySelectorAll('.test-option');
  allOptions.forEach(el => el.style.pointerEvents = 'none');

  const feedbackEl = document.getElementById('test-feedback');
  const nextBtn = document.getElementById('test-next-btn');

  testTotal++;

  if (clickedIndex === correctIndex) {
    clickedEl.classList.add('correct');
    feedbackEl.className = 'test-feedback show correct';
    feedbackEl.textContent = 'To\'g\'ri! ' + explanation;
    testCorrect++;
  } else {
    clickedEl.classList.add('wrong');
    allOptions[correctIndex].classList.add('correct');
    feedbackEl.className = 'test-feedback show wrong';
    feedbackEl.textContent = 'Noto\'g\'ri! ' + explanation;
  }

  document.getElementById('test-correct').textContent = testCorrect;
  document.getElementById('test-total').textContent = testTotal;
  nextBtn.className = 'test-next-btn show';
}


// ===== STATS FUNCTIONS =====

function renderStats() {
  const progress = getProgress();
  const allData = [
    ...july2023MojiGoi, ...july2023Bunpo, ...july2023Dokkai,
    ...dec2023MojiGoi, ...dec2023Bunpo, ...dec2023Dokkai
  ];

  let totalKnown = 0;
  let totalUnknown = 0;
  let totalItems = allData.length;

  allData.forEach(item => {
    if (progress[item.id] === 'known') totalKnown++;
    else if (progress[item.id] === 'unknown') totalUnknown++;
  });

  // Overview
  document.getElementById('stats-overview').innerHTML = `
    <div class="stat-card known">
      <div class="stat-number">${totalKnown}</div>
      <div class="stat-label">Bildim</div>
    </div>
    <div class="stat-card unknown">
      <div class="stat-number">${totalUnknown}</div>
      <div class="stat-label">Bilmadim</div>
    </div>
    <div class="stat-card total">
      <div class="stat-number">${totalItems}</div>
      <div class="stat-label">Jami</div>
    </div>
  `;

  // Sections
  const sections = [
    { name: 'July - 文字語彙', data: july2023MojiGoi },
    { name: 'July - 文法', data: july2023Bunpo },
    { name: 'July - 読解', data: july2023Dokkai },
    { name: 'Dec - 文字語彙', data: dec2023MojiGoi },
    { name: 'Dec - 文法', data: dec2023Bunpo },
    { name: 'Dec - 読解', data: dec2023Dokkai }
  ];

  let sectionsHtml = '';
  sections.forEach(sec => {
    let known = 0;
    sec.data.forEach(item => {
      if (progress[item.id] === 'known') known++;
    });
    const percent = sec.data.length > 0 ? Math.round((known / sec.data.length) * 100) : 0;

    sectionsHtml += `
      <div class="stats-section-item">
        <div class="stats-section-header">
          <span class="stats-section-name">${sec.name}</span>
          <span class="stats-section-percent">${known}/${sec.data.length} (${percent}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
  });

  document.getElementById('stats-sections').innerHTML = sectionsHtml;
}

// ===== EVENT LISTENERS =====

document.addEventListener('DOMContentLoaded', () => {
  // Exam tabs
  document.querySelectorAll('.exam-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.exam-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentExam = tab.dataset.exam;
      currentCardIndex = 0;
      refresh();
    });
  });

  // Section buttons
  document.querySelectorAll('.section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSection = btn.dataset.section;
      currentCardIndex = 0;
      refresh();
    });
  });

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      showView();
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentCardIndex = 0;
      renderFlashcard();
    });
  });

  // Test type buttons
  document.querySelectorAll('.test-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.test-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTestType = btn.dataset.test;
      testCorrect = 0;
      testTotal = 0;
      document.getElementById('test-correct').textContent = '0';
      document.getElementById('test-total').textContent = '0';
      generateTest();
    });
  });

  // Flashcard flip
  document.getElementById('flashcard').addEventListener('click', () => {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
  });

  // Navigation buttons
  document.getElementById('btn-next').addEventListener('click', () => {
    currentCardIndex++;
    renderFlashcard();
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    currentCardIndex--;
    renderFlashcard();
  });

  // Known/Unknown buttons
  document.getElementById('btn-known').addEventListener('click', () => {
    const data = getFilteredData();
    if (data.length > 0) {
      markCard(data[currentCardIndex].id, 'known');
      currentCardIndex++;
      renderFlashcard();
    }
  });

  document.getElementById('btn-unknown').addEventListener('click', () => {
    const data = getFilteredData();
    if (data.length > 0) {
      markCard(data[currentCardIndex].id, 'unknown');
      currentCardIndex++;
      renderFlashcard();
    }
  });

  // Test next button
  document.getElementById('test-next-btn').addEventListener('click', () => {
    generateTest();
  });

  // Reset buttons
  document.getElementById('reset-section-btn').addEventListener('click', () => {
    if (confirm('Bu bo\'lim progressini tozalaysizmi?')) {
      const data = getCurrentData();
      const progress = getProgress();
      data.forEach(item => delete progress[item.id]);
      saveProgress(progress);
      renderStats();
      renderFlashcard();
    }
  });

  document.getElementById('reset-all-btn').addEventListener('click', () => {
    if (confirm('HAMMA progressni tozalaysizmi?')) {
      localStorage.removeItem(STORAGE_KEY);
      renderStats();
      renderFlashcard();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (currentMode === 'flashcard') {
      if (e.key === 'ArrowRight') { currentCardIndex++; renderFlashcard(); }
      if (e.key === 'ArrowLeft') { currentCardIndex--; renderFlashcard(); }
      if (e.key === ' ') { document.getElementById('flashcard').click(); e.preventDefault(); }
      if (e.key === '1') { document.getElementById('btn-unknown').click(); }
      if (e.key === '2') { document.getElementById('btn-known').click(); }
    }
  });

  // Initial render
  refresh();
});

function showView() {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  if (currentMode === 'flashcard') {
    document.getElementById('flashcard-view').classList.add('active');
    renderFlashcard();
  } else if (currentMode === 'test') {
    document.getElementById('test-view').classList.add('active');
    generateTest();
  } else {
    document.getElementById('stats-view').classList.add('active');
    renderStats();
  }
}

function refresh() {
  showView();
}
