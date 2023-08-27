import { LibrarySong } from "../components";
import { Song } from "../songs";

export default function Library({
  songs,
  isLibraryOpen,
  selectSongHandler,
}: LibraryProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-full w-full overflow-auto bg-white shadow-xl drop-shadow-xl transition-all duration-500 ease-linear md:w-96 ${
        isLibraryOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <h2 className="p-8 text-3xl font-semibold">Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            selectSongHandler={selectSongHandler}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
}

interface LibraryProps {
  songs: Song[];
  isLibraryOpen: boolean;
  selectSongHandler: (song: Song) => void;
}
