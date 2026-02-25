import React, { useEffect, useRef } from 'react';
import { useRadioStore } from '../store/radioStore';

const AudioPlayer: React.FC = () => {
  const { currentRadio, isPlaying, volume, pause } = useRadioStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentRadio && isPlaying) {
      audio.src = currentRadio.audioUrl;
      audio.play().catch((err) => {
        console.error('Error reproduciendo:', err);
        pause();
      });
    } else {
      audio.pause();
    }
  }, [currentRadio, isPlaying, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      console.error('Error en el stream');
      pause();
    };
    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, [pause]);

  return <audio ref={audioRef} style={{ display: 'none' }} />;
};

export default AudioPlayer;