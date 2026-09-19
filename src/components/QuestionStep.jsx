import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { NO_BUTTON_QUIPS } from '../data/options';
import { soundEngine } from '../utils/audio';

export default function QuestionStep({ onNext }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [currentQuip, setCurrentQuip] = useState(null);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const containerRef = useRef(null);

  // Maximum playful attempts before the button surrenders
  const MAX_EVASIONS = 5;
  const hasSurrendered = noAttempts >= MAX_EVASIONS;

  // Function to move the NO button playfully
  const handleEvade = () => {
    if (hasSurrendered) return;

    soundEngine.playBoing();
    const nextAttempts = noAttempts + 1;
    setNoAttempts(nextAttempts);

    // Pick funny quip
    const quipIndex = Math.min(nextAttempts - 1, NO_BUTTON_QUIPS.length - 1);
    setCurrentQuip(NO_BUTTON_QUIPS[quipIndex]);

    // Calculate safe evasion coordinates
    // Ensure it stays comfortably within container bounds
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.floor(Math.random() * 60) + 60; // 60px to 120px
    let newX = Math.cos(angle) * distance;
    let newY = Math.sin(angle) * distance;

    // Viewport clamps
    newX = Math.max(-110, Math.min(110, newX));
    newY = Math.max(-60, Math.min(60, newY));

    setNoPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    if (isYesClicked) return;
    setIsYesClicked(true);
    soundEngine.playFanfare();

    // Joyful Confetti Burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffd166', '#a06cd5']
      });
      // Side burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 200);
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center step-fade-in py-2 px-2"
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          position: 'relative'
        }}
      >
        {/* Animated Question Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 215, 0, 0.12)',
            border: '1px solid rgba(255, 215, 0, 0.35)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#ffd166'
          }}
        >
          <Sparkles size={13} />
          <span>The Big Question</span>
        </div>

        {/* The Question Text */}
        <h2 className="heading-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}>
          Disha, will you go on a special outing with my brother? ❤️
        </h2>

        <p className="heading-subtitle">
          (Carefully crafted for you. Choose wisely! 😉)
        </p>

        {/* Buttons Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.5rem',
            position: 'relative',
            width: '100%',
            minHeight: '120px'
          }}
        >
          {/* YES BUTTON - Grows slightly more appealing with every NO attempt */}
          <button
            type="button"
            onClick={handleYes}
            className="btn-primary"
            style={{
              padding: '0.9rem 2.2rem',
              fontSize: '1.15rem',
              transform: `scale(${1 + Math.min(noAttempts, 5) * 0.04})`,
              boxShadow: isYesClicked
                ? '0 0 35px rgba(255, 77, 109, 0.9)'
                : 'var(--shadow-glow)',
              transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <Heart size={20} fill="#fff" />
            <span>YES ❤️</span>
          </button>

          {/* NO BUTTON - Moves playfully, shrinks, and eventually surrenders */}
          <div
            style={{
              position: 'relative',
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Speech bubble showing playful remarks */}
            {currentQuip && (
              <div className="quip-bubble">
                {currentQuip}
              </div>
            )}

            <button
              type="button"
              onMouseEnter={handleEvade}
              onTouchStart={handleEvade}
              onClick={hasSurrendered ? handleYes : handleEvade}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: hasSurrendered
                  ? 'linear-gradient(135deg, #ffd166, #ff758f)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: hasSurrendered ? '#111' : 'var(--text-secondary)',
                border: hasSurrendered
                  ? '1px solid #ffd166'
                  : '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.75rem 1.4rem',
                borderRadius: '9999px',
                fontSize: hasSurrendered ? '0.95rem' : `${Math.max(0.8, 1 - noAttempts * 0.05)}rem`,
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: hasSurrendered ? '0 0 20px rgba(255, 209, 102, 0.6)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <span>{hasSurrendered ? 'Fine, YES! 🥰' : 'NO 😏'}</span>
            </button>
          </div>
        </div>

        {/* Friendly note */}
        {noAttempts > 0 && (
          <p style={{ fontSize: '0.78rem', color: '#ff758f', marginTop: '0.5rem' }}>
            {noAttempts < MAX_EVASIONS
              ? `Evasion count: ${noAttempts} 😜 That button really doesn't want to be clicked!`
              : 'Resistance is futile! The plan is set in stone! 💖'}
          </p>
        )}
      </div>
    </div>
  );
}
