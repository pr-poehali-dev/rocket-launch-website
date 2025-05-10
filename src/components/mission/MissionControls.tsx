
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaunchButton from "@/components/LaunchButton";
import CountdownTimer from "@/components/CountdownTimer";
import FlightParameters from "@/components/mission/FlightParameters";
import ShipSystems from "@/components/mission/ShipSystems";
import Communications from "@/components/mission/Communications";

interface SystemsState {
  navigation: boolean;
  comms: boolean;
  lifeSupportPrimary: boolean;
  lifeSupportBackup: boolean;
  engineMain: boolean;
}

interface MissionControlsProps {
  thrust: number;
  setThrust: (value: number) => void;
  angle: number;
  setAngle: (value: number) => void;
  fuel: number;
  oxygen: number;
  isLaunched: boolean;
  isCountingDown: boolean;
  missionPhase: string;
  systemsState: SystemsState;
  toggleSystem: (system: keyof SystemsState) => void;
  handleLaunch: () => void;
  resetLaunch: () => void;
  handleCountdownComplete: () => void;
}

const MissionControls = ({
  thrust,
  setThrust,
  angle,
  setAngle,
  fuel,
  oxygen,
  isLaunched,
  isCountingDown,
  missionPhase,
  systemsState,
  toggleSystem,
  handleLaunch,
  resetLaunch,
  handleCountdownComplete
}: MissionControlsProps) => {
  return (
    <div className="lg:col-span-1">
      <Tabs defaultValue="flight" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flight">Полет</TabsTrigger>
          <TabsTrigger value="systems">Системы</TabsTrigger>
          <TabsTrigger value="comms">Связь</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flight">
          <FlightParameters 
            thrust={thrust}
            setThrust={setThrust}
            angle={angle}
            setAngle={setAngle}
            fuel={fuel}
            oxygen={oxygen}
            isLaunched={isLaunched}
            missionPhase={missionPhase}
          />
        </TabsContent>
        
        <TabsContent value="systems">
          <ShipSystems 
            systemsState={systemsState}
            toggleSystem={toggleSystem}
            isLaunched={isLaunched}
            fuel={fuel}
          />
        </TabsContent>
        
        <TabsContent value="comms">
          <Communications 
            isLaunched={isLaunched}
            missionPhase={missionPhase}
            commsEnabled={systemsState.comms}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex flex-col space-y-6">
        <CountdownTimer
          seconds={10}
          isActive={isCountingDown}
          onComplete={handleCountdownComplete}
        />

        <LaunchButton
          onLaunch={handleLaunch}
          isLaunched={isLaunched}
          isCountingDown={isCountingDown}
          className="w-full"
        />
        
        {isLaunched && (
          <button
            onClick={resetLaunch}
            className="py-2 px-4 border border-red-800 text-red-400 hover:bg-red-900/30 rounded-md transition-colors"
          >
            Прервать миссию
          </button>
        )}
      </div>
    </div>
  );
};

export default MissionControls;
