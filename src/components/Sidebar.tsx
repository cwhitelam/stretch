import React, { useState } from 'react';
import { Menu, Plus, X } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';
import { TimerPreset } from '../types/timer';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { presets, selectPreset, selectedPreset, addCustomPreset } = useTimerStore();
  
  const [customName, setCustomName] = useState('');
  const [customSets, setCustomSets] = useState('');
  const [customDuration, setCustomDuration] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPreset: TimerPreset = {
      id: Date.now().toString(),
      name: customName,
      sets: parseInt(customSets),
      duration: parseInt(customDuration),
      color: 'bg-pink-500',
    };
    addCustomPreset(newPreset);
    setShowCustomForm(false);
    setCustomName('');
    setCustomSets('');
    setCustomDuration('');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 md:hidden z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 lg:w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        overflow-y-auto z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Timer Presets</h2>
          <div className="space-y-4">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  selectPreset(preset);
                  setIsOpen(false);
                }}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedPreset?.id === preset.id
                    ? `${preset.color} text-white`
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{preset.name}</div>
                <div className="text-sm opacity-90">
                  {preset.sets} sets × {preset.duration}s
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCustomForm(true)}
            className="mt-6 w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Custom Timer</span>
          </button>
        </div>
      </div>

      {/* Custom Timer Modal */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Create Custom Timer</h3>
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sets</label>
                <input
                  type="number"
                  value={customSets}
                  onChange={(e) => setCustomSets(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
                  required
                  min="1"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="flex-1 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};