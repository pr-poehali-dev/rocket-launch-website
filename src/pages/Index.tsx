
import React, { useState } from 'react';
import LaunchButton from '@/components/LaunchButton';
import RocketAnimation from '@/components/RocketAnimation';
import CountdownTimer from '@/components/CountdownTimer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  
  const handleLaunch = () => {
    setIsCountingDown(true);
  };
  
  const handleCountdownComplete = () => {
    setIsCountingDown(false);
    setIsLaunched(true);
  };
  
  const resetLaunch = () => {
    setIsLaunched(false);
    setIsCountingDown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#0f1218] text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Rocket" className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold">Центр Управления Запуском</h1>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-blue-950/50 text-blue-400 border-blue-800">
          {isLaunched ? "Запущено" : isCountingDown ? "Отсчет" : "Ожидание"}
        </Badge>
      </header>
      
      <Separator className="bg-blue-900/50" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-8">
            <Card className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Timer" className="text-blue-400" />
                  Статус системы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Топливная система</span>
                    <Badge variant={isLaunched ? "destructive" : "secondary"}>
                      {isLaunched ? "АКТИВНА" : "ГОТОВА"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Система навигации</span>
                    <Badge variant={isLaunched ? "destructive" : "secondary"}>
                      {isLaunched ? "ЗАПУЩЕНА" : "ГОТОВА"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Связь с центром</span>
                    <Badge variant="secondary">АКТИВНА</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Погодные условия</span>
                    <Badge variant="secondary">БЛАГОПРИЯТНЫЕ</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full text-center">
                  {isLaunched && (
                    <button 
                      onClick={resetLaunch}
                      className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                    >
                      Сбросить систему
                    </button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            <div className="flex flex-col items-center space-y-6">
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
            </div>
          </div>
          
          <div className="h-full flex items-center justify-center">
            <RocketAnimation isLaunched={isLaunched} />
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-gray-500 mt-auto">
        <p>© 2025 Космическая Компания ПОЕХАЛИ!</p>
      </footer>
    </div>
  );
};

export default Index;
