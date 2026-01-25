import React from 'react';

const MeasurementNote: React.FC = () => {
  return (
    <div className="text-[var(--color-text-muted)] text-xs leading-relaxed space-y-1 mt-6">
      <p>Directional + anonymized where appropriate.</p>
      <p>Platform-reported metrics with GA4 validation where available.</p>
    </div>
  );
};

export default MeasurementNote;
