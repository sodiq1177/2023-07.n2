const K='n2-2023';
let S={e:'july',s:'moji',m:'fc',f:'all',tt:'meaning',ci:0,tok:0,tall:0};
const gp=()=>JSON.parse(localStorage.getItem(K)||'{}');
const sp=p=>localStorage.setItem(K,JSON.stringify(p));
const mk=(id,v)=>{const p=gp();p[id]=v;sp(p)};
const gs=id=>gp()[id]||'new';

function gd(){
  if(S.s==='dv') return DV.filter(x=>S.e==='july'?x.src.startsWith('j'):x.src.startsWith('d'));
  if(S.e==='july'){if(S.s==='moji')return JM;if(S.s==='bunpo')return JB;return JD;}
  else{if(S.s==='moji')return DM;if(S.s==='bunpo')return DB;return DD;}
}
function gf(){const d=gd();if(S.f==='all')return d;return d.filter(i=>gs(i.id)===S.f);}

function rc(){
  const d=gf(),card=Q('#card'),cf=Q('#cf'),cb=Q('#cb');
  Q('#cnt').textContent=d.length?`${S.ci+1}/${d.length}`:'0/0';
  card.classList.remove('flip');
  if(!d.length){cf.innerHTML='<div class="big" style="font-size:1.1rem">Ma\'lumot yo\'q</div>';cb.innerHTML='';return;}
  if(S.ci>=d.length)S.ci=0;if(S.ci<0)S.ci=d.length-1;
  const i=d[S.ci];
  if(S.s==='moji'||S.s==='dv'){
    cf.innerHTML=`<div class="big">${i.k}</div><div class="sub">${i.lv||i.cat||''}</div>`;
    cb.innerHTML=mBack(i);
  }else if(S.s==='bunpo'){
    cf.innerHTML=`<div class="big" style="font-size:1.8rem">${i.g}</div><div class="sub">${i.cat}</div>`;
    cb.innerHTML=bBack(i);
  }else{
    cf.innerHTML=`<div class="big" style="font-size:1rem">${i.t}</div><div class="sub">${i.cat} | ${i.qs.length} savol</div>`;
    cb.innerHTML=dBack(i);
  }
}
function mBack(i){
  let h=R('O\'qilishi',i.r,'lg')+R('Ma\'no',i.mn)+R('日本語',i.mj);
  if(i.u)h+=R('Ishlatilishi',i.u);
  if(i.ex)h+=R('Misol',i.ex);
  if(i.sim)h+=R('O\'xshash',i.sim.join('<br>'));
  if(i.tip)h+=`<div class="row"><div class="lbl">JLPT Farq</div><div class="val"><span class="tip">${i.tip}</span></div></div>`;
  if(i.lv)h+=R('Daraja',`<span style="color:${i.lv==='N1'?'#ec4899':'#fbbf24'};font-weight:800">${i.lv}</span>`);
  return h;
}
function bBack(i){
  let h=R('Ma\'no',i.mn)+R('日本語',i.mj)+R('Struktura',`<span style="color:#a78bfa;font-weight:700">${i.st}</span>`);
  h+=R('Misol',i.ex+'<br><small style="color:#aaa">'+i.exT+'</small>');
  if(i.sim)h+=R('O\'xshash',i.sim.join('<br>'));
  if(i.tip)h+=`<div class="row"><div class="lbl">JLPT Farq</div><div class="val"><span class="tip">${i.tip}</span></div></div>`;
  if(i.we&&i.we.length){h+=`<div class="row"><div class="lbl">⚠️ Xato misollar</div>`;i.we.forEach(w=>{h+=`<div class="val" style="margin-top:5px"><span style="color:#ef4444">✗ ${w.w}</span><br><small style="color:#fbbf24">→ ${w.y}</small></div>`;});h+=`</div>`;}
  return h;
}
function dBack(i){
  let h=`<div class="row"><div class="lbl">${i.t}</div><div class="val" style="font-size:.78rem;line-height:1.7">${i.p.replace(/\\n/g,'<br>')}</div></div>`;
  i.qs.forEach((q,n)=>{
    h+=`<div class="row"><div class="lbl">Savol ${n+1}</div><div class="val">${q.q}</div><div class="val" style="color:#10b981;margin-top:3px">✓ ${q.o[q.c]}</div><div class="val" style="color:#aaa;font-size:.75rem">${q.e}</div>`;
    if(q.wr)q.o.forEach((op,oi)=>{if(oi!==q.c){const ri=oi>q.c?oi-1:oi;if(q.wr[ri])h+=`<div class="val" style="font-size:.72rem;margin-top:2px"><span style="color:#ef4444">✗ ${op}</span> → <span style="color:#888">${q.wr[ri]}</span></div>`;}});
    h+=`</div>`;
  });
  if(i.kv)h+=R('Kalit so\'zlar',i.kv.join('<br>'));
  return h;
}
function R(l,v,cls){return `<div class="row"><div class="lbl">${l}</div><div class="val${cls?' '+cls:''}">${v}</div></div>`;}

// TEST
function gt(){
  const d=gd(),qe=Q('#tq'),oe=Q('#topts'),fb=Q('#tfb'),nb=Q('#tnext');
  fb.className='t-fb';nb.className='t-next';
  if(S.s==='dokkai'){
    const ps=d[~~(Math.random()*d.length)],q=ps.qs[~~(Math.random()*ps.qs.length)];
    qe.style.fontSize='.95rem';qe.textContent=q.q;oe.innerHTML='';
    q.o.forEach((op,i)=>{const el=document.createElement('div');el.className='t-o';el.textContent=op;el.onclick=()=>adk(el,i,q);oe.appendChild(el);});return;
  }
  if(d.length<4){oe.innerHTML='<p style="color:#888;text-align:center">Kamida 4 element kerak</p>';return;}
  const ri=~~(Math.random()*d.length),item=d[ri];
  let question='',ca='',f='';
  if(S.s==='moji'||S.s==='dv'){
    if(S.tt==='meaning'){question=item.k;ca=item.mn;f='mn';}
    else if(S.tt==='reading'){question=item.k;ca=item.r;f='r';}
    else if(S.tt==='kanji'){question=item.r;ca=item.k;f='k';}
    else{question=item.k;ca=item.mj||item.u||item.mn;f='mj';}
  }else{
    if(S.tt==='meaning'){question=item.g;ca=item.mn;f='mn';}
    else if(S.tt==='reading'){question=item.mn;ca=item.g;f='g';}
    else if(S.tt==='kanji'){question=item.g;ca=item.st;f='st';}
    else{question=item.g;ca=item.ex;f='ex';}
  }
  qe.style.fontSize='1.5rem';qe.textContent=question;
  const wr=[];const used=[ri];
  while(wr.length<3){const idx=~~(Math.random()*d.length);if(!used.includes(idx)){used.push(idx);wr.push(d[idx][f]);}}
  const cp=~~(Math.random()*4);wr.splice(cp,0,ca);
  oe.innerHTML='';wr.slice(0,4).forEach((op,i)=>{const el=document.createElement('div');el.className='t-o';el.textContent=op;el.onclick=()=>at(el,i,cp,item);oe.appendChild(el);});
}
function at(el,cl,cr,item){
  QA('.t-o').forEach(o=>o.style.pointerEvents='none');S.tall++;
  const fb=Q('#tfb'),nb=Q('#tnext');
  if(cl===cr){el.classList.add('ok');fb.className='t-fb show fok';fb.innerHTML='✅ To\'g\'ri!';S.tok++;}
  else{el.classList.add('no');QA('.t-o')[cr].classList.add('ok');fb.className='t-fb show fno';fb.innerHTML=`❌ Noto'g'ri!<br><span style="color:#fbbf24;font-size:.78rem">${item.tip||''}</span>`;mk(item.id,'unknown');}
  Q('#tscore').textContent=`${S.tok}/${S.tall}`;nb.className='t-next show';
}
function adk(el,cl,q){
  QA('.t-o').forEach(o=>o.style.pointerEvents='none');S.tall++;
  const fb=Q('#tfb'),nb=Q('#tnext');
  if(cl===q.c){el.classList.add('ok');fb.className='t-fb show fok';fb.innerHTML=`✅ ${q.e}`;S.tok++;}
  else{el.classList.add('no');QA('.t-o')[q.c].classList.add('ok');const wr=q.wr?(q.wr[cl>q.c?cl-1:cl]||''):'';fb.className='t-fb show fno';fb.innerHTML=`❌ <b>Nega xato:</b> ${wr}<br><b>To'g'ri:</b> ${q.o[q.c]}<br><small>${q.e}</small>`;}
  Q('#tscore').textContent=`${S.tok}/${S.tall}`;nb.className='t-next show';
}

// STATS
function rs(){
  const p=gp(),all=[...JM,...JB,...JD,...DM,...DB,...DD,...DV];
  let kn=0,un=0;all.forEach(i=>{if(p[i.id]==='known')kn++;else if(p[i.id]==='unknown')un++;});
  Q('#sgrid').innerHTML=`<div class="s-c sk"><div class="n">${kn}</div><div class="l">Bildim</div></div><div class="s-c su"><div class="n">${un}</div><div class="l">Bilmadim</div></div><div class="s-c st"><div class="n">${all.length}</div><div class="l">Jami</div></div>`;
  const ss=[{n:'7月 文字語彙',d:JM},{n:'7月 文法',d:JB},{n:'7月 読解',d:JD},{n:'7月 読解語彙',d:DV.filter(x=>x.src.startsWith('j'))},{n:'12月 文字語彙',d:DM},{n:'12月 文法',d:DB},{n:'12月 読解',d:DD},{n:'12月 読解語彙',d:DV.filter(x=>x.src.startsWith('d'))}];
  let h='';ss.forEach(s=>{let k=0;s.d.forEach(i=>{if(p[i.id]==='known')k++;});const pc=s.d.length?~~(k/s.d.length*100):0;h+=`<div class="s-i"><div class="s-h"><span>${s.n}</span><span class="p">${k}/${s.d.length} (${pc}%)</span></div><div class="pb"><div style="width:${pc}%"></div></div></div>`;});
  Q('#slist').innerHTML=h;
}

function sv(){QA('.view').forEach(v=>v.classList.remove('on'));if(S.m==='fc'){Q('#v-fc').classList.add('on');rc();}else if(S.m==='test'){Q('#v-test').classList.add('on');gt();}else{Q('#v-st').classList.add('on');rs();}}
const Q=s=>document.querySelector(s);const QA=s=>document.querySelectorAll(s);

document.addEventListener('DOMContentLoaded',()=>{
  QA('.tab').forEach(t=>t.onclick=()=>{QA('.tab').forEach(b=>b.classList.remove('on'));t.classList.add('on');S.e=t.dataset.e;S.ci=0;sv();});
  QA('nav button').forEach(t=>t.onclick=()=>{QA('nav button').forEach(b=>b.classList.remove('on'));t.classList.add('on');S.s=t.dataset.s;S.ci=0;sv();});
  QA('.modes button').forEach(t=>t.onclick=()=>{QA('.modes button').forEach(b=>b.classList.remove('on'));t.classList.add('on');S.m=t.dataset.m;sv();});
  QA('.filters button').forEach(t=>t.onclick=()=>{QA('.filters button').forEach(b=>b.classList.remove('on'));t.classList.add('on');S.f=t.dataset.f;S.ci=0;rc();});
  QA('.t-types button').forEach(t=>t.onclick=()=>{QA('.t-types button').forEach(b=>b.classList.remove('on'));t.classList.add('on');S.tt=t.dataset.t;S.tok=0;S.tall=0;Q('#tscore').textContent='0/0';gt();});
  Q('#card').onclick=()=>Q('#card').classList.toggle('flip');
  Q('#bn').onclick=()=>{S.ci++;rc();};Q('#bp').onclick=()=>{S.ci--;rc();};
  Q('#byes').onclick=()=>{const d=gf();if(d.length){mk(d[S.ci].id,'known');S.ci++;rc();}};
  Q('#bno').onclick=()=>{const d=gf();if(d.length){mk(d[S.ci].id,'unknown');S.ci++;rc();}};
  Q('#tnext').onclick=()=>gt();
  Q('#brs').onclick=()=>{if(confirm("Bu bo'lim tozalansinmi?")){const p=gp();gd().forEach(i=>delete p[i.id]);sp(p);rs();}};
  Q('#bra').onclick=()=>{if(confirm("HAMMA progress tozalansinmi?")){localStorage.removeItem(K);rs();}};
  document.addEventListener('keydown',e=>{if(S.m==='fc'){if(e.key==='ArrowRight'){S.ci++;rc();}if(e.key==='ArrowLeft'){S.ci--;rc();}if(e.key===' '){Q('#card').click();e.preventDefault();}if(e.key==='1')Q('#bno').click();if(e.key==='2')Q('#byes').click();}});
  sv();
});
