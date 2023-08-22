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
    <div className="w-full h-[200px] card">
      <div className={className}>
        <div className="w-full h-full relative">
          <Image
            className="front object-cover"
            src={card.image}
            alt={card.name}
            fill
          />
        </div>
        <div className="w-full h-full relative">
          <Image
            className="back object-cover"
            src="/img/cover.png"
            alt="Card Cover"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
