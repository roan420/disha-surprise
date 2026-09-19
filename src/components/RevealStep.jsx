import { useState } from 'react';
import confetti from 'canvas-confetti';
import { formatDate } from '../data/options';
import { soundEngine } from '../utils/audio';
import { Check, Copy, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';

export default function RevealStep({
  selectedFruit,
  selectedPlace,
  selectedDate,
  selectedTime,
  onReset
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const formattedDate = formatDate(selectedDate);

  const handleReveal = () => {
    setIsRevealed(true);
    soundEngine.playFanfare();

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd166', '#ff4d6d', '#7209b7', '#4cc9f0']
      });
    } catch {
      // safe fallback
    }
  };

  const getWhatsAppMessage = () => {
    const text = `Hey Bhaiya! 😂 Look what your secret agent just made me agree to! ❤️

🍓 Fruit: ${selectedFruit?.name || 'Treats'}
📍 Place: ${selectedPlace?.name || 'Somewhere Special'}
📅 Date: ${formattedDate || 'Upcoming'}
⏰ Time: ${selectedTime?.time || 'Soon'}

Now you can't say I didn't pick the plan myself! 😌
Mission accomplished 🎯✨`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppShare = () => {
    soundEngine.playPop();
    const url = `https://wa.me/?text=${getWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = async () => {
    soundEngine.playPop();
    const text = `🎉 Special Plan for Disha 🎉\n🍓 Fruit: ${selectedFruit?.name}\n📍 Place: ${selectedPlace?.name}\n📅 Date: ${formattedDate}\n⏰ Time: ${selectedTime?.time}\n\nAccepted date plan with Bhaiya! 😂❤️`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center step-fade-in py-3 px-2 text-center">
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
        {!isRevealed ? (
          /* Pre-Reveal Teaser Screen */
          <div className="flex flex-col items-center gap-5 w-full">
            <div
              className="floating-element"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a06cd5, #ff4d6d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(160, 108, 213, 0.45)'
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>😏</span>
            </div>

            <h2 className="heading-title" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)' }}>
              Okay Disha… there’s one little thing you should know 😏
            </h2>

            <p className="heading-subtitle">
              Before this plan is locked in stone forever, you must unveil the final secret contract.
            </p>

            <div style={{ marginTop: '1rem', width: '100%' }}>
              <button
                type="button"
                onClick={handleReveal}
                className="btn-primary"
                style={{
                  width: 'min(300px, 100%)',
                  fontSize: '1.15rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #ffd166 0%, #ff4d6d 50%, #9d4edd 100%)',
                  boxShadow: '0 10px 35px rgba(255, 209, 102, 0.4)'
                }}
              >
                <Sparkles size={20} />
                <span>Reveal Surprise 🎁</span>
              </button>
            </div>
          </div>
        ) : (
          /* Post-Reveal Grand Prank Banner */
          <div className="flex flex-col items-center gap-4 w-full step-fade-in">
            {/* Playful Top Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 77, 109, 0.2)',
                border: '1px solid rgba(255, 77, 109, 0.4)',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#ff758f'
              }}
            >
              <span>🎯 Mission Accomplished 🎯</span>
            </div>

            {/* Big Catchphrase */}
            <h2
              className="heading-title"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.7rem)',
                lineHeight: '1.2',
                color: '#fff',
                background: 'linear-gradient(135deg, #ffd166, #ff758f, #e0aaff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              YOU JUST ACCEPTED A DATE PLAN WITH MY BHAIYA 😂❤️
            </h2>

            {/* Banter Subtext */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                width: '100%',
                lineHeight: '1.6'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)',
                  color: '#ffffff',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}
              >
                “Now you can't say you didn't choose the fruit, place, date and time yourself. 😌”
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                All selections are legally binding in the court of fun! ⚖️✨
              </p>
            </div>

            {/* Quick Summary recap */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                width: '100%',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'left' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>SNACK</span>
                <span style={{ fontWeight: '600' }}>{selectedFruit?.emoji} {selectedFruit?.name}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'left' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>DESTINATION</span>
                <span style={{ fontWeight: '600' }}>{selectedPlace?.emoji} {selectedPlace?.name}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'left', gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>SCHEDULE</span>
                <span style={{ fontWeight: '600', color: '#ffd166' }}>📅 {formattedDate} at {selectedTime?.time}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '0.75rem' }}>
              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  width: '100%'
                }}
              >
                <MessageCircle size={20} />
                <span>Send Plan to Bhaiya on WhatsApp 💬</span>
              </button>

              {/* Copy summary & Reset */}
              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  {copiedToast ? <Check size={16} color="#06d6a0" /> : <Copy size={16} />}
                  <span>{copiedToast ? 'Copied! 📋' : 'Copy Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={onReset}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  <RotateCcw size={16} />
                  <span>Start Over</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
