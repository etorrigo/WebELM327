import React from 'react';
import './Header.css';

export function Header({ isConnected, onToggleConnect }) {
  return (
    <header className="top-header">
      <div className="header-main-row">
        {/* Identificador Logo ELM327 */}
        <div className="header-logo-group">
          <div className="header-logo-icon">
            <svg
              className="tachometer-svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="M20 12h2"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
              <path d="M15.93 15.93 12 12"></path>
              <circle cx="12" cy="12" r="8"></circle>
            </svg>
          </div>
          <div>
            <h1 className="header-title font-mono">OBD2 SCANNER</h1>
            <p className="header-subtitle font-mono">ELM327 WEB V2.4</p>
          </div>
        </div>

        {/* Status Badge & Botão Conectar */}
        <div className="header-actions">
          <div className={`status-badge font-mono ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className={`status-dot ${isConnected ? 'ping-anim' : ''}`}></span>
            <span>{isConnected ? 'ONLINE' : 'BLE/SERIAL'}</span>
          </div>

          <button
            className={`btn-top-connect font-mono ${isConnected ? 'connected-btn' : ''}`}
            onClick={onToggleConnect}
          >
            <svg className="bt-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.83 7.76l-4.12-4.12a.75.75 0 00-1.28.53v6.71L6.71 8.16a.75.75 0 00-1.06 1.06l3.47 3.47-3.47 3.47a.75.75 0 001.06 1.06l2.72-2.72v6.71a.75.75 0 001.28.53l4.12-4.12a.75.75 0 000-1.06L11.56 13.5l3.27-3.27a.75.75 0 000-1.06zM10.88 5.87l2.12 2.12-2.12 2.12V5.87zm2.12 10.14l-2.12 2.12v-4.24l2.12 2.12z"></path>
            </svg>
            <span>{isConnected ? 'ONLINE' : 'CONECTAR'}</span>
          </button>
        </div>
      </div>

      {/* Navegação Horizontal por Abas */}
      <nav className="header-nav font-mono">
        <a className="nav-item active" href="#inicio">Início</a>
        <a className="nav-item" href="#conexao">Conexão</a>
        <a className="nav-item" href="#sensores">Sensores</a>
        <a className="nav-item" href="#protocolos">Protocolos</a>
        <a className="nav-item" href="#erros">DTC Erros</a>
        <a className="nav-item" href="#terminal">Terminal</a>
      </nav>
    </header>
  );
}
