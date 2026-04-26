/**
 * OmanSkyline — hand-drawn-style SVG panoramic illustration.
 * viewBox: 0 0 1500 280
 * Ground line: y=228 — ALL elements (land AND sea) share this baseline.
 * Sea water fills below y=228. Boat hull straddles y=228. Turtle at y=228.
 */
export default function OmanSkyline() {
  return (
    <svg
      viewBox="108 0 1354 232"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      aria-label="Illustrated panorama of Oman's landmarks"
      role="img"
    >
      <defs>
        {/* Halftone dot shadow */}
        <pattern id="dots" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill="#3D2010" opacity="0.13" />
        </pattern>

        {/* Ground glow */}
        <linearGradient id="groundGlow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C8873A" stopOpacity="0"/>
          <stop offset="100%" stopColor="#C8873A" stopOpacity="0.09"/>
        </linearGradient>

        {/* Clips */}
        <clipPath id="dome-shadow"><rect x="350" y="80" width="94" height="105"/></clipPath>
      </defs>

      {/* ── GROUND ───────────────────────────────────────────────────────── */}
      <rect x="0" y="228" width="1500" height="52" fill="url(#groundGlow)"/>
      <path d="M 0,228 L 1500,228" stroke="#C8A870" strokeWidth="1.4"
            strokeDasharray="6,4" opacity="0.30"/>

      {/* ── PALM TREE 1 ──────────────────────────────────────────────────── */}
      <path d="M 228,228 Q 231,212 235,197" stroke="#6B4520" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
      <path d="M 235,197 C 221,187 215,173 219,169" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      <path d="M 235,197 C 242,183 244,169 240,164" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      <path d="M 235,197 C 248,193 252,183 248,177" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      <path d="M 235,197 C 225,204 219,200 216,193" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>

      {/* ── SULTAN QABOOS GRAND MOSQUE ───────────────────────────────────── */}
      <path d="M 258,228 L 258,90 L 263,79 L 268,90 L 268,228 Z"
            fill="#F0DEC0" stroke="#3D2010" strokeWidth="2.3" strokeLinejoin="round"/>
      <circle cx="263" cy="79" r="5.5" fill="#C8873A" stroke="#3D2010" strokeWidth="1.6"/>
      <path d="M 460,228 L 460,90 L 465,79 L 470,90 L 470,228 Z"
            fill="#F0DEC0" stroke="#3D2010" strokeWidth="2.3" strokeLinejoin="round"/>
      <circle cx="465" cy="79" r="5.5" fill="#C8873A" stroke="#3D2010" strokeWidth="1.6"/>
      <rect x="268" y="168" width="192" height="60" fill="#F0DEC0" stroke="#3D2010" strokeWidth="2.3"/>
      <path d="M 285,168 Q 290,120 329,104 Q 351,93 364,91 Q 377,93 399,104 Q 438,120 443,168 Z"
            fill="#E8D0A8" stroke="#3D2010" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 285,168 Q 290,120 329,104 Q 351,93 364,91 Q 377,93 399,104 Q 438,120 443,168 Z"
            fill="url(#dots)" clipPath="url(#dome-shadow)"/>
      <path d="M 360,91 L 364,78 L 368,91 Z" fill="#C8873A" stroke="#3D2010" strokeWidth="1.6"/>
      <path d="M 285,228 L 285,205 Q 305,187 325,205 L 325,228 Z"
            fill="#E8C89A" stroke="#3D2010" strokeWidth="1.7"/>
      <path d="M 340,228 L 340,205 Q 360,187 380,205 L 380,228 Z"
            fill="#E8C89A" stroke="#3D2010" strokeWidth="1.7"/>
      <path d="M 395,228 L 395,205 Q 415,187 435,205 L 435,228 Z"
            fill="#E8C89A" stroke="#3D2010" strokeWidth="1.7"/>
      <text x="286" y="67" fontFamily="Caveat, cursive" fontSize="15" fill="#5C3A1C" opacity="0.82">Muscat ✦</text>

      {/* ── PALM TREE 2 ──────────────────────────────────────────────────── */}
      <path d="M 487,228 Q 490,212 494,198" stroke="#6B4520" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
      <path d="M 494,198 C 480,188 475,174 479,170" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      <path d="M 494,198 C 502,184 504,170 500,165" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      <path d="M 494,198 C 506,194 510,184 506,178" stroke="#2D6A30" strokeWidth="2.3" strokeLinecap="round" fill="none"/>

      {/* ── NIZWA FORT ───────────────────────────────────────────────────── */}
      <path d="M 512,228 L 512,183 L 552,183 L 552,228 Z"
            fill="#D8C4A0" stroke="#3D2010" strokeWidth="2.0" strokeLinejoin="round"/>
      <path d="M 684,183 L 726,183 L 726,228 L 684,228 Z"
            fill="#D8C4A0" stroke="#3D2010" strokeWidth="2.0" strokeLinejoin="round"/>
      <path d="M 552,228 L 552,113 Q 618,98 684,113 L 684,228 Z"
            fill="#D8C4A0" stroke="#3D2010" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 628,113 Q 666,106 684,113 L 684,228 L 628,228 Z"
            fill="url(#dots)" opacity="0.85"/>
      {[554,571,588,605,622,639,656,671].map((x, i) => (
        <rect key={i} x={x} y={101} width={11} height={14} rx="2"
              fill="#D8C4A0" stroke="#3D2010" strokeWidth="1.6"/>
      ))}
      <path d="M 587,228 L 587,193 Q 618,177 649,193 L 649,228 Z"
            fill="#8C6840" stroke="#3D2010" strokeWidth="1.9"/>
      <text x="569" y="88" fontFamily="Caveat, cursive" fontSize="15" fill="#5C3A1C" opacity="0.82">Nizwa</text>

      {/* ── PALM TREE 3 ──────────────────────────────────────────────────── */}
      <path d="M 741,228 Q 743,214 747,201" stroke="#6B4520" strokeWidth="2.9" strokeLinecap="round" fill="none"/>
      <path d="M 747,201 C 735,191 731,178 735,174" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>
      <path d="M 747,201 C 754,187 756,173 752,168" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>
      <path d="M 747,201 C 758,197 761,188 757,182" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>

      {/* ── JEBEL SHAMS / CANYON ─────────────────────────────────────────── */}
      {[[-55,-38],[-30,-48],[-5,-52],[20,-48],[45,-38],[60,-22],[45,-8]].map(([dx,dy],i) => (
        <line key={i} x1="848" y1="50" x2={848+dx*2} y2={50+dy*2}
              stroke="#C8873A" strokeWidth="1.0" opacity="0.13"/>
      ))}
      <path d="M 768,228 L 808,96 L 832,148 L 848,50 L 854,228 Z"
            fill="#C8B8A4" stroke="#3D2010" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 832,148 L 854,228 L 808,228 Z" fill="url(#dots)" opacity="0.90"/>
      <path d="M 854,228 L 854,50 L 882,94 L 925,150 L 975,228 Z"
            fill="#B8A898" stroke="#3D2010" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 854,50 L 882,94 L 925,150 L 975,228 L 934,228 Z"
            fill="url(#dots)" opacity="0.72"/>
      <line x1="854" y1="50" x2="854" y2="228" stroke="#3D2010" strokeWidth="4.5" strokeLinecap="round" opacity="0.50"/>
      <circle cx="851" cy="50" r="4.5" fill="#3D2010"/>
      <line x1="851" y1="54.5" x2="851" y2="70" stroke="#3D2010" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="851" y1="61" x2="844" y2="67" stroke="#3D2010" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="851" y1="61" x2="858" y2="67" stroke="#3D2010" strokeWidth="1.7" strokeLinecap="round"/>
      <text x="788" y="38" fontFamily="Caveat, cursive" fontSize="13" fill="#5C3A1C" opacity="0.82">Jebel Shams</text>

      {/* ── CAMEL ────────────────────────────────────────────────────────── */}
      <ellipse cx="714" cy="215" rx="23" ry="12" fill="#C8873A" stroke="#3D2010" strokeWidth="1.9"/>
      <path d="M 707,215 Q 709,200 715,198 Q 721,196 725,203 Q 727,210 724,215"
            fill="#C8873A" stroke="#3D2010" strokeWidth="1.9" strokeLinejoin="round"/>
      <path d="M 731,211 Q 738,205 740,197 Q 742,190 739,187 Q 736,185 734,189 Q 733,194 734,201"
            fill="#C8873A" stroke="#3D2010" strokeWidth="1.9" strokeLinejoin="round"/>
      <path d="M 734,189 Q 739,185 743,188 Q 746,192 744,197 L 737,196 Z"
            fill="#C8873A" stroke="#3D2010" strokeWidth="1.7"/>
      <circle cx="742" cy="190" r="1.6" fill="#3D2010"/>
      {[[694,225],[701,225],[720,225],[727,225]].map(([x,y],i) => (
        <line key={i} x1={x} y1={y} x2={x-1} y2={228} stroke="#3D2010" strokeWidth="2.3" strokeLinecap="round"/>
      ))}

      {/* ── WAHIBA DUNES ─────────────────────────────────────────────────── */}
      <path d="M 972,228 Q 1028,163 1085,228 Z"
            fill="#F0C848" stroke="#C89030" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 1028,163 Q 1069,192 1085,228 Z" fill="#D4A825" opacity="0.44"/>
      <path d="M 1052,228 Q 1116,150 1180,228 Z"
            fill="#ECC040" stroke="#C89030" strokeWidth="2.7" strokeLinejoin="round"/>
      <path d="M 1116,150 Q 1160,185 1180,228 Z" fill="#D4A825" opacity="0.44"/>
      <path d="M 1138,228 Q 1173,187 1208,228 Z"
            fill="#E8BC38" stroke="#C89030" strokeWidth="2.3" strokeLinejoin="round"/>
      <path d="M 1173,187 Q 1197,206 1208,228 Z" fill="#D4A825" opacity="0.38"/>
      <path d="M 1112,228 L 1131,205 L 1150,228 Z"
            fill="#FAF0E0" stroke="#3D2010" strokeWidth="1.9" strokeLinejoin="round"/>
      <path d="M 1128,228 L 1132,217 L 1136,228 Z" fill="#8C6840"/>
      <circle cx="1154" cy="227" r="3" fill="#E8A830" opacity="0.72"/>
      <text x="1018" y="148" fontFamily="Caveat, cursive" fontSize="14" fill="#8C6020" opacity="0.88">Wahiba Sands</text>

      {/* ── PALM TREE 4 ──────────────────────────────────────────────────── */}
      <path d="M 1215,228 Q 1217,213 1221,199" stroke="#6B4520" strokeWidth="2.9" strokeLinecap="round" fill="none"/>
      <path d="M 1221,199 C 1208,189 1203,176 1207,172" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>
      <path d="M 1221,199 C 1228,185 1230,171 1226,166" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>
      <path d="M 1221,199 C 1232,196 1235,186 1231,180" stroke="#2D6A30" strokeWidth="2.1" strokeLinecap="round" fill="none"/>

      {/* ── SALALAH GREEN HILLS ── x: 1228→1358, clear of right sea (1360+) */}
      <path d="M 1228,228 Q 1266,106 1304,228 Z"
            fill="#68B858" stroke="#2A6840" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M 1296,228 Q 1326,113 1356,228 Z"
            fill="#58A848" stroke="#2A6840" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d="M 1274,128 Q 1294,140 1304,228 L 1274,228 Z" fill="url(#dots)" opacity="0.48"/>
      <path d="M 1324,140 Q 1340,158 1356,228 L 1324,228 Z" fill="url(#dots)" opacity="0.48"/>
      <circle cx="1248" cy="162" r="11" fill="#2A7848" stroke="#1A5830" strokeWidth="1.9"/>
      <circle cx="1263" cy="154" r="10" fill="#2A7848" stroke="#1A5830" strokeWidth="1.9"/>
      <circle cx="1313" cy="153" r="11" fill="#2A7848" stroke="#1A5830" strokeWidth="1.9"/>
      <circle cx="1328" cy="163" r="9"  fill="#258040" stroke="#1A5830" strokeWidth="1.6"/>
      <text x="1232" y="95" fontFamily="Caveat, cursive" fontSize="14" fill="#2A6840" opacity="0.88">Salalah ✦</text>


      {/* ── SKY: stars, sparkles, moon ───────────────────────────────────── */}
      {[[330,30,2.0],[510,36,1.7],[700,23,2.1],[930,40,1.9],[1112,26,2.1]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="#C8873A" opacity={0.38+i*0.04}/>
      ))}
      <path d="M 460,31 L 460,21 M 455,26 L 465,26" stroke="#C8873A" strokeWidth="1.6" opacity="0.33"/>
      <path d="M 1060,29 L 1060,21 M 1056,25 L 1064,25" stroke="#C8873A" strokeWidth="1.6" opacity="0.33"/>
      <path d="M 1175,24 A 23,23 0 1 0 1175,68 A 16,16 0 1 1 1175,24 Z"
            fill="#FFD878" stroke="#C8873A" strokeWidth="1.6" opacity="0.80"/>
    </svg>
  );
}
