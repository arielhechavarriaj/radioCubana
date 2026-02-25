import React from 'react';
import { useRadioStore } from '../store/radioStore';
import { Radio } from '../types/radio';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { getRadioImageUrl } from '../utils/imageUtils';

interface RadioListItemProps {
  radio: Radio;
  onInfoClick: (radio: Radio) => void;
}

const RadioListItem: React.FC<RadioListItemProps> = ({ radio, onInfoClick }) => {
  const { play, currentRadio, isPlaying, toggleFavorite, favorites } = useRadioStore();
  const isCurrent = currentRadio?.id === radio.id && isPlaying;
  const isFavorite = favorites.includes(radio.id);
  const imageUrl = radio.imageUrl || getRadioImageUrl(radio.title, radio.category);

  return (
    <div
      className={`p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-4 transition ${
        isCurrent ? 'bg-blue-50 dark:bg-blue-900/30' : ''
      }`}
      onClick={() => play(radio)}
    >
      <img src={imageUrl} alt={radio.title} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold dark:text-white">{radio.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {radio.province || radio.country} {radio.municipality && `- ${radio.municipality}`}
        </p>
      </div>
      <div className="flex items-center space-x-2">
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
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? (
            <StarSolid className="h-5 w-5 text-yellow-500" />
          ) : (
            <StarOutline className="h-5 w-5 text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RadioListItem;