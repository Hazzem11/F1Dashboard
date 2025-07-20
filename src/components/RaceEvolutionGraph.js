import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

const DRIVERS = [
  "Oscar Piastri", "Lando Norris", "Max Verstappen", "George Russell", "Charles Leclerc", "Lewis Hamilton", "Kimi Antonelli", "Alex Albon", "Nico Hulkenberg", "Esteban Ocon", "Isack Hadjar", "Lance Stroll", "Pierre Gasly", "Fernando Alonso", "Carlos Sainz", "Liam Lawson", "Yuki Tsunoda", "Ollie Bearmean", "Gabriel Bortoleto", "Franco Colapinto"
];

// 2025 driver-team mapping (from api.js)
const DRIVER_TEAM = {
  "Oscar Piastri": "McLaren",
  "Lando Norris": "McLaren",
  "Max Verstappen": "Red Bull",
  "George Russell": "Mercedes",
  "Charles Leclerc": "Ferrari",
  "Lewis Hamilton": "Ferrari",
  "Kimi Antonelli": "Mercedes",
  "Alex Albon": "Williams",
  "Nico Hulkenberg": "Kick Sauber",
  "Esteban Ocon": "Haas",
  "Isack Hadjar": "Racing Bulls",
  "Lance Stroll": "Aston Martin",
  "Pierre Gasly": "Alpine",
  "Fernando Alonso": "Aston Martin",
  "Carlos Sainz": "Williams",
  "Liam Lawson": "Racing Bulls",
  "Yuki Tsunoda": "Red Bull",
  "Ollie Bearmean": "Haas",
  "Gabriel Bortoleto": "Kick Sauber",
  "Franco Colapinto": "Alpine"
};

// Team color mapping
const TEAM_COLORS = {
  "Ferrari": "#DC0000",
  "Red Bull": "#3671C6",
  "Red Bull Racing": "#3671C6",
  "Racing Bulls": "#FFFFFF",
  "Williams": "#37BEDD",
  "McLaren": "#FF8700",
  "Mercedes": "#6CD3BF",
  "Aston Martin": "#358C75",
  "Alpine": "#0090FF",
  "Kick Sauber": "#52E252",
  "Haas": "#888888"
};

const NUM_LAPS = {
  Australia: 58,
  China: 56,
  Bahrain: 57,
  Jeddah: 50,
  Japan: 53,
  Monaco: 78
};

const RACES = ["Australia", "China", "Bahrain", "Jeddah", "Japan", "Monaco"];

function generateRaceEvolution(numLaps) {
  let grid = DRIVERS.map((name, i) => ({ name, pos: i + 1 }));
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  const laps = [];
  let current = grid.map(d => d.name);
  for (let lap = 1; lap <= numLaps; lap++) {
    let overtakes = Math.floor(Math.random() * 3) + 1;
    let arr = [...current];
    for (let o = 0; o < overtakes; o++) {
      let idx = Math.floor(Math.random() * (DRIVERS.length - 1));
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    }
    current = arr;
    let lapObj = { lap };
    for (let i = 0; i < DRIVERS.length; i++) {
      lapObj[arr[i]] = i + 1;
    }
    laps.push(lapObj);
  }
  return laps;
}

const raceDataMap = {
  Australia: generateRaceEvolution(NUM_LAPS.Australia),
  China: generateRaceEvolution(NUM_LAPS.China),
  Bahrain: generateRaceEvolution(NUM_LAPS.Bahrain),
  Jeddah: generateRaceEvolution(NUM_LAPS.Jeddah),
  Japan: generateRaceEvolution(NUM_LAPS.Japan),
  Monaco: generateRaceEvolution(NUM_LAPS.Monaco)
};

const RaceEvolutionGraph = () => {
  const { language } = useLanguage();
  const [selectedRace, setSelectedRace] = useState('Australia');
  const raceData = raceDataMap[selectedRace];

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 15, padding: 20, marginTop: 20 }}>
      <h2 style={{ color: '#e10600', marginBottom: 20 }}>
        {getTranslation(selectedRace.toLowerCase(), language)} GP - {getTranslation('raceEvolution', language)}
      </h2>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <label htmlFor="race-select" style={{ color: '#fff', fontWeight: 500 }}>
          {getTranslation('selectRace', language)}:
        </label>
        <select
          id="race-select"
          value={selectedRace}
          onChange={e => setSelectedRace(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e10600', fontWeight: 600 }}
        >
          {RACES.map(race => (
            <option key={race} value={race}>
              {getTranslation(race.toLowerCase(), language)}
            </option>
          ))}
        </select>
      </div>
      {/* Custom Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
        gap: 16, padding: '16px 0', marginBottom: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 8
      }}>
        {DRIVERS.map((driver) => (
          <span key={driver} style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', margin: '2px 8px' }}>
            <span style={{ width: 18, height: 3, background: TEAM_COLORS[DRIVER_TEAM[driver]] || '#888', display: 'inline-block', marginRight: 6, borderRadius: 2 }} />
            {driver}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={raceData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <XAxis
            dataKey="lap"
            stroke="#fff"
            label={{ 
              value: getTranslation('lap', language), 
              position: 'insideBottom', 
              offset: 0, 
              dy: 24, 
              fill: '#fff', 
              fontSize: 14 
            }}
          />
          <YAxis 
            domain={[1, 20]} 
            reversed={true} 
            stroke="#fff" 
            ticks={[1,5,10,15,20]} 
            label={{ 
              value: getTranslation('position', language), 
              angle: -90, 
              position: 'insideLeft', 
              fill: '#fff', 
              fontSize: 14 
            }} 
          />
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.9)', color: '#fff', borderRadius: 8, fontSize: 12 }} />
          {DRIVERS.map((driver) => (
            <Line
              key={driver}
              type="monotone"
              dataKey={driver}
              stroke={TEAM_COLORS[DRIVER_TEAM[driver]] || '#888'}
              dot={false}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RaceEvolutionGraph; 