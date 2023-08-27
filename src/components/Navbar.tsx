import { Dispatch, SetStateAction } from "react";
import { FaMusic } from "react-icons/fa6";

export default function Navbar({
  isLibraryOpen,
  setIsLibraryOpen,
}: NavbarProps) {
  return (
    <nav className="flex min-h-[10vh] items-center justify-around">
      <h1 className="text-3xl font-semibold">Waves</h1>
      <button
        className="z-10 cursor-pointer rounded-md border-4  border-gray-700 bg-transparent p-2 transition-all duration-300 ease-linear hover:bg-gray-700 hover:text-white"
        onClick={() => setIsLibraryOpen(!isLibraryOpen)}
      >
        Library
        <FaMusic className="inline-block" />
      </button>
    </nav>
  );
}

interface NavbarProps {
  isLibraryOpen: boolean;
  setIsLibraryOpen: Dispatch<SetStateAction<boolean>>;
}
