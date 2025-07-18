import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ComparisonContainer = styled.div`
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

const DriverSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const DriverButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.selected ? '#e10600' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.selected ? 'rgba(225, 6, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.selected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(225, 6, 0, 0.1);
    border-color: #e10600;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 20px;
`;

const ComparisonTable = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  background: rgba(225, 6, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #e10600;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const TableCell = styled.div`
  color: ${props => props.highlight ? '#e10600' : 'rgba(255, 255, 255, 0.9)'};
  font-weight: ${props => props.highlight ? '600' : '400'};
  font-size: 0.9rem;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px;
  font-style: italic;
`;

const DriverComparison = ({ drivers }) => {
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  if (!drivers || drivers.length === 0) {
    return (
      <ComparisonContainer>
        <Title>Driver Comparison</Title>
        <NoDataMessage>No driver data available for comparison.</NoDataMessage>
      </ComparisonContainer>
    );
  }

  const handleDriverToggle = (driverId) => {
    setSelectedDrivers(prev => {
      if (prev.includes(driverId)) {
        return prev.filter(id => id !== driverId);
      } else if (prev.length < 3) {
        return [...prev, driverId];
      }
      return prev;
    });
  };

  const selectedDriverData = drivers.filter(driver => selectedDrivers.includes(driver.id || driver.name));

  const pointsComparisonData = selectedDriverData.map(driver => ({
    name: driver.name,
    points: driver.points,
    wins: driver.wins,
    podiums: driver.podiums
  }));

  const radarData = selectedDriverData.map(driver => ({
    subject: driver.name,
    Points: driver.points,
    Wins: driver.wins * 10, // Scale for better visualization
    Podiums: driver.podiums * 5,
    'Pole Positions': driver.polePositions * 8,
    'Fastest Laps': driver.fastestLaps * 6
  }));

  const colors = ['#e10600', '#00d4aa', '#ff6b35'];

  return (
    <ComparisonContainer>
      <Title>Driver Comparison</Title>
      
      <DriverSelector>
        {drivers.map((driver, index) => (
          <DriverButton
            key={driver.id || index}
            selected={selectedDrivers.includes(driver.id || driver.name)}
            onClick={() => handleDriverToggle(driver.id || driver.name)}
          >
            {driver.name}
          </DriverButton>
        ))}
      </DriverSelector>

      {selectedDriverData.length > 0 && (
        <>
          <ChartContainer>
            <Title>Points Comparison</Title>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsComparisonData}>
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
                <Legend />
                <Line type="monotone" dataKey="points" stroke="#e10600" strokeWidth={3} />
                <Line type="monotone" dataKey="wins" stroke="#00d4aa" strokeWidth={3} />
                <Line type="monotone" dataKey="podiums" stroke="#ff6b35" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <Title>Performance Radar Chart</Title>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                />
                <Radar 
                  name="Performance" 
                  dataKey="Points" 
                  stroke={colors[0]} 
                  fill={colors[0]} 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Performance" 
                  dataKey="Wins" 
                  stroke={colors[1]} 
                  fill={colors[1]} 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Performance" 
                  dataKey="Podiums" 
                  stroke={colors[2]} 
                  fill={colors[2]} 
                  fillOpacity={0.3} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ComparisonTable>
            <Title>Detailed Comparison</Title>
            <TableHeader>
              <div>Driver</div>
              <div>Points</div>
              <div>Wins</div>
              <div>Podiums</div>
              <div>Pole Positions</div>
              <div>Fastest Laps</div>
            </TableHeader>
            {selectedDriverData.map((driver, index) => (
              <TableRow key={driver.id || index}>
                <TableCell highlight>{driver.name}</TableCell>
                <TableCell>{driver.points}</TableCell>
                <TableCell>{driver.wins}</TableCell>
                <TableCell>{driver.podiums}</TableCell>
                <TableCell>{driver.polePositions}</TableCell>
                <TableCell>{driver.fastestLaps}</TableCell>
              </TableRow>
            ))}
          </ComparisonTable>
        </>
      )}

      {selectedDriverData.length === 0 && (
        <NoDataMessage>
          Select up to 3 drivers to compare their statistics.
        </NoDataMessage>
      )}
    </ComparisonContainer>
  );
};

export default DriverComparison; 