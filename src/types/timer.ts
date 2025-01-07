export interface TimerPreset {
  id: string;
  name: string;
  sets: number;
  duration: number;
  color: string;
}

export interface TimerState {
  isRunning: boolean;
  currentTime: number;
  currentSet: number;
  totalSets: number;
  selectedPreset: TimerPreset | null;
}

export interface CustomTimer {
  name: string;
  sets: number;
  duration: number;
}