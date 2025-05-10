import React, { useState, useEffect } from "react";
import RocketAnimation from "@/components/RocketAnimation";
import MissionHeader from "@/components/mission/MissionHeader";
import MissionControls from "@/components/mission/MissionControls";
import FlightStatusBar from "@/components/mission/FlightStatusBar";
import FlightTrajectory from "@/components/mission/FlightTrajectory";

const Index = () => {
  // Состояние миссии
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [missionPhase, setMissionPhase] = useState<
    "pre-launch" | "launch" | "orbit" | "moon-approach" | "landing"
  >("pre-launch");

  // Параметры полета
  const [thrust, setThrust] = useState(85);
  const [angle, setAngle] = useState(90);
  const [fuel, setFuel] = useState(100);
  const [oxygen, setOxygen] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Системы корабля
  const [systemsState, setSystemsState] = useState({
    navigation: true,
    comms: true,
    lifeSupportPrimary: true,
    lifeSupportBackup: true,
    engineMain: true,
  });

  // Обработчики действий
  const handleLaunch = () => {
    setIsCountingDown(true);
  };

  const handleCountdownComplete = () => {
    setIsCountingDown(false);
    setIsLaunched(true);
    setMissionPhase("launch");

    // Симуляция изменения параметров полета
    startFlightSimulation();
  };

  const resetLaunch = () => {
    setIsLaunched(false);
    setIsCountingDown(false);
    setMissionPhase("pre-launch");
    setFuel(100);
    setOxygen(100);
    setAltitude(0);
    setVelocity(0);
    setThrust(85);
    setAngle(90);
  };

  const toggleSystem = (system: keyof typeof systemsState) => {
    setSystemsState((prev) => ({
      ...prev,
      [system]: !prev[system],
    }));
  };

  // Симуляция полета
  const startFlightSimulation = () => {
    const flightInterval = setInterval(() => {
      setFuel((prev) => {
        const newFuel = Math.max(0, prev - thrust / 100);
        if (newFuel <= 0) {
          clearInterval(flightInterval);
        }
        return newFuel;
      });

      setOxygen((prev) => Math.max(0, prev - 0.05));

      setAltitude((prev) => prev + velocity / 10);

      setVelocity((prev) => {
        if (fuel > 0 && systemsState.engineMain) {
          return Math.min(28000, prev + thrust / 50);
        } else {
          return Math.max(0, prev - 10);
        }
      });

      // Обновление фазы миссии в зависимости от высоты
      setMissionPhase((currentPhase) => {
        if (altitude > 500 && currentPhase === "orbit") {
          return "moon-approach";
        } else if (altitude > 200 && currentPhase === "launch") {
          return "orbit";
        }
        return currentPhase;
      });
    }, 500);

    return () => clearInterval(flightInterval);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#0f1218] text-white overflow-x-hidden">
      {/* Заголовок и статус миссии */}
      <MissionHeader missionPhase={missionPhase} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Панель управления миссией */}
          <MissionControls
            thrust={thrust}
            setThrust={setThrust}
            angle={angle}
            setAngle={setAngle}
            fuel={fuel}
            oxygen={oxygen}
            isLaunched={isLaunched}
            isCountingDown={isCountingDown}
            missionPhase={missionPhase}
            systemsState={systemsState}
            toggleSystem={toggleSystem}
            handleLaunch={handleLaunch}
            resetLaunch={resetLaunch}
            handleCountdownComplete={handleCountdownComplete}
          />

          {/* Центральная визуализация полета */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Статусная строка полета */}
            <FlightStatusBar
              altitude={altitude}
              velocity={velocity}
              missionPhase={missionPhase}
            />

            {/* Анимация ракеты */}
            <div className="flex-1 bg-black/40 rounded-lg border border-slate-800 p-4 flex items-center justify-center">
              <RocketAnimation isLaunched={isLaunched} altitude={altitude} />
            </div>

            {/* Визуализация траектории полета */}
            <FlightTrajectory missionPhase={missionPhase} />
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 mt-auto">
        <p>© 2025 ПОЕХАЛИ! Space Flight Simulator</p>
      </footer>
    </div>
  );
};

export default Index;
