import React from 'react';
import { useRadioStore } from '../store/radioStore';
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/solid';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'

const PlayerControls: React.FC = () => {
  const { currentRadio, isPlaying, volume, setVolume, pause, stop, play } = useRadioStore();

  if (!currentRadio) return null;

  return (
<div className="fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-black text-white p-4 shadow-lg flex items-center space-x-4 z-50">
      <div className="flex-1">
        <h3 className="font-bold">{currentRadio.title}</h3>
        <p className="text-sm text-gray-400">{currentRadio.category}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => (isPlaying ? pause() : play(currentRadio))}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>
        <button
          onClick={stop}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
        >
          <StopIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center space-x-2 w-32">
        <SpeakerWaveIcon className="h-5 w-5" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>
    </div>
  );
};

export default PlayerControls;