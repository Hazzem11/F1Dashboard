import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

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

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const ToggleButton = styled.button`
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

const RaceSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RaceCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  cursor: pointer;
  
  input {
    accent-color: #e10600;
  }
`;

const ChartContainer = styled.div`
  height: 500px;
  margin-bottom: 20px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px;
  font-style: italic;
`;

// Team color mapping
const TEAM_COLORS = {
  'Red Bull Racing': '#3671C6',
  'Red Bull': '#3671C6',
  'McLaren': '#FF8700',
  'Ferrari': '#DC0000',
  'Mercedes': '#6CD3BF',
  'Aston Martin': '#358C75',
  'Haas': '#888888',
  'Racing Bulls': '#FFFFFF',
  'Williams': '#37BEDD',
  'Sauber': '#52E252',
  'Kick Sauber': '#52E252',
  'Alpine': '#0090FF'
};

const calculateTotalPoints = (racePoints, selectedRaces) => {
  return racePoints.reduce((total, points, index) => {
    if (selectedRaces.includes(index + 1)) {
      return total + points;
    }
    return total;
  }, 0);
};

const buildDriverChartData = (drivers, selectedRaces) => {
  return drivers.map(driver => ({
    name: driver.name,
    points: calculateTotalPoints(driver.racePoints, selectedRaces),
    team: driver.team,
    fill: TEAM_COLORS[driver.team] || '#e10600'
  })).sort((a, b) => b.points - a.points);
};

const buildTeamChartData = (drivers, selectedRaces) => {
  const teamPoints = {};
  
  drivers.forEach(driver => {
    const points = calculateTotalPoints(driver.racePoints, selectedRaces);
    if (!teamPoints[driver.team]) {
      teamPoints[driver.team] = 0;
    }
    teamPoints[driver.team] += points;
  });
  
  return Object.entries(teamPoints)
    .map(([team, points]) => ({ 
      name: team, 
      points,
      fill: TEAM_COLORS[team] || '#e10600'
    }))
    .sort((a, b) => b.points - a.points);
};

const DriverComparison = ({ drivers }) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState('drivers'); // 'drivers' or 'teams'
  const [selectedRaces, setSelectedRaces] = useState([]);
  
  // Initialize with all races selected
  useEffect(() => {
    if (drivers.length > 0) {
      const maxRaces = Math.max(...drivers.map(d => d.racePoints.length));
      setSelectedRaces(Array.from({ length: maxRaces }, (_, i) => i + 1));
    }
  }, [drivers]);

  const handleRaceToggle = (raceNumber) => {
    setSelectedRaces(prev => {
      if (prev.includes(raceNumber)) {
        return prev.filter(r => r !== raceNumber);
      } else {
        return [...prev, raceNumber].sort((a, b) => a - b);
      }
    });
  };

  const handleSelectAllRaces = () => {
    if (drivers.length > 0) {
      const maxRaces = Math.max(...drivers.map(d => d.racePoints.length));
      setSelectedRaces(Array.from({ length: maxRaces }, (_, i) => i + 1));
    }
  };

  const handleDeselectAllRaces = () => {
    setSelectedRaces([]);
  };

  const chartData = viewMode === 'drivers' 
    ? buildDriverChartData(drivers, selectedRaces)
    : buildTeamChartData(drivers, selectedRaces);

  const maxRaces = drivers.length > 0 ? Math.max(...drivers.map(d => d.racePoints.length)) : 0;

  return (
    <ComparisonContainer>
      <Title>{getTranslation('pointsComparison', language)}</Title>
      
      <ControlsContainer>
        <ControlRow>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>{getTranslation('view', language)}:</span>
          <ToggleButton
            selected={viewMode === 'drivers'}
            onClick={() => setViewMode('drivers')}
          >
            {getTranslation('drivers', language)}
          </ToggleButton>
          <ToggleButton
            selected={viewMode === 'teams'}
            onClick={() => setViewMode('teams')}
          >
            {getTranslation('teams', language)}
          </ToggleButton>
        </ControlRow>

        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '10px' 
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              {getTranslation('racesToInclude', language)} ({selectedRaces.length}/{maxRaces}):
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <ToggleButton
                selected={false}
                onClick={handleSelectAllRaces}
                style={{ fontSize: '0.8rem', padding: '4px 8px' }}
              >
                {getTranslation('selectAll', language)}
              </ToggleButton>
              <ToggleButton
                selected={false}
                onClick={handleDeselectAllRaces}
                style={{ fontSize: '0.8rem', padding: '4px 8px' }}
              >
                {getTranslation('deselectAll', language)}
              </ToggleButton>
            </div>
          </div>
          <RaceSelector>
            {Array.from({ length: maxRaces }, (_, i) => i + 1).map(raceNumber => (
              <RaceCheckbox key={raceNumber}>
                <input
                  type="checkbox"
                  checked={selectedRaces.includes(raceNumber)}
                  onChange={() => handleRaceToggle(raceNumber)}
                />
                {getTranslation('race', language)} {raceNumber}
              </RaceCheckbox>
            ))}
          </RaceSelector>
        </div>
      </ControlsContainer>

      {chartData.length > 0 ? (
        <ChartContainer>
          <Title>
            {viewMode === 'drivers' 
              ? getTranslation('driverPointsAcrossRaces', language) 
              : getTranslation('teamPointsAcrossRaces', language)
            }
          </Title>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                label={{ 
                  value: getTranslation('drivers', language), 
                  position: 'bottom', 
                  offset: 0,
                  fill: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: 14 
                }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                label={{ 
                  value: getTranslation('points', language), 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: 14 
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value, name) => [value, getTranslation('points', language)]}
              />
              <Bar dataKey="points" fill="#e10600" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <NoDataMessage>No data available for the selected races.</NoDataMessage>
      )}
    </ComparisonContainer>
  );
};

export default DriverComparison; 