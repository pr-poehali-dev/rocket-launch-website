
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface CommunicationsProps {
  isLaunched: boolean;
  missionPhase: string;
  commsEnabled: boolean;
}

const Communications = ({
  isLaunched,
  missionPhase,
  commsEnabled
}: CommunicationsProps) => {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon name="MessageSquare" className="text-blue-400" />
          Коммуникации
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-black/50 rounded-md p-3 font-mono text-sm text-green-400 overflow-y-auto">
          <MessageLog isLaunched={isLaunched} missionPhase={missionPhase} />
        </div>
        
        <div className="mt-4 flex gap-2">
          <input 
            type="text" 
            placeholder="Отправить сообщение в Хьюстон..."
            disabled={!isLaunched || !commsEnabled}
            className="flex-1 p-2 rounded-md bg-black/30 border border-slate-700 text-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            className="p-2 bg-blue-600 rounded-md disabled:opacity-50 disabled:bg-slate-700"
            disabled={!isLaunched || !commsEnabled || !inputValue.trim()}
            onClick={() => setInputValue("")}
          >
            <Icon name="Send" size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

interface MessageLogProps {
  isLaunched: boolean;
  missionPhase: string;
}

const MessageLog = ({ isLaunched, missionPhase }: MessageLogProps) => {
  return (
    <>
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
    </>
  );
};

export default Communications;
