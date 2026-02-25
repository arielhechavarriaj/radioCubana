import React from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import RadioList from './components/RadioList';
import AudioPlayer from './components/AudioPlayer';
import PlayerControls from './components/PlayerControls';
import Footer from './components/Footer';

function App() {
  return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pb-24"> {/* pb-24 da espacio para el reproductor */}
  <Header />
  <Filters />
  <RadioList />
  <Footer />
  <AudioPlayer />
  <PlayerControls />
</div>
  );
}

export default App;