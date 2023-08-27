import { Song } from "../songs";

export default function PlayerSong({ currentSong }: PlayerSongProps) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center">
      <img
        className="w-1/2 rounded-full md:w-1/5"
        src={currentSong.cover}
        alt={currentSong.name}
      />
      <h2 className="m-4 mt-12 text-3xl font-semibold">{currentSong.name}</h2>
      <h3 className="text-xl text-gray-500">{currentSong.artist}</h3>
    </div>
  );
}

interface PlayerSongProps {
  currentSong: Song;
}
