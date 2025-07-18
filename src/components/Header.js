import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #e10600 0%, #ff1e1e 100%);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(225, 6, 0, 0.3);
  margin-bottom: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 5px 0 0 0;
  font-weight: 300;
`;

const YearSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const YearLabel = styled.label`
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
`;

const YearSelect = styled.select`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #e10600;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const Header = ({ selectedYear, onYearChange }) => {
  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <Title>🏎️ F1 Driver Statistics</Title>
          <Subtitle>Comprehensive Formula 1 Driver Performance Dashboard</Subtitle>
        </div>
        <YearSelector>
          <YearLabel htmlFor="year-select">Season:</YearLabel>
          <YearSelect
            id="year-select"
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </YearSelect>
        </YearSelector>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 