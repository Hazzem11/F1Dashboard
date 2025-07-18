import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const OverviewContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
`;

const Title = styled.h2`
  color: #e10600;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #e10600;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
`;

const StandingsContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const StandingsTitle = styled.h3`
  color: #e10600;
  margin-bottom: 15px;
  font-size: 1.3rem;
  font-weight: 600;
`;

const StandingsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  background: rgba(225, 6, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #e10600;
  font-size: 0.9rem;
`;

const StandingsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${props => props.position <= 3 && `
    background: rgba(225, 6, 0, 0.1);
    border-left: 4px solid #e10600;
  `}
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
`;

const DriverName = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
`;

const TeamName = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-top: 2px;
`;

const StatCell = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-align: center;
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

const SeasonOverview = ({ drivers, year }) => {
  if (!drivers || drivers.length === 0) {
    return (
      <OverviewContainer>
        <Title>Season Overview</Title>
        <NoDataMessage>No season data available.</NoDataMessage>
      </OverviewContainer>
    );
  }

  // Calculate season statistics
  const totalPoints = drivers.reduce((sum, driver) => sum + driver.points, 0);
  const totalWins = drivers.reduce((sum, driver) => sum + driver.wins, 0);
  const totalPodiums = drivers.reduce((sum, driver) => sum + driver.podiums, 0);
  const totalPolePositions = drivers.reduce((sum, driver) => sum + driver.polePositions, 0);
  const totalFastestLaps = drivers.reduce((sum, driver) => sum + driver.fastestLaps, 0);
  const uniqueTeams = [...new Set(drivers.map(driver => driver.team))].length;

  // Prepare data for pie chart (top 5 drivers by points)
  const topDrivers = drivers
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const pieData = topDrivers.map(driver => ({
    name: driver.name,
    value: driver.points
  }));

  const COLORS = ['#e10600', '#00d4aa', '#ff6b35', '#4ecdc4', '#45b7d1'];

  return (
    <OverviewContainer>
      <Title>{year} Season Overview</Title>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{drivers.length}</StatValue>
          <StatLabel>Total Drivers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{uniqueTeams}</StatValue>
          <StatLabel>Teams</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalPoints}</StatValue>
          <StatLabel>Total Points</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalWins}</StatValue>
          <StatLabel>Total Wins</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalPodiums}</StatValue>
          <StatLabel>Total Podiums</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalPolePositions}</StatValue>
          <StatLabel>Pole Positions</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalFastestLaps}</StatValue>
          <StatLabel>Fastest Laps</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <Title>Points Distribution (Top 5 Drivers)</Title>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <StandingsContainer>
        <StandingsTitle>Driver Standings</StandingsTitle>
        <StandingsTable>
          <div>Pos</div>
          <div>Driver</div>
          <div>Points</div>
          <div>Wins</div>
          <div>Podiums</div>
          <div>Poles</div>
          <div>Fastest Laps</div>
        </StandingsTable>
        
        {drivers
          .sort((a, b) => a.position - b.position)
          .map((driver, index) => (
            <StandingsRow key={driver.id || index} position={driver.position}>
              <Position position={driver.position}>{driver.position}</Position>
              <div>
                <DriverName>{driver.name}</DriverName>
                <TeamName>{driver.team}</TeamName>
              </div>
              <StatCell>{driver.points}</StatCell>
              <StatCell>{driver.wins}</StatCell>
              <StatCell>{driver.podiums}</StatCell>
              <StatCell>{driver.polePositions}</StatCell>
              <StatCell>{driver.fastestLaps}</StatCell>
            </StandingsRow>
          ))}
      </StandingsContainer>
    </OverviewContainer>
  );
};

export default SeasonOverview; 