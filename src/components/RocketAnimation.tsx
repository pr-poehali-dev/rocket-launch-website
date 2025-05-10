
import React, { useEffect, useRef } from 'react';
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
      rocket.classList.add('launched');
      
      // Add smoke particles when launched
      const container = rocket.parentElement;
      if (container) {
        for (let i = 0; i < 30; i++) {
          const delay = Math.random() * 2;
          const particle = document.createElement('div');
          particle.className = 'absolute bg-white/80 rounded-full';
          particle.style.width = `${Math.random() * 20 + 5}px`;
          particle.style.height = particle.style.width;
          particle.style.bottom = '70px';
          particle.style.left = `${Math.random() * 40 + 30}%`;
          particle.style.opacity = '0.8';
          particle.style.animation = `smoke 3s ease-out ${delay}s forwards`;
          container.appendChild(particle);
          
          // Remove particles after animation
          setTimeout(() => {
            container.removeChild(particle);
          }, 3000 + delay * 1000);
        }
      }
    }
  }, [isLaunched]);

  return (
    <div className={cn("relative h-96 w-full flex items-center justify-center", className)}>
      <div
        ref={rocketRef}
        className={cn(
          "relative w-20 h-80 transition-all duration-1000 ease-in transform translate-y-0",
          isLaunched && "translate-y-[-400px] transition-all duration-3000 ease-in"
        )}
        style={{ 
          transitionProperty: 'transform, opacity',
          transitionDuration: isLaunched ? '3s' : '0.5s',
          transitionTimingFunction: 'cubic-bezier(0.3, 0.7, 0.4, 1.5)'
        }}
      >
        {/* Rocket Body */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-48 bg-white rounded-t-full border-2 border-gray-300 shadow-lg">
          {/* Rocket Window */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full border-2 border-gray-300"></div>
          
          {/* Rocket Details */}
          <div className="absolute top-20 left-0 w-full h-4 bg-red-500"></div>
          <div className="absolute top-36 left-0 w-full h-4 bg-red-500"></div>
          
          {/* Rocket Text */}
          <div className="absolute top-28 left-0 w-full text-center text-xs font-bold text-gray-800">ПОЕХАЛИ</div>
        </div>
        
        {/* Rocket Fins */}
        <div className="absolute bottom-0 left-0 w-8 h-12 bg-red-500 skew-x-[-30deg] origin-bottom"></div>
        <div className="absolute bottom-0 right-0 w-8 h-12 bg-red-500 skew-x-[30deg] origin-bottom"></div>
        
        {/* Rocket Flame - only visible when launching */}
        <div className={cn(
          "absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-8 opacity-0 transition-opacity",
          isLaunched && "opacity-100"
        )}>
          <div className="animate-pulse w-8 h-28 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-b-full"></div>
          <div className="animate-pulse w-6 h-16 bg-gradient-to-t from-yellow-400 via-yellow-300 to-white rounded-b-full mx-auto"></div>
        </div>
      </div>
      
      {/* Launch Platform */}
      <div className="absolute bottom-0 w-40 h-6 bg-gray-700 rounded"></div>
      <div className="absolute bottom-6 w-24 h-24 bg-gray-800 rounded-t-lg"></div>
      
      {/* Launch Pad Lights */}
      <div className={cn(
        "absolute bottom-12 left-1/4 w-3 h-3 rounded-full bg-red-500",
        isLaunched ? "bg-green-500" : "animate-pulse"
      )}></div>
      <div className={cn(
        "absolute bottom-12 right-1/4 w-3 h-3 rounded-full bg-red-500",
        isLaunched ? "bg-green-500" : "animate-pulse"
      )}></div>
      
      {/* Add a global style for the smoke animation */}
      <style jsx global>{`
        @keyframes smoke {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100px) scale(2); opacity: 0; }
        }
        
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
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
