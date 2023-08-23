import { useState } from "react";
import Image from "next/image";
import Card from "./Card";
import { useMemoryCards } from "../../contexts/MemoryContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dialog from "@mui/material/Dialog";
import { MdOutlineCancel } from "react-icons/md";

const CardsContainer = () => {
  const {
    cards,
    handleCardItemClick,
    disabledCards,
    checkWin,
    turn,
    matchedImage,
    matchedImageModal,
    colseMatchedImage,
    gameOver,
    matchedName,
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
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            maxWidth: "unset",
            position: "relative",
            overflow: "visible",
          },
          "& ::-webkit-scrollbar": {
            width: "0px",
          },
        }}
        open={matchedImageModal}
        onClose={colseMatchedImage}
      >
        <div className={`w-[330px] h-[350px]`}>
          <button
            onClick={colseMatchedImage}
            className="w-[32px] h-[32px] absolute -top-8 right-0  flex justify-center items-center z-10 "
          >
            <MdOutlineCancel className="h-full w-full text-white" />
          </button>
          <div className="w-full h-full flex flex-col items-center justify-start gap-3">
            <div className="w-full h-[300px] relative rounded-lg">
              <Image
                src={matchedImage}
                alt=""
                className="object-cover rounded-t-lg"
                fill
                loading="eager"
              />
            </div>
            <p className="text-black text-center text-lg font-medium">
              {matchedName}
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CardsContainer;
