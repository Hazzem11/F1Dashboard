import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  color: #e10600;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1.5fr 80px 80px 80px 80px 80px;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(225, 6, 0, 0.1);
  border-bottom: 2px solid rgba(225, 6, 0, 0.3);
  font-weight: 600;
  color: #e10600;
  font-size: 0.9rem;
  text-align: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 50px 1.5fr 1fr 60px 60px 60px 60px 60px;
    gap: 8px;
    padding: 10px 15px;
    font-size: 0.8rem;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1.5fr 80px 80px 80px 80px 80px;
  gap: 15px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  opacity: 1;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
  
  ${props => props.position <= 3 && `
    background: rgba(225, 6, 0, 0.05);
    border-left: 4px solid #e10600;
  `}
  
  @media (max-width: 768px) {
    grid-template-columns: 50px 1.5fr 1fr 60px 60px 60px 60px 60px;
    gap: 8px;
    padding: 10px 15px;
    font-size: 0.8rem;
  }
`;

const Position = styled.div`
  font-weight: 600;
  color: ${props => {
    if (props.position === 1) return '#FFD700';
    if (props.position === 2) return '#C0C0C0';
    if (props.position === 3) return '#CD7F32';
    return 'rgba(255, 255, 255, 0.9)';
  }};
  font-size: 1.1rem;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DriverName = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TeamName = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StatCell = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px;
  font-style: italic;
`;

const DriverStats = ({ drivers }) => {
  const { language } = useLanguage();
  
  if (!drivers || drivers.length === 0) {
    return (
      <StatsContainer>
        <Title>{getTranslation('driverStats', language)}</Title>
        <NoDataMessage>No driver data available for the selected season.</NoDataMessage>
      </StatsContainer>
    );
  }

  // Sort drivers by points (highest to lowest) - same as DriverComparison
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points);

  return (
    <StatsContainer>
      <Title>{getTranslation('driverStats', language)}</Title>
      
      <TableContainer>
        <TableHeader>
          <div>{getTranslation('position', language)}</div>
          <div>{getTranslation('name', language)}</div>
          <div>{getTranslation('team', language)}</div>
          <div>{getTranslation('points', language)}</div>
          <div>{getTranslation('wins', language)}</div>
          <div>{getTranslation('podiums', language)}</div>
          <div>{getTranslation('polePositions', language)}</div>
          <div>{getTranslation('fastestLaps', language)}</div>
        </TableHeader>
        
        {sortedDrivers.map((driver, index) => (
          <TableRow key={driver.id || index} position={index + 1}>
            <Position position={index + 1}>{index + 1}</Position>
            <div>
              <DriverName>{driver.name}</DriverName>
            </div>
            <TeamName>{driver.team}</TeamName>
            <StatCell>{driver.points}</StatCell>
            <StatCell>{driver.wins}</StatCell>
            <StatCell>{driver.podiums}</StatCell>
            <StatCell>{driver.polePositions}</StatCell>
            <StatCell>{driver.fastestLaps}</StatCell>
          </TableRow>
        ))}
      </TableContainer>
    </StatsContainer>
  );
};

export default DriverStats; 