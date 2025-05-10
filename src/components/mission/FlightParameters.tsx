
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface FlightParametersProps {
  thrust: number;
  setThrust: (value: number) => void;
  angle: number;
  setAngle: (value: number) => void;
  fuel: number;
  oxygen: number;
  isLaunched: boolean;
  missionPhase: string;
}

const FlightParameters = ({
  thrust,
  setThrust,
  angle,
  setAngle,
  fuel,
  oxygen,
  isLaunched,
  missionPhase,
}: FlightParametersProps) => {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon name="Gauge" className="text-blue-400" />
          Параметры полета
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Тяга двигателя</span>
            <span className="font-mono">{thrust}%</span>
          </div>
          <Slider 
            value={[thrust]} 
            min={0} 
            max={100} 
            step={1} 
            disabled={!isLaunched || missionPhase === 'orbit' || fuel <= 0}
            onValueChange={(value) => setThrust(value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Угол наклона</span>
            <span className="font-mono">{angle}°</span>
          </div>
          <Slider 
            value={[angle]} 
            min={0} 
            max={180} 
            step={1} 
            disabled={!isLaunched || fuel <= 0}
            onValueChange={(value) => setAngle(value[0])} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <ResourceIndicator 
            label="Топливо" 
            value={fuel} 
            icon="Fuel" 
            warningThreshold={20}
            primaryColor="green"
          />
          
          <ResourceIndicator 
            label="Кислород" 
            value={oxygen} 
            icon="Droplets" 
            warningThreshold={20}
            primaryColor="blue"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface ResourceIndicatorProps {
  label: string;
  value: number;
  icon: string;
  warningThreshold: number;
  primaryColor: "blue" | "green";
}

const ResourceIndicator = ({ 
  label, 
  value, 
  icon, 
  warningThreshold,
  primaryColor
}: ResourceIndicatorProps) => {
  return (
    <div className="space-y-2 bg-slate-800/50 p-3 rounded-md">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="font-mono text-xl flex items-center gap-2">
        <Icon name={icon} size={16} />
        {Math.floor(value)}%
      </div>
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            value < warningThreshold 
              ? 'bg-red-500' 
              : primaryColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
          }`}
          style={{width: `${value}%`}}
        />
      </div>
    </div>
  );
};

export default FlightParameters;
