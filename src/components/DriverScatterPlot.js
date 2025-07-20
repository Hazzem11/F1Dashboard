import React from 'react';
import styled from 'styled-components';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

const ScatterContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #e10600;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ChartContainer = styled.div`
  height: 600px;
  width: 100%;
  position: relative;
`;

const LabelsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
`;

const QuadrantLabel = styled.div`
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  z-index: 10;
  pointer-events: none;
`;

const EliteLabel = styled(QuadrantLabel)`
  color: #00ff00;
  border-color: #00ff00;
  bottom: 15%;
  left: 15%;
`;

const QualifyingSpecialistLabel = styled(QuadrantLabel)`
  color: #ffaa00;
  border-color: #ffaa00;
  top: 15%;
  left: 15%;
`;

const RaceCraftLabel = styled(QuadrantLabel)`
  color: #00aaff;
  border-color: #00aaff;
 bottom: 15%;
  right: 15%; 
`;

const StrugglingLabel = styled(QuadrantLabel)`
  color: #ff4444;
  border-color: #ff4444;
   top: 15%;
  right: 15%;
`;

// Team color mapping
const TEAM_COLORS = {
  'Red Bull': '#3671C6',
  'McLaren': '#FF8700',
  'Ferrari': '#DC0000',
  'Mercedes': '#6CD3BF',
  'Aston Martin': '#358C75',
  'Haas': '#888888',
  'Racing Bulls': '#FFFFFF',
  'Williams': '#37BEDD',
  'Kick Sauber': '#52E252',
  'Alpine': '#0090FF'
};

// Generate realistic qualifying vs race finish data
const generateScatterData = (drivers) => {
  return drivers.map(driver => {
    // Generate realistic qualifying and race finish positions based on driver performance
    let avgQual, avgFinish;
    
    // Top drivers (positions 1-5) have better qualifying and race performance
    if (driver.position <= 5) {
      avgQual = 2 + Math.random() * 4; // 2-6 qualifying
      avgFinish = 2 + Math.random() * 4; // 2-6 finish
    } 
    // Mid-field drivers (positions 6-12)
    else if (driver.position <= 12) {
      avgQual = 6 + Math.random() * 6; // 6-12 qualifying
      avgFinish = 6 + Math.random() * 6; // 6-12 finish
    } 
    // Back markers (positions 13-20)
    else {
      avgQual = 12 + Math.random() * 8; // 12-20 qualifying
      avgFinish = 12 + Math.random() * 8; // 12-20 finish
    }
    
    // Add some variation - some drivers are better qualifiers, some better racers
    const qualBias = (Math.random() - 0.5) * 3;
    const raceBias = (Math.random() - 0.5) * 3;
    
    avgQual = Math.max(1, Math.min(20, avgQual + qualBias));
    avgFinish = Math.max(1, Math.min(20, avgFinish + raceBias));
    
    return {
      name: driver.name,
      team: driver.team,
      avgQual: Math.round(avgQual * 10) / 10,
      avgFinish: Math.round(avgFinish * 10) / 10,
      position: driver.position,
      points: driver.points || 0
    };
  });
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  const { language } = useLanguage();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '12px',
        color: 'white',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: TEAM_COLORS[data.team] || '#e10600' }}>
          {data.name}
        </p>
        <p style={{ margin: '4px 0', color: TEAM_COLORS[data.team] || 'white' }}>
          {getTranslation('team', language)}: {data.team}
        </p>
        <p style={{ margin: '4px 0' }}>
          {getTranslation('avgQualifying', language)}: <strong>{data.avgQual}</strong>
        </p>
        <p style={{ margin: '4px 0' }}>
          {getTranslation('avgRaceFinish', language)}: <strong>{data.avgFinish}</strong>
        </p>
        <p style={{ margin: '4px 0', fontWeight: 'bold', color: getQuadrantColor(data.quadrant) }}>
          {getTranslation('category', language)}: {data.quadrant}
        </p>
        <p style={{ margin: '4px 0' }}>
          {getTranslation('championshipPosition', language)}: <strong>{data.position}</strong>
        </p>
        <p style={{ margin: '4px 0' }}>
          {getTranslation('totalPoints', language)}: <strong>{data.points}</strong>
        </p>
      </div>
    );
  }
  return null;
};

const getQuadrantColor = (quadrant) => {
  switch (quadrant) {
    case 'Elite': return '#00ff00';
    case 'Qualifying Specialist': return '#ffaa00';
    case 'Race Craft Master': return '#00aaff';
    case 'Struggling': return '#ff4444';
    default: return 'white';
  }
};

const DriverScatterPlot = ({ drivers }) => {
  const { language } = useLanguage();
  const scatterData = generateScatterData(drivers);
  
  // Calculate median values for reference lines
  const qualValues = scatterData.map(d => d.avgQual);
  const finishValues = scatterData.map(d => d.avgFinish);
  const medianQual = qualValues.sort((a, b) => a - b)[Math.floor(qualValues.length / 2)];
  const medianFinish = finishValues.sort((a, b) => a - b)[Math.floor(finishValues.length / 2)];
  
  // Update quadrant assignments based on actual medians
  const updatedScatterData = scatterData.map(driver => {
    let quadrant = '';
    // Note: In scatter plot, Y-axis has higher values (worse performance) at top
    // So avgFinish > medianFinish means WORSE race performance (higher position number)
    if (driver.avgQual <= medianQual && driver.avgFinish <= medianFinish) {
      quadrant = 'Elite'; // Good qual, good race (bottom-left)
    } else if (driver.avgQual <= medianQual && driver.avgFinish > medianFinish) {
      quadrant = 'Qualifying Specialist'; // Good qual, poor race (bottom-right)
    } else if (driver.avgQual > medianQual && driver.avgFinish <= medianFinish) {
      quadrant = 'Race Craft Master'; // Poor qual, good race (top-right)
    } else {
      quadrant = 'Struggling'; // Poor qual, poor race (top-left)
    }
    
    return {
      ...driver,
      quadrant: quadrant
    };
  });
  
  // Group data by team for different colors
  const teamGroups = {};
  updatedScatterData.forEach(driver => {
    if (!teamGroups[driver.team]) {
      teamGroups[driver.team] = [];
    }
    teamGroups[driver.team].push(driver);
  });

  return (
    <ScatterContainer>
      <Title>{getTranslation('driverPerformanceQuadrants', language)}</Title>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            
            {/* Reference lines to create quadrants */}
            <ReferenceLine 
              x={medianQual} 
              stroke="rgba(255, 255, 255, 0.3)" 
              strokeDasharray="5 5"
              label={{ value: `${getTranslation('medianQual', language)}: ${medianQual.toFixed(1)}`, position: 'top', fill: 'rgba(255, 255, 255, 0.8)' }}
            />
            <ReferenceLine 
              y={medianFinish} 
              stroke="rgba(255, 255, 255, 0.3)" 
              strokeDasharray="5 5"
              label={{ value: `${getTranslation('medianFinish', language)}: ${medianFinish.toFixed(1)}`, angle: -90, position: 'insideLeft', fill: 'rgba(255, 255, 255, 0.8)' }}
            />
            
            <XAxis
              type="number"
              dataKey="avgQual"
              name="Average Qualifying Position"
              domain={[1, 20]}
              tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              label={{ 
                value: `${getTranslation('averageQualifyingPosition', language)} ${getTranslation('lowerIsBetter', language)}`, 
                position: "bottom", 
                offset: 0,
                style: { fill: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }
              }}
            />
            <YAxis
              type="number"
              dataKey="avgFinish"
              name="Average Race Finish Position"
              domain={[1, 20]}
              tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              label={{ 
                value: `${getTranslation('averageRaceFinishPosition', language)} ${getTranslation('lowerIsBetter', language)}`, 
                angle: -90, 
                position: "insideLeft",
                offset: 20,
                style: { fill: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Render each team's data with their respective color */}
            {Object.entries(teamGroups).map(([team, teamData]) => (
              <Scatter
                key={team}
                name={team}
                data={teamData}
                fill={TEAM_COLORS[team] || '#888888'}
                shape="circle"
                fillOpacity={0.8}
                stroke={TEAM_COLORS[team] || '#888888'}
                strokeWidth={1}
                r={8}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Quadrant Labels */}
        <LabelsContainer>
          <EliteLabel>
            {getTranslation('elite', language)}<br />
            {getTranslation('goodQualifying', language)}<br />
            {getTranslation('goodRacing', language)}
          </EliteLabel>
          
          <QualifyingSpecialistLabel>
            {getTranslation('qualifyingSpecialist', language)}<br />
            {getTranslation('goodQualifying', language)}<br />
            {getTranslation('poorRacing', language)}
          </QualifyingSpecialistLabel>
          
          <RaceCraftLabel>
            {getTranslation('raceCraftMaster', language)}<br />
            {getTranslation('poorQualifying', language)}<br />
            {getTranslation('goodRacing', language)}
          </RaceCraftLabel>
          
          <StrugglingLabel>
            {getTranslation('struggling', language)}<br />
            {getTranslation('poorQualifying', language)}<br />
            {getTranslation('poorRacing', language)}
          </StrugglingLabel>
        </LabelsContainer>
      </ChartContainer>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '15px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px'
      }}>
        <p>{getTranslation('quadrantsDividedByMedian', language)}</p>
        <p>{getTranslation('hoverForDetails', language)}</p>
      </div>
    </ScatterContainer>
  );
};

export default DriverScatterPlot; 