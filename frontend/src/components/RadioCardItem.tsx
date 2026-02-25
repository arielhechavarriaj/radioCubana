import React from 'react';
import { useRadioStore } from '../store/radioStore';
import { Radio } from '../types/radio';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { getRadioImageUrl } from '../utils/imageUtils';

interface RadioCardItemProps {
  radio: Radio;
  onInfoClick: (radio: Radio) => void;
}

const RadioCardItem: React.FC<RadioCardItemProps> = ({ radio, onInfoClick }) => {
  const { play, currentRadio, isPlaying, toggleFavorite, favorites } = useRadioStore();
  const isCurrent = currentRadio?.id === radio.id && isPlaying;
  const isFavorite = favorites.includes(radio.id);
  const imageUrl = radio.imageUrl || getRadioImageUrl(radio.title, radio.category);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
        isCurrent ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => play(radio)}
    >
      <img src={imageUrl} alt={radio.title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold dark:text-white truncate">{radio.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {radio.province || radio.country}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
            {radio.category}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => { e.stopPropagation(); onInfoClick(radio); }}
              className="p-1 focus:outline-none"
              aria-label="Información"
            >
              <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(radio.id); }}
              className="p-1 focus:outline-none"
            >
              {isFavorite ? (
                <StarSolid className="h-5 w-5 text-yellow-500" />
              ) : (
                <StarOutline className="h-5 w-5 text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioCardItem;