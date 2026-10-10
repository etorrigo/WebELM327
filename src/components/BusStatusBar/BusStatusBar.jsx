import React from 'react';
import './BusStatusBar.css';

export function BusStatusBar({ voltage, isConnected }) {
  return (
    <section className="bus-status-bar font-mono">
      <div className="bus-indicator">
        <span className={`bus-dot ${isConnected ? 'active' : ''}`}></span>
        <span className="bus-label">BUS:</span>
        <span className="bus-val">ISO 15765-4 CAN</span>
      </div>

      <div className="bus-divider">/</div>

      <div className="ecu-indicator">
        <span className="bus-label">ECU:</span>
        <span className="ecu-val">{voltage.toFixed(1)}V</span>
      </div>

      <div className="bus-divider">/</div>

      <div className="rate-indicator">
        <span className="bus-label">RATE:</span>
        <span className="rate-val">38.4k</span>
        <span className="latency-val">(18ms)</span>
      </div>
    </section>
  );
}
