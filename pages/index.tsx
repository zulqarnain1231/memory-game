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
      <h1 className="sm:text-5xl text-3xl text-center text-brand-main font-semibold">
        Memory Game
      </h1>

      {/* <button
        onClick={startGame}
        className="h-[46px] px-3 bg-[#0040BE] text-white font-normal text-center rounded-lg"
      >
        Start a New Game
      </button> */}
      <div className="w-full px-4 sm:px-0">
        <div className="lg:w-[35%] md:w-[50%] sm:w-[70%] w-full mx-auto bg-yellow-main grid grid-cols-2 sm:grid-col-4 p-4 gap-y-2 rounded-lg">
          <div className="w-full flex items-center justify-start gap-3">
            <span className="text-xl text-brand-main font-semibold">Time:</span>
            <p className="text-xl text-brand-main font-medium">00:{timeLeft}</p>
          </div>
          <div className="w-full flex items-center justify-start gap-3">
            <span className="text-xl text-brand-main font-semibold">
              Round :
            </span>
            <p className="text-xl text-brand-main font-medium">{round}</p>
          </div>
          <div className="w-full flex items-center justify-start gap-3">
            <span className="text-xl text-brand-main font-semibold">
              Score:
            </span>
            <p className="text-xl text-brand-main font-medium">{score}/5</p>
          </div>
          <div className="w-full flex items-center justify-start gap-3">
            <span className="text-xl text-brand-main font-semibold">
              Total Flips:
            </span>
            <p className="text-xl text-brand-main font-medium">{turn}</p>
          </div>
        </div>
      </div>

      <CardsContainer />
    </main>
  );
}
