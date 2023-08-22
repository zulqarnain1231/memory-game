import Image from "next/image";
import { Inter } from "next/font/google";
import { useMemoryCards } from "../contexts/MemoryContext";
import CardsContainer from "@/components/Cards/CardsContainer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { startGame, turn } = useMemoryCards();
  return (
    <main
      className={` ${inter.className} w-full min-h-screen flex flex-col items-center justify-start gap-10 py-10`}
    >
      <h1 className="text-3xl text-center text-black font-bold">Memory Game</h1>

      <button
        onClick={startGame}
        className="h-[46px] px-3 bg-cyan-600 text-white font-normal text-center"
      >
        Start a New Game
      </button>
      <CardsContainer />
    </main>
  );
}
