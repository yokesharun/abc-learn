import { DECKS } from "./data.js";
import { icon } from "./svg.js";
import * as A from "./audio.js";

/* ---------- state ---------- */
const SAVE = "abc-settings-v1";
const state = {
  deck: "letters",
  idx: 0,
  auto: false,
  speed: 5000,
  letterCase: "both", // both | cap | low
  game: "flash",      // flash | quiz | trace
};
let autoTimer = null;

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE) || "{}");
    if (s.deck && DECKS[s.deck]) state.deck = s.deck;
    if (s.speed) state.speed = s.speed;
    if (s.letterCase) state.letterCase = s.letterCase;
    if (typeof s.sound === "boolean") A.settings.sound = s.sound;
    if (typeof s.music === "boolean") A.settings.music = s.music;
  } catch {}
}
function save() {
  localStorage.setItem(SAVE, JSON.stringify({
    deck: state.deck, speed: state.speed, letterCase: state.letterCase,
    sound: A.settings.sound, music: A.settings.music,
  }));
}

/* ---------- el refs ---------- */
const $ = (s) => document.querySelector(s);
const card = $("#card");
const stage = $("#stage");
const progress = $("#progress");
const deckBar = $("#deckBar");
const numWords = ["one","two","three","four","five","six","seven","eight","nine","ten",
  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];

const deckData = () => DECKS[state.deck].data;
const cur = () => deckData()[state.idx];

/* ---------- deck tabs ---------- */
function buildTabs() {
  deckBar.innerHTML = "";
  Object.entries(DECKS).forEach(([key, d]) => {
    const b = document.createElement("button");
    b.className = "tab deck";
    b.dataset.deck = key;
    b.innerHTML = `${d.emoji} ${d.label}`;
    b.setAttribute("aria-label", d.label);
    b.onclick = () => setDeck(key);
    deckBar.appendChild(b);
  });
}
function syncTabs() {
  document.querySelectorAll(".tab.deck").forEach(b =>
    b.classList.toggle("active", b.dataset.deck === state.deck));
  // case button only for letters
  $("#caseBtn").style.display = DECKS[state.deck].isLetters ? "" : "none";
}

/* ---------- rendering ---------- */
function render() {
  state.game = "flash";
  syncTabs();
  const d = DECKS[state.deck];
  const item = cur();
  let html = "";

  if (d.isLetters) {
    const cap = item.sym, low = item.sym.toLowerCase();
    let letterBlock;
    if (state.letterCase === "cap") letterBlock = `<span class="cap">${cap}</span>`;
    else if (state.letterCase === "low") letterBlock = `<span class="low">${low}</span>`;
    else letterBlock = `<span class="cap">${cap}</span> <span class="low">${low}</span>`;
    html = `
      <div class="big lettersrow">${letterBlock}</div>
      <div class="pic">${icon(item.icon, item.iconArg)}</div>
      <div class="word"><b>${cap}</b>${item.word.slice(1)}</div>`;
  } else if (d.isNumbers) {
    const cells = Array.from({ length: item.count },
      () => `<span class="numcell">${icon(item.icon, item.iconArg)}</span>`).join("");
    html = `
      <div class="big num">${item.sym}</div>
      <div class="numgrid n${item.count}">${cells}</div>
      <div class="word">${item.word}</div>`;
  } else if (d.isRhymes) {
    const lyrics = item.lines.map((l, i) =>
      `<span class="lyric" data-line="${i}">${l}</span>`).join("");
    html = `
      <div class="rhymeTitle">${item.word}</div>
      <div class="pic rhymePic">${icon(item.icon, item.iconArg)}</div>
      <div class="lyrics">${lyrics}</div>`;
  } else {
    html = `
      <div class="pic big-pic">${icon(item.icon, item.iconArg)}</div>
      <div class="word">${item.word}</div>`;
  }

  card.className = d.isRhymes ? "card rhyme" : "card";
  card.innerHTML = html;
  bump(card);
  renderProgress();

  if (d.isRhymes) {
    card.onclick = () => playRhyme();
    playRhyme();
  } else {
    card.onclick = () => { A.pop(); confettiBurst(); speakItem(); };
    speakItem();
  }
}

/* recite the current rhyme line-by-line, highlighting each line */
function playRhyme() {
  const item = cur();
  const spans = [...card.querySelectorAll(".lyric")];
  spans.forEach(s => s.classList.remove("on"));
  if (A.settings.music) A.startMusic();
  A.speakSeq(
    item.lines,
    (idx) => {
      spans.forEach(s => s.classList.remove("on"));
      const el = spans[idx];
      if (el) { el.classList.add("on"); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    },
    () => spans.forEach(s => s.classList.remove("on")),
  );
}

function renderProgress() {
  const n = deckData().length;
  progress.innerHTML = Array.from({ length: n }, (_, i) =>
    `<span class="dot ${i === state.idx ? "on" : ""}"></span>`).join("");
}

function speakItem() {
  const d = DECKS[state.deck];
  const item = cur();
  let text;
  if (d.isLetters) text = `${item.sym}.  ${item.sym} for ${item.word}.`;
  else if (d.isNumbers) {
    const counting = numWords.slice(0, item.count).join(", ");
    text = `${item.sym}. ${counting}. ${item.word}.`;
  } else text = `${item.word}.`;
  A.speak(text);
}

function bump(el) {
  el.style.animation = "none"; void el.offsetWidth; el.style.animation = "";
}

/* ---------- navigation ---------- */
function go(delta) {
  const n = deckData().length;
  const last = state.idx;
  state.idx = (state.idx + delta + n) % n;
  if (state.game === "flash") render();
  // finished a full forward loop while auto-playing -> celebrate
  if (state.auto && delta > 0 && state.idx === 0 && last === n - 1) celebrate();
}
const next = () => go(1);
const prev = () => go(-1);

function setDeck(key) {
  stopAuto();
  state.deck = key;
  state.idx = 0;
  save();
  render();
}

/* ---------- auto pilot ---------- */
function startAuto() {
  state.auto = true;
  const b = $("#autoBtn");
  b.classList.add("on"); b.querySelector(".bi").textContent = "⏸️";
  if (state.game !== "flash") render();
  autoTimer = setInterval(next, state.speed);
}
function stopAuto() {
  state.auto = false;
  const b = $("#autoBtn");
  if (b) { b.classList.remove("on"); b.querySelector(".bi").textContent = "▶️"; }
  clearInterval(autoTimer);
}
function toggleAuto() { state.auto ? stopAuto() : startAuto(); }

/* ---------- confetti ---------- */
const cv = $("#confetti");
const cx = cv.getContext("2d");
let parts = [];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", sizeCanvas); sizeCanvas();
const COLORS = ["#ff5277", "#ffd400", "#2ecc71", "#5d9cec", "#a55eea", "#ff9f1c"];
function confettiBurst(big = false) {
  if (reduceMotion) return;
  const cxp = innerWidth / 2, cyp = innerHeight / 2;
  const count = big ? 160 : 60;
  for (let i = 0; i < count; i++) {
    parts.push({
      x: cxp, y: cyp,
      vx: (Math.random() - 0.5) * (big ? 16 : 11),
      vy: (Math.random() - 1) * (big ? 16 : 12),
      g: 0.4, r: 4 + Math.random() * 6,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      life: 90,
    });
  }
  if (!rafOn) loop();
}
let rafOn = false;
function loop() {
  rafOn = true;
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.life--;
    cx.fillStyle = p.c;
    cx.fillRect(p.x, p.y, p.r, p.r);
  });
  parts = parts.filter(p => p.life > 0 && p.y < cv.height + 20);
  if (parts.length) requestAnimationFrame(loop); else { rafOn = false; cx.clearRect(0,0,cv.width,cv.height); }
}

/* ---------- celebration ---------- */
function celebrate() {
  confettiBurst(true);
  A.cheer();
  card.className = "card celebrate";
  card.innerHTML = `<div class="big">🎉</div><div class="word">You finished!</div><div class="hint">Great job! 👏</div>`;
  card.onclick = () => { state.idx = 0; render(); };
  A.speak("Hooray! You finished! Great job!");
}

/* ---------- quiz game ---------- */
function startQuiz() {
  stopAuto();
  state.game = "quiz";
  newQuestion();
}
function newQuestion() {
  const data = deckData();
  const answer = (Math.random() * data.length) | 0;
  const opts = new Set([answer]);
  while (opts.size < Math.min(3, data.length)) opts.add((Math.random() * data.length) | 0);
  const choices = [...opts].sort(() => Math.random() - 0.5);
  const target = data[answer];
  const promptWord = DECKS[state.deck].isLetters ? `letter ${target.sym}` :
    DECKS[state.deck].isNumbers ? `number ${target.sym}` : target.word;

  card.className = "card quiz";
  card.onclick = null;
  card.innerHTML = `
    <div class="quizq">Find the <b>${target.word || target.sym}</b>!</div>
    <div class="choices">${choices.map(i => {
      const it = data[i];
      const symFace = DECKS[state.deck].isLetters || DECKS[state.deck].isNumbers;
      const face = symFace
        ? `<span class="qsym">${it.sym}</span>`
        : `<span class="qpic">${icon(it.icon, it.iconArg)}</span>`;
      return `<button class="choice" data-i="${i}" aria-label="${it.word || it.sym}">${face}</button>`;
    }).join("")}</div>`;
  bump(card);
  A.speak(`Find the ${promptWord}.`);

  card.querySelectorAll(".choice").forEach(btn => {
    btn.onclick = () => {
      const i = +btn.dataset.i;
      if (i === answer) {
        btn.classList.add("right");
        A.correct(); confettiBurst();
        A.speak(`Yes! ${target.word || target.sym}!`);
        setTimeout(newQuestion, 1400);
      } else {
        btn.classList.add("wrong");
        A.wrong();
        A.speak("Try again!");
        setTimeout(() => btn.classList.remove("wrong"), 600);
      }
    };
  });
}

/* ---------- tracing game (letters) ---------- */
function startTrace() {
  stopAuto();
  if (!DECKS[state.deck].isLetters) setDeck("letters");
  state.game = "trace";
  drawTrace();
}
function drawTrace() {
  const item = cur();
  card.className = "card trace";
  card.onclick = null;
  card.innerHTML = `
    <div class="traceHead">Trace the letter <b>${item.sym}</b></div>
    <canvas id="pad" width="300" height="300" aria-label="tracing area"></canvas>
    <div class="traceNav">
      <button id="tPrev" class="navbtn small" aria-label="previous">⬅️</button>
      <button id="tClear" class="navbtn small" aria-label="clear">🧽</button>
      <button id="tNext" class="navbtn small" aria-label="next">➡️</button>
    </div>`;
  bump(card);
  A.speak(`Trace the letter ${item.sym}. ${item.sym} says ${item.sound}.`);

  const pad = $("#pad");
  const p = pad.getContext("2d");
  function guide() {
    p.clearRect(0, 0, 300, 300);
    p.save();
    p.font = "bold 230px 'Comic Sans MS', sans-serif";
    p.textAlign = "center"; p.textBaseline = "middle";
    p.setLineDash([10, 12]);
    p.lineWidth = 3; p.strokeStyle = "#c9c9ff";
    p.strokeText(item.sym, 150, 160);
    p.restore();
  }
  guide();
  let drawing = false, painted = 0;
  const pos = (e) => {
    const r = pad.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (300 / r.width), y: (t.clientY - r.top) * (300 / r.height) };
  };
  const start = (e) => { drawing = true; const { x, y } = pos(e); p.beginPath(); p.moveTo(x, y); e.preventDefault(); };
  const move = (e) => {
    if (!drawing) return;
    const { x, y } = pos(e);
    p.lineWidth = 16; p.lineCap = "round"; p.strokeStyle = "#ff5277";
    p.lineTo(x, y); p.stroke(); p.beginPath(); p.moveTo(x, y);
    painted++;
    if (painted === 40) { A.chime(); confettiBurst(); A.speak(`Great job! That is ${item.sym}.`); }
    e.preventDefault();
  };
  const end = () => { drawing = false; };
  pad.addEventListener("mousedown", start); pad.addEventListener("mousemove", move);
  addEventListener("mouseup", end);
  pad.addEventListener("touchstart", start, { passive: false });
  pad.addEventListener("touchmove", move, { passive: false });
  pad.addEventListener("touchend", end);

  $("#tClear").onclick = () => { painted = 0; guide(); };
  $("#tNext").onclick = () => { next(); drawTrace(); };
  $("#tPrev").onclick = () => { prev(); drawTrace(); };
}

/* ---------- song mode (alphabet) ---------- */
function startSong() {
  if (!DECKS[state.deck].isLetters) setDeck("letters");
  A.settings.music = true; syncToggles(); A.startMusic();
  render();
  if (!state.auto) startAuto();
}

/* ---------- memory match game ---------- */
function startMemory() {
  stopAuto();
  state.game = "memory";
  if (DECKS[state.deck].isRhymes) { state.deck = "animals"; state.idx = 0; save(); syncTabs(); }
  buildMemory();
}
function buildMemory() {
  const deck = DECKS[state.deck];
  const data = deck.data;
  // pair count adapts to viewport
  const pairs = innerWidth < 480 ? 3 : innerWidth < 900 ? 4 : 6;
  const picks = [...data].sort(() => Math.random() - 0.5).slice(0, Math.min(pairs, data.length));
  let cards = picks.flatMap((it, i) => [{ id: i, it }, { id: i, it }]);
  cards = cards.sort(() => Math.random() - 0.5);

  const face = (it) => deck.isLetters
    ? `<span class="msym">${it.sym}</span>`
    : `<span class="mpic">${icon(it.icon, it.iconArg)}</span>`;

  card.className = "card memory";
  card.onclick = null;
  card.innerHTML = `
    <div class="memHead">Find the matching pairs! 🧩</div>
    <div class="mgrid" style="--cols:${cards.length <= 6 ? 3 : cards.length <= 8 ? 4 : 4}">
      ${cards.map((c, idx) =>
        `<button class="mcard" data-idx="${idx}" data-id="${c.id}" aria-label="card">
           <span class="mback">❓</span>
           <span class="mfront">${face(c.it)}</span>
         </button>`).join("")}
    </div>`;
  bump(card);
  A.speak("Find the matching pairs!");

  let first = null, lock = false, matched = 0;
  const total = cards.length;
  card.querySelectorAll(".mcard").forEach(btn => {
    btn.onclick = () => {
      if (lock || btn.classList.contains("up") || btn.classList.contains("done")) return;
      btn.classList.add("up");
      const it = cards[+btn.dataset.idx].it;
      A.pop();
      if (!first) { first = btn; return; }
      // second pick
      if (first.dataset.id === btn.dataset.id) {
        first.classList.add("done"); btn.classList.add("done");
        A.correct(); A.speak(it.word || it.sym);
        matched += 2; first = null;
        if (matched === total) { confettiBurst(true); setTimeout(celebrate, 700); }
      } else {
        lock = true; A.wrong();
        const a = first, b = btn; first = null;
        setTimeout(() => { a.classList.remove("up"); b.classList.remove("up"); lock = false; }, 800);
      }
    };
  });
}

/* ---------- swipe ---------- */
let sx = 0, sy = 0;
stage.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
stage.addEventListener("touchend", e => {
  if (state.game !== "flash") return;
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { stopAuto(); dx < 0 ? next() : prev(); }
});

/* ---------- toggles / controls ---------- */
function syncToggles() {
  $("#soundBtn").classList.toggle("on", A.settings.sound);
  $("#soundBtn").querySelector(".bi").textContent = A.settings.sound ? "🔊" : "🔇";
  $("#musicBtn").classList.toggle("on", A.settings.music);
  $("#caseBtn").querySelector(".bi").textContent =
    state.letterCase === "both" ? "Aa" : state.letterCase === "cap" ? "A" : "a";
  $("#speed").value = String(state.speed);
}

/* ---------- bottom sheets + tab bar ---------- */
function openSheet(id) {
  closeSheet();
  $("#" + id).hidden = false;
  $("#scrim").hidden = false;
  // allow display:none -> animation
  requestAnimationFrame(() => { $("#" + id).classList.add("open"); $("#scrim").classList.add("open"); });
}
function closeSheet() {
  $("#scrim").classList.remove("open");
  ["playSheet", "settingsSheet"].forEach(id => {
    const el = $("#" + id);
    if (el.classList.contains("open")) {
      el.classList.remove("open");
      setTimeout(() => { el.hidden = true; }, 300);
    }
  });
  setTimeout(() => { $("#scrim").hidden = true; }, 300);
}
function setTab(which) {
  document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active"));
  $("#tab" + which).classList.add("active");
}

function wire() {
  // game buttons close the Play sheet after starting
  const game = (fn) => () => { fn(); closeSheet(); setTab("Learn"); };
  $("#autoBtn").onclick = game(toggleAuto);
  $("#quizBtn").onclick = game(startQuiz);
  $("#traceBtn").onclick = game(startTrace);
  $("#songBtn").onclick = game(startSong);
  $("#matchBtn").onclick = game(startMemory);

  // bottom tab bar
  $("#tabLearn").onclick = () => { closeSheet(); setTab("Learn"); if (state.game !== "flash") render(); };
  $("#tabPlay").onclick = () => { setTab("Play"); openSheet("playSheet"); };
  $("#tabSettings").onclick = () => { setTab("Settings"); openSheet("settingsSheet"); };
  $("#scrim").onclick = () => { closeSheet(); setTab("Learn"); };
  $("#prevBtn").onclick = () => { stopAuto(); state.game === "flash" ? prev() : render(); };
  $("#nextBtn").onclick = () => { stopAuto(); state.game === "flash" ? next() : render(); };
  $("#sayBtn").onclick = () => {
    A.unlock();
    if (state.game !== "flash") return;
    if (DECKS[state.deck].isRhymes) playRhyme();
    else { confettiBurst(); speakItem(); }
  };

  $("#caseBtn").onclick = () => {
    state.letterCase = state.letterCase === "both" ? "cap" : state.letterCase === "cap" ? "low" : "both";
    save(); syncToggles(); if (state.game === "flash") render();
  };
  $("#soundBtn").onclick = () => { A.settings.sound = !A.settings.sound; save(); syncToggles(); A.unlock(); A.pop(); };
  $("#musicBtn").onclick = () => {
    A.settings.music = !A.settings.music; save(); syncToggles();
    A.unlock(); A.settings.music ? A.startMusic() : A.stopMusic();
  };
  $("#speed").oninput = (e) => {
    state.speed = +e.target.value; save();
    if (state.auto) { clearInterval(autoTimer); autoTimer = setInterval(next, state.speed); }
  };
  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };
  $("#fsBtn").onclick = toggleFs;
  $("#fsBtn2").onclick = toggleFs;

  addEventListener("keydown", e => {
    if (state.game !== "flash") return;
    if (e.key === "ArrowRight") { stopAuto(); next(); }
    if (e.key === "ArrowLeft") { stopAuto(); prev(); }
    if (e.key === " ") { e.preventDefault(); speakItem(); }
  });
  // unlock audio on the first real user gesture (iOS needs touchend + a primed synth)
  const unlockOnce = () => {
    A.unlock();
    ["touchend", "pointerdown", "click", "keydown"].forEach(ev =>
      removeEventListener(ev, unlockOnce));
  };
  ["touchend", "pointerdown", "click", "keydown"].forEach(ev =>
    addEventListener(ev, unlockOnce, { passive: true }));
}

/* ---------- PWA ---------- */
if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

/* ---------- init ---------- */
load();
buildTabs();
wire();
syncToggles();
if (A.settings.music) A.startMusic();
render();
