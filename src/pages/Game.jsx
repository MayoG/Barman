import styled from '@emotion/styled';
import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import drinksData from '../data/drinks.json';
import triviaData from '../data/fernet_trivia_questions.json';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  color: #ffffff;
  direction: rtl;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
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

const TriviaOptionsContainer = styled(OptionsContainer)`
  max-width: 600px;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  
  button {
    width: calc(50% - 0.5rem);
    min-width: 200px;

    @media (max-width: 768px) {
      min-width: 140px;
      font-size: 1.1rem;
      padding: 0.5rem;
    }
  }
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
  font-size: 1.8rem;
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
  background: rgba(10, 10, 10, 0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  font-weight: bold;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
`;

const GameSwitcher = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  background: rgba(10, 10, 10, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const GameButton = styled.button`
  background: ${props => props.active ? 'rgba(212, 175, 55, 0.3)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)'};
  color: ${props => props.active ? '#ffffff' : '#d4af37'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: translateY(-2px);
  }
`;

const QuestionCard = styled(DrinkName)`
  font-size: 1.8rem;
  line-height: 1.4;
  width: 100%;
  max-width: 600px;
  margin: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.75rem;
  }
`;

const GameExplanation = styled.div`
  color: #d4af37;
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  background: rgba(10, 10, 10, 0.5);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
`;

const RankDisplay = styled.div`
  font-size: 2rem;
  color: #d4af37;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
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

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const CoinImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  &:hover {
    transform: scale(1.1) rotate(10deg);
  }
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

const getRank = (score) => {
  if (score <= 3) return "מתחיל מריר";
  if (score <= 7) return "שועל ברים";
  return "ברנקיסט על מלא";
};

function Game() {
  const [gameType, setGameType] = useState('trivia');
  const [shuffledDrinks, setShuffledDrinks] = useState([]);
  const [shuffledTrivia, setShuffledTrivia] = useState([]);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isWrong, setIsWrong] = useState(null);
  const [showRank, setShowRank] = useState(false);
  const [leftCoin, setLeftCoin] = useState(1);
  const [rightCoin, setRightCoin] = useState(2);

  // Function to get random coin number
  const getRandomCoin = () => {
    return Math.floor(Math.random() * 18) + 1; // Assuming we have 18 coins
  };

  // Update coins when question changes
  useEffect(() => {
    if (gameType === 'trivia') {
      setLeftCoin(getRandomCoin());
      setRightCoin(getRandomCoin());
    }
  }, [currentTriviaIndex, gameType]);

  // Shuffle both games when component mounts
  useEffect(() => {
    setShuffledDrinks(shuffleArray(drinks));
    setShuffledTrivia(shuffleArray(triviaData));
  }, []);

  const currentDrink = shuffledDrinks[currentDrinkIndex];
  const currentTrivia = shuffledTrivia[currentTriviaIndex];

  const handleOptionClick = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    if (gameType === 'drinks') {
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
    } else {
      // Trivia game logic
      const correctAnswer = currentTrivia.options[currentTrivia.correctAnswer];
      if (option === correctAnswer) {
        setIsCorrect(option);
        setScore(prev => prev + 1);
        setTimeout(() => {
          if (currentTriviaIndex === shuffledTrivia.length - 1) {
            setShowRank(true);
          } else {
            setCurrentTriviaIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setIsWrong(null);
          }
        }, 1500);
      } else {
        setIsWrong(option);
        setIsCorrect(correctAnswer);
        setTimeout(() => {
          if (currentTriviaIndex === shuffledTrivia.length - 1) {
            setShowRank(true);
          } else {
            setCurrentTriviaIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setIsWrong(null);
          }
        }, 1500);
      }
    }
  };

  // Reset game and reshuffle
  const resetGame = useCallback(() => {
    if (gameType === 'drinks') {
      setShuffledDrinks(shuffleArray(drinks));
      setCurrentDrinkIndex(0);
    } else {
      setShuffledTrivia(shuffleArray(triviaData));
      setCurrentTriviaIndex(0);
    }
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsWrong(null);
    setShowRank(false);
  }, [gameType]);

  // Add reset button when all questions have been shown
  const showResetButton = gameType === 'drinks' 
    ? currentDrinkIndex === shuffledDrinks.length - 1
    : currentTriviaIndex === shuffledTrivia.length - 1;

  return (
    <GameContainer>
      <Title>משחק המשקאות</Title>
      <GameSwitcher>
        <GameButton 
          active={gameType === 'trivia'} 
          onClick={() => {
            setGameType('trivia');
            resetGame();
          }}
        >
          טריוויה פרנט ברנקה
        </GameButton>
        <GameButton 
          active={gameType === 'drinks'} 
          onClick={() => {
            setGameType('drinks');
            resetGame();
          }}
        >
          משחק ניחוש משקאות
        </GameButton>
      </GameSwitcher>
      <GameExplanation>
        {gameType === 'trivia' 
          ? 'בדוק כמה אתה באמת מכיר את פרנט ברנקה ענה על השאלות, גלה את הדרגה שלך, וראה אם אתה ראוי לשוט של כבוד 🍸'
          : 'נחש לאיזו קטגוריה שייך כל משקה – ובדוק כמה אתה שולט בעולם האלכוהול 🍸'}
      </GameExplanation>
      <Score>ניקוד: {score}</Score>
      {gameType === 'drinks' ? (
        currentDrink && (
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
        )
      ) : (
        <>
          {showRank ? (
            <RankDisplay>
              <div>הדרגה שלך: <span style={{ fontWeight: 'bold' }}>{getRank(score)}</span></div>
              <div style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                ניקוד: {score} מתוך {shuffledTrivia.length}
              </div>
              <OptionButton
                onClick={resetGame}
                style={{ marginTop: '2rem' }}
              >
                התחל משחק חדש
              </OptionButton>
            </RankDisplay>
          ) : (
            currentTrivia && (
              <>
                <QuestionContainer>
                  <CoinImage src={`/coins/${leftCoin}.webp`} alt="Fernet Coin" />
                  <QuestionCard>
                    {currentTrivia.question}
                  </QuestionCard>
                  <CoinImage src={`/coins/${rightCoin}.webp`} alt="Fernet Coin" />
                </QuestionContainer>
                <TriviaOptionsContainer>
                  {currentTrivia.options.map((option, index) => (
                    <OptionButton
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                      isCorrect={index === currentTrivia.correctAnswer && selectedOption !== null}
                      isWrong={selectedOption === option && index !== currentTrivia.correctAnswer}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </TriviaOptionsContainer>
              </>
            )
          )}
        </>
      )}
    </GameContainer>
  );
}

export default Game; 