import styled from '@emotion/styled';
import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import drinksData from '../data/drinks.json';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  color: #ffffff;
  direction: rtl;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
`;

const Title = styled.h1`
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
`;

const DrinkName = styled.div`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(10, 10, 10, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  min-width: 300px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DrinkNote = styled.div`
  font-size: 1.2rem;
  color: #d4af37;
  text-align: center;
  margin-top: 0.5rem;
  font-style: italic;
  opacity: 0.9;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
  justify-content: center;
`;

const OptionButton = styled.button`
  background: ${props => {
    if (props.isCorrect) return 'rgba(46, 204, 113, 0.2)';
    if (props.isWrong) return 'rgba(231, 76, 60, 0.2)';
    return 'rgba(212, 175, 55, 0.2)';
  }};
  border: 1px solid ${props => {
    if (props.isCorrect) return 'rgba(46, 204, 113, 0.3)';
    if (props.isWrong) return 'rgba(231, 76, 60, 0.3)';
    return 'rgba(212, 175, 55, 0.3)';
  }};
  color: ${props => {
    if (props.isCorrect) return '#2ecc71';
    if (props.isWrong) return '#e74c3c';
    return '#d4af37';
  }};
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 200px;

  &:hover {
    transform: translateY(-2px);
    background: ${props => {
      if (props.isCorrect) return 'rgba(46, 204, 113, 0.3)';
      if (props.isWrong) return 'rgba(231, 76, 60, 0.3)';
      return 'rgba(212, 175, 55, 0.3)';
    }};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Score = styled.div`
  font-size: 1.5rem;
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
`;

const { drinks } = drinksData;
const options = [...new Set(drinks.map(drink => drink.type))];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function Game() {
  const [shuffledDrinks, setShuffledDrinks] = useState([]);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isWrong, setIsWrong] = useState(null);

  // Shuffle drinks when component mounts
  useEffect(() => {
    setShuffledDrinks(shuffleArray(drinks));
  }, []);

  const currentDrink = shuffledDrinks[currentDrinkIndex];

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent multiple selections

    setSelectedOption(option);
    if (option === currentDrink.type) {
      setIsCorrect(option);
      setScore(prev => prev + 1);
      setTimeout(() => {
        setCurrentDrinkIndex(prev => (prev + 1) % shuffledDrinks.length);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsWrong(null);
      }, 1500);
    } else {
      setIsWrong(option);
      setIsCorrect(currentDrink.type);
      setTimeout(() => {
        setCurrentDrinkIndex(prev => (prev + 1) % shuffledDrinks.length);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsWrong(null);
      }, 1500);
    }
  };

  // Reset game and reshuffle drinks
  const resetGame = useCallback(() => {
    setShuffledDrinks(shuffleArray(drinks));
    setCurrentDrinkIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsWrong(null);
  }, []);

  // Add reset button when all drinks have been shown
  const showResetButton = currentDrinkIndex === shuffledDrinks.length - 1;

  return (
    <GameContainer>
      <Title>משחק המשקאות</Title>
      <Score>ניקוד: {score}</Score>
      {currentDrink && (
        <>
          <DrinkName>
            {currentDrink.hebrewName} - {currentDrink.englishName}
            {currentDrink.note && <DrinkNote>{currentDrink.note}</DrinkNote>}
          </DrinkName>
          <OptionsContainer>
            {options.map((option) => (
              <OptionButton
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                isCorrect={option === currentDrink.type && selectedOption !== null}
                isWrong={selectedOption === option && option !== currentDrink.type}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
        </>
      )}
      {showResetButton && (
        <OptionButton
          onClick={resetGame}
          style={{ marginTop: '2rem' }}
        >
          התחל משחק חדש
        </OptionButton>
      )}
    </GameContainer>
  );
}

export default Game; 