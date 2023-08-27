import { Dispatch, SetStateAction } from "react";
import { Song } from "../songs";

export default function LibrarySong({
  song,
  selectSongHandler,
}: LibrarySongProps) {
  return (
    <div
      onClick={() => {
        selectSongHandler(song);
      }}
      className={`flex cursor-pointer items-center px-8 py-4 transition-all duration-500 ease-linear hover:bg-gray-300 ${
        song.active ? "bg-violet-300" : ""
      }`}
    >
      <img className="w-1/4" src={song.cover} alt={song.name} />
      <div className="pl-4">
        <h3 className="text-xl text-gray-500">{song.name}</h3>
        <h4 className="text-sm text-gray-500">{song.artist}</h4>
      </div>
    </div>
  );
}

interface LibrarySongProps {
  song: Song;
  selectSongHandler: (song: Song) => void;
}
