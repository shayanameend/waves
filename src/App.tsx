import React, { useState, useRef, EventHandler } from "react";
import { getSongs, Song } from "./songs";

import { Navbar, PlayerSong, Player, Library } from "./components";

export default function App() {
  const [songs, setSongs] = useState(getSongs());
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  function playSongHandler(): void {
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }

    setIsPlaying(!isPlaying);
  }

  function skipHandler(direction: string): void {
    const currentSong = fetchCurrentSong(songs);
    const currentIndex = songs.indexOf(currentSong);

    if (direction === "forward") {
      const nextIndex = currentIndex + 1;
      if (nextIndex !== songs.length) {
        selectSongHandler(songs[nextIndex]);
      } else {
        selectSongHandler(songs[0]);
      }
      // another solution
      // setCurrentSong(songs[nextIndex % songs.length]);
    }

    if (direction === "backward") {
      const prevIndex = currentIndex - 1;
      if (prevIndex !== -1) {
        selectSongHandler(songs[prevIndex]);
      } else {
        selectSongHandler(songs[songs.length - 1]);
      }
    }
  }

  function selectSongHandler(song: Song): void {
    const newSongs = songs.map((mapedSong) => {
      if (mapedSong.id === song.id) {
        return {
          ...mapedSong,
          active: true,
        };
      } else {
        return {
          ...mapedSong,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 150);
    }
  }

  function timeUpdateHandler(event: React.ChangeEvent<HTMLAudioElement>): void {
    const { currentTime, duration } = event.target;
    const animationPercentage = (currentTime / duration) * 100;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  }

  function dragHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const currentTime = +event.target.value;
    if (audioRef.current !== null) {
      audioRef.current.currentTime = currentTime;
    }
    setSongInfo({ ...songInfo, currentTime });
  }

  function songEndedHandler(): void {
    skipHandler("forward");
  }

  function formatTime(time: number): string {
    if (isNaN(time)) {
      return "0:00";
    } else {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  function fetchCurrentSong(songs: Song[]): Song {
    return songs.filter((song) => song.active)[0];
  }

  return (
    <div
      className={`transition-all duration-500 ease-linear ${
        isLibraryOpen ? "ml-[30%]" : ""
      }`}
    >
      <Navbar
        isLibraryOpen={isLibraryOpen}
        setIsLibraryOpen={setIsLibraryOpen}
      />
      <PlayerSong currentSong={fetchCurrentSong(songs)} />
      <Player
        songInfo={songInfo}
        isPlaying={isPlaying}
        playSongHandler={playSongHandler}
        skipHandler={skipHandler}
        dragHandler={dragHandler}
        formatTime={formatTime}
      />
      <Library
        songs={songs}
        isLibraryOpen={isLibraryOpen}
        selectSongHandler={selectSongHandler}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndedHandler}
        ref={audioRef}
        src={fetchCurrentSong(songs).audio}
      ></audio>
    </div>
  );
}
