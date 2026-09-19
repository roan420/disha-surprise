import { useState } from 'react';
import { FRUITS } from '../data/options';
import FruitVisual from './FruitVisual';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function FruitStep({ selectedFruit, onSelectFruit, onNext, onBack }) {
  const [tiltCardId, setTiltCardId] = useState(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleCardClick = (fruit) => {
    soundEngine.playPop();
    onSelectFruit(fruit);
  };

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltCardId(id);
    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltCardId(null);
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.3s ease-out'
    });
  };

  const handleNextClick = () => {
    if (!selectedFruit) return;
    soundEngine.playChime(784);
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center step-fade-in py-2 px-2">
      {/* Step Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 77, 109, 0.15)',
          border: '1px solid rgba(255, 77, 109, 0.35)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#ff758f',
          marginBottom: '0.75rem'
        }}
      >
        <Sparkles size={13} />
        <span>Step 1 of 4 • Royal Treats</span>
      </div>

      {/* Main Heading */}
      <h2 className="heading-title" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)' }}>
        First things first… what should we have? 🍓
      </h2>
      <p className="heading-subtitle" style={{ marginBottom: '1.5rem' }}>
        Pick your favorite treat for the outing. Every grand plan begins with something sweet!
      </p>

      {/* 6 Fruit Cards Grid */}
      <div className="grid-cards mb-6">
        {FRUITS.map((fruit) => {
          const isSelected = selectedFruit?.id === fruit.id;
          const isTilting = tiltCardId === fruit.id;

          return (
            <div
              key={fruit.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => handleCardClick(fruit)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(fruit);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, fruit.id)}
              onMouseLeave={handleMouseLeave}
              className={`interactive-card ${isSelected ? 'selected' : ''}`}
              style={{
                ...(isTilting ? tiltStyle : {}),
                background: isSelected ? fruit.bgGradient : 'rgba(25, 17, 43, 0.65)',
                borderColor: isSelected ? fruit.borderColor : 'rgba(255, 255, 255, 0.12)'
              }}
            >
              {/* Checkmark indicator badge */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: fruit.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 10px ${fruit.accent}`
                  }}
                >
                  <Check size={14} color="#fff" strokeWidth={3} />
                </div>
              )}

              {/* 3D Rendered Fruit Vector */}
              <div style={{ marginBottom: '0.75rem', transform: isSelected ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.25s' }}>
                <FruitVisual fruitId={fruit.id} />
              </div>

              {/* Fruit Name */}
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '4px'
                }}
              >
                {fruit.name}
              </h3>

              {/* Tagline */}
              <p
                style={{
                  fontSize: '0.78rem',
                  color: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-muted)',
                  lineHeight: '1.3'
                }}
              >
                {fruit.tagline}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '580px',
          gap: '1rem',
          padding: '0.5rem 0'
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          disabled={!selectedFruit}
          className="btn-primary"
          style={{ minWidth: '150px' }}
        >
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
