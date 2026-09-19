import { useState, useMemo } from 'react';
import { getPresetDates, formatDate } from '../data/options';
import { soundEngine } from '../utils/audio';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DateStep({ selectedDate, onSelectDate, onNext, onBack }) {
  const presets = useMemo(() => getPresetDates(), []);

  // Today reference normalized to midnight for calendar comparison
  const todayMidnight = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
  }, []);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const minDateStr = useMemo(() => tomorrow.toISOString().split('T')[0], [tomorrow]);

  const initialViewDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : tomorrow;
  const [viewYear, setViewYear] = useState(initialViewDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialViewDate.getMonth()); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar days calculation
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const days = [];
    // Padding before 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isPast = dateObj.getTime() < todayMidnight;

      days.push({
        dayNumber: d,
        dateString: ymd,
        isPast
      });
    }
    return days;
  }, [viewYear, viewMonth, todayMidnight]);

  const handlePrevMonth = () => {
    soundEngine.playPop();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    soundEngine.playPop();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDaySelect = (dayObj) => {
    if (!dayObj || dayObj.isPast) return;
    soundEngine.playPop();
    onSelectDate(dayObj.dateString);
  };

  const handlePresetSelect = (preset) => {
    soundEngine.playPop();
    onSelectDate(preset.dateValue);
    const d = new Date(preset.dateValue + 'T00:00:00');
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const handleNativeChange = (e) => {
    const val = e.target.value;
    if (val) {
      soundEngine.playPop();
      onSelectDate(val);
      const d = new Date(val + 'T00:00:00');
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  };

  const handleNextClick = () => {
    if (!selectedDate) return;
    soundEngine.playChime(784);
    onNext();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center step-fade-in py-2 px-2">
      {/* Step Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 209, 102, 0.15)',
          border: '1px solid rgba(255, 209, 102, 0.35)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#ffd166',
          marginBottom: '0.75rem'
        }}
      >
        <CalendarIcon size={13} />
        <span>Step 3 of 4 • Special Day</span>
      </div>

      {/* Heading */}
      <h2 className="heading-title" style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)' }}>
        When should we make it happen? 📅
      </h2>
      <p className="heading-subtitle" style={{ marginBottom: '1.25rem' }}>
        Select a date that works best for your schedule.
      </p>

      {/* Quick Presets */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          width: '100%'
        }}
      >
        {presets.map((preset) => {
          const isActive = selectedDate === preset.dateValue;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className={`date-chip ${isActive ? 'active' : ''}`}
            >
              <span>{preset.label}</span>
              <span style={{ opacity: 0.7, fontSize: '0.75rem', marginLeft: '4px' }}>
                ({preset.displayDate})
              </span>
            </button>
          );
        })}
      </div>

      {/* Glassmorphic Calendar Card */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.25rem'
        }}
      >
        {/* Month Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 0.5rem 1rem 0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
            aria-label="Previous Month"
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontWeight: '600', fontSize: '1.05rem', color: '#fff' }}>
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
            aria-label="Next Month"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days of Week Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            width: '100%',
            textAlign: 'center',
            padding: '0.75rem 0 0.4rem 0',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--text-muted)'
          }}
        >
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid Days */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          {calendarDays.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} style={{ height: '36px' }} />;
            }

            const isSelected = selectedDate === day.dateString;

            return (
              <button
                key={day.dateString}
                type="button"
                disabled={day.isPast}
                onClick={() => handleDaySelect(day)}
                style={{
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: day.isPast
                    ? 'rgba(255, 255, 255, 0.2)'
                    : isSelected
                    ? '#ffffff'
                    : 'rgba(255, 255, 255, 0.85)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #ff4d6d, #9d4edd)'
                    : 'transparent',
                  border: isSelected ? '1px solid #fff' : 'none',
                  boxShadow: isSelected ? '0 0 14px rgba(255, 77, 109, 0.6)' : 'none',
                  cursor: day.isPast ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {day.dayNumber}
              </button>
            );
          })}
        </div>

        {/* Native Date Input underneath for accessibility & rapid mobile selection */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <label htmlFor="native-date-input" style={{ cursor: 'pointer' }}>
            Or pick from system calendar:
          </label>
          <input
            id="native-date-input"
            type="date"
            min={minDateStr}
            value={selectedDate || ''}
            onChange={handleNativeChange}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '4px 8px',
              color: '#fff',
              fontSize: '0.8rem',
              colorScheme: 'dark',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      {/* Selected Date Confirmation Banner */}
      {selectedDate && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.15), rgba(157, 78, 221, 0.15))',
            border: '1px solid rgba(255, 77, 109, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            maxWidth: '580px',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>✨</span>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Confirmed Date
            </span>
            <span style={{ fontSize: '0.98rem', fontWeight: '600', color: '#ffd166' }}>
              {formatDate(selectedDate)}
            </span>
          </div>
        </div>
      )}

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
          disabled={!selectedDate}
          className="btn-primary"
          style={{ minWidth: '170px' }}
        >
          <span>Choose Time</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
