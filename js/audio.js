/* Web Audio synthesis: chimes, correct/wrong, pop, cheer, gentle background loop.
   No binary assets. Plus speech via SpeechSynthesis with a child-friendly voice. */

let ctx = null;
let unlocked = false;
const ensure = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const settings = {
  sound: true,   // effects
  music: false,  // background loop
};

function tone(freq, start, dur, { type = "sine", gain = 0.2 } = {}) {
  const c = ensure();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(c.destination);
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export function pop() {
  if (!settings.sound) return;
  tone(660, 0, 0.12, { type: "triangle", gain: 0.25 });
  tone(990, 0.05, 0.12, { type: "triangle", gain: 0.2 });
}

export function chime() {
  if (!settings.sound) return;
  [523, 659, 784].forEach((f, i) => tone(f, i * 0.08, 0.3, { type: "sine", gain: 0.18 }));
}

export function correct() {
  if (!settings.sound) return;
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.35, { type: "triangle", gain: 0.2 }));
}

export function wrong() {
  if (!settings.sound) return;
  tone(300, 0, 0.25, { type: "sawtooth", gain: 0.15 });
  tone(220, 0.12, 0.3, { type: "sawtooth", gain: 0.15 });
}

export function cheer() {
  if (!settings.sound) return;
  [523, 587, 659, 698, 784, 880, 1047].forEach((f, i) =>
    tone(f, i * 0.07, 0.4, { type: "triangle", gain: 0.18 }));
}

/* gentle background loop */
let bgTimer = null;
const melody = [523, 587, 659, 587, 523, 659, 784, 659];
export function startMusic() {
  if (bgTimer) return;
  let i = 0;
  const step = () => {
    if (settings.music) tone(melody[i % melody.length], 0, 0.5, { type: "sine", gain: 0.06 });
    i++;
  };
  ensure();
  step();
  bgTimer = setInterval(step, 600);
}
export function stopMusic() {
  clearInterval(bgTimer);
  bgTimer = null;
}

/* speech */
let chosenVoice = null;
// Known clear female voices, in order of preference (US English first).
const FEMALE = [
  "samantha", "ava", "allison", "susan", "zira", "joanna", "karen",
  "kathy", "shelley", "sandy", "flo", "tessa", "moira", "fiona",
  "victoria", "serena", "female", "woman",
];
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const en = voices.filter(v => /en/i.test(v.lang));
  // try each preferred female name, US English first
  for (const name of FEMALE) {
    const m = en.find(v => v.name.toLowerCase().includes(name) && /en[-_]us/i.test(v.lang))
      || en.find(v => v.name.toLowerCase().includes(name));
    if (m) return m;
  }
  return en.find(v => /en[-_]us/i.test(v.lang)) || en[0] || voices[0];
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = () => { chosenVoice = pickVoice(); };
  chosenVoice = pickVoice();
}

export function speak(text) {
  if (!("speechSynthesis" in window)) return;
  // iOS Safari needs the synth resumed and only speaks reliably after a gesture.
  try { speechSynthesis.resume(); } catch {}
  speechSynthesis.cancel();
  if (!chosenVoice) chosenVoice = pickVoice();
  const u = new SpeechSynthesisUtterance(text);
  if (chosenVoice) u.voice = chosenVoice;
  u.rate = 0.85;
  u.pitch = 1.35;
  u.volume = 1;
  // small defer: cancel()+speak() back-to-back is flaky on iOS
  setTimeout(() => speechSynthesis.speak(u), 0);
}

/* Must be called from inside a real user gesture (touchend/click).
   Unlocks Web Audio with a silent buffer and primes SpeechSynthesis on iOS. */
export function unlock() {
  const c = ensure();
  if (unlocked) return;
  try {
    // play a one-sample silent buffer to wake iOS audio
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  } catch {}
  if ("speechSynthesis" in window) {
    try {
      speechSynthesis.resume();
      // an empty utterance primes the engine without making noise
      const prime = new SpeechSynthesisUtterance(" ");
      prime.volume = 0;
      speechSynthesis.speak(prime);
    } catch {}
  }
  unlocked = true;
}
