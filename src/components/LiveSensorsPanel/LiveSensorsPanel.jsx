import React from 'react';
import './LiveSensorsPanel.css';

export function LiveSensorsPanel({ telemetry, isStreaming }) {
  const { rpm, speed, temp, battery, tps, load } = telemetry;
  const rpmPercent = Math.min(Math.round((rpm / 8000) * 100), 100);

  return (
    <section className="live-sensors-panel" id="sensores">
      {/* Header da seção */}
      <div className="panel-header">
        <div className="panel-header-title">
          <span className={`panel-ping-dot ${isStreaming ? 'ping-anim' : ''}`}></span>
          <h3 className="panel-title font-mono">Mostradores de Bordo (PIDs)</h3>
        </div>
        <span className={`live-badge font-mono ${isStreaming ? 'active' : ''}`}>
          {isStreaming ? 'LIVE STREAM' : 'PAUSADO'}
        </span>
      </div>

      {/* Grid de Gauges (2 Colunas) */}
      <div className="sensors-grid">
        {/* RPM Gauge Card */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">RPM MOTOR (010C)</span>
            <span className="sensor-range font-mono text-cyan">0-8000</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value">{rpm}</span>
              <span className="sensor-unit font-sans">RPM</span>
            </div>
            {/* Barra de RPM Gradiente */}
            <div className="sensor-bar-bg">
              <div
                className="sensor-bar-fill rpm-gradient"
                style={{ width: `${rpmPercent}%` }}
              ></div>
            </div>
          </div>
          <span className="sensor-hint font-mono">Tempo de injeção ativo</span>
        </div>

        {/* Velocidade Card */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">VELOCIDADE (010D)</span>
            <span className="sensor-range font-mono text-cyan">KM/H</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value">{speed}</span>
              <span className="sensor-unit font-sans">km/h</span>
            </div>
            {/* Barras de tendência */}
            <div className="trend-bars">
              <span className="t-bar b1"></span>
              <span className="t-bar b2"></span>
              <span className="t-bar b3"></span>
              <span className="t-bar b4"></span>
              <span className="t-bar b5"></span>
              <span className="t-bar b6"></span>
            </div>
          </div>
          <span className="sensor-hint-trend font-mono text-emerald">Tendência Estável</span>
        </div>

        {/* Temp Arrefecimento (ECT) */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">TEMP ARREFECIMENTO (0105)</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value">{temp}</span>
              <span className="sensor-unit font-mono text-muted">°C</span>
              <span className="sensor-status-chip font-mono text-emerald">NORMAL</span>
            </div>
            <div className="sensor-bar-bg">
              <div
                className="sensor-bar-fill bg-emerald"
                style={{ width: `${Math.min(temp, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tensão Bateria */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">TENSÃO BATERIA (AT RV)</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value text-cyan">{battery.toFixed(1)}</span>
              <span className="sensor-unit font-mono text-muted">V</span>
              <span className="sensor-status-chip font-mono text-sky">ALT OK</span>
            </div>
            <div className="sensor-bar-bg">
              <div
                className="sensor-bar-fill bg-cyan"
                style={{ width: '78%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Posição da Borboleta (TPS) */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">POS. BORBOLETA (0111)</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value">{tps.toFixed(1)}</span>
              <span className="sensor-unit font-mono text-muted">%</span>
            </div>
            <div className="sensor-bar-bg">
              <div
                className="sensor-bar-fill bg-indigo"
                style={{ width: `${Math.min(tps, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Carga Motor */}
        <div className="sensor-card">
          <div className="sensor-card-top">
            <span className="sensor-pid font-mono">CARGA MOTOR (0104)</span>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-value-row font-mono">
              <span className="sensor-value">{load}</span>
              <span className="sensor-unit font-mono text-muted">%</span>
            </div>
            <div className="sensor-bar-bg">
              <div
                className="sensor-bar-fill bg-amber"
                style={{ width: `${Math.min(load, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
