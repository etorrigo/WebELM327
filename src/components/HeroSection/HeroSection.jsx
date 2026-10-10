import React from 'react';
import './HeroSection.css';

export function HeroSection({
  isConnected,
  isTelemetryActive,
  voltage,
  onPairClick,
  onToggleTelemetry
}) {
  return (
    <section className="hero-section">
      {/* Tag Web APIs */}
      <div className="hero-api-badge font-mono">
        <svg className="bt-badge-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.83 7.76l-4.12-4.12a.75.75 0 00-1.28.53v6.71L6.71 8.16a.75.75 0 00-1.06 1.06l3.47 3.47-3.47 3.47a.75.75 0 001.06 1.06l2.72-2.72v6.71a.75.75 0 001.28.53l4.12-4.12a.75.75 0 000-1.06L11.56 13.5l3.27-3.27a.75.75 0 000-1.06z"></path>
        </svg>
        <span className="badge-text">WEB BLUETOOTH & WEB SERIAL</span>
      </div>

      {/* Título Principal */}
      <h2 className="hero-title font-sans">
        DIAGNÓSTICO AUTOMOTIVO DIRETO NO NAVEGADOR{' '}
        <span className="highlight-green">VIA BLUETOOTH ELM327</span>
      </h2>

      {/* Descrição */}
      <p className="hero-description font-sans">
        Livre-se de apps fechados. Estabeleça conexão serial com a ECU veicular direto no navegador com telemetria ao vivo e latência ultra baixa (&lt;25ms).
      </p>

      {/* Quick Stats 3 Colunas */}
      <div className="quick-stats-grid">
        {/* Card 1: BT SPP */}
        <div className="quick-stat-card">
          <div className="stat-header">
            <span className={`stat-dot ${isConnected ? 'active' : ''}`}></span>
            <span className="stat-title font-mono">BT SPP</span>
          </div>
          <span className={`stat-status font-mono ${isConnected ? 'active' : 'inactive'}`}>
            {isConnected ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        {/* Card 2: Bateria */}
        <div className="quick-stat-card">
          <div className="stat-header text-cyan">
            <svg className="battery-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="10" rx="2" ry="2" width="16" x="2" y="7"></rect>
              <line x1="22" x2="22" y1="11" y2="13"></line>
            </svg>
            <span className="stat-title font-mono text-white">{voltage.toFixed(1)}V</span>
          </div>
          <span className="stat-label font-mono text-cyan">Bateria</span>
        </div>

        {/* Card 3: Barramento CAN */}
        <div className="quick-stat-card">
          <div className="stat-header text-sky">
            <svg className="can-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="6" rx="1" width="6" x="4" y="4"></rect>
              <rect height="6" rx="1" width="6" x="14" y="14"></rect>
              <path d="M10 7h4v10"></path>
            </svg>
            <span className="stat-title font-mono">CAN 11B</span>
          </div>
          <span className="stat-label font-mono text-muted">500kbps</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-group">
        <button
          className={`btn-primary-action font-mono ${isConnected ? 'connected-btn' : ''}`}
          onClick={onPairClick}
        >
          <svg className="bt-btn-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.83 7.76l-4.12-4.12a.75.75 0 00-1.28.53v6.71L6.71 8.16a.75.75 0 00-1.06 1.06l3.47 3.47-3.47 3.47a.75.75 0 001.06 1.06l2.72-2.72v6.71a.75.75 0 001.28.53l4.12-4.12a.75.75 0 000-1.06L11.56 13.5l3.27-3.27a.75.75 0 000-1.06z"></path>
          </svg>
          <span>{isConnected ? 'ELM327 CONECTADO' : 'EMPARELHAR ELM327'}</span>
        </button>

        <button
          className="btn-secondary-action font-mono"
          onClick={onToggleTelemetry}
        >
          <svg className="telemetry-btn-icon" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>{isTelemetryActive ? 'PAUSAR TELEMETRIA' : 'VER TELEMETRIA EM TEMPO REAL'}</span>
        </button>
      </div>
    </section>
  );
}
