import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function SoundController() {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggle = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`sound-toggle-btn ${!isMuted ? 'active' : ''}`}
      aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
      title={isMuted ? 'Click to enable sound effects' : 'Sound effects active'}
    >
      {isMuted ? (
        <VolumeX size={14} className="text-muted" />
      ) : (
        <Volume2 size={14} className="text-pink animate-pulse" />
      )}
      <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
      <span className={`indicator-dot ${!isMuted ? 'active' : ''}`} />
    </button>
  );
}
