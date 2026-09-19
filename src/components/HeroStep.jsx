import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function HeroStep({ onNext }) {
  const handleBegin = () => {
    soundEngine.playChime(659.25, 0.3);
    onNext();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center step-fade-in py-4 px-2">
      {/* Exclusive Top Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 77, 109, 0.15)',
          border: '1px solid rgba(255, 77, 109, 0.35)',
          padding: '6px 16px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '500',
          color: '#ff758f',
          marginBottom: '1.25rem',
          boxShadow: '0 0 20px rgba(255, 77, 109, 0.2)'
        }}
      >
        <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
        <span>A Secret Invitation For You</span>
      </div>

      {/* Main Glass Card */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          padding: 'clamp(2rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2.25rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          position: 'relative'
        }}
      >
        {/* Floating 3D Heart / Gift Icon Badge */}
        <div
          className="floating-element"
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ff758f, #9d4edd 70%, #3a0ca3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 35px rgba(255, 77, 109, 0.45), 0 0 0 4px rgba(255, 255, 255, 0.15)',
            marginBottom: '0.5rem',
            position: 'relative'
          }}
        >
          <Heart size={44} color="#ffffff" fill="#ffffff" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }} />
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '12px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#fff',
              filter: 'blur(1px)'
            }}
          />
        </div>

        {/* Title */}
        <h1 className="heading-title">
          Welcome, Disha ❤️
        </h1>

        {/* Subtitle */}
        <p className="heading-subtitle">
          I have a tiny surprise for you… An unexpected adventure has been prepared just for you.
        </p>

        {/* Action Button */}
        <div style={{ marginTop: '1.25rem', width: '100%' }}>
          <button
            type="button"
            onClick={handleBegin}
            className="btn-primary"
            style={{ width: 'min(300px, 100%)', fontSize: '1.1rem' }}
          >
            <span>Let's Begin ✨</span>
          </button>
        </div>

        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginTop: '0.5rem'
          }}
        >
          ✨ Best experienced with sound on • Tap sound icon above
        </p>
      </div>
    </div>
  );
}
