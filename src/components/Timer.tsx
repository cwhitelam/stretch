import React, { useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const Timer: React.FC = () => {
  const {
    isRunning,
    currentTime,
    currentSet,
    totalSets,
    selectedPreset,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSet,
    tick,
  } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const progress = useCallback(() => {
    if (!selectedPreset) return 0;
    return ((selectedPreset.duration - currentTime) / selectedPreset.duration) * 100;
  }, [currentTime, selectedPreset]);

  if (!selectedPreset) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-2xl text-gray-500 dark:text-gray-400">
          Select a preset to start
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-current text-gray-200 dark:text-gray-700"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className={`stroke-current ${selectedPreset.color}`}
            strokeWidth="5"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress()) / 100}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl font-bold mb-2">{formatTime(currentTime)}</div>
          <div className="text-xl">
            Set {currentSet} of {totalSets}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          {isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
        <button
          onClick={skipSet}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};