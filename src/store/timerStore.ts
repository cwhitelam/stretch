import { create } from 'zustand';
import { TimerPreset, TimerState } from '../types/timer';

export const defaultPresets: TimerPreset[] = [
  {
    id: 'quick',
    name: 'Quick Stretch',
    sets: 5,
    duration: 30,
    color: 'bg-blue-500',
  },
  {
    id: 'full',
    name: 'Full Body',
    sets: 8,
    duration: 45,
    color: 'bg-purple-500',
  },
  {
    id: 'deep',
    name: 'Deep Stretch',
    sets: 6,
    duration: 60,
    color: 'bg-green-500',
  },
];

interface TimerStore extends TimerState {
  presets: TimerPreset[];
  selectPreset: (preset: TimerPreset) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSet: () => void;
  tick: () => void;
  addCustomPreset: (preset: TimerPreset) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  isRunning: false,
  currentTime: 0,
  currentSet: 1,
  totalSets: 0,
  selectedPreset: null,
  presets: defaultPresets,

  selectPreset: (preset) =>
    set({
      selectedPreset: preset,
      currentTime: preset.duration,
      totalSets: preset.sets,
      currentSet: 1,
      isRunning: false,
    }),

  startTimer: () => set({ isRunning: true }),
  
  pauseTimer: () => set({ isRunning: false }),

  resetTimer: () =>
    set((state) => ({
      currentTime: state.selectedPreset?.duration || 0,
      currentSet: 1,
      isRunning: false,
    })),

  skipSet: () =>
    set((state) => {
      if (state.currentSet >= state.totalSets) {
        return {
          isRunning: false,
          currentSet: 1,
          currentTime: state.selectedPreset?.duration || 0,
        };
      }
      return {
        currentSet: state.currentSet + 1,
        currentTime: state.selectedPreset?.duration || 0,
      };
    }),

  tick: () =>
    set((state) => {
      if (!state.isRunning) return state;
      
      if (state.currentTime <= 0) {
        if (state.currentSet >= state.totalSets) {
          return {
            isRunning: false,
            currentSet: 1,
            currentTime: state.selectedPreset?.duration || 0,
          };
        }
        return {
          currentSet: state.currentSet + 1,
          currentTime: state.selectedPreset?.duration || 0,
        };
      }
      
      return { currentTime: state.currentTime - 1 };
    }),

  addCustomPreset: (preset) =>
    set((state) => ({
      presets: [...state.presets, preset],
    })),
}));