import React, { useState, useEffect, useRef } from 'react';
import './TerminalConsole.css';

export function TerminalConsole({ logs, onSendCommand }) {
  const [inputValue, setInputValue] = useState('');
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendCommand(inputValue.trim());
    setInputValue('');
  };

  return (
    <section className="terminal-console font-mono" id="terminal">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-name">ELM327 CAN TERMINAL</span>
        </div>
        <span className="terminal-rate-chip">50HZ STREAM</span>
      </div>

      {/* Tela de logs */}
      <div className="terminal-screen" ref={logContainerRef}>
        {logs.map((log, index) => (
          <div key={index} className={`terminal-line ${log.type}`}>
            {log.type === 'comment' && (
              <span className="text-muted">/// {log.text}</span>
            )}
            {log.type === 'command' && (
              <>
                <span className="prompt-symbol">&gt; </span>
                <span className="command-text">{log.cmd}</span>
                {log.comment && <span className="text-dim"> [{log.comment}]</span>}
                {log.response && <span className="response-text"> → {log.response}</span>}
                {log.detail && <span className="detail-text"> {log.detail}</span>}
              </>
            )}
            {log.type === 'system' && (
              <span className="system-msg">&gt; {log.text}</span>
            )}
            {log.type === 'response' && (
              <span className="direct-resp">&rarr; {log.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Linha de comando com input interativo */}
      <form className="terminal-input-bar" onSubmit={handleSubmit}>
        <span className="terminal-arrow">&gt;</span>
        <input
          type="text"
          className="terminal-input"
          placeholder="Comando AT ou Hex PID (ex: 010C, AT DP, 0100)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" className="terminal-submit-btn">
          ENVIAR
        </button>
      </form>
    </section>
  );
}
