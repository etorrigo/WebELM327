import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { BusStatusBar } from './components/BusStatusBar/BusStatusBar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { LiveSensorsPanel } from './components/LiveSensorsPanel/LiveSensorsPanel';
import { TerminalConsole } from './components/TerminalConsole/TerminalConsole';
import { PairingInstructions } from './components/PairingInstructions/PairingInstructions';

const INITIAL_LOGS = [
  { type: 'comment', text: 'Inicializando interface Web OBD2 v2.4...' },
  { type: 'command', cmd: 'AT Z', comment: 'Reset ELM327', response: 'ELM327 v1.5' },
  { type: 'command', cmd: 'ATE0', comment: 'Echo Off', response: 'OK' },
  { type: 'command', cmd: 'AT SP 0', comment: 'Auto Protocol', response: 'OK' },
  { type: 'command', cmd: '010C', comment: 'PID RPM', response: '41 0C 1F 40', detail: '(2000 RPM)' },
  { type: 'command', cmd: '010D', comment: 'PID Speed', response: '41 0D 4E', detail: '(78 km/h)' },
  { type: 'command', cmd: 'AT RV', comment: 'Battery Voltage', response: '14.2V' },
];

export function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isTelemetryActive, setIsTelemetryActive] = useState(true);

  // Estado dos Sensores / Telemetria
  const [telemetry, setTelemetry] = useState({
    rpm: 2450,
    speed: 78,
    temp: 89,
    battery: 14.2,
    tps: 18.5,
    load: 32,
  });

  // Logs do Terminal
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // Interval de telemetria simulada
  useEffect(() => {
    if (!isTelemetryActive && isConnected) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Variação suave de RPM
        let nextRpm = prev.rpm + Math.floor((Math.random() - 0.48) * 85);
        if (nextRpm < 900) nextRpm = 950;
        if (nextRpm > 5800) nextRpm = 4200;

        // Variação de Velocidade
        let nextSpeed = prev.speed + Math.floor((Math.random() - 0.49) * 3);
        if (nextSpeed < 40) nextSpeed = 45;
        if (nextSpeed > 130) nextSpeed = 95;

        // TPS e Carga proporcionais à aceleração
        const nextTps = +(15 + nextRpm / 150).toFixed(1);
        const nextLoad = Math.round(20 + nextRpm / 140);

        // Flutuação sutil de voltagem
        const nextBattery = +(14.1 + Math.random() * 0.2).toFixed(1);

        return {
          rpm: nextRpm,
          speed: nextSpeed,
          temp: 89,
          battery: nextBattery,
          tps: nextTps,
          load: nextLoad,
        };
      });
    }, 350);

    return () => clearInterval(interval);
  }, [isTelemetryActive, isConnected]);

  // Função para conectar Web Bluetooth (Real com Fallback Simulado)
  const handleConnectWebBluetooth = async () => {
    if (isConnected) {
      setIsConnected(false);
      setLogs((prev) => [
        ...prev,
        { type: 'system', text: 'Dispositivo Desconectado.' },
      ]);
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.bluetooth) {
      try {
        setLogs((prev) => [
          ...prev,
          { type: 'system', text: 'Buscando dispositivo ELM327 BLE...' },
        ]);

        const device = await navigator.bluetooth.requestDevice({
          filters: [{ namePrefix: 'OBD' }, { namePrefix: 'ELM' }],
          optionalServices: [
            '00001101-0000-1000-8000-00805f9b34fb', // SPP clássico
            '0000fff0-0000-1000-8000-00805f9b34fb', // BLE chinês
            '0000ffe0-0000-1000-8000-00805f9b34fb', // HM-10
          ],
        });

        setIsConnected(true);
        setLogs((prev) => [
          ...prev,
          { type: 'response', text: `CONEXÃO ESTABELECIDA: ${device.name || 'ELM327'} (CAN 11bit 500kBd)` },
        ]);
        return;
      } catch (err) {
        console.warn('Bluetooth dialog cancelado ou erro:', err);
        setLogs((prev) => [
          ...prev,
          { type: 'system', text: 'Modo Simulação OBD-II Ativado.' },
        ]);
      }
    } else {
      setLogs((prev) => [
        ...prev,
        { type: 'system', text: 'Web Bluetooth nativo não disponível neste browser. Ativando emulador CAN.' },
      ]);
    }

    // Modo conectado emulado
    setIsConnected(true);
    setLogs((prev) => [
      ...prev,
      { type: 'response', text: 'CONEXÃO ESTABELECIDA: CAN 11bit 500kBd (Emulador Ativo)' },
    ]);
  };

  const handleToggleTelemetry = () => {
    if (!isConnected) {
      handleConnectWebBluetooth();
      return;
    }
    setIsTelemetryActive((prev) => !prev);
  };

  // Envio de comandos no Terminal
  const handleSendCommand = (cmd) => {
    const cleanCmd = cmd.toUpperCase();
    setLogs((prev) => [
      ...prev,
      { type: 'system', text: cleanCmd },
    ]);

    setTimeout(() => {
      let response = 'OK';
      if (cleanCmd === '010C') {
        response = `41 0C ${Math.floor(telemetry.rpm * 4).toString(16).toUpperCase()} (${telemetry.rpm} RPM)`;
      } else if (cleanCmd === '010D') {
        response = `41 0D ${telemetry.speed.toString(16).toUpperCase()} (${telemetry.speed} km/h)`;
      } else if (cleanCmd === '0100') {
        response = '41 00 BE 3F B8 13 (PIDs Suportados)';
      } else if (cleanCmd === '0105') {
        response = '41 05 7D (89°C ECT)';
      } else if (cleanCmd === 'AT RV') {
        response = `${telemetry.battery.toFixed(1)}V`;
      } else if (cleanCmd === 'AT DP') {
        response = 'ISO 15765-4 (CAN 11/500)';
      } else if (cleanCmd === '03') {
        response = '43 00 (Sem DTCs de erro na ECU)';
      } else if (cleanCmd.startsWith('AT')) {
        response = 'OK';
      } else {
        response = `41 ${cleanCmd.slice(-2)} 00 NO DATA`;
      }

      setLogs((prev) => [
        ...prev,
        { type: 'response', text: response },
      ]);
    }, 120);
  };

  return (
    <div className="device-container">
      {/* Top Header */}
      <Header
        isConnected={isConnected}
        onToggleConnect={handleConnectWebBluetooth}
      />

      {/* Barra de Status CAN / ECU */}
      <BusStatusBar
        voltage={telemetry.battery}
        isConnected={isConnected}
      />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <HeroSection
          isConnected={isConnected}
          isTelemetryActive={isTelemetryActive}
          voltage={telemetry.battery}
          onPairClick={handleConnectWebBluetooth}
          onToggleTelemetry={handleToggleTelemetry}
        />

        <LiveSensorsPanel
          telemetry={telemetry}
          isStreaming={isTelemetryActive}
        />

        <TerminalConsole
          logs={logs}
          onSendCommand={handleSendCommand}
        />

        <PairingInstructions />
      </main>

      {/* Rodapé Técnico */}
      <footer className="technical-footer font-mono">
        ELM327 Web Engine • Compatível com ISO 9141-2, KWP2000, J1850 &amp; CAN Bus
      </footer>
    </div>
  );
}

export default App;
