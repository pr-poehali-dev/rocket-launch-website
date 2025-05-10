
import React from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

interface MissionHeaderProps {
  missionPhase: string;
}

const MissionHeader = ({ missionPhase }: MissionHeaderProps) => {
  const getMissionStatusText = () => {
    switch(missionPhase) {
      case 'pre-launch': return 'Подготовка к запуску';
      case 'launch': return 'Первая стадия запуска';
      case 'orbit': return 'Выход на орбиту Земли';
      case 'moon-approach': return 'Траектория к Луне';
      case 'landing': return 'Посадка на Луну';
      default: return 'Полет';
    }
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Rocket" className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold">Apollo 11 Flight Simulator</h1>
        </div>
        <Badge
          variant="outline"
          className="px-3 py-1 bg-blue-950/50 text-blue-400 border-blue-800"
        >
          {getMissionStatusText()}
        </Badge>
      </header>
      <Separator className="bg-blue-900/50" />
    </>
  );
};

export default MissionHeader;
