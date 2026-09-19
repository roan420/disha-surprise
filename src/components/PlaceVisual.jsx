/**
 * Original cinematic vector visuals for destination cards.
 * Custom SVG illustrations with layered gradients and lighting effects.
 */

export default function PlaceVisual({ placeId }) {
  switch (placeId) {
    case 'beach':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="beachSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b2d42" />
              <stop offset="50%" stopColor="#f77f00" />
              <stop offset="100%" stopColor="#fcbf49" />
            </linearGradient>
            <linearGradient id="beachWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0077b6" />
              <stop offset="60%" stopColor="#0096c7" />
              <stop offset="100%" stopColor="#48cae4" />
            </linearGradient>
          </defs>
          <rect width="120" height="75" fill="url(#beachSky)" />
          {/* Sunset Sun */}
          <circle cx="60" cy="40" r="16" fill="#ffe49e" opacity="0.9" />
          {/* Ocean Waves */}
          <path d="M0,48 Q30,45 60,48 T120,48 L120,75 L0,75 Z" fill="url(#beachWater)" />
          {/* Wave crest highlights */}
          <path d="M10,54 Q35,51 60,54 T110,54" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
          <path d="M5,62 Q45,59 85,62 T120,62" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
          {/* Palm Silhouette */}
          <path d="M110,75 Q106,55 98,46" stroke="#1d2d44" strokeWidth="2.5" fill="none" />
          <path d="M98,46 Q86,42 80,48 M98,46 Q90,36 84,38 M98,46 Q108,36 112,42 M98,46 Q104,40 108,48" stroke="#1d2d44" strokeWidth="1.8" fill="none" />
        </svg>
      );

    case 'nature_park':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#132a13" />
              <stop offset="60%" stopColor="#31572c" />
              <stop offset="100%" stopColor="#90a955" />
            </linearGradient>
          </defs>
          <rect width="120" height="75" fill="url(#forestSky)" />
          {/* Background Pines */}
          <polygon points="25,50 15,65 35,65" fill="#1b4332" />
          <polygon points="55,42 42,65 68,65" fill="#132a13" />
          <polygon points="90,46 78,65 102,65" fill="#2d6a4f" />
          {/* Foreground Hill */}
          <path d="M0,58 Q60,46 120,58 L120,75 L0,75 Z" fill="#2d6a4f" />
          {/* Winding Trail */}
          <path d="M50,75 Q58,62 62,54" stroke="#ecf39e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          {/* Firefly Sparkles */}
          {[[30, 36], [68, 30], [85, 40], [42, 48]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#ffff3f" opacity="0.9" />
          ))}
        </svg>
      );

    case 'adventure_park':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="carnivalSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#240046" />
              <stop offset="60%" stopColor="#5a189a" />
              <stop offset="100%" stopColor="#ff006e" />
            </linearGradient>
          </defs>
          <rect width="120" height="75" fill="url(#carnivalSky)" />
          {/* Ferris Wheel Silhouette */}
          <g transform="translate(60, 42)">
            <circle r="22" stroke="#ffbe0b" strokeWidth="1.5" fill="none" opacity="0.8" />
            <line x1="-22" y1="0" x2="22" y2="0" stroke="#ffbe0b" strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="#ffbe0b" strokeWidth="1" opacity="0.6" />
            <line x1="-15" y1="-15" x2="15" y2="15" stroke="#ffbe0b" strokeWidth="1" opacity="0.6" />
            <line x1="15" y1="-15" x2="-15" y2="15" stroke="#ffbe0b" strokeWidth="1" opacity="0.6" />
            <circle r="3" fill="#ffbe0b" />
            <polygon points="-12,33 0,0 12,33" stroke="#ffbe0b" strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>
          {/* Rollercoaster Loops */}
          <path d="M0,60 Q30,20 45,50 T90,55 T120,40" stroke="#00f5d4" strokeWidth="2" fill="none" opacity="0.9" />
          {/* Ground Silhouette */}
          <rect y="68" width="120" height="7" fill="#10002b" />
        </svg>
      );

    case 'cafe':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="cafeAtmosphere" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d2b1f" />
              <stop offset="50%" stopColor="#6f4e37" />
              <stop offset="100%" stopColor="#231709" />
            </linearGradient>
            <radialGradient id="lampGlow" cx="50%" cy="15%" r="60%">
              <stop offset="0%" stopColor="#ffea00" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#ffb703" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="120" height="75" fill="url(#cafeAtmosphere)" />
          {/* Hanging Lamp & Warm Glow */}
          <line x1="60" y1="0" x2="60" y2="18" stroke="#cca47c" strokeWidth="1.5" />
          <polygon points="52,24 68,24 64,18 56,18" fill="#cca47c" />
          <circle cx="60" cy="24" r="28" fill="url(#lampGlow)" />
          {/* Cafe Table */}
          <ellipse cx="60" cy="62" rx="38" ry="10" fill="#a47148" />
          <ellipse cx="60" cy="60" rx="38" ry="10" fill="#c68b59" />
          {/* Coffee Cup & Saucer */}
          <ellipse cx="60" cy="56" rx="10" ry="3" fill="#ffffff" />
          <path d="M54,54 C54,50 66,50 66,54 L64,57 L56,57 Z" fill="#ffffff" />
          {/* Steam curls */}
          <path d="M58,47 Q56,43 59,40" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M62,46 Q64,42 61,39" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'movie':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="cinemaLight" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#0a0908" />
              <stop offset="50%" stopColor="#22333b" />
              <stop offset="100%" stopColor="#5e503f" />
            </linearGradient>
            <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="120" height="75" fill="url(#cinemaLight)" />
          {/* Projector Light Beam */}
          <polygon points="10,12 115,10 115,58 10,18" fill="url(#beam)" />
          {/* Screen with Heart Movie */}
          <rect x="95" y="10" width="22" height="48" rx="2" fill="#e0e1dd" opacity="0.85" />
          <path d="M106,30 C104,26 99,26 99,31 C99,35 106,39 106,39 C106,39 113,35 113,31 C113,26 108,26 106,30 Z" fill="#e63946" />
          {/* Velvet Lounge Seats Silhouette */}
          <path d="M10,75 L10,58 Q24,56 38,58 L38,75 Z" fill="#780000" />
          <path d="M42,75 L42,58 Q56,56 70,58 L70,75 Z" fill="#9e2a2b" />
          <path d="M74,75 L74,58 Q88,56 102,58 L102,75 Z" fill="#780000" />
        </svg>
      );

    case 'city_evening':
      return (
        <svg viewBox="0 0 120 75" width="100%" height="75" className="rounded-lg overflow-hidden">
          <defs>
            <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b091a" />
              <stop offset="60%" stopColor="#240046" />
              <stop offset="100%" stopColor="#7209b7" />
            </linearGradient>
          </defs>
          <rect width="120" height="75" fill="url(#nightSky)" />
          {/* Moon */}
          <circle cx="95" cy="18" r="8" fill="#ffd166" />
          <circle cx="98" cy="16" r="7" fill="#0b091a" />
          {/* Distant skyline buildings */}
          <rect x="8" y="32" width="16" height="43" fill="#1b1435" />
          <rect x="28" y="24" width="20" height="51" fill="#2d1e56" />
          <polygon points="38,12 30,24 46,24" fill="#2d1e56" />
          <rect x="52" y="36" width="18" height="39" fill="#1b1435" />
          <rect x="74" y="28" width="22" height="47" fill="#2d1e56" />
          <rect x="100" y="38" width="16" height="37" fill="#1b1435" />
          {/* Lit Windows */}
          {[[12, 38], [16, 44], [32, 28], [36, 36], [42, 42], [56, 42], [78, 34], [84, 40], [80, 48]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="2.5" height="3.5" fill="#ffd166" opacity="0.85" />
          ))}
          {/* Rooftop rail foreground */}
          <line x1="0" y1="70" x2="120" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        </svg>
      );

    default:
      return null;
  }
}
