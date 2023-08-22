import Card from "./Card";
import { useMemoryCards } from "../../contexts/MemoryContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CardsContainer = () => {
  const {
    cards,
    handleCardItemClick,
    disabledCards,
    checkWin,
    turn,
    handleGameOver,
    score,
    gameOver,
    startGame,
  } = useMemoryCards();

  if (checkWin()) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      background: "#191D88 ",
      color: "#FFC436",
      title: "You've won!",
      text: `You took ${turn} flips to complete the game!`,
      icon: "success",
      confirmButtonText: "Play Again",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      preConfirm: () => {
        startGame();
      },
    });
  }
  if (gameOver) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      background: "#FFC436",
      color: "#191D88 ",
      title: "Game Over!",
      text: `You have used all rounds, Try Again`,
      icon: "error",
      confirmButtonText: "Play Again",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,

      preConfirm: () => {
        startGame();
      },
    });
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-brand-tartary md:px-8 px-4">
      <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={card?.id || index}
            onClick={handleCardItemClick}
            disabled={disabledCards}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
