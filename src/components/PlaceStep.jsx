import { useState } from 'react';
import { PLACES } from '../data/options';
import PlaceVisual from './PlaceVisual';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react';

export default function PlaceStep({ selectedPlace, onSelectPlace, onNext, onBack }) {
  const [tiltCardId, setTiltCardId] = useState(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleCardClick = (place) => {
    soundEngine.playPop();
    onSelectPlace(place);
  };

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

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
    if (!selectedPlace) return;
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
          background: 'rgba(76, 201, 240, 0.15)',
          border: '1px solid rgba(76, 201, 240, 0.35)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#4cc9f0',
          marginBottom: '0.75rem'
        }}
      >
        <MapPin size={13} />
        <span>Step 2 of 4 • Destination</span>
      </div>

      {/* Main Heading */}
      <h2 className="heading-title" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)' }}>
        Where should we go? 📍
      </h2>
      <p className="heading-subtitle" style={{ marginBottom: '1.5rem' }}>
        Select your ideal vibe. Every destination is ready to welcome you!
      </p>

      {/* 6 Place Cards Grid */}
      <div className="grid-cards mb-6">
        {PLACES.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          const isTilting = tiltCardId === place.id;

          return (
            <div
              key={place.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => handleCardClick(place)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(place);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, place.id)}
              onMouseLeave={handleMouseLeave}
              className={`interactive-card ${isSelected ? 'selected' : ''}`}
              style={{
                ...(isTilting ? tiltStyle : {}),
                background: isSelected ? place.bgGradient : 'rgba(25, 17, 43, 0.65)',
                borderColor: isSelected ? place.borderColor : 'rgba(255, 255, 255, 0.12)',
                padding: '0.85rem'
              }}
            >
              {/* Checkmark indicator badge */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: place.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 10px ${place.accent}`,
                    zIndex: 10
                  }}
                >
                  <Check size={14} color="#fff" strokeWidth={3} />
                </div>
              )}

              {/* Cinematic Vector Visual */}
              <div style={{ width: '100%', marginBottom: '0.75rem' }}>
                <PlaceVisual placeId={place.id} />
              </div>

              {/* Place Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.1rem' }}>{place.emoji}</span>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  {place.name}
                </h3>
              </div>

              {/* Tagline */}
              <p
                style={{
                  fontSize: '0.75rem',
                  color: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-muted)',
                  lineHeight: '1.3'
                }}
              >
                {place.tagline}
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
          disabled={!selectedPlace}
          className="btn-primary"
          style={{ minWidth: '170px' }}
        >
          <span>Choose Date</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
