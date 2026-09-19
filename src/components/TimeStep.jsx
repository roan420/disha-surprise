import { useState } from 'react';
import { TIME_SLOTS } from '../data/options';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, Check, Clock, Sparkles } from 'lucide-react';

export default function TimeStep({ selectedTime, onSelectTime, onFinish, onBack }) {
  const [tiltCardId, setTiltCardId] = useState(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleTimeClick = (slot) => {
    soundEngine.playPop();
    onSelectTime(slot);
  };

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltCardId(id);
    setTiltStyle({
      transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltCardId(null);
    setTiltStyle({
      transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.3s ease-out'
    });
  };

  const handleFinishClick = () => {
    if (!selectedTime) return;
    onFinish();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center step-fade-in py-2 px-2">
      {/* Step Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(157, 78, 221, 0.15)',
          border: '1px solid rgba(157, 78, 221, 0.35)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#c77dff',
          marginBottom: '0.75rem'
        }}
      >
        <Clock size={13} />
        <span>Step 4 of 4 • Perfect Timing</span>
      </div>

      {/* Heading */}
      <h2 className="heading-title" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)' }}>
        What time works for you? ⏰
      </h2>
      <p className="heading-subtitle" style={{ marginBottom: '1.75rem' }}>
        Choose your preferred hours. Timing sets the magical atmosphere!
      </p>

      {/* Time Slot Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '12px',
          width: '100%',
          marginBottom: '2rem'
        }}
      >
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedTime?.id === slot.id;
          const isTilting = tiltCardId === slot.id;

          return (
            <div
              key={slot.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => handleTimeClick(slot)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTimeClick(slot);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, slot.id)}
              onMouseLeave={handleMouseLeave}
              className={`interactive-card ${isSelected ? 'selected' : ''}`}
              style={{
                ...(isTilting ? tiltStyle : {}),
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '1.1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(255, 77, 109, 0.22) 0%, rgba(157, 78, 221, 0.25) 100%)'
                  : 'rgba(25, 17, 43, 0.65)',
                borderColor: isSelected ? 'var(--accent-pink)' : 'rgba(255, 255, 255, 0.12)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    fontSize: '1.8rem',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {slot.emoji}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: isSelected ? '#ffd166' : '#fff',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {slot.time}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      {slot.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                    {slot.desc}
                  </p>
                </div>
              </div>

              {/* Selection Circle */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: isSelected ? '2px solid #ff4d6d' : '2px solid rgba(255, 255, 255, 0.25)',
                  background: isSelected ? '#ff4d6d' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isSelected ? '0 0 10px #ff4d6d' : 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                {isSelected && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>
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
          onClick={handleFinishClick}
          disabled={!selectedTime}
          className="btn-primary"
          style={{ minWidth: '170px' }}
        >
          <Sparkles size={18} />
          <span>Finish ✨</span>
        </button>
      </div>
    </div>
  );
}
