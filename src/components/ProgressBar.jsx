import { Check } from 'lucide-react';

const STEPS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'question', label: 'Question' },
  { id: 'fruit', label: 'Fruit' },
  { id: 'place', label: 'Place' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Time' },
  { id: 'surprise', label: 'Surprise' }
];

export default function ProgressBar({ currentStepIndex = 0 }) {
  // If in welcome (0), progress is subtle
  const percent = Math.round((currentStepIndex / (STEPS.length - 1)) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-5 px-3 select-none">
      {/* Progress track bar */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          height: '4px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '10px'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #ff4d6d, #ffd166)',
            borderRadius: '9999px',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(255, 77, 109, 0.5)'
          }}
        />
      </div>

      {/* Elegant step dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div
                style={{
                  width: isCurrent ? '20px' : '14px',
                  height: isCurrent ? '20px' : '14px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCompleted
                    ? 'linear-gradient(135deg, #06d6a0, #048a66)'
                    : isCurrent
                    ? 'linear-gradient(135deg, #ff4d6d, #9d4edd)'
                    : 'rgba(255, 255, 255, 0.12)',
                  border: isCurrent
                    ? '2px solid rgba(255, 255, 255, 0.9)'
                    : isCompleted
                    ? '1px solid rgba(6, 214, 160, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isCurrent
                    ? '0 0 14px rgba(255, 77, 109, 0.7)'
                    : isCompleted
                    ? '0 0 8px rgba(6, 214, 160, 0.4)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCompleted ? (
                  <Check size={9} color="#fff" strokeWidth={3} />
                ) : isCurrent ? (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#fff',
                      display: 'block'
                    }}
                  />
                ) : null}
              </div>

              {/* Step label on medium+ screens */}
              <span
                className="hidden sm:block"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: isCurrent ? '600' : '400',
                  color: isCurrent
                    ? '#ff758f'
                    : isCompleted
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'rgba(255, 255, 255, 0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s'
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
