// ===== JLPT N2 2023 Study App =====
const STORE_KEY = 'jlpt-n2-2023-progress';
let state = {exam:'july', section:'moji', mode:'flashcard', filter:'all', testType:'meaning', cardIdx:0, testOk:0, testAll:0};

function getProgress(){return JSON.parse(localStorage.getItem(STORE_KEY)||'{}');}
function saveProgress(p){localStorage.setItem(STORE_KEY, JSON.stringify(p));}
function mark(id,s){const p=getProgress();p[id]=s;saveProgress(p);}
function status(id){return getProgress()[id]||'new';}

function getData(){
  if(state.exam==='july'){
    if(state.section==='moji') return july2023MojiGoi;
    if(state.section==='bunpo') return july2023Bunpo;
    return july2023Dokkai;
  } else {
    if(state.section==='moji') return dec2023MojiGoi;
    if(state.section==='bunpo') return dec2023Bunpo;
    return dec2023Dokkai;
  }
}

function getFiltered(){
  const d=getData();
  if(state.filter==='all') return d;
  if(state.filter==='known') return d.filter(i=>status(i.id)==='known');
  return d.filter(i=>status(i.id)==='unknown');
}

function getId(item){return item.id;}

// ===== RENDER FLASHCARD =====
function renderCard(){
  const data=getFiltered();
  const card=document.getElementById('card');
  const front=document.getElementById('card-front');
  const back=document.getElementById('card-back');
  document.getElementById('counter').textContent=data.length?`${state.cardIdx+1}/${data.length}`:'0/0';
  card.classList.remove('flipped');

  if(!data.length){front.innerHTML='<div class="main-text" style="font-size:1.2rem">Ma\'lumot yo\'q</div>';back.innerHTML='';return;}
  if(state.cardIdx>=data.length) state.cardIdx=0;
  if(state.cardIdx<0) state.cardIdx=data.length-1;

  const item=data[state.cardIdx];

  if(state.section==='moji'){
    front.innerHTML=`<div class="main-text">${item.kanji}</div><div class="sub-text">${item.category}</div><div class="hint">Bosing → to'liq ma'lumot</div>`;
    back.innerHTML=mojiBack(item);
  } else if(state.section==='bunpo'){
    front.innerHTML=`<div class="main-text" style="font-size:2rem">${item.grammar}</div><div class="sub-text">${item.category}</div><div class="hint">Bosing → tushuntirish</div>`;
    back.innerHTML=bunpoBack(item);
  } else {
    front.innerHTML=`<div class="main-text" style="font-size:1.1rem">${item.title}</div><div class="sub-text">${item.category} | ${item.questions.length} savol</div><div class="hint">Bosing → matn va savollar</div>`;
    back.innerHTML=dokkaiBack(item);
  }
}

function mojiBack(i){
  return `
    <div class="info-row"><div class="info-label">O'qilishi</div><div class="info-val big">${i.reading}</div></div>
    <div class="info-row"><div class="info-label">Ma'nosi</div><div class="info-val">${i.meaning}</div></div>
    <div class="info-row"><div class="info-label">日本語の意味</div><div class="info-val">${i.meaningJP}</div></div>
    <div class="info-row"><div class="info-label">Ishlatilishi</div><div class="info-val">${i.usage}<br><small style="color:#aaa">${i.usageTranslation}</small></div></div>
    <div class="info-row"><div class="info-label">Misol</div><div class="info-val">${i.example}</div></div>
    <div class="info-row"><div class="info-label">O'xshash so'zlar</div><div class="info-val">${i.similar.join('<br>')}</div></div>
    <div class="info-row"><div class="info-label">JLPT Farqi</div><div class="info-val"><span class="tip">${i.jlptTip}</span></div></div>
  `;
}

function bunpoBack(i){
  let html=`
    <div class="info-row"><div class="info-label">Ma'nosi</div><div class="info-val">${i.meaning}</div></div>
    <div class="info-row"><div class="info-label">日本語</div><div class="info-val">${i.meaningJP}</div></div>
    <div class="info-row"><div class="info-label">Struktura</div><div class="info-val" style="color:#a29bfe;font-weight:700">${i.structure}</div></div>
    <div class="info-row"><div class="info-label">Misol</div><div class="info-val">${i.example}<br><small style="color:#aaa">${i.exampleTranslation}</small></div></div>
    <div class="info-row"><div class="info-label">O'xshash</div><div class="info-val">${i.similar.join('<br>')}</div></div>
    <div class="info-row"><div class="info-label">JLPT Farqi</div><div class="info-val"><span class="tip">${i.jlptTip}</span></div></div>
  `;
  if(i.wrongExamples&&i.wrongExamples.length){
    html+=`<div class="info-row"><div class="info-label">⚠️ Xato misollar</div>`;
    i.wrongExamples.forEach(w=>{
      html+=`<div class="info-val" style="margin-top:6px"><span style="color:#ff6b6b">✗ ${w.wrong}</span><br><small style="color:#ffd93d">→ ${w.why}</small></div>`;
    });
    html+=`</div>`;
  }
  return html;
}

function dokkaiBack(i){
  let html=`<div class="info-row"><div class="info-label">${i.title}</div><div class="info-val" style="font-size:.8rem;line-height:1.8">${i.passage.replace(/\\n/g,'<br>')}</div></div>`;
  i.questions.forEach((q,qi)=>{
    html+=`<div class="info-row"><div class="info-label">Savol ${qi+1}</div><div class="info-val">${q.question}</div>`;
    html+=`<div class="info-val" style="color:#00b894;margin-top:4px">✓ ${q.options[q.correct]}</div>`;
    html+=`<div class="info-val" style="color:#aaa;font-size:.8rem">${q.explanation}</div>`;
    if(q.wrongReasons){
      q.options.forEach((opt,oi)=>{
        if(oi!==q.correct&&q.wrongReasons[oi!==q.correct?oi>q.correct?oi-1:oi:0]){
          const reason=q.wrongReasons[oi>q.correct?oi-1:oi];
          html+=`<div class="info-val" style="font-size:.75rem;margin-top:3px"><span style="color:#ff6b6b">✗ ${opt}</span> → <span style="color:#888">${reason}</span></div>`;
        }
      });
    }
    html+=`</div>`;
  });
  if(i.keyVocab){
    html+=`<div class="info-row"><div class="info-label">Kalit so'zlar</div><div class="info-val" style="font-size:.8rem">${i.keyVocab.join('<br>')}</div></div>`;
  }
  return html;
}

// ===== TEST =====
function genTest(){
  const data=getData();
  const qEl=document.getElementById('test-q');
  const optsEl=document.getElementById('test-opts');
  const fbEl=document.getElementById('test-fb');
  const nextBtn=document.getElementById('btn-next-q');
  fbEl.className='test-fb';nextBtn.className='btn btn-next-q';

  if(state.section==='dokkai'){
    const passage=data[Math.floor(Math.random()*data.length)];
    const q=passage.questions[Math.floor(Math.random()*passage.questions.length)];
    qEl.style.fontSize='1rem';qEl.textContent=q.question;
    optsEl.innerHTML='';
    q.options.forEach((opt,i)=>{
      const el=document.createElement('div');el.className='test-opt';el.textContent=opt;
      el.onclick=()=>answerDokkai(el,i,q);
      optsEl.appendChild(el);
    });
    return;
  }

  if(data.length<4){optsEl.innerHTML='<p style="color:#888;text-align:center">Kamida 4 ta element kerak</p>';return;}

  const ri=Math.floor(Math.random()*data.length);
  const item=data[ri];
  let question='',correctAns='',field='';

  if(state.section==='moji'){
    if(state.testType==='meaning'){question=item.kanji;correctAns=item.meaning;field='meaning';}
    else if(state.testType==='reading'){question=item.kanji;correctAns=item.reading;field='reading';}
    else if(state.testType==='kanji'){question=item.reading;correctAns=item.kanji;field='kanji';}
    else{question=item.kanji;correctAns=item.usage;field='usage';}
  } else {
    if(state.testType==='meaning'){question=item.grammar;correctAns=item.meaning;field='meaning';}
    else if(state.testType==='reading'){question=item.meaning;correctAns=item.grammar;field='grammar';}
    else if(state.testType==='kanji'){question=item.grammar;correctAns=item.structure;field='structure';}
    else{question=item.grammar;correctAns=item.example;field='example';}
  }

  qEl.style.fontSize='1.6rem';qEl.textContent=question;

  // wrong options
  const wrongs=[];const used=[ri];
  while(wrongs.length<3){
    const idx=Math.floor(Math.random()*data.length);
    if(!used.includes(idx)){used.push(idx);wrongs.push(data[idx][field]);}
  }

  const correctPos=Math.floor(Math.random()*4);
  wrongs.splice(correctPos,0,correctAns);

  optsEl.innerHTML='';
  wrongs.slice(0,4).forEach((opt,i)=>{
    const el=document.createElement('div');el.className='test-opt';el.textContent=opt;
    el.onclick=()=>answerTest(el,i,correctPos,item);
    optsEl.appendChild(el);
  });
}

function answerTest(el,clicked,correct,item){
  document.querySelectorAll('.test-opt').forEach(o=>o.style.pointerEvents='none');
  const fb=document.getElementById('test-fb');
  const nb=document.getElementById('btn-next-q');
  state.testAll++;

  if(clicked===correct){
    el.classList.add('correct');
    fb.className='test-fb show is-correct';
    fb.innerHTML='✅ To\'g\'ri!';
    state.testOk++;
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.test-opt')[correct].classList.add('correct');
    fb.className='test-fb show is-wrong';
    let tip=item.jlptTip||item.jlptTip||'';
    fb.innerHTML=`❌ Noto'g'ri!<br><strong>To'g'ri javob yuqorida yashil bilan ko'rsatilgan</strong><br><span style="color:#ffd93d;font-size:.8rem">${tip}</span>`;
    mark(item.id,'unknown');
  }
  document.getElementById('test-score').textContent=`${state.testOk}/${state.testAll}`;
  nb.className='btn btn-next-q show';
}

function answerDokkai(el,clicked,q){
  document.querySelectorAll('.test-opt').forEach(o=>o.style.pointerEvents='none');
  const fb=document.getElementById('test-fb');
  const nb=document.getElementById('btn-next-q');
  state.testAll++;

  if(clicked===q.correct){
    el.classList.add('correct');
    fb.className='test-fb show is-correct';
    fb.innerHTML=`✅ To'g'ri! ${q.explanation}`;
    state.testOk++;
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.test-opt')[q.correct].classList.add('correct');
    let wrongReason='';
    if(q.wrongReasons){
      const wrIdx=clicked>q.correct?clicked-1:clicked;
      wrongReason=q.wrongReasons[wrIdx]||'';
    }
    fb.className='test-fb show is-wrong';
    fb.innerHTML=`❌ Noto'g'ri!<br><strong>Nega xato:</strong> ${wrongReason}<br><strong>To'g'ri javob:</strong> ${q.options[q.correct]}<br><small style="color:#aaa">${q.explanation}</small>`;
  }
  document.getElementById('test-score').textContent=`${state.testOk}/${state.testAll}`;
  nb.className='btn btn-next-q show';
}

// ===== STATS =====
function renderStats(){
  const p=getProgress();
  const all=[...july2023MojiGoi,...july2023Bunpo,...july2023Dokkai,...dec2023MojiGoi,...dec2023Bunpo,...dec2023Dokkai];
  let known=0,unknown=0;
  all.forEach(i=>{if(p[i.id]==='known')known++;else if(p[i.id]==='unknown')unknown++;});

  document.getElementById('stats-cards').innerHTML=`
    <div class="stat-card s-known"><div class="stat-num">${known}</div><div class="stat-lbl">Bildim</div></div>
    <div class="stat-card s-unknown"><div class="stat-num">${unknown}</div><div class="stat-lbl">Bilmadim</div></div>
    <div class="stat-card s-total"><div class="stat-num">${all.length}</div><div class="stat-lbl">Jami</div></div>
  `;

  const secs=[
    {name:'7月 文字語彙',d:july2023MojiGoi},{name:'7月 文法',d:july2023Bunpo},{name:'7月 読解',d:july2023Dokkai},
    {name:'12月 文字語彙',d:dec2023MojiGoi},{name:'12月 文法',d:dec2023Bunpo},{name:'12月 読解',d:dec2023Dokkai}
  ];
  let html='';
  secs.forEach(s=>{
    let k=0;s.d.forEach(i=>{if(p[i.id]==='known')k++;});
    const pct=s.d.length?Math.round(k/s.d.length*100):0;
    html+=`<div class="ss-item"><div class="ss-head"><span class="ss-name">${s.name}</span><span class="ss-pct">${k}/${s.d.length} (${pct}%)</span></div><div class="pbar"><div class="pbar-fill" style="width:${pct}%"></div></div></div>`;
  });
  document.getElementById('stats-sections').innerHTML=html;
}

// ===== SHOW VIEW =====
function showView(){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  if(state.mode==='flashcard'){document.getElementById('view-flashcard').classList.add('active');renderCard();}
  else if(state.mode==='test'){document.getElementById('view-test').classList.add('active');genTest();}
  else{document.getElementById('view-stats').classList.add('active');renderStats();}
}

// ===== EVENTS =====
document.addEventListener('DOMContentLoaded',()=>{
  // Exam tabs
  document.querySelectorAll('.exam-tab').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.exam-tab').forEach(b=>b.classList.remove('active'));
    t.classList.add('active');state.exam=t.dataset.exam;state.cardIdx=0;showView();
  });
  // Section
  document.querySelectorAll('.section-btn').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.section-btn').forEach(b=>b.classList.remove('active'));
    t.classList.add('active');state.section=t.dataset.section;state.cardIdx=0;showView();
  });
  // Mode
  document.querySelectorAll('.mode-btn').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
    t.classList.add('active');state.mode=t.dataset.mode;showView();
  });
  // Filter
  document.querySelectorAll('.filter-btn').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    t.classList.add('active');state.filter=t.dataset.filter;state.cardIdx=0;renderCard();
  });
  // Test type
  document.querySelectorAll('.tt-btn').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.tt-btn').forEach(b=>b.classList.remove('active'));
    t.classList.add('active');state.testType=t.dataset.tt;state.testOk=0;state.testAll=0;
    document.getElementById('test-score').textContent='0/0';genTest();
  });
  // Card flip
  document.getElementById('card').onclick=()=>document.getElementById('card').classList.toggle('flipped');
  // Nav
  document.getElementById('btn-next').onclick=()=>{state.cardIdx++;renderCard();};
  document.getElementById('btn-prev').onclick=()=>{state.cardIdx--;renderCard();};
  // Known/Unknown
  document.getElementById('btn-known').onclick=()=>{const d=getFiltered();if(d.length){mark(d[state.cardIdx].id,'known');state.cardIdx++;renderCard();}};
  document.getElementById('btn-unknown').onclick=()=>{const d=getFiltered();if(d.length){mark(d[state.cardIdx].id,'unknown');state.cardIdx++;renderCard();}};
  // Test next
  document.getElementById('btn-next-q').onclick=()=>genTest();
  // Reset
  document.getElementById('btn-reset-section').onclick=()=>{if(confirm("Bu bo'lim progressini tozalaysizmi?")){const p=getProgress();getData().forEach(i=>delete p[i.id]);saveProgress(p);renderStats();renderCard();}};
  document.getElementById('btn-reset-all').onclick=()=>{if(confirm("HAMMA progressni tozalaysizmi?")){localStorage.removeItem(STORE_KEY);renderStats();renderCard();}};
  // Keyboard
  document.addEventListener('keydown',e=>{
    if(state.mode==='flashcard'){
      if(e.key==='ArrowRight'){state.cardIdx++;renderCard();}
      if(e.key==='ArrowLeft'){state.cardIdx--;renderCard();}
      if(e.key===' '){document.getElementById('card').click();e.preventDefault();}
      if(e.key==='1')document.getElementById('btn-unknown').click();
      if(e.key==='2')document.getElementById('btn-known').click();
    }
  });
  showView();
});
