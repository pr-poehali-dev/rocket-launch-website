import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface LaunchButtonProps {
  onLaunch: () => void;
  isLaunched: boolean;
  isCountingDown: boolean;
  className?: string;
}

const LaunchButton = ({
  onLaunch,
  isLaunched,
  isCountingDown,
  className,
}: LaunchButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (isLaunched || isCountingDown) return;

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    setIsConfirming(false);
    onLaunch();
  };

  const getButtonText = () => {
    if (isLaunched) return "ЗАПУЩЕНО";
    if (isCountingDown) return "ОТСЧЕТ ИДЕТ";
    if (isConfirming) return "ПОДТВЕРДИТЕ ЗАПУСК";
    return "ЗАПУСТИТЬ РАКЕТУ";
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLaunched || isCountingDown}
      size="lg"
      className={cn(
        "relative overflow-hidden font-bold tracking-wider text-lg min-w-64 h-16 transition-all duration-500",
        isLaunched
          ? "bg-green-600 hover:bg-green-700"
          : isCountingDown
            ? "bg-amber-600 hover:bg-amber-700 animate-pulse"
            : isConfirming
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {isLaunched ? (
          <Icon name="Rocket" size={24} />
        ) : (
          <Icon name={isConfirming ? "AlertTriangle" : "Power"} size={24} />
        )}
        {getButtonText()}
      </div>
      {isConfirming && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white animate-[shrink_5s_linear]"
          style={{
            width: "100%",
            animation: "shrink 3s linear forwards",
          }}
          onAnimationEnd={() => setIsConfirming(false)}
        />
      )}
    </Button>
  );
};

export default LaunchButton;
