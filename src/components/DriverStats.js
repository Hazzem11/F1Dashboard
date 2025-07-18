import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const DriverGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const DriverCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(225, 6, 0, 0.2);
    border-color: #e10600;
  }
  
  ${props => props.selected && `
    border-color: #e10600;
    background: rgba(225, 6, 0, 0.1);
    box-shadow: 0 0 20px rgba(225, 6, 0, 0.3);
  `}
`;

const DriverName = styled.h3`
  color: #ffffff;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const DriverTeam = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 10px 0;
  font-size: 0.9rem;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const StatLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 20px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px;
  font-style: italic;
`;

const DriverStats = ({ drivers }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  if (!drivers || drivers.length === 0) {
    return (
      <StatsContainer>
        <Title>Driver Statistics</Title>
        <NoDataMessage>No driver data available for the selected season.</NoDataMessage>
      </StatsContainer>
    );
  }

  const chartData = selectedDriver ? [
    { name: 'Points', value: selectedDriver.points },
    { name: 'Wins', value: selectedDriver.wins },
    { name: 'Podiums', value: selectedDriver.podiums },
    { name: 'Pole Positions', value: selectedDriver.polePositions },
    { name: 'Fastest Laps', value: selectedDriver.fastestLaps }
  ] : [];

  return (
    <StatsContainer>
      <Title>Driver Statistics</Title>
      
      <DriverGrid>
        {drivers.map((driver, index) => (
          <DriverCard
            key={driver.id || index}
            selected={selectedDriver?.id === driver.id}
            onClick={() => setSelectedDriver(driver)}
          >
            <DriverName>{driver.name}</DriverName>
            <DriverTeam>{driver.team}</DriverTeam>
            <StatsRow>
              <StatLabel>Position:</StatLabel>
              <StatValue>#{driver.position}</StatValue>
            </StatsRow>
            <StatsRow>
              <StatLabel>Points:</StatLabel>
              <StatValue>{driver.points}</StatValue>
            </StatsRow>
            <StatsRow>
              <StatLabel>Wins:</StatLabel>
              <StatValue>{driver.wins}</StatValue>
            </StatsRow>
            <StatsRow>
              <StatLabel>Podiums:</StatLabel>
              <StatValue>{driver.podiums}</StatValue>
            </StatsRow>
            <StatsRow>
              <StatLabel>Pole Positions:</StatLabel>
              <StatValue>{driver.polePositions}</StatValue>
            </StatsRow>
            <StatsRow>
              <StatLabel>Fastest Laps:</StatLabel>
              <StatValue>{driver.fastestLaps}</StatValue>
            </StatsRow>
          </DriverCard>
        ))}
      </DriverGrid>

      {selectedDriver && (
        <ChartContainer>
          <Title>{selectedDriver.name} - Performance Overview</Title>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="value" fill="#e10600" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </StatsContainer>
  );
};

export default DriverStats; 