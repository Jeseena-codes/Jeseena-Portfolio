import React, { useState, useEffect } from 'react';
import { getWorkProcess, FALLBACK_PROCESS } from '../services/api';

export default function WorkProcess() {
  const [steps, setSteps] = useState(FALLBACK_PROCESS);

  useEffect(() => {
    getWorkProcess().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setSteps(data);
      }
    });
  }, []);

  return (
    <section id="process" className="section" style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0e12 100%)' }}>
      <div className="container">
        <div className="section-label">METHODOLOGY</div>
        <h2 className="section-title">
          HOW I <span className="accent">WORK</span>
        </h2>

        <div className="process-steps-container">
          {steps.map((step) => (
            <div key={step.id || step.step_number} className="process-step-card">
              <div className="process-step-badge">
                <span className="process-number">{step.step_number}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>STEP</span>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
