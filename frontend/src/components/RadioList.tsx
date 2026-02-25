import React, { useMemo, useState } from 'react';
import { useRadioStore } from '../store/radioStore';
import type { Radio } from '../types/radio';
import RadioListItem from './RadioListItem';
import RadioCardItem from './RadioCardItem';
import RadioInfoModal from './RadioInfoModal';

const RadioList: React.FC = () => {
  const { radios, searchQuery, selectedCategory, selectedProvince, layout } = useRadioStore();
  const [infoRadio, setInfoRadio] = useState<Radio | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleInfoClick = (radio: Radio) => {
    setInfoRadio(radio);
    setIsInfoModalOpen(true);
  };

  const filteredRadios = useMemo(() => {
    return radios.filter((radio) => {
      if (selectedCategory !== 'TODAS' && radio.category !== selectedCategory) return false;
      if (selectedProvince !== 'TODAS' && radio.province !== selectedProvince) return false;
      if (searchQuery && !radio.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [radios, searchQuery, selectedCategory, selectedProvince]);

  const grouped = useMemo(() => {
    return filteredRadios.reduce((acc: Record<string, Radio[]>, radio) => {
      const cat = radio.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(radio);
      return acc;
    }, {} as Record<string, Radio[]>);
  }, [filteredRadios]);

  if (layout === 'list') {
    return (
      <div className="p-4 pb-24">
        {Object.entries(grouped).map(([category, radios]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <div className="border rounded-lg overflow-hidden bg-white shadow dark:bg-gray-800 dark:border-gray-700">
              {radios.map((radio) => (
                <RadioListItem key={radio.id} radio={radio} onInfoClick={handleInfoClick} />
              ))}
            </div>
          </div>
        ))}
        {filteredRadios.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No se encontraron radios</p>
        )}
        <RadioInfoModal
          radio={infoRadio}
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />
      </div>
    );
  } else {
    return (
      <div className="p-4 pb-24">
        {Object.entries(grouped).map(([category, radios]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {radios.map((radio) => (
                <RadioCardItem key={radio.id} radio={radio} onInfoClick={handleInfoClick} />
              ))}
            </div>
          </div>
        ))}
        {filteredRadios.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No se encontraron radios</p>
        )}
        <RadioInfoModal
          radio={infoRadio}
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />
      </div>
    );
  }
};

export default RadioList;