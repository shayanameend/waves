import { FaAngleLeft, FaPlay, FaPause, FaAngleRight } from "react-icons/fa6";
import { Song } from "../songs";

export default function Player({
  songInfo,
  isPlaying,
  playSongHandler,
  skipHandler,
  dragHandler,
  formatTime,
}: PlayerProps) {
  return (
    <div className="flex min-h-[20vh] flex-col items-center justify-between">
      <div className="flex w-11/12 md:w-1/2">
        <p className="p-4">{formatTime(songInfo.currentTime)}</p>
        <div className="mx-0 my-4 h-4 w-full">
          <input
            className="w-full cursor-pointer"
            onChange={dragHandler}
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration || 0}
            type="range"
          />
        </div>
        <p className="p-4">{formatTime(songInfo.duration)}</p>
      </div>
      <div className="flex w-3/5 items-center justify-between p-4 md:w-1/3">
        <FaAngleLeft
          onClick={() => skipHandler("backward")}
          className="cursor-pointer text-4xl"
        />
        {isPlaying ? (
          <FaPause
            onClick={playSongHandler}
            className="cursor-pointer text-4xl"
          />
        ) : (
          <FaPlay
            onClick={playSongHandler}
            className="cursor-pointer text-4xl"
          />
        )}
        <FaAngleRight
          onClick={() => skipHandler("forward")}
          className="cursor-pointer text-4xl"
        />
      </div>
    </div>
  );
}

interface PlayerProps {
  songInfo: {
    currentTime: number;
    duration: number;
    animationPercentage: number;
  };
  isPlaying: boolean;
  playSongHandler: () => void;
  skipHandler: (direction: string) => void;
  dragHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (time: number) => string;
}
