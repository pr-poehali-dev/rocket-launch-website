import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RocketAnimationProps {
  isLaunched: boolean;
  className?: string;
}

const RocketAnimation = ({ isLaunched, className }: RocketAnimationProps) => {
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLaunched && rocketRef.current) {
      const rocket = rocketRef.current;
      rocket.classList.add("launched");

      // Add smoke particles when launched
      const container = rocket.parentElement;
      if (container) {
        for (let i = 0; i < 40; i++) {
          const delay = Math.random() * 2;
          const particle = document.createElement("div");
          particle.className = "absolute bg-white/80 rounded-full";
          particle.style.width = `${Math.random() * 20 + 5}px`;
          particle.style.height = particle.style.width;
          particle.style.bottom = "70px";
          particle.style.left = `${Math.random() * 60 + 20}%`;
          particle.style.opacity = "0.8";
          particle.style.animation = `smoke 3s ease-out ${delay}s forwards`;
          container.appendChild(particle);

          // Remove particles after animation
          setTimeout(
            () => {
              container.removeChild(particle);
            },
            3000 + delay * 1000,
          );
        }
      }
    }
  }, [isLaunched]);

  return (
    <div
      className={cn(
        "relative h-96 w-full flex items-center justify-center",
        className,
      )}
    >
      <div
        ref={rocketRef}
        className={cn(
          "relative w-28 h-96 transition-all duration-1000 ease-in transform translate-y-0",
          isLaunched &&
            "translate-y-[-400px] transition-all duration-3000 ease-in",
        )}
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: isLaunched ? "3s" : "0.5s",
          transitionTimingFunction: "cubic-bezier(0.3, 0.7, 0.4, 1.5)",
        }}
      >
        {/* Apollo 11 Command Module */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-white rounded-t-full border-2 border-gray-300 overflow-hidden">
          {/* Escape Tower */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-red-700"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-700"></div>

          {/* CM Details */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black rounded-full"></div>
        </div>

        {/* Service Module */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-14 h-20 bg-gray-200 border-2 border-gray-300">
          {/* SM Details */}
          <div className="absolute top-2 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-6 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-10 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-14 left-0 w-full h-1 bg-blue-900"></div>

          {/* Solar panels (simplified) */}
          <div className="absolute top-8 -left-2 w-4 h-10 bg-blue-400 border border-gray-500"></div>
          <div className="absolute top-8 -right-2 w-4 h-10 bg-blue-400 border border-gray-500"></div>
        </div>

        {/* Saturn V Third Stage */}
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-20 h-36 bg-white border-2 border-gray-300 flex flex-col justify-between">
          {/* Stripes and details */}
          <div className="w-full h-4 bg-red-600 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">USA</span>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-xs font-bold">APOLLO</div>
            <div className="text-xs font-bold">11</div>
          </div>

          <div className="w-full h-4 bg-red-600"></div>
        </div>

        {/* Saturn V Second Stage */}
        <div className="absolute top-72 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white border-2 border-gray-300"></div>

        {/* Saturn V First Stage base */}
        <div className="absolute top-88 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-white border-2 border-gray-300 rounded-b-lg"></div>

        {/* Engine Nozzles */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex">
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
        </div>

        {/* Rocket Flame - only visible when launching */}
        <div
          className={cn(
            "absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-20 opacity-0 transition-opacity",
            isLaunched && "opacity-100",
          )}
        >
          <div className="animate-pulse w-20 h-28 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-b-full"></div>
          <div className="animate-pulse w-16 h-16 bg-gradient-to-t from-yellow-400 via-yellow-300 to-white rounded-b-full mx-auto"></div>
        </div>
      </div>

      {/* Launch Platform */}
      <div className="absolute bottom-0 w-48 h-6 bg-gray-700 rounded"></div>
      <div className="absolute bottom-6 w-36 h-24 bg-gray-800 rounded-t-lg"></div>

      {/* Launch Tower */}
      <div className="absolute -right-4 bottom-0 w-6 h-80 bg-gray-700 flex flex-col justify-between items-center">
        <div className="w-12 h-2 bg-red-500"></div>
        <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
        <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
        <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
        <div className="w-full h-4 bg-gray-600"></div>
      </div>

      {/* Launch Pad Lights */}
      <div
        className={cn(
          "absolute bottom-12 left-1/4 w-3 h-3 rounded-full bg-red-500",
          isLaunched ? "bg-green-500" : "animate-pulse",
        )}
      ></div>
      <div
        className={cn(
          "absolute bottom-12 right-1/4 w-3 h-3 rounded-full bg-red-500",
          isLaunched ? "bg-green-500" : "animate-pulse",
        )}
      ></div>

      {/* Add a global style for the smoke animation */}
      <style jsx global>{`
        @keyframes smoke {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(2);
            opacity: 0;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .launched {
          transform: translateY(-400px);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default RocketAnimation;
