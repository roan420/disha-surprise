import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { formatDate } from '../data/options';
import { soundEngine } from '../utils/audio';
import { ArrowRight } from 'lucide-react';

export default function CelebrationModal({
  selectedFruit,
  selectedPlace,
  selectedDate,
  selectedTime,
  onContinue
}) {
  useEffect(() => {
    soundEngine.playFanfare();

    // Multi-stage celebratory confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ffd166', '#a06cd5', '#4cc9f0', '#ffffff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const intervalId = setInterval(() => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 45,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 45,
        origin: { x: 1 }
      });
    }, 2200);

    return () => clearInterval(intervalId);
  }, []);

  const handleContinueClick = () => {
    soundEngine.playChime(659.25, 0.3);
    onContinue();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7, 4, 15, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      className="step-fade-in"
    >
      <div
        className="golden-ticket"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: 'clamp(1.75rem, 5vw, 2.5rem) clamp(1.25rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.25rem',
          margin: 'auto'
        }}
      >
        {/* Celebration Trophy/Gift Icon */}
        <div
          className="floating-element"
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffd166, #ff758f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(255, 209, 102, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.15)'
          }}
        >
          <span style={{ fontSize: '2.4rem' }}>🎉</span>
        </div>

        {/* Big Congratulations Title */}
        <div>
          <h2
            className="heading-title"
            style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.4rem)', lineHeight: '1.2' }}
          >
            🎉 CONGRATULATIONS, DISHA! 🎉
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
              color: '#ffb3c1',
              fontWeight: '500',
              marginTop: '8px'
            }}
          >
            You’re officially ready to go with my brother ❤️
          </p>
        </div>

        {/* Curated Itinerary Pass */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px dashed rgba(255, 215, 0, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            textAlign: 'left'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '8px'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', color: '#ffd166', textTransform: 'uppercase' }}>
              ✦ Official Date Plan Ticket
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Pass #DISHA-SPECIAL
            </span>
          </div>

          {/* Fruit Selection Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 77, 109, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedFruit?.emoji || '🍓'}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Fruit
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>
                {selectedFruit?.name || 'Selected Fruit'}
              </span>
            </div>
          </div>

          {/* Place Selection Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(76, 201, 240, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedPlace?.emoji || '📍'}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Place
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>
                {selectedPlace?.name || 'Selected Place'}
              </span>
            </div>
          </div>

          {/* Date Selection Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 209, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📅
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Date
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#ffd166' }}>
                {formatDate(selectedDate)}
              </span>
            </div>
          </div>

          {/* Time Selection Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(157, 78, 221, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedTime?.emoji || '⏰'}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Time
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>
                {selectedTime?.time} ({selectedTime?.label})
              </span>
            </div>
          </div>
        </div>

        {/* Motivational note */}
        <p style={{ fontSize: '1rem', color: '#fff', fontWeight: '500' }}>
          Get ready for a lovely day! ✨
        </p>

        {/* Continue Button */}
        <div style={{ width: '100%', marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={handleContinueClick}
            className="btn-primary"
            style={{ width: '100%', fontSize: '1.1rem' }}
          >
            <span>Continue ❤️</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
