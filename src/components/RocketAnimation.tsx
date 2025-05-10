import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RocketAnimationProps {
  isLaunched: boolean;
  altitude: number;
  className?: string;
}

const RocketAnimation = ({
  isLaunched,
  altitude,
  className,
}: RocketAnimationProps) => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLaunched && rocketRef.current) {
      const rocket = rocketRef.current;
      rocket.classList.add("launched");

      // Add smoke particles when launched
      const container = containerRef.current;
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
              if (container.contains(particle)) {
                container.removeChild(particle);
              }
            },
            3000 + delay * 1000,
          );
        }
      }
    }
  }, [isLaunched]);

  // Calculate vertical position based on altitude
  const calculateRocketPosition = () => {
    if (!isLaunched) return 0;

    // Keep rocket partially visible until it reaches higher altitudes
    if (altitude < 100) {
      return Math.min(altitude * 4, 300);
    } else {
      // After 100km, rocket moves up more slowly and eventually out of view
      return 300 + Math.min((altitude - 100) * 0.5, 200);
    }
  };

  const rocketPosition = calculateRocketPosition();

  // Calculate stars visibility based on altitude
  const starsOpacity = Math.min(altitude / 150, 1);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-96 w-full flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: starsOpacity,
        }}
      />

      {altitude > 50 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-40 rounded-t-full transition-opacity duration-1000"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, #4299e1 0%, #3182ce 50%, #2c5282 100%)",
            opacity: Math.min((altitude - 50) / 100, 0.8),
          }}
        />
      )}

      <div
        ref={rocketRef}
        className={cn(
          "relative w-28 h-96 transition-all duration-1000 ease-in transform translate-y-0",
          isLaunched && "transition-all duration-3000 ease-in",
        )}
        style={{
          transform: `translateY(-${rocketPosition}px)`,
          transitionProperty: "transform, opacity",
          transitionDuration: isLaunched ? "3s" : "0.5s",
          transitionTimingFunction: "cubic-bezier(0.3, 0.7, 0.4, 1.5)",
        }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-white rounded-t-full border-2 border-gray-300 overflow-hidden">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-red-700"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-700"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black rounded-full"></div>
        </div>

        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-14 h-20 bg-gray-200 border-2 border-gray-300">
          <div className="absolute top-2 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-6 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-10 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-14 left-0 w-full h-1 bg-blue-900"></div>
          <div className="absolute top-8 -left-2 w-4 h-10 bg-blue-400 border border-gray-500"></div>
          <div className="absolute top-8 -right-2 w-4 h-10 bg-blue-400 border border-gray-500"></div>
        </div>

        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-20 h-36 bg-white border-2 border-gray-300 flex flex-col justify-between">
          <div className="w-full h-4 bg-red-600 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">USA</span>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-xs font-bold">APOLLO</div>
            <div className="text-xs font-bold">11</div>
          </div>
          <div className="w-full h-4 bg-red-600"></div>
        </div>

        <div className="absolute top-72 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white border-2 border-gray-300"></div>

        <div className="absolute top-88 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-white border-2 border-gray-300 rounded-b-lg"></div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex">
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
          <div className="w-4 h-6 mx-0.5 rounded-b-full bg-gray-700"></div>
        </div>

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

      <div
        className="absolute bottom-0 w-full transition-opacity duration-1000"
        style={{ opacity: Math.max(1 - altitude / 50, 0) }}
      >
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gray-700 rounded"></div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-36 h-24 bg-gray-800 rounded-t-lg"></div>

        <div className="absolute bottom-0 left-[60%] w-6 h-80 bg-gray-700 flex flex-col justify-between items-center">
          <div className="w-12 h-2 bg-red-500"></div>
          <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
          <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
          <div className="w-16 h-1 bg-gray-500 -ml-10"></div>
          <div className="w-full h-4 bg-gray-600"></div>
        </div>

        <div
          className={cn(
            "absolute bottom-12 left-[42%] w-3 h-3 rounded-full bg-red-500",
            isLaunched ? "bg-green-500" : "animate-pulse",
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-12 left-[54%] w-3 h-3 rounded-full bg-red-500",
            isLaunched ? "bg-green-500" : "animate-pulse",
          )}
        ></div>
      </div>

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
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default RocketAnimation;
