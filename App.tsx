
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Swords,
  Crown
} from 'lucide-react';
import { BATTLE_WORDS, BattleWord } from './constants';

type GameState = 'start' | 'playing' | 'results';
type Player = 'Gor' | 'Gayane';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Gor');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledWords, setShuffledWords] = useState<BattleWord[]>([]);

  useEffect(() => {
    if (gameState === 'start') {
      setShuffledWords([...BATTLE_WORDS].sort(() => 0.5 - Math.random()));
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScores({ Gor: 0, Gayane: 0 });
    setCurrentPlayer('Gor');
    setFeedback(null);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    const isCorrect = answer === shuffledWords[currentIndex].spanish;
    
    if (isCorrect) {
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 10 }));
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < 19) {
        setCurrentIndex(prev => prev + 1);
        setCurrentPlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
      } else {
        setGameState('results');
      }
    }, 1200);
  };

  const winner = scores.Gor > scores.Gayane ? 'Gor' : scores.Gayane > scores.Gor ? 'Gayane' : 'Draw';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Header / Scoreboard */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className={`flex items-center gap-3 transition-opacity ${currentPlayer === 'Gor' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg text-white">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-blue-500 tracking-widest">Գոռ</p>
              <p className="text-xl font-black text-slate-900 leading-none">{scores.Gor}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Swords className="text-slate-300" size={24} />
            <span className="text-[10px] font-black uppercase text-slate-400 mt-1 tracking-widest">
              {currentIndex + 1} / 20
            </span>
          </div>

          <div className={`flex items-center gap-3 transition-opacity ${currentPlayer === 'Gayane' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
            <div className="text-right">
              <p className="text-xs font-black uppercase text-rose-500 tracking-widest">Գայանե</p>
              <p className="text-xl font-black text-slate-900 leading-none">{scores.Gayane}</p>
            </div>
            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg text-white">
              <User size={24} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-10"
            >
              <div className="relative inline-block">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-rose-100 rounded-full blur-2xl opacity-60" />
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 relative">
                  ԳՈՌ <span className="text-indigo-600">vs</span> ԳԱՅԱՆԵ
                </h1>
              </div>
              
              <div className="max-w-md mx-auto p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100 italic">
                <p className="text-slate-500 font-bold uppercase text-sm tracking-[0.2em] mb-6">
                  20 բառերի թարգմանություն հոդերով (el/la)
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <Zap className="text-yellow-500" size={20} />
                    <p className="text-left text-sm font-bold text-slate-600">Մրցեք, թե ով ավելի շատ բառ կթարգմանի:</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={startGame}
                className="px-16 py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-3xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl hover:-translate-y-2 active:scale-95 group"
              >
                ՍԿՍԵԼ ՄԱՐՏԸ
                <Swords size={32} className="inline-block ml-4 group-hover:rotate-12 transition-transform" />
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <motion.div 
                  className={`inline-block px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-4 ${currentPlayer === 'Gor' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {currentPlayer === 'Gor' ? 'Գոռի հերթն է' : 'Գայանեի հերթն է'}
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black italic text-slate-900 tracking-tighter uppercase drop-shadow-sm">
                  {shuffledWords[currentIndex]?.armenian}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {shuffledWords[currentIndex]?.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(opt)}
                    className={`
                      py-6 px-10 rounded-3xl font-black text-2xl italic uppercase transition-all shadow-xl border-4
                      ${feedback && opt === shuffledWords[currentIndex].spanish 
                        ? 'bg-emerald-500 text-white border-emerald-700 scale-105 rotate-1' 
                        : feedback && opt !== shuffledWords[currentIndex].spanish
                          ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-50'
                          : 'bg-white text-slate-800 border-slate-100 hover:border-indigo-400 hover:-translate-y-1'
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Feedback Animation */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  >
                    {feedback === 'correct' ? (
                      <CheckCircle2 size={180} className="text-emerald-500/80 drop-shadow-2xl" />
                    ) : (
                      <AlertCircle size={180} className="text-rose-500/80 drop-shadow-2xl" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div 
              key="results"
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center space-y-8"
            >
              <div className={`w-48 h-48 rounded-[60px] rotate-12 flex items-center justify-center mx-auto shadow-2xl border-8 border-white ${winner === 'Gor' ? 'bg-blue-600' : winner === 'Gayane' ? 'bg-rose-500' : 'bg-slate-400'}`}>
                {winner === 'Draw' ? (
                  <Swords size={100} className="text-white -rotate-12" />
                ) : (
                  <Crown size={100} className="text-white -rotate-12" />
                )}
              </div>
              
              <div className="space-y-4">
                <h2 className="text-6xl font-black italic uppercase text-slate-900 tracking-tighter">
                  {winner === 'Draw' ? "ՈՉ-ՈՔԻ" : `${winner === 'Gor' ? 'ԳՈՌԸ' : 'ԳԱՅԱՆԵՆ'} ՀԱՂԹԵՑ`}
                </h2>
                <div className="flex justify-center gap-12 pt-4">
                  <div className="text-center">
                    <p className="text-blue-500 font-black uppercase text-xs tracking-widest mb-1">Գոռ</p>
                    <p className="text-5xl font-black text-slate-900 italic">{scores.Gor}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-rose-500 font-black uppercase text-xs tracking-widest mb-1">Գայանե</p>
                    <p className="text-5xl font-black text-slate-900 italic">{scores.Gayane}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setGameState('start')}
                className="mt-8 px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-indigo-700 shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto"
              >
                <RotateCcw size={24} /> ՆՈՐ ՄԱՐՏ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 text-center text-slate-300 font-black italic uppercase tracking-[0.2em] text-[10px]">
        Battle Mode • Spanish Learning 2026
      </footer>
    </div>
  );
}
