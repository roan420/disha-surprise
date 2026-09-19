import { useState } from 'react';
import Background3D from './components/Background3D';
import SoundController from './components/SoundController';
import ProgressBar from './components/ProgressBar';
import HeroStep from './components/HeroStep';
import QuestionStep from './components/QuestionStep';
import FruitStep from './components/FruitStep';
import PlaceStep from './components/PlaceStep';
import DateStep from './components/DateStep';
import TimeStep from './components/TimeStep';
import CelebrationModal from './components/CelebrationModal';
import RevealStep from './components/RevealStep';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // User selections
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Navigation handlers
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setSelectedFruit(null);
    setSelectedPlace(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(0);
  };

  return (
    <div className="app-container">
      {/* 3D Canvas Background with dynamic intensity */}
      <Background3D mode={currentStep === 0 ? 'hero' : 'subtle'} />

      {/* Header Bar */}
      <header
        style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.5rem 1rem 0.5rem',
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff4d6d, #ffd166)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(255, 77, 109, 0.4)'
            }}
          >
            <Sparkles size={15} color="#fff" />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              fontWeight: '700',
              letterSpacing: '0.01em',
              background: 'linear-gradient(90deg, #fff, #ffd166)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            A Special Plan for Disha
          </span>
        </div>

        {/* Audio Toggle */}
        <SoundController />
      </header>

      {/* Main Interactive Stage */}
      <main
        style={{
          width: '100%',
          maxWidth: '680px',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
          margin: 'auto 0'
        }}
      >
        {/* Progress Bar (Visible across questionnaires) */}
        {currentStep > 0 && currentStep < 6 && (
          <ProgressBar currentStepIndex={currentStep} />
        )}

        {/* Step 0: Welcome 3D Hero */}
        {currentStep === 0 && (
          <HeroStep onNext={handleNext} />
        )}

        {/* Step 1: Big Question with Evasive NO button */}
        {currentStep === 1 && (
          <QuestionStep onNext={handleNext} />
        )}

        {/* Step 2: Fruit Selection */}
        {currentStep === 2 && (
          <FruitStep
            selectedFruit={selectedFruit}
            onSelectFruit={setSelectedFruit}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 3: Place Selection */}
        {currentStep === 3 && (
          <PlaceStep
            selectedPlace={selectedPlace}
            onSelectPlace={setSelectedPlace}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 4: Date Selection */}
        {currentStep === 4 && (
          <DateStep
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 5: Time Selection */}
        {currentStep === 5 && (
          <TimeStep
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            onFinish={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 6: Congratulations Experience Modal */}
        {currentStep === 6 && (
          <CelebrationModal
            selectedFruit={selectedFruit}
            selectedPlace={selectedPlace}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onContinue={handleNext}
          />
        )}

        {/* Step 7: Final Surprise (Bhaiya Prank Reveal & WhatsApp share) */}
        {currentStep === 7 && (
          <RevealStep
            selectedFruit={selectedFruit}
            selectedPlace={selectedPlace}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Subtle Mobile Footer */}
      <footer
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '1rem 0 0.5rem 0',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          zIndex: 20
        }}
      >
        <span>Crafted with love & mischief for Disha ❤️</span>
      </footer>
    </div>
  );
}
