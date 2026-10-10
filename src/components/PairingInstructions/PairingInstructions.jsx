import React from 'react';
import './PairingInstructions.css';

export function PairingInstructions() {
  return (
    <section className="pairing-instructions">
      <div className="pairing-title-row font-mono">
        <svg className="info-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="16" y2="12"></line>
          <line x1="12" x2="12.01" y1="8" y2="8"></line>
        </svg>
        <span>Instruções de Pareamento ELM327</span>
      </div>

      <ul className="instructions-list font-sans">
        <li>
          <strong>Bluetooth BLE 4.0+:</strong> Funciona direto em iOS (Bluefy / WebBLE) e Android/Chrome.
        </li>
        <li>
          <strong>Bluetooth 2.0 / SPP Clássico:</strong> No Google Chrome Desktop/Android, ative{' '}
          <span className="code-hint font-mono">
            chrome://flags/#enable-web-bluetooth-new-permissions-backend
          </span>
          .
        </li>
        <li>
          Ligue a ignição do veículo (chave no modo contato) antes de iniciar a varredura.
        </li>
      </ul>
    </section>
  );
}
