// src/context/AudioContext.jsx
import React, { createContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Optionally: play next song in a playlist
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.filePath;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentTrack]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if(currentTrack) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (vol) => {
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const closePlayer = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const value = {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    volume,
    playTrack,
    togglePlay,
    seek,
    changeVolume,
    closePlayer,
    // No need to expose audioRef directly
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
