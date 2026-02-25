import React from 'react';
import { useRadioStore } from '../store/radioStore';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const Filters: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProvince,
    setSelectedProvince,
    layout,
    setLayout,
    radios,
  } = useRadioStore();

  const categories = ['TODAS', 'INTERNACIONAL', 'NACIONAL', 'PROVINCIAL', 'MUNICIPAL'];
  const provinces = ['TODAS', ...new Set(radios.map(r => r.province).filter(p => p && p.trim() !== ''))];

  return (
<div className="p-4 bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
  <div className="px-4 flex flex-wrap gap-4 items-center">
    <input
      type="text"
      placeholder="Buscar radio..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
    />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default Filters;