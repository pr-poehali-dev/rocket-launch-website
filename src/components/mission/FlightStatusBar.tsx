
import React from "react";
import { Badge } from "@/components/ui/badge";

interface FlightStatusBarProps {
  altitude: number;
  velocity: number;
  missionPhase: string;
}

const FlightStatusBar = ({ altitude, velocity, missionPhase }: FlightStatusBarProps) => {
  const formatVelocity = (v: number) => {
    if (v < 1000) return `${Math.floor(v)} м/с`;
    return `${(v / 1000).toFixed(1)} км/с`;
  };

  const formatAltitude = (a: number) => {
    if (a < 100) return `${Math.floor(a)} км`;
    return `${Math.floor(a)} км`;
  };

  const getMissionPhaseDisplay = (phase: string) => {
    return phase.toUpperCase();
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="bg-black/30 rounded-lg p-3 flex items-center gap-4">
        <div>
          <div className="text-sm text-gray-400">Высота</div>
          <div className="font-mono text-xl">{formatAltitude(altitude)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Скорость</div>
          <div className="font-mono text-xl">{formatVelocity(velocity)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Фаза</div>
          <div className="font-mono text-xl">{getMissionPhaseDisplay(missionPhase)}</div>
        </div>
      </div>
      <div className="bg-black/30 rounded-lg p-3">
        <div className="text-sm text-gray-400">Миссия</div>
        <div className="font-mono text-xl">APOLLO 11</div>
      </div>
    </div>
  );
};

export default FlightStatusBar;
