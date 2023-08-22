import React from "react";
import { IMemoryCard } from "../../types/types";
import Image from "next/image";

type ICardProps = {
  card: IMemoryCard;
  onClick: (card: IMemoryCard) => void;
  disabled: boolean;
};

const Card: React.FC<ICardProps> = ({ card, onClick, disabled }) => {
  const className = `${card.isFlipped ? "flipped" : ""}`;

  const handleClick = () => {
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div className="card h-[300px] w-full relative">
      <div className={className}>
        <img
          className="front h-[300px] w-full object-cover rounded-xl"
          src={card.image}
          alt={card.name}
        />
        <img
          className="back h-[300px] w-full object-cover rounded-xl"
          src="/Assets/cover.jpg"
          alt="Card Cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
