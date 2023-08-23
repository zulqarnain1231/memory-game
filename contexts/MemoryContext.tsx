import { createContext, useState, useContext, useEffect } from "react";
import { IMemoryCard } from "../types/types";
import { CardArray } from "../constants/Data/DummyData";
type MemoryProviderType = {
  children: React.ReactNode;
};

type MemoryContextType = {
  cards: IMemoryCard[];
  setCards: React.Dispatch<React.SetStateAction<IMemoryCard[]>>;
  startGame: () => void;
  turn: number;
  score: number;
  round: number;
  matchedImage: string;
  gameOver: boolean;
  handleGameOver: () => void;
  timeLeft: number;
  handleCardItemClick: (card: IMemoryCard) => void;
  disabledCards: boolean;
  matchedImageModal: boolean;
  checkWin: () => boolean;
  matchedName: string;
  colseMatchedImage: () => void;
};

const initialState = {
  cards: CardArray as IMemoryCard[],
  setCards: () => {},
  startGame: () => {},
  colseMatchedImage: () => {},
  turn: 0,
  round: 1,
  score: 0,
  matchedImage: "",
  matchedImageModal: false,
  gameOver: false,
  handleGameOver: () => {},
  timeLeft: 60,
  matchedName: "",
  handleCardItemClick: () => {},
  disabledCards: false,
  checkWin: () => false,
};

const MemoryContext = createContext<MemoryContextType>(initialState);

const MemoryProvider = ({ children }: MemoryProviderType) => {
  const [cards, setCards] = useState<IMemoryCard[]>(initialState.cards);
  const [timeLeft, setTimeLeft] = useState<number>(initialState.timeLeft);
  const [turn, setTurn] = useState<number>(initialState.turn);
  const [score, setScore] = useState<number>(initialState.score);
  const [choiceOne, setChoiceOne] = useState<IMemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<IMemoryCard | null>(null);
  const [disabledCards, setDisabledCards] = useState<boolean>(false);
  const [round, setRound] = useState<number>(initialState.round);
  const [gameOver, setGameOver] = useState<boolean>(initialState.gameOver);
  const [matchedName, setMatchedName] = useState<string>(
    initialState.matchedName
  );
  const [matchedImage, setMatchedImage] = useState<string>(
    initialState.matchedImage
  );
  const [matchedImageModal, setMatchedImageModal] = useState<boolean>(
    initialState.matchedImageModal
  );
  const checkWin = () => {
    const isWin = cards.every((card) => card.isMatched);
    return isWin;
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */
  const shuffleCards = () => {
    const shuffledCards = [...CardArray, ...CardArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffledCards);
  };

  /**
   * @description
   * This function is used to handle the click event on the card
   * It flips the card and checks if the card is a match
   * @param card
   */
  const handleCardItemClick = (card: IMemoryCard) => {
    if (!disabledCards) {
      setCards((prevCard) =>
        prevCard.map((c) => {
          if (c.id === card.id) {
            card.isFlipped = true;
            return card;
          }
          return c;
        })
      );
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /**
   * @description
   * This function is used to reset the cards
   * @returns void
   */
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabledCards(false);
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */
  const startGame = () => {
    setGameOver(false);
    setTimeLeft(60);
    shuffleCards();
    setScore(0);
    setRound(1);
    setTurn(0);
  };

  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */
  const colseMatchedImage = () => {
    setMatchedImageModal(false);
  };
  const showMatchedImage = (image: string, name: string) => {
    setMatchedImage(image);
    setMatchedName(name);
    setMatchedImageModal(true);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledCards(true);
      if (choiceOne.image === choiceTwo.image) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.id === choiceOne?.id || card.id === choiceTwo?.id) {
              card.isMatched = true;
              card.isFlipped = true;
            }
            return card;
          })
        );
        if (score < 5) {
          setScore((prevvalue) => prevvalue + 1);
        }
        const audio = new Audio(choiceOne.sound);
        audio.play();
        // to cut the audio to 2 secconds
        setTimeout(() => {
          audio.pause();
        }, 2000);
        showMatchedImage(choiceOne.image, choiceOne.name);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCard) => {
            return prevCard.map((card) => {
              if (!card.isMatched) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const onTimerEnd = () => {
    if (round < 3) {
      setGameOver(false);
      setTimeLeft(60);
      shuffleCards();
      setScore(0);
      setTurn(0);
      setRound((prevvalue) => prevvalue + 1);
      setTimeLeft(60);
    } else {
      setGameOver(true);
      setTimeLeft(0);
    }
  };
  const handleGameOver = () => {
    setGameOver(false);
  };
  useEffect(() => {
    if (timeLeft > 0 && !checkWin()) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimerEnd();
    }
  }, [timeLeft, onTimerEnd]);
  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */
  useEffect(() => {
    shuffleCards();
  }, []);

  const value = {
    cards,
    setCards,
    startGame,
    round,
    gameOver,
    turn,
    score,
    colseMatchedImage,
    matchedImageModal,
    matchedImage,
    timeLeft,
    handleCardItemClick,
    handleGameOver,
    matchedName,
    disabledCards,
    checkWin,
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
};

const useMemoryCards = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error("useMemoryCards must be used within a MemoryProvider");
  }
  return context;
};

export { MemoryContext, MemoryProvider, useMemoryCards };
