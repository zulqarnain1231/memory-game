import Image from "next/image";
import { Inter } from "next/font/google";
import { useMemoryCards } from "../contexts/MemoryContext";
import CardsContainer from "@/components/Cards/CardsContainer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { startGame, turn, score, timeLeft, round } = useMemoryCards();
  return (
    <main
      className={` ${inter.className} w-full min-h-screen flex flex-col items-center justify-start gap-10 py-10 bg-brand-tartary`}
    >
      <h1 className="text-3xl text-center text-black font-bold">Memory Game</h1>

      <button
        onClick={startGame}
        className="h-[46px] px-3 bg-[#0040BE] text-white font-normal text-center rounded-lg"
      >
        Start a New Game
      </button>
      <p>Score: {score}/5</p>
      <p>Total Flips: {turn}</p>
      <p>Time:{timeLeft}</p>
      <p>Round : {round}</p>
      <CardsContainer />
    </main>
  );
}
