import React, { useState, useMemo } from 'react';
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
  color: #d4af37;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
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

const FilterContainer = styled.div`
  background-color: rgba(36, 36, 36, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(8px);
`;

const FilterTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: right;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ClearButton = styled.button`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #d4af37;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const FilterSelect = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #ffffff;
  padding: 0.5rem;
  padding-left: 2rem;
  border-radius: 6px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }

  option {
    background-color: #242424;
  }

  &::-ms-expand {
    display: none;
  }
`;

const FilterLabel = styled.label`
  color: #ffffff;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Cocktails = () => {
  const { cocktails, FernetCocktails } = cocktailsData;
  const [filters, setFilters] = useState({
    baseSpirit: '',
    glassType: '',
    preparationMethod: ''
  });

  // Get unique values for each filter
  const filterOptions = useMemo(() => {
    const options = {
      baseSpirit: new Set(),
      glassType: new Set(),
      preparationMethod: new Set()
    };

    cocktails.forEach(cocktail => {
      if (cocktail.baseSpirit) {
        // Handle both string and array cases for baseSpirit
        const spirits = Array.isArray(cocktail.baseSpirit) 
          ? cocktail.baseSpirit 
          : [cocktail.baseSpirit];
        spirits.forEach(spirit => options.baseSpirit.add(spirit));
      }
      if (cocktail.glassType) options.glassType.add(cocktail.glassType);
      if (cocktail.preparationMethod) {
        // Handle both string and array cases for preparationMethod
        const methods = Array.isArray(cocktail.preparationMethod)
          ? cocktail.preparationMethod
          : [cocktail.preparationMethod];
        methods.forEach(method => options.preparationMethod.add(method));
      }
    });

    return {
      baseSpirit: Array.from(options.baseSpirit).sort(),
      glassType: Array.from(options.glassType).sort(),
      preparationMethod: Array.from(options.preparationMethod).sort()
    };
  }, [cocktails]);

  // Filter cocktails based on selected filters
  const filteredCocktails = useMemo(() => {
    return cocktails.filter(cocktail => {
      const baseSpiritMatch = !filters.baseSpirit || 
        (Array.isArray(cocktail.baseSpirit) 
          ? cocktail.baseSpirit.includes(filters.baseSpirit)
          : cocktail.baseSpirit === filters.baseSpirit);
      
      const preparationMethodMatch = !filters.preparationMethod ||
        (Array.isArray(cocktail.preparationMethod)
          ? cocktail.preparationMethod.includes(filters.preparationMethod)
          : cocktail.preparationMethod === filters.preparationMethod);
      
      return (
        baseSpiritMatch &&
        (!filters.glassType || cocktail.glassType === filters.glassType) &&
        preparationMethodMatch
      );
    });
  }, [cocktails, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <CocktailsContainer>
      <Title>קוקטיילים</Title>
      
      <SectionTitle>קוקטיילים עם פרנט ברנקה</SectionTitle>
      <SectionDescription>
        אוסף של קוקטיילים מיוחדים המשלבים את הטעם הייחודי של פרנט ברנקה
      </SectionDescription>
      <CocktailsGrid>
        {FernetCocktails.map((cocktail) => (
          <CocktailCard key={cocktail.id}>
            <CocktailImage>
              <img src={cocktail.image} alt={cocktail.name} />
            </CocktailImage>
            <CocktailDetails>
              <h2>{cocktail.name}</h2>
              {cocktail.baseSpirit && (
                <DetailItem>
                  <strong>אלכוהול בסיסי:</strong>
                  <span>
                    {Array.isArray(cocktail.baseSpirit) 
                      ? cocktail.baseSpirit.join(' / ')
                      : cocktail.baseSpirit}
                  </span>
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
                  <span>{cocktail.glassType}</span>
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
                  <span>
                    {Array.isArray(cocktail.preparationMethod)
                      ? cocktail.preparationMethod.join(' + ')
                      : cocktail.preparationMethod}
                  </span>
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
            </CocktailDetails>
          </CocktailCard>
        ))}
      </CocktailsGrid>

      <SectionTitle>קוקטיילים קלאסיים</SectionTitle>
      <SectionDescription>
        אוסף של קוקטיילים קלאסיים שנלמדו בקורס
      </SectionDescription>

      <FilterContainer>
        <FilterTitle>סינון קוקטיילים</FilterTitle>
        <FilterGrid>
          <div>
            <FilterLabel>אלכוהול בסיסי</FilterLabel>
            <FilterSelectWrapper>
              <FilterSelect
                value={filters.baseSpirit}
                onChange={(e) => handleFilterChange('baseSpirit', e.target.value)}
              >
                <option value="">הכל</option>
                {filterOptions.baseSpirit.map((spirit) => (
                  <option key={spirit} value={spirit}>
                    {spirit}
                  </option>
                ))}
              </FilterSelect>
              {filters.baseSpirit && (
                <ClearButton onClick={() => handleFilterChange('baseSpirit', '')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </ClearButton>
              )}
            </FilterSelectWrapper>
          </div>
          <div>
            <FilterLabel>סוג כוס</FilterLabel>
            <FilterSelectWrapper>
              <FilterSelect
                value={filters.glassType}
                onChange={(e) => handleFilterChange('glassType', e.target.value)}
              >
                <option value="">הכל</option>
                {filterOptions.glassType.map((glass) => (
                  <option key={glass} value={glass}>
                    {glass}
                  </option>
                ))}
              </FilterSelect>
              {filters.glassType && (
                <ClearButton onClick={() => handleFilterChange('glassType', '')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </ClearButton>
              )}
            </FilterSelectWrapper>
          </div>
          <div>
            <FilterLabel>טכניקת הכנה</FilterLabel>
            <FilterSelectWrapper>
              <FilterSelect
                value={filters.preparationMethod}
                onChange={(e) => handleFilterChange('preparationMethod', e.target.value)}
              >
                <option value="">הכל</option>
                {filterOptions.preparationMethod.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </FilterSelect>
              {filters.preparationMethod && (
                <ClearButton onClick={() => handleFilterChange('preparationMethod', '')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </ClearButton>
              )}
            </FilterSelectWrapper>
          </div>
        </FilterGrid>
      </FilterContainer>

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
                  <span>
                    {Array.isArray(cocktail.baseSpirit) 
                      ? cocktail.baseSpirit.join(' / ')
                      : cocktail.baseSpirit}
                  </span>
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
                  <span>{cocktail.glassType}</span>
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
                  <span>
                    {Array.isArray(cocktail.preparationMethod)
                      ? cocktail.preparationMethod.join(' + ')
                      : cocktail.preparationMethod}
                  </span>
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
            </CocktailDetails>
          </CocktailCard>
        ))}
      </CocktailsGrid>
    </CocktailsContainer>
  );
};

export default Cocktails; 