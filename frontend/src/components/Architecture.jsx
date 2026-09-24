import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';

export default function Architecture() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    checkBackendHealth().then(setHealth);
  }, []);

  return (
    <section id="architecture" className="section" style={{ background: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="section-label">SYSTEM ARCHITECTURE</div>
        <h2 className="section-title">
          WHY THIS PORTFOLIO IS <span className="accent">FULL STACK</span>
        </h2>

        <p style={{ color: 'var(--text-muted)', maxWidth: '780px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          This portfolio is not just a static showcase — it is a production-grade decoupled web application demonstrating true full-stack software development. Project data is dynamically served via Django REST APIs from a MySQL database, with a Django Admin portal for content management and contact submission tracking.
        </p>

        <div className="architecture-box">
          <div className="architecture-grid">
            {/* Layer 1 */}
            <div className="architecture-node">
              <div className="arch-layer-label">CLIENT LAYER</div>
              <div className="arch-tech-name">React.js</div>
              <div className="arch-detail">Component-driven UI, modern CSS design system & client-side routing.</div>
            </div>

            {/* Layer 2 */}
            <div className="architecture-node">
              <div className="arch-layer-label">API LAYER</div>
              <div className="arch-tech-name">Django REST</div>
              <div className="arch-detail">RESTful JSON endpoints, CORS middleware, serializers & request validation.</div>
            </div>

            {/* Layer 3 */}
            <div className="architecture-node">
              <div className="arch-layer-label">DATA LAYER</div>
              <div className="arch-tech-name">MySQL DB</div>
              <div className="arch-detail">Relational schema, indexing, transactions & Django ORM integration on Port 3307.</div>
            </div>

            {/* Layer 4 */}
            <div className="architecture-node">
              <div className="arch-layer-label">ADMIN LAYER</div>
              <div className="arch-tech-name">Django Admin</div>
              <div className="arch-detail">Secure portal for adding/editing projects, screenshots & reading incoming messages.</div>
            </div>
          </div>

          <div className="crimson-divider"></div>

          {/* Live API Health & Connection Ping */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span className="status-dot"></span>
              <span style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                API Status: {health ? health.status : 'Connecting to Django API...'}
              </span>
            </div>

            {health && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Database: <strong style={{ color: 'var(--crimson-accent)' }}>{health.database_engine}</strong> | Status: <strong style={{ color: '#4ade80' }}>{health.database_status}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
