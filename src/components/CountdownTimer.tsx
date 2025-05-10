import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  seconds: number;
  isActive: boolean;
  onComplete: () => void;
  className?: string;
}

const CountdownTimer = ({
  seconds: initialSeconds,
  isActive,
  onComplete,
  className,
}: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (isActive && !timerActive) {
      setTimerActive(true);
      setSeconds(initialSeconds);
    } else if (!isActive && timerActive) {
      setTimerActive(false);
      setSeconds(initialSeconds);
    }
  }, [isActive, initialSeconds, timerActive]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval!);
            setTimerActive(false);
            onComplete();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, onComplete]);

  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Calculate arc path for countdown circle
  const calculateArcPath = () => {
    const percentage = seconds / initialSeconds;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage);

    return {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset,
    };
  };

  const arcStyles = calculateArcPath();

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          className="absolute w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={seconds <= 10 ? "#EA384C" : "#0EA5E9"}
            strokeWidth="8"
            style={arcStyles}
            className="transition-all duration-1000"
          />
        </svg>
        <div
          className={cn(
            "text-4xl font-mono font-bold z-10",
            seconds <= 10 ? "text-red-500" : "text-blue-500",
            timerActive && "animate-pulse",
          )}
        >
          {seconds}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">
          {timerActive ? "Обратный отсчет" : "Готовность к запуску"}
        </p>
        <p
          className={cn(
            "text-sm font-mono mt-1",
            seconds <= 10 ? "text-red-500" : "text-gray-500",
          )}
        >
          {formatTime(seconds)}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
