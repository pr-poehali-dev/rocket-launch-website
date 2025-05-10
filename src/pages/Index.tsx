
import React, { useState } from "react";
import LaunchButton from "@/components/LaunchButton";
import RocketAnimation from "@/components/RocketAnimation";
import CountdownTimer from "@/components/CountdownTimer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [missionPhase, setMissionPhase] = useState<'pre-launch' | 'launch' | 'orbit' | 'moon-approach' | 'landing'>('pre-launch');
  
  // Flight parameters
  const [thrust, setThrust] = useState(85);
  const [angle, setAngle] = useState(90);
  const [fuel, setFuel] = useState(100);
  const [oxygen, setOxygen] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0);
  
  // Systems
  const [systemsState, setSystemsState] = useState({
    navigation: true,
    comms: true,
    lifeSupportPrimary: true,
    lifeSupportBackup: true,
    engineMain: true,
  });

  const handleLaunch = () => {
    setIsCountingDown(true);
  };

  const handleCountdownComplete = () => {
    setIsCountingDown(false);
    setIsLaunched(true);
    setMissionPhase('launch');
    
    // Simulate rocket parameters changing during flight
    const flightInterval = setInterval(() => {
      setFuel(prev => {
        const newFuel = Math.max(0, prev - (thrust / 100));
        if (newFuel <= 0) {
          clearInterval(flightInterval);
        }
        return newFuel;
      });
      
      setOxygen(prev => Math.max(0, prev - 0.05));
      setAltitude(prev => prev + (velocity / 10));
      setVelocity(prev => {
        if (fuel > 0) {
          return Math.min(28000, prev + (thrust / 50));
        } else {
          return Math.max(0, prev - 10);
        }
      });
      
      if (altitude > 200) {
        setMissionPhase('orbit');
      }
      if (altitude > 500 && missionPhase === 'orbit') {
        setMissionPhase('moon-approach');
      }
    }, 500);
    
    return () => clearInterval(flightInterval);
  };

  const resetLaunch = () => {
    setIsLaunched(false);
    setIsCountingDown(false);
    setMissionPhase('pre-launch');
    setFuel(100);
    setOxygen(100);
    setAltitude(0);
    setVelocity(0);
    setThrust(85);
    setAngle(90);
  };

  const toggleSystem = (system: keyof typeof systemsState) => {
    setSystemsState(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const formatVelocity = (v: number) => {
    if (v < 1000) return `${Math.floor(v)} м/с`;
    return `${(v / 1000).toFixed(1)} км/с`;
  };

  const formatAltitude = (a: number) => {
    if (a < 100) return `${Math.floor(a)} км`;
    return `${Math.floor(a)} км`;
  };

  const getMissionStatusText = () => {
    switch(missionPhase) {
      case 'pre-launch': return 'Подготовка к запуску';
      case 'launch': return 'Первая стадия запуска';
      case 'orbit': return 'Выход на орбиту Земли';
      case 'moon-approach': return 'Траектория к Луне';
      case 'landing': return 'Посадка на Луну';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#0f1218] text-white overflow-x-hidden">
      {/* Header */}
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Control Panel */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="flight" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="flight">Полет</TabsTrigger>
                <TabsTrigger value="systems">Системы</TabsTrigger>
                <TabsTrigger value="comms">Связь</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flight">
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
                      <div className="space-y-2 bg-slate-800/50 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Топливо</div>
                        <div className="font-mono text-xl flex items-center gap-2">
                          <Icon name="Fuel" size={16} />
                          {Math.floor(fuel)}%
                        </div>
                        <div 
                          className="h-1 bg-gray-700 rounded-full overflow-hidden"
                        >
                          <div 
                            className={`h-full ${fuel < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{width: `${fuel}%`}}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 bg-slate-800/50 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Кислород</div>
                        <div className="font-mono text-xl flex items-center gap-2">
                          <Icon name="Droplets" size={16} />
                          {Math.floor(oxygen)}%
                        </div>
                        <div 
                          className="h-1 bg-gray-700 rounded-full overflow-hidden"
                        >
                          <div 
                            className={`h-full ${oxygen < 20 ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{width: `${oxygen}%`}}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="systems">
                <Card className="bg-slate-900/60 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="Settings2" className="text-blue-400" />
                      Системы корабля
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name="Compass" size={16} />
                          <span>Навигация</span>
                        </div>
                        <Switch 
                          checked={systemsState.navigation} 
                          onCheckedChange={() => toggleSystem('navigation')}
                          disabled={!isLaunched} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name="Radio" size={16} />
                          <span>Связь</span>
                        </div>
                        <Switch 
                          checked={systemsState.comms} 
                          onCheckedChange={() => toggleSystem('comms')}
                          disabled={!isLaunched} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name="Heart" size={16} />
                          <span>Система жизнеобеспечения (основная)</span>
                        </div>
                        <Switch 
                          checked={systemsState.lifeSupportPrimary} 
                          onCheckedChange={() => toggleSystem('lifeSupportPrimary')}
                          disabled={!isLaunched} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name="HeartPulse" size={16} />
                          <span>Система жизнеобеспечения (запасная)</span>
                        </div>
                        <Switch 
                          checked={systemsState.lifeSupportBackup} 
                          onCheckedChange={() => toggleSystem('lifeSupportBackup')}
                          disabled={!isLaunched} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon name="Flame" size={16} />
                          <span>Основной двигатель</span>
                        </div>
                        <Switch 
                          checked={systemsState.engineMain} 
                          onCheckedChange={() => toggleSystem('engineMain')}
                          disabled={!isLaunched || fuel <= 0} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="comms">
                <Card className="bg-slate-900/60 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="MessageSquare" className="text-blue-400" />
                      Коммуникации
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-black/50 rounded-md p-3 font-mono text-sm text-green-400 overflow-y-auto">
                      <div>[Хьюстон]: Apollo 11, как слышите? Прием.</div>
                      {isLaunched && (
                        <>
                          <div>[Apollo 11]: Хьюстон, слышим вас отлично.</div>
                          <div>[Хьюстон]: Подтверждаем запуск, все системы работают нормально.</div>
                          {missionPhase === 'orbit' && (
                            <>
                              <div>[Apollo 11]: Хьюстон, мы на орбите. Параметры стабильные.</div>
                              <div>[Хьюстон]: Вижу, красиво вышли, Apollo. Готовьтесь к фазе инжекции.</div>
                            </>
                          )}
                          {missionPhase === 'moon-approach' && (
                            <>
                              <div>[Apollo 11]: Хьюстон, мы на пути к Луне. Все системы в норме.</div>
                              <div>[Хьюстон]: Отлично, Apollo. Рассчетное время прибытия - 3 дня 4 часа.</div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Отправить сообщение в Хьюстон..."
                        disabled={!isLaunched || !systemsState.comms}
                        className="flex-1 p-2 rounded-md bg-black/30 border border-slate-700 text-white"
                      />
                      <button className="p-2 bg-blue-600 rounded-md disabled:opacity-50 disabled:bg-slate-700">
                        <Icon name="Send" size={18} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
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
          
          {/* Central Visualization */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="bg-black/30 rounded-lg p-3 flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-400">Высота</div>
                  <div className="font-mono text-xl">{formatAltitude(altitude)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Скорость</div>
                  <div className="font-mono text-xl">{formatVelocity(velocity)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Фаза</div>
                  <div className="font-mono text-xl">{missionPhase.toUpperCase()}</div>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-sm text-gray-400">Миссия</div>
                <div className="font-mono text-xl">APOLLO 11</div>
              </div>
            </div>
            
            <div className="flex-1 bg-black/40 rounded-lg border border-slate-800 p-4 flex items-center justify-center">
              <RocketAnimation isLaunched={isLaunched} />
            </div>
            
            {missionPhase === 'orbit' || missionPhase === 'moon-approach' ? (
              <div className="mt-4 p-4 bg-black/30 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Траектория полета</h3>
                <div className="h-24 w-full relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700"></div>
                  <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600" title="Земля"></div>
                  <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400" title="Луна"></div>
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 z-10"
                    style={{
                      left: `${missionPhase === 'moon-approach' ? 60 : 20}%`,
                    }}
                    title="Apollo 11"
                  ></div>
                  <div 
                    className="absolute top-1/2 h-0.5 bg-red-500/50 z-5"
                    style={{
                      left: `10%`,
                      width: `${missionPhase === 'moon-approach' ? 50 : 10}%`,
                    }}
                  ></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 mt-auto">
        <p>© 2025 ПОЕХАЛИ! Space Flight Simulator</p>
      </footer>
    </div>
  );
};

export default Index;
