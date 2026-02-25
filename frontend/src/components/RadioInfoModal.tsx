import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Radio } from '../types/radio';

interface RadioInfoModalProps {
  radio: Radio | null;
  isOpen: boolean;
  onClose: () => void;
}

const RadioInfoModal: React.FC<RadioInfoModalProps> = ({ radio, isOpen, onClose }) => {
  if (!radio) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex justify-between items-center"
                >
                  <span>{radio.title}</span>
                  <button
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>
                <div className="mt-4 space-y-3">
{radio.imageUrl ? (
  <img src={radio.imageUrl} alt={radio.title} className="w-24 h-24 rounded-full mx-auto object-cover" />
) : null}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Categoría:</span> {radio.category}
                  </p>
                  {radio.province && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Provincia:</span> {radio.province}
                    </p>
                  )}
                  {radio.municipality && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Municipio:</span> {radio.municipality}
                    </p>
                  )}
 {radio.description ? (
   <div>
     <span className="font-semibold text-sm text-gray-500 dark:text-gray-400">Descripción:</span>
     <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">{radio.description}</p>
   </div>
 ) : (
   <p className="text-sm text-gray-400 italic">No hay descripción disponible.</p>
 )}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RadioInfoModal;