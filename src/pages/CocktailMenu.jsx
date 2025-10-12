import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";
import cocktailsData from "../data/cocktails.json";

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
  color: #d4af37;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const DateSwitcher = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(10, 10, 10, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const DateButton = styled.button`
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.3)" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)")};
  color: ${(props) => (props.active ? "#ffffff" : "#d4af37")};
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
  border: 1px solid rgba(212, 175, 55, 0.2);
  display: flex;
  flex-direction: row;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(212, 175, 55, 0.4);
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
    position: relative;

    img {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

const CocktailDetails = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  order: 1;

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
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
    color: #d4af37;
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
  color: #d4af37;
  margin: 2rem 0 1rem;
  font-size: 2.5rem;
  text-align: right;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
`;

const SectionDescription = styled.p`
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: right;
  font-size: 1.2rem;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const InfoIcon = styled.span`
  cursor: help;
  position: relative;
  font-size: 24px;
  color: #d4af37;

  &:hover {
    opacity: 0.8;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: rgba(20, 20, 25, 0.98);
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(212, 175, 55, 0.3);
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
  backdrop-filter: blur(8px);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 6px;
    position: relative;
    padding-right: 12px;
    line-height: 1.4;

    &:last-child {
      margin-bottom: 0;
    }

    &:before {
      content: "•";
      color: #d4af37;
      position: absolute;
      right: 0;
    }
  }
`;

const FamilyContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CocktailMenu = () => {
  const { cocktails, cocktailFamilies } = cocktailsData;
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  // Get all unique dates from cocktails and create mappings
  const dateMappings = useMemo(() => {
    const dates = new Set();
    cocktails.forEach((cocktail) => {
      if (cocktail.date) {
        // Handle both single date string and array of dates
        const cocktailDates = Array.isArray(cocktail.date) ? cocktail.date : [cocktail.date];
        cocktailDates.forEach((date) => dates.add(date));
      }
    });

    const mappings = {};
    // Sort dates chronologically
    const sortedDates = Array.from(dates).sort();

    sortedDates.forEach((date) => {
      const cocktailsForDate = cocktails.filter((cocktail) => {
        if (!cocktail.date) return false;
        // Handle both single date string and array of dates
        const cocktailDates = Array.isArray(cocktail.date) ? cocktail.date : [cocktail.date];
        return cocktailDates.includes(date);
      });
      mappings[date] = {
        title: `תאריך ${date}`,
        description: `${cocktailsForDate.length} קוקטיילים זמינים לתאריך זה`,
        filter: (cocktail) => {
          if (!cocktail.date) return false;
          // Handle both single date string and array of dates
          const cocktailDates = Array.isArray(cocktail.date) ? cocktail.date : [cocktail.date];
          return cocktailDates.includes(date);
        },
      };
    });

    return mappings;
  }, [cocktails]);

  // Set initial selected date to the latest available date
  React.useEffect(() => {
    const availableDates = Object.keys(dateMappings);
    if (availableDates.length > 0 && !selectedDate) {
      // Sort dates in descending order to get the latest date first
      const sortedDates = availableDates.sort((a, b) => b.localeCompare(a));
      setSelectedDate(sortedDates[0]);
    }
  }, [dateMappings, selectedDate]);

  // Filter cocktails based on selected date
  const filteredCocktails = useMemo(() => {
    const mapping = dateMappings[selectedDate];
    if (!mapping) return [];

    return cocktails.filter(mapping.filter);
  }, [cocktails, selectedDate, dateMappings]);

  const currentMapping = dateMappings[selectedDate];

  if (!selectedDate) {
    return (
      <CocktailsContainer>
        <Title>תפריט קוקטיילים</Title>
        <SectionDescription>טוען תאריכים זמינים...</SectionDescription>
      </CocktailsContainer>
    );
  }

  return (
    <CocktailsContainer>
      <Title>תפריט קוקטיילים</Title>

      <DateSwitcher>
        {Object.keys(dateMappings).map((date) => (
          <DateButton key={date} active={selectedDate === date} onClick={() => setSelectedDate(date)}>
            {date}
          </DateButton>
        ))}
      </DateSwitcher>

      <CocktailsGrid>
        {filteredCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id}>
            <CocktailImage>
              <img src={cocktail.image} alt={cocktail.name} />
            </CocktailImage>
            <CocktailDetails>
              <h2>{cocktail.name}</h2>
              {cocktail.baseSpirit && (
                <DetailItem>
                  <strong>אלכוהול בסיסי:</strong>
                  <span>{Array.isArray(cocktail.baseSpirit) ? cocktail.baseSpirit.join(" / ") : cocktail.baseSpirit}</span>
                </DetailItem>
              )}
              {cocktail.ingredients && cocktail.ingredients.length > 0 && (
                <DetailItem>
                  <strong>רשימת רכיבים:</strong>
                  <ul>
                    {cocktail.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </DetailItem>
              )}
              {cocktail.glassType && (
                <DetailItem>
                  <strong>סוג כוס:</strong>
                  <span>{Array.isArray(cocktail.glassType) ? cocktail.glassType.join(" / ") : cocktail.glassType}</span>
                </DetailItem>
              )}
              {cocktail.garnish && (
                <DetailItem>
                  <strong>גארניש (קישוט):</strong>
                  <span>{cocktail.garnish}</span>
                </DetailItem>
              )}
              {cocktail.preparationMethod && (
                <DetailItem>
                  <strong>טכניקת הכנה:</strong>
                  <span>{Array.isArray(cocktail.preparationMethod) ? cocktail.preparationMethod.join(" + ") : cocktail.preparationMethod}</span>
                </DetailItem>
              )}
              {cocktail.notes && (
                <DetailItem>
                  <strong>הערות:</strong>
                  <span>{cocktail.notes}</span>
                </DetailItem>
              )}
              {cocktail.flavorProfile && (
                <DetailItem>
                  <strong>טעם:</strong>
                  <span>{cocktail.flavorProfile}</span>
                </DetailItem>
              )}
              {cocktail.family && (
                <DetailItem>
                  <strong>משפחה:</strong>
                  <FamilyContainer>
                    <InfoIcon onMouseEnter={() => setHoveredTooltip(`${cocktail.id}-${cocktail.family}`)} onMouseLeave={() => setHoveredTooltip(null)}>
                      &#9432;
                    </InfoIcon>
                    <span>{cocktail.family}</span>
                    <Tooltip show={hoveredTooltip === `${cocktail.id}-${cocktail.family}`}>
                      <ul>
                        {cocktailFamilies[cocktail.family]?.description.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </Tooltip>
                  </FamilyContainer>
                </DetailItem>
              )}
            </CocktailDetails>
          </CocktailCard>
        ))}
      </CocktailsGrid>
    </CocktailsContainer>
  );
};

export default CocktailMenu;
