
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

interface SystemsState {
  navigation: boolean;
  comms: boolean;
  lifeSupportPrimary: boolean;
  lifeSupportBackup: boolean;
  engineMain: boolean;
}

interface ShipSystemsProps {
  systemsState: SystemsState;
  toggleSystem: (system: keyof SystemsState) => void;
  isLaunched: boolean;
  fuel: number;
}

const ShipSystems = ({
  systemsState,
  toggleSystem,
  isLaunched,
  fuel
}: ShipSystemsProps) => {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon name="Settings2" className="text-blue-400" />
          Системы корабля
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SystemToggle
            label="Навигация"
            icon="Compass"
            checked={systemsState.navigation}
            onChange={() => toggleSystem('navigation')}
            disabled={!isLaunched}
          />
          
          <SystemToggle
            label="Связь"
            icon="Radio"
            checked={systemsState.comms}
            onChange={() => toggleSystem('comms')}
            disabled={!isLaunched}
          />
          
          <SystemToggle
            label="Система жизнеобеспечения (основная)"
            icon="Heart"
            checked={systemsState.lifeSupportPrimary}
            onChange={() => toggleSystem('lifeSupportPrimary')}
            disabled={!isLaunched}
          />
          
          <SystemToggle
            label="Система жизнеобеспечения (запасная)"
            icon="HeartPulse"
            checked={systemsState.lifeSupportBackup}
            onChange={() => toggleSystem('lifeSupportBackup')}
            disabled={!isLaunched}
          />
          
          <SystemToggle
            label="Основной двигатель"
            icon="Flame"
            checked={systemsState.engineMain}
            onChange={() => toggleSystem('engineMain')}
            disabled={!isLaunched || fuel <= 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface SystemToggleProps {
  label: string;
  icon: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}

const SystemToggle = ({
  label,
  icon,
  checked,
  onChange,
  disabled
}: SystemToggleProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Icon name={icon} size={16} />
        <span>{label}</span>
      </div>
      <Switch 
        checked={checked} 
        onCheckedChange={onChange}
        disabled={disabled} 
      />
    </div>
  );
};

export default ShipSystems;
