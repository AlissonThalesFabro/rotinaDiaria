import React, { useState, useEffect } from 'react';
import { Clock, Star, Plus, CheckCircle, Circle, Trophy, Heart, Sparkles, Zap, Award, TrendingUp } from 'lucide-react';

const AutismRoutineDashboard = () => {
  const [childName, setChildName] = useState('Maria'); // Nome da criança
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [coins, setCoins] = useState(45);
  const [streak, setStreak] = useState(7);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [celebrationIndex, setCelebrationIndex] = useState(null);

  // Exemplo de atividades disponíveis
  const availableActivities = [
    { id: 1, name: 'Escovar Dentes', icon: '🦷', color: 'bg-blue-100 text-blue-600', coins: 5 },
    { id: 2, name: 'Café da Manhã', icon: '🍳', color: 'bg-yellow-100 text-yellow-600', coins: 10 },
    { id: 3, name: 'Banho', icon: '🚿', color: 'bg-cyan-100 text-cyan-600', coins: 10 },
    { id: 4, name: 'Ler Livro', icon: '📚', color: 'bg-purple-100 text-purple-600', coins: 15 },
    { id: 5, name: 'Brincar', icon: '🎮', color: 'bg-pink-100 text-pink-600', coins: 10 },
    { id: 6, name: 'Lição de Casa', icon: '✏️', color: 'bg-green-100 text-green-600', coins: 20 },
    { id: 7, name: 'Almoço', icon: '🍽️', color: 'bg-orange-100 text-orange-600', coins: 10 },
    { id: 8, name: 'Soneca', icon: '😴', color: 'bg-indigo-100 text-indigo-600', coins: 5 },
  ];

  // Exemplo de rotina do dia
  const [routineSlots, setRoutineSlots] = useState([
    { time: '07:00', activity: availableActivities[0], completed: true },
    { time: '07:30', activity: availableActivities[1], completed: true },
    { time: '09:00', activity: availableActivities[3], completed: false },
    { time: '12:00', activity: availableActivities[6], completed: false },
    { time: '14:00', activity: availableActivities[7], completed: false },
    { time: '16:00', activity: availableActivities[4], completed: false },
    { time: '18:00', activity: availableActivities[5], completed: false },
    { time: '19:00', activity: null, completed: false },
  ]);

  // Sistema de níveis
  const getLevelInfo = (totalCoins) => {
    const level = Math.floor(totalCoins / 50) + 1;
    const coinsInLevel = totalCoins % 50;
    const coinsToNextLevel = 50 - coinsInLevel;
    return { level, coinsInLevel, coinsToNextLevel, maxCoins: 50 };
  };

  const levelInfo = getLevelInfo(coins);

  const toggleComplete = (index) => {
    const newSlots = [...routineSlots];
    const wasCompleted = newSlots[index].completed;
    newSlots[index].completed = !newSlots[index].completed;
    
    if (!wasCompleted && newSlots[index].activity) {
      // Completou a tarefa - ganha moedas!
      const coinsEarned = newSlots[index].activity.coins;
      setEarnedCoins(coinsEarned);
      setCoins(coins + coinsEarned);
      setShowCoinAnimation(true);
      setCelebrationIndex(index);
      
      // Esconder animação após 2 segundos
      setTimeout(() => {
        setShowCoinAnimation(false);
        setCelebrationIndex(null);
      }, 2000);
    } else if (wasCompleted && newSlots[index].activity) {
      // Desmarcou - perde moedas
      setCoins(coins - newSlots[index].activity.coins);
    }
    
    setRoutineSlots(newSlots);
  };

  const completedTasks = routineSlots.filter(slot => slot.completed && slot.activity).length;
  const totalTasks = routineSlots.filter(slot => slot.activity).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Conquistas
  const achievements = [
    { id: 1, name: 'Primeira Tarefa', icon: '🌟', unlocked: coins >= 5 },
    { id: 2, name: 'Coletor', icon: '💰', unlocked: coins >= 50 },
    { id: 3, name: 'Dedicado', icon: '🔥', unlocked: streak >= 7 },
    { id: 4, name: 'Mestre da Rotina', icon: '👑', unlocked: coins >= 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      {/* Animação de Moedas Ganhas */}
      {showCoinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-8 py-6 shadow-2xl text-4xl font-bold flex items-center gap-3 animate-pulse">
              <Star className="w-12 h-12 fill-white animate-spin" />
              +{earnedCoins} moedas!
              <Sparkles className="w-12 h-12 animate-spin" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Olá! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Complete suas tarefas e ganhe moedas! 🎯
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 fill-white" />
                    <span className="font-semibold">Moedas</span>
                  </div>
                  <div className="text-3xl font-bold">{coins}</div>
                  <div className="text-xs opacity-90 mt-1">Nível {levelInfo.level}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Sequência</span>
                </div>
                <div className="text-3xl font-bold">{streak} dias</div>
                <div className="text-xs opacity-90 mt-1">Continue assim!</div>
              </div>
            </div>
          </div>

          {/* Sistema de Nível */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-purple-800">
                  Nível {levelInfo.level}
                </span>
              </div>
              <span className="text-xs text-purple-600 font-medium">
                {levelInfo.coinsToNextLevel} moedas para o próximo nível
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(levelInfo.coinsInLevel / levelInfo.maxCoins) * 100}%` }}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progresso de Hoje
              </span>
              <span className="text-sm font-bold text-purple-600">
                {completedTasks} de {totalTasks} tarefas
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 15 && (
                  <Sparkles className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rotina do Dia */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-500" />
                Rotina de Hoje
              </h2>
              <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4 py-2 flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {routineSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 transition-all duration-300 relative ${
                    slot.completed
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md'
                      : slot.activity
                      ? 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                      : 'bg-gray-50 border-2 border-dashed border-gray-300'
                  } ${celebrationIndex === index ? 'animate-pulse' : ''}`}
                >
                  {/* Confete quando completa */}
                  {celebrationIndex === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 left-4 text-2xl animate-bounce">⭐</div>
                      <div className="absolute top-2 right-4 text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>✨</div>
                      <div className="absolute bottom-2 left-8 text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>🎉</div>
                      <div className="absolute bottom-2 right-8 text-2xl animate-bounce" style={{animationDelay: '0.15s'}}>🌟</div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => slot.activity && toggleComplete(index)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                      disabled={!slot.activity}
                    >
                      {slot.completed ? (
                        <CheckCircle className="w-8 h-8 text-green-500 animate-pulse" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-300" />
                      )}
                    </button>

                    {/* Time */}
                    <div className="flex-shrink-0 w-16">
                      <div className="text-lg font-bold text-gray-700">
                        {slot.time}
                      </div>
                    </div>

                    {/* Activity */}
                    {slot.activity ? (
                      <div className="flex-1 flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${slot.activity.color} flex items-center justify-center text-2xl shadow-sm`}>
                          {slot.activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`text-lg font-semibold ${slot.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {slot.activity.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-yellow-700">
                                +{slot.activity.coins} moedas
                              </span>
                            </div>
                            {slot.completed && (
                              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Concluída!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 text-gray-400 italic">
                        Horário livre
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Conquistas */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Conquistas
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-xl p-3 text-center transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
                      : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className={`text-3xl mb-1 ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="text-xs font-semibold text-gray-700">
                    {achievement.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catálogo de Atividades */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Atividades
            </h2>

            <div className="space-y-2">
              {availableActivities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className={`${activity.color} rounded-xl p-3 cursor-pointer hover:scale-105 transition-transform shadow-sm`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs">
                        {activity.name}
                      </div>
                      <div className="text-xs opacity-75 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {activity.coins}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mensagem Motivacional */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-2 border-purple-200">
            <p className="text-center text-purple-800 font-medium text-sm">
              🌟 Cada tarefa completada te deixa mais forte! Continue assim! 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutismRoutineDashboard;