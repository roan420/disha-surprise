/**
 * Custom-crafted 3D-styled SVG fruit illustrations with rich gradients,
 * specular highlights, and ambient glow. 100% vector, zero external dependencies.
 */

export default function FruitVisual({ fruitId }) {
  switch (fruitId) {
    case 'strawberry':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <radialGradient id="berryGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff758f" />
              <stop offset="50%" stopColor="#e60049" />
              <stop offset="100%" stopColor="#800020" />
            </radialGradient>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#70e000" />
              <stop offset="100%" stopColor="#007200" />
            </linearGradient>
            <filter id="glowBerry" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ff4d6d" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Strawberry Body */}
          <path
            d="M50,90 C25,78 16,56 18,36 C20,20 40,24 50,30 C60,24 80,20 82,36 C84,56 75,78 50,90 Z"
            fill="url(#berryGrad)"
            filter="url(#glowBerry)"
          />
          {/* Highlight sheen */}
          <ellipse cx="36" cy="40" rx="8" ry="14" transform="rotate(-20 36 40)" fill="rgba(255, 255, 255, 0.45)" />
          {/* Seeds */}
          {[[34,54], [48,46], [62,44], [38,70], [52,66], [64,62], [48,80], [30,42], [68,52]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="1.8" ry="2.8" fill="#ffd166" transform={`rotate(10 ${x} ${y})`} />
          ))}
          {/* Green Calyx / Leaves */}
          <path d="M50,28 C46,18 36,16 28,20 C36,26 44,28 50,28 Z" fill="url(#leafGrad)" />
          <path d="M50,28 C54,18 64,16 72,20 C64,26 56,28 50,28 Z" fill="url(#leafGrad)" />
          <path d="M50,28 C50,14 44,12 42,10 C46,18 48,24 50,28 Z" fill="url(#leafGrad)" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <radialGradient id="mangoGrad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffea00" />
              <stop offset="55%" stopColor="#ff9100" />
              <stop offset="100%" stopColor="#d00000" />
            </radialGradient>
            <linearGradient id="mangoLeaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#55a630" />
              <stop offset="100%" stopColor="#2b9348" />
            </linearGradient>
          </defs>
          {/* Mango Body */}
          <path
            d="M48,18 C68,14 88,32 84,60 C80,82 56,92 40,86 C24,80 18,58 24,38 C28,24 38,19 48,18 Z"
            fill="url(#mangoGrad)"
          />
          {/* Soft Highlight */}
          <ellipse cx="44" cy="36" rx="12" ry="20" transform="rotate(-25 44 36)" fill="rgba(255, 255, 255, 0.35)" />
          {/* Leaf and Stem */}
          <path d="M48,18 C46,8 52,4 58,2 C56,10 52,14 48,18 Z" fill="#8a5a36" />
          <path d="M49,14 C62,8 74,10 82,18 C72,20 60,18 49,14 Z" fill="url(#mangoLeaf)" />
        </svg>
      );

    case 'watermelon':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <linearGradient id="melonRind" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1b4332" />
              <stop offset="100%" stopColor="#2d6a4f" />
            </linearGradient>
            <radialGradient id="melonFlesh" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="85%" stopColor="#d90429" />
              <stop offset="100%" stopColor="#fff0f3" />
            </radialGradient>
          </defs>
          {/* Outer Rind */}
          <path d="M12,42 C18,80 82,80 88,42 Z" fill="url(#melonRind)" />
          {/* Inner White layer */}
          <path d="M16,42 C21,74 79,74 84,42 Z" fill="#e9edc9" />
          {/* Red Flesh */}
          <path d="M20,42 C24,68 76,68 80,42 Z" fill="url(#melonFlesh)" />
          {/* Black Seeds */}
          {[[36, 48], [48, 54], [62, 48], [42, 60], [56, 60]].map(([x, y], i) => (
            <path key={i} d={`M${x},${y} Q${x+2},${y-4} ${x},${y-5} Q${x-2},${y-4} ${x},${y} Z`} fill="#1f1f1f" />
          ))}
          {/* Glossy sheen */}
          <ellipse cx="32" cy="46" rx="6" ry="2" fill="rgba(255, 255, 255, 0.45)" />
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="60%" stopColor="#c1121f" />
              <stop offset="100%" stopColor="#660708" />
            </radialGradient>
            <linearGradient id="appleLeaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#70e000" />
              <stop offset="100%" stopColor="#38b000" />
            </linearGradient>
          </defs>
          {/* Apple Silhouette */}
          <path
            d="M50,30 C44,22 24,22 18,40 C12,58 24,84 46,88 C49,88.5 51,88.5 54,88 C76,84 88,58 82,40 C76,22 56,22 50,30 Z"
            fill="url(#appleGrad)"
          />
          {/* Specular curved sheen */}
          <path d="M28,38 C24,48 24,62 30,70" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Stem and Leaf */}
          <path d="M50,30 C50,22 54,14 56,10" stroke="#7f4f24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M54,16 C66,12 72,16 70,22 C62,24 56,20 54,16 Z" fill="url(#appleLeaf)" />
        </svg>
      );

    case 'orange':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffd166" />
              <stop offset="45%" stopColor="#fb8500" />
              <stop offset="100%" stopColor="#d9480f" />
            </radialGradient>
          </defs>
          {/* Orange Body */}
          <circle cx="50" cy="52" r="36" fill="url(#orangeGrad)" />
          {/* Specular Crescent */}
          <ellipse cx="38" cy="38" rx="8" ry="14" transform="rotate(-30 38 38)" fill="rgba(255, 255, 255, 0.45)" />
          {/* Leaf & stem */}
          <path d="M50,16 C51,12 53,8 54,6" stroke="#583101" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M51,14 C62,8 70,12 68,18 C60,19 54,17 51,14 Z" fill="#52b788" />
        </svg>
      );

    case 'grapes':
      return (
        <svg viewBox="0 0 100 100" width="76" height="76" className="drop-shadow-lg">
          <defs>
            <radialGradient id="grapeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e0aaff" />
              <stop offset="50%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#3c096c" />
            </radialGradient>
          </defs>
          {/* Stem & tendril */}
          <path d="M50,22 C48,14 44,10 40,8" stroke="#7f4f24" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50,18 C60,14 62,20 68,18" stroke="#52b788" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Cluster of Grapes */}
          {[
            [38, 32], [50, 30], [62, 32],
            [32, 44], [44, 42], [56, 42], [68, 44],
            [38, 56], [50, 54], [62, 56],
            [44, 68], [56, 68],
            [50, 78]
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="url(#grapeGrad)" />
              <circle cx={x - 2.5} cy={y - 2.5} r="2.5" fill="rgba(255, 255, 255, 0.5)" />
            </g>
          ))}
        </svg>
      );

    default:
      return null;
  }
}
