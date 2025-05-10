import React from "react";

interface FlightTrajectoryProps {
  missionPhase: string;
}

const FlightTrajectory = ({ missionPhase }: FlightTrajectoryProps) => {
  // Только отображаем траекторию для фаз orbit и moon-approach
  if (missionPhase !== "orbit" && missionPhase !== "moon-approach") {
    return null;
  }

  const trajectoryProgress = missionPhase === "moon-approach" ? 60 : 20;
  const trajectoryWidth = missionPhase === "moon-approach" ? 50 : 10;

  return (
    <div className="mt-4 p-4 bg-black/30 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Траектория полета</h3>
      <div className="h-24 w-full relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700"></div>
        <div
          className="absolute left-[10%] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600"
          title="Земля"
        ></div>
        <div
          className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400"
          title="Луна"
        ></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 z-10"
          style={{ left: `${trajectoryProgress}%` }}
          title="Apollo 11"
        ></div>
        <div
          className="absolute top-1/2 h-0.5 bg-red-500/50 z-5"
          style={{
            left: `10%`,
            width: `${trajectoryWidth}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FlightTrajectory;
