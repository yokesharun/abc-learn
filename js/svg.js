/* Flat-style SVG icon library.
   Each icon is a function returning a self-contained <svg viewBox="0 0 100 100">.
   Icons scale to whatever box CSS gives them. Reused across letters, numbers,
   categories and games. Keep them simple, bright and recognizable. */

const W = (inner, vb = "0 0 100 100") =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">${inner}</svg>`;

// shared bits
const animalEars = (cx1, cx2, cy, c) =>
  `<circle cx="${cx1}" cy="${cy}" r="13" fill="${c}"/><circle cx="${cx2}" cy="${cy}" r="13" fill="${c}"/>`;

export const ICONS = {
  apple: () => W(`
    <path d="M50 32c-8-12-30-10-30 12 0 20 18 38 30 38s30-18 30-38c0-22-22-24-30-12z" fill="#e84a5f"/>
    <path d="M50 32c4-8 16-8 18-2-2 8-12 10-18 2z" fill="#ff847c"/>
    <rect x="47" y="18" width="6" height="16" rx="3" fill="#7b4b2a"/>
    <path d="M53 22c10-8 18-4 18-4s-2 12-18 8z" fill="#5cb85c"/>`),

  ball: () => W(`
    <circle cx="50" cy="52" r="34" fill="#ffce54"/>
    <path d="M50 18a34 34 0 010 68M16 52h68M22 30c20 14 36 14 56 0M22 74c20-14 36-14 56 0"
      fill="none" stroke="#5d9cec" stroke-width="5"/>`),

  cat: () => W(`
    <polygon points="28,18 40,42 18,40" fill="#f6a623"/><polygon points="72,18 60,42 82,40" fill="#f6a623"/>
    <circle cx="50" cy="56" r="32" fill="#f6a623"/>
    <circle cx="40" cy="52" r="5" fill="#2c2c2c"/><circle cx="60" cy="52" r="5" fill="#2c2c2c"/>
    <polygon points="50,60 45,66 55,66" fill="#e8657a"/>
    <path d="M50 66v6M30 64h14M70 64H56" stroke="#2c2c2c" stroke-width="2.5" fill="none"/>`),

  dog: () => W(`
    <ellipse cx="26" cy="48" rx="12" ry="20" fill="#8a5a3b"/><ellipse cx="74" cy="48" rx="12" ry="20" fill="#8a5a3b"/>
    <circle cx="50" cy="54" r="30" fill="#b07b50"/>
    <circle cx="41" cy="50" r="5" fill="#2c2c2c"/><circle cx="59" cy="50" r="5" fill="#2c2c2c"/>
    <ellipse cx="50" cy="64" rx="7" ry="5" fill="#2c2c2c"/>
    <path d="M50 69v6" stroke="#2c2c2c" stroke-width="3"/>`),

  elephant: () => W(`
    <circle cx="50" cy="48" r="30" fill="#9aa7b5"/>
    <ellipse cx="22" cy="50" rx="14" ry="18" fill="#8794a3"/><ellipse cx="78" cy="50" rx="14" ry="18" fill="#8794a3"/>
    <path d="M50 60c-2 14-14 16-14 28h10c0-10 8-12 8-22z" fill="#9aa7b5"/>
    <circle cx="42" cy="46" r="4" fill="#2c2c2c"/><circle cx="58" cy="46" r="4" fill="#2c2c2c"/>`),

  fish: () => W(`
    <path d="M20 50c14-22 46-22 60 0-14 22-46 22-60 0z" fill="#4fc1e9"/>
    <polygon points="80,50 96,36 96,64" fill="#3bafda"/>
    <circle cx="38" cy="48" r="5" fill="#2c2c2c"/>
    <path d="M52 50h22" stroke="#fff" stroke-width="3" opacity=".6"/>`),

  grapes: () => W(`
    <g fill="#9b59b6">
    <circle cx="50" cy="36" r="9"/><circle cx="38" cy="48" r="9"/><circle cx="62" cy="48" r="9"/>
    <circle cx="50" cy="56" r="9"/><circle cx="40" cy="66" r="9"/><circle cx="60" cy="66" r="9"/>
    <circle cx="50" cy="76" r="9"/></g>
    <rect x="47" y="18" width="6" height="14" rx="3" fill="#7b4b2a"/>
    <path d="M53 22c8-6 14-2 14-2s-2 9-14 6z" fill="#5cb85c"/>`),

  hat: () => W(`
    <rect x="20" y="58" width="60" height="10" rx="5" fill="#34495e"/>
    <path d="M34 58V36a16 16 0 0132 0v22z" fill="#3d566e"/>
    <rect x="34" y="48" width="32" height="8" fill="#e74c3c"/>`),

  icecream: () => W(`
    <polygon points="50,92 32,52 68,52" fill="#e0a96d"/>
    <circle cx="50" cy="40" r="18" fill="#ff8fab"/>
    <circle cx="36" cy="44" r="13" fill="#fcd34d"/><circle cx="64" cy="44" r="13" fill="#a0e7a0"/>
    <circle cx="50" cy="22" r="5" fill="#e84a5f"/>`),

  juice: () => W(`
    <path d="M32 30h36l-4 56H36z" fill="#ffd28a"/>
    <path d="M34 30h32l-1 14H35z" fill="#ff9f43"/>
    <rect x="58" y="14" width="5" height="34" rx="2" fill="#ff6b6b" transform="rotate(18 60 30)"/>
    <ellipse cx="50" cy="30" rx="18" ry="5" fill="#fff" opacity=".5"/>`),

  kite: () => W(`
    <polygon points="50,14 78,46 50,70 22,46" fill="#5d9cec"/>
    <path d="M50 14v56M22 46h56" stroke="#fff" stroke-width="2"/>
    <path d="M50 70c6 10-6 14 0 22" fill="none" stroke="#7b4b2a" stroke-width="2"/>
    <circle cx="50" cy="80" r="4" fill="#ff6b6b"/><circle cx="52" cy="90" r="4" fill="#ffce54"/>`),

  lion: () => W(`
    <g fill="#e8a33d"><circle cx="50" cy="50" r="40"/>
    ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<circle cx="${50+38*Math.cos(a)}" cy="${50+38*Math.sin(a)}" r="11"/>`}).join("")}</g>
    <circle cx="50" cy="52" r="28" fill="#f6c177"/>
    <circle cx="40" cy="48" r="4" fill="#2c2c2c"/><circle cx="60" cy="48" r="4" fill="#2c2c2c"/>
    <polygon points="50,56 45,62 55,62" fill="#7b4b2a"/>`),

  monkey: () => W(`
    <circle cx="26" cy="40" r="12" fill="#8a5a3b"/><circle cx="74" cy="40" r="12" fill="#8a5a3b"/>
    <circle cx="26" cy="40" r="7" fill="#d8a978"/><circle cx="74" cy="40" r="7" fill="#d8a978"/>
    <circle cx="50" cy="48" r="28" fill="#8a5a3b"/>
    <ellipse cx="50" cy="58" rx="20" ry="18" fill="#d8a978"/>
    <circle cx="42" cy="46" r="4" fill="#2c2c2c"/><circle cx="58" cy="46" r="4" fill="#2c2c2c"/>
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#7b4b2a"/>`),

  nest: () => W(`
    <ellipse cx="50" cy="62" rx="38" ry="20" fill="#a0703f"/>
    <ellipse cx="50" cy="58" rx="28" ry="13" fill="#7b4b2a"/>
    <circle cx="40" cy="56" r="9" fill="#fff"/><circle cx="58" cy="56" r="9" fill="#fff"/>
    <circle cx="49" cy="62" r="9" fill="#fff"/>`),

  orange: () => W(`
    <circle cx="50" cy="54" r="34" fill="#ff9f1c"/>
    <circle cx="50" cy="54" r="34" fill="none" stroke="#e8890b" stroke-width="3"/>
    <circle cx="40" cy="44" r="6" fill="#ffce54" opacity=".7"/>
    <path d="M50 20c10 0 12 8 12 8s-10 4-12-8z" fill="#5cb85c"/>`),

  pig: () => W(`
    <polygon points="30,22 42,38 24,40" fill="#f78fb3"/><polygon points="70,22 58,38 76,40" fill="#f78fb3"/>
    <circle cx="50" cy="54" r="32" fill="#f78fb3"/>
    <ellipse cx="50" cy="62" rx="14" ry="10" fill="#e75d92"/>
    <circle cx="45" cy="62" r="3" fill="#7b2a4b"/><circle cx="55" cy="62" r="3" fill="#7b2a4b"/>
    <circle cx="40" cy="48" r="4" fill="#2c2c2c"/><circle cx="60" cy="48" r="4" fill="#2c2c2c"/>`),

  queen: () => W(`
    <circle cx="50" cy="62" r="24" fill="#ffe0bd"/>
    <circle cx="42" cy="60" r="3.5" fill="#2c2c2c"/><circle cx="58" cy="60" r="3.5" fill="#2c2c2c"/>
    <path d="M44 70q6 5 12 0" stroke="#c0392b" stroke-width="3" fill="none"/>
    <path d="M26 40l10 12 14-16 14 16 10-12 4 18H22z" fill="#ffd700"/>
    <circle cx="36" cy="40" r="4" fill="#e74c3c"/><circle cx="50" cy="34" r="4" fill="#3498db"/><circle cx="64" cy="40" r="4" fill="#e74c3c"/>`),

  rabbit: () => W(`
    <ellipse cx="40" cy="26" rx="9" ry="22" fill="#f5f5f5"/><ellipse cx="60" cy="26" rx="9" ry="22" fill="#f5f5f5"/>
    <ellipse cx="40" cy="26" rx="4" ry="15" fill="#f78fb3"/><ellipse cx="60" cy="26" rx="4" ry="15" fill="#f78fb3"/>
    <circle cx="50" cy="60" r="26" fill="#f5f5f5"/>
    <circle cx="42" cy="56" r="4" fill="#2c2c2c"/><circle cx="58" cy="56" r="4" fill="#2c2c2c"/>
    <ellipse cx="50" cy="64" rx="4" ry="3" fill="#f78fb3"/>`),

  sun: () => W(`
    <g stroke="#ffb900" stroke-width="6" stroke-linecap="round">
    ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${50+24*Math.cos(a)}" y1="${50+24*Math.sin(a)}" x2="${50+40*Math.cos(a)}" y2="${50+40*Math.sin(a)}"/>`}).join("")}</g>
    <circle cx="50" cy="50" r="22" fill="#ffd400"/>
    <circle cx="43" cy="48" r="3" fill="#e8890b"/><circle cx="57" cy="48" r="3" fill="#e8890b"/>
    <path d="M44 56q6 6 12 0" stroke="#e8890b" stroke-width="3" fill="none"/>`),

  tiger: () => W(`
    <polygon points="30,20 42,40 22,42" fill="#f6912d"/><polygon points="70,20 58,40 78,42" fill="#f6912d"/>
    <circle cx="50" cy="54" r="32" fill="#f6912d"/>
    <g stroke="#2c2c2c" stroke-width="4"><path d="M28 40v12M72 40v12M50 26v8"/></g>
    <ellipse cx="50" cy="60" rx="16" ry="13" fill="#fff"/>
    <circle cx="42" cy="50" r="4" fill="#2c2c2c"/><circle cx="58" cy="50" r="4" fill="#2c2c2c"/>
    <polygon points="50,58 46,63 54,63" fill="#2c2c2c"/>`),

  umbrella: () => W(`
    <path d="M50 20c22 0 38 16 38 28H12c0-12 16-28 38-28z" fill="#e74c3c"/>
    <path d="M12 48c8 0 8-6 19-6s11 6 19 6 8-6 19-6 11 6 19 6" fill="#c0392b"/>
    <rect x="47" y="46" width="5" height="34" fill="#7b4b2a"/>
    <path d="M52 80c0 8-12 8-12 0" fill="none" stroke="#7b4b2a" stroke-width="5"/>`),

  van: () => W(`
    <rect x="14" y="40" width="72" height="30" rx="6" fill="#5d9cec"/>
    <path d="M58 40h22l6 16H58z" fill="#7fb1f0"/>
    <rect x="62" y="44" width="16" height="10" rx="2" fill="#cfe3fb"/>
    <circle cx="32" cy="72" r="10" fill="#2c3e50"/><circle cx="70" cy="72" r="10" fill="#2c3e50"/>
    <circle cx="32" cy="72" r="4" fill="#bdc3c7"/><circle cx="70" cy="72" r="4" fill="#bdc3c7"/>`),

  watermelon: () => W(`
    <path d="M16 40a34 34 0 0068 0z" fill="#2ecc71"/>
    <path d="M22 42a28 28 0 0056 0z" fill="#fff"/>
    <path d="M26 44a24 24 0 0048 0z" fill="#e84a5f"/>
    <g fill="#2c2c2c"><circle cx="40" cy="52" r="2.5"/><circle cx="50" cy="58" r="2.5"/><circle cx="60" cy="52" r="2.5"/><circle cx="50" cy="48" r="2.5"/></g>`),

  xylophone: () => W(`
    <g>
    <rect x="14" y="58" width="60" height="9" rx="3" fill="#e74c3c"/>
    <rect x="18" y="48" width="56" height="9" rx="3" fill="#f39c12"/>
    <rect x="22" y="38" width="52" height="9" rx="3" fill="#f1c40f"/>
    <rect x="26" y="28" width="48" height="9" rx="3" fill="#2ecc71"/></g>
    <circle cx="80" cy="24" r="5" fill="#7b4b2a"/><rect x="79" y="28" width="3" height="34" fill="#7b4b2a"/>`),

  yak: () => W(`
    <ellipse cx="50" cy="60" rx="34" ry="26" fill="#6d4c3d"/>
    <path d="M22 40q-10-14-18-6 8 4 10 16M78 40q10-14 18-6-8 4-10 16" fill="#d8c3a5"/>
    <circle cx="42" cy="56" r="4" fill="#2c2c2c"/><circle cx="58" cy="56" r="4" fill="#2c2c2c"/>
    <ellipse cx="50" cy="68" rx="12" ry="9" fill="#cdbfae"/>
    <circle cx="46" cy="68" r="2.5" fill="#2c2c2c"/><circle cx="54" cy="68" r="2.5" fill="#2c2c2c"/>`),

  zebra: () => W(`
    <ellipse cx="50" cy="54" rx="32" ry="30" fill="#fff"/>
    <g stroke="#2c2c2c" stroke-width="5"><path d="M30 32v44M44 26v54M58 26v54M72 34v40"/></g>
    <ellipse cx="50" cy="54" rx="32" ry="30" fill="none" stroke="#2c2c2c" stroke-width="3"/>
    <circle cx="42" cy="50" r="4" fill="#2c2c2c"/><circle cx="58" cy="50" r="4" fill="#2c2c2c"/>`),

  banana: () => W(`
    <path d="M24 30c4 36 30 52 56 44-6-4-8-10-8-16-18 4-34-8-38-30z" fill="#ffd400"/>
    <path d="M24 30c4 36 30 52 56 44-2-1-3-3-4-5-22 4-40-14-44-38z" fill="#e8b400"/>
    <rect x="22" y="24" width="6" height="10" rx="2" fill="#7b4b2a" transform="rotate(-20 25 28)"/>`),

  strawberry: () => W(`
    <path d="M50 36c14-6 30 2 30 18 0 22-22 38-30 38s-30-16-30-38c0-16 16-24 30-18z" fill="#e84a5f"/>
    <g fill="#ffe0bd"><circle cx="40" cy="52" r="2"/><circle cx="52" cy="50" r="2"/><circle cx="62" cy="56" r="2"/><circle cx="46" cy="64" r="2"/><circle cx="58" cy="68" r="2"/><circle cx="50" cy="78" r="2"/></g>
    <path d="M34 34l16 6 16-6c-2 8-8 12-16 12s-14-4-16-12z" fill="#2ecc71"/>`),

  cherry: () => W(`
    <path d="M50 22c-2 16-22 18-24 34M50 22c4 14 18 16 22 30" fill="none" stroke="#5cb85c" stroke-width="4"/>
    <circle cx="30" cy="64" r="14" fill="#e84a5f"/><circle cx="68" cy="60" r="14" fill="#c0392b"/>
    <circle cx="26" cy="60" r="3" fill="#fff" opacity=".6"/>`),

  pear: () => W(`
    <path d="M50 28c6 0 8 8 6 14 8 6 12 16 12 26 0 14-10 22-18 22s-18-8-18-22c0-10 4-20 12-26-2-6 0-14 6-14z" fill="#a0d911"/>
    <rect x="47" y="18" width="5" height="12" rx="2" fill="#7b4b2a"/>`),

  star: () => W(`<polygon points="50,12 61,38 90,38 66,56 76,84 50,66 24,84 34,56 10,38 39,38" fill="#ffd400" stroke="#e8b400" stroke-width="3"/>`),
  heart: () => W(`<path d="M50 84C18 60 14 40 28 28c10-9 22-3 22 8 0-11 12-17 22-8 14 12 10 32-22 56z" fill="#ff5277"/>`),
  flower: () => W(`<g fill="#ff6fa5">${Array.from({length:6},(_,i)=>{const a=i*60*Math.PI/180;return `<circle cx="${50+18*Math.cos(a)}" cy="${50+18*Math.sin(a)}" r="13"/>`}).join("")}</g><circle cx="50" cy="50" r="11" fill="#ffd400"/>`),
  balloon: () => W(`<ellipse cx="50" cy="40" rx="26" ry="30" fill="#ff5277"/><polygon points="50,68 45,76 55,76" fill="#ff5277"/><path d="M50 76q6 8 0 16" stroke="#888" stroke-width="2" fill="none"/><ellipse cx="42" cy="32" rx="6" ry="9" fill="#fff" opacity=".4"/>`),
  butterfly: () => W(`<rect x="48" y="34" width="4" height="34" rx="2" fill="#5b3b2a"/><g fill="#7c4dff"><ellipse cx="34" cy="40" rx="18" ry="14"/><ellipse cx="66" cy="40" rx="18" ry="14"/><ellipse cx="36" cy="64" rx="14" ry="11"/><ellipse cx="64" cy="64" rx="14" ry="11"/></g><g fill="#ffd400"><circle cx="34" cy="40" r="5"/><circle cx="66" cy="40" r="5"/></g>`),
  car: () => W(`<rect x="14" y="48" width="72" height="20" rx="8" fill="#ff5277"/><path d="M30 48l10-14h24l8 14z" fill="#ff7d9c"/><rect x="40" y="38" width="22" height="10" rx="2" fill="#cfe3fb"/><circle cx="32" cy="70" r="9" fill="#2c3e50"/><circle cx="70" cy="70" r="9" fill="#2c3e50"/>`),
  duck: () => W(`<ellipse cx="46" cy="58" rx="28" ry="22" fill="#ffd400"/><circle cx="72" cy="40" r="14" fill="#ffd400"/><polygon points="84,40 98,44 84,48" fill="#ff9f1c"/><circle cx="74" cy="37" r="3" fill="#2c2c2c"/><path d="M22 60q-12 4-16 12 14 2 22-4z" fill="#ffce54"/>`),

  // shapes
  shCircle: () => W(`<circle cx="50" cy="50" r="36" fill="#5d9cec"/>`),
  shSquare: () => W(`<rect x="18" y="18" width="64" height="64" rx="6" fill="#ff6b6b"/>`),
  shTriangle: () => W(`<polygon points="50,16 86,82 14,82" fill="#2ecc71"/>`),
  shRectangle: () => W(`<rect x="12" y="30" width="76" height="40" rx="6" fill="#f7b731"/>`),
  shStar: () => ICONS.star(),
  shHeart: () => ICONS.heart(),
  shDiamond: () => W(`<polygon points="50,14 86,50 50,86 14,50" fill="#a55eea"/>`),
  shOval: () => W(`<ellipse cx="50" cy="50" rx="38" ry="26" fill="#26c6da"/>`),

  // a plain colored blob for colors mode
  blob: (color) => W(`<circle cx="50" cy="50" r="36" fill="${color}" stroke="rgba(0,0,0,.12)" stroke-width="3"/><ellipse cx="40" cy="38" rx="12" ry="8" fill="#fff" opacity=".35"/>`),

  // ---- rhyme illustrations ----
  sheep: () => W(`
    <g fill="#f4f4f4"><circle cx="40" cy="50" r="14"/><circle cx="58" cy="46" r="14"/><circle cx="64" cy="60" r="13"/><circle cx="46" cy="64" r="14"/><circle cx="56" cy="58" r="14"/></g>
    <ellipse cx="32" cy="50" rx="12" ry="13" fill="#2c2c2c"/>
    <circle cx="28" cy="47" r="3" fill="#fff"/><circle cx="36" cy="47" r="3" fill="#fff"/>
    <rect x="40" y="74" width="4" height="12" fill="#2c2c2c"/><rect x="58" y="74" width="4" height="12" fill="#2c2c2c"/>`),

  egg: () => W(`
    <rect x="14" y="64" width="72" height="24" fill="#c98b5a"/>
    <g stroke="#a9743f" stroke-width="2"><path d="M14 76h72M38 64v12M62 64v12M26 76v12M50 76v12M74 76v12"/></g>
    <ellipse cx="50" cy="40" rx="22" ry="26" fill="#fff8e7"/>
    <circle cx="42" cy="38" r="3.5" fill="#2c2c2c"/><circle cx="58" cy="38" r="3.5" fill="#2c2c2c"/>
    <path d="M43 50q7 6 14 0" stroke="#e07a5f" stroke-width="3" fill="none"/>
    <path d="M40 22l4 8 6-8 6 8 4-8" stroke="#e07a5f" stroke-width="3" fill="none"/>`),

  hill: () => W(`
    <path d="M0 88q50-56 100 0z" fill="#7ec850"/>
    <circle cx="74" cy="26" r="13" fill="#ffd400"/>
    <circle cx="36" cy="58" r="6" fill="#ffe0bd"/><circle cx="52" cy="50" r="6" fill="#ffe0bd"/>
    <rect x="40" y="70" width="6" height="4" fill="#5d9cec"/>
    <path d="M28 30q8 4 16 0" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`),

  clock: () => W(`
    <rect x="34" y="20" width="32" height="60" rx="6" fill="#a0703f"/>
    <circle cx="50" cy="36" r="13" fill="#fff8e7" stroke="#7b4b2a" stroke-width="3"/>
    <path d="M50 36v-8M50 36l6 4" stroke="#2c2c2c" stroke-width="2.5"/>
    <ellipse cx="72" cy="64" rx="8" ry="6" fill="#9a9a9a"/>
    <circle cx="68" cy="62" r="2" fill="#2c2c2c"/><path d="M80 64l8 4" stroke="#9a9a9a" stroke-width="3"/>`),

  spider: () => W(`
    <g stroke="#3a2a2a" stroke-width="4" fill="none">
    <path d="M40 50L20 38M40 56L18 56M40 62L22 74M60 50L80 38M60 56L82 56M60 62L78 74"/></g>
    <circle cx="50" cy="56" r="16" fill="#3a2a2a"/><circle cx="50" cy="40" r="9" fill="#3a2a2a"/>
    <circle cx="46" cy="38" r="2.5" fill="#fff"/><circle cx="54" cy="38" r="2.5" fill="#fff"/>`),

  boat: () => W(`
    <path d="M18 60h64l-10 22H28z" fill="#e74c3c"/>
    <rect x="48" y="22" width="4" height="40" fill="#7b4b2a"/>
    <path d="M52 26l22 28H52z" fill="#fff"/>
    <path d="M0 84q12-8 25 0t25 0 25 0 25 0" stroke="#5d9cec" stroke-width="5" fill="none"/>`),

  lamb: () => W(`
    <ellipse cx="52" cy="56" rx="22" ry="18" fill="#fafafa"/>
    <g fill="#fff"><circle cx="38" cy="48" r="8"/><circle cx="52" cy="44" r="8"/><circle cx="66" cy="50" r="8"/></g>
    <ellipse cx="30" cy="54" rx="10" ry="11" fill="#ffe0d0"/>
    <circle cx="27" cy="52" r="2.5" fill="#2c2c2c"/><circle cx="34" cy="52" r="2.5" fill="#2c2c2c"/>
    <rect x="46" y="72" width="4" height="12" fill="#d8b" /><rect x="60" y="72" width="4" height="12" fill="#d8b"/>`),
};

export function icon(name, arg) {
  const fn = ICONS[name];
  return fn ? fn(arg) : ICONS.star();
}
