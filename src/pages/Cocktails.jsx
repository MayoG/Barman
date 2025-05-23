import React from 'react';
import styled from '@emotion/styled';
import cocktailsData from '../data/cocktails.json';

const CocktailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
  direction: rtl;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const CocktailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem;
`;

const CocktailCard = styled.div`
  background-color: rgba(36, 36, 36, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: row;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CocktailImage = styled.div`
  width: 50%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  flex-shrink: 0;
  order: 2;

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    min-height: auto;
    order: 1;
  }
`;

const CocktailDetails = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  order: 1;

  @media (max-width: 768px) {
    order: 2;
  }

  h2 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 0.75rem;
  color: #ffffff;

  strong {
    color: #646cff;
    margin-right: 0.5rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  ul {
    list-style-position: inside;
    padding-right: 1rem;
    margin-top: 0.25rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  span {
    display: block;
    padding-right: 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  margin: 2rem 0 1rem;
  font-size: 2rem;
  text-align: right;
`;

const SectionDescription = styled.p`
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: right;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Cocktails = () => {
  const { cocktails, FernetCocktails } = cocktailsData;

  return (
    <CocktailsContainer>
      <Title>קוקטיילים</Title>
      
      <SectionTitle>קוקטיילים עם פרנט ברנקה</SectionTitle>
      <SectionDescription>
        אוסף של קוקטיילים מיוחדים המשלבים את הטעם הייחודי של הפרנט ברנקה
      </SectionDescription>
      <CocktailsGrid>
        {FernetCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id}>
            <CocktailImage>
              <img src={cocktail.image} alt={cocktail.name} />
            </CocktailImage>
            <CocktailDetails>
              <h2>{cocktail.name}</h2>
              <DetailItem>
                <strong>אלכוהול בסיסי:</strong>
                <span>{cocktail.baseSpirit}</span>
              </DetailItem>
              <DetailItem>
                <strong>רשימת רכיבים:</strong>
                <ul>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </DetailItem>
              <DetailItem>
                <strong>סוג כוס:</strong>
                <span>{cocktail.glassType}</span>
              </DetailItem>
              <DetailItem>
                <strong>גארניש (קישוט):</strong>
                <span>{cocktail.garnish}</span>
              </DetailItem>
              <DetailItem>
                <strong>טכניקת הכנה:</strong>
                <span>{cocktail.preparationMethod}</span>
              </DetailItem>
              <DetailItem>
                <strong>הערות:</strong>
                <span>{cocktail.notes}</span>
              </DetailItem>
              <DetailItem>
                <strong>טעם:</strong>
                <span>{cocktail.flavorProfile}</span>
              </DetailItem>
            </CocktailDetails>
          </CocktailCard>
        ))}
      </CocktailsGrid>

      <SectionTitle>קוקטיילים קלאסיים</SectionTitle>
      <SectionDescription>
        אוסף של קוקטיילים קלאסיים שנלמדו בקורס
      </SectionDescription>
      <CocktailsGrid>
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id}>
            <CocktailImage>
              <img src={cocktail.image} alt={cocktail.name} />
            </CocktailImage>
            <CocktailDetails>
              <h2>{cocktail.name}</h2>
              <DetailItem>
                <strong>אלכוהול בסיסי:</strong>
                <span>{cocktail.baseSpirit}</span>
              </DetailItem>
              <DetailItem>
                <strong>רשימת רכיבים:</strong>
                <ul>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </DetailItem>
              <DetailItem>
                <strong>סוג כוס:</strong>
                <span>{cocktail.glassType}</span>
              </DetailItem>
              <DetailItem>
                <strong>גארניש (קישוט):</strong>
                <span>{cocktail.garnish}</span>
              </DetailItem>
              <DetailItem>
                <strong>טכניקת הכנה:</strong>
                <span>{cocktail.preparationMethod}</span>
              </DetailItem>
              <DetailItem>
                <strong>הערות:</strong>
                <span>{cocktail.notes}</span>
              </DetailItem>
              <DetailItem>
                <strong>טעם:</strong>
                <span>{cocktail.flavorProfile}</span>
              </DetailItem>
            </CocktailDetails>
          </CocktailCard>
        ))}
      </CocktailsGrid>
    </CocktailsContainer>
  );
};

export default Cocktails; 