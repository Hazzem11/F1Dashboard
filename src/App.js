import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { getTranslation } from './utils/translations';
import Header from './components/Header';
import DriverStats from './components/DriverStats';
import DriverComparison from './components/DriverComparison';
import DriverScatterPlot from './components/DriverScatterPlot';
import SeasonOverview from './components/SeasonOverview';
import RaceEvolutionGraph from './components/RaceEvolutionGraph';
import { fetchDriverData } from './services/api';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #e10600;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #ff6b6b;
  text-align: center;
  padding: 20px;
`;

const AppContent = () => {
  const { language } = useLanguage();
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDriverData(selectedYear);
        setDriverData(data);
      } catch (err) {
        setError(getTranslation('failedToLoad', language));
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear, language]);

  if (loading) {
    return (
      <AppContainer>
        <Header selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <LoadingContainer>
          {getTranslation('loading', language)}
        </LoadingContainer>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <Header selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <ErrorContainer>
          <div>
            <h2>{getTranslation('error', language)}</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#e10600',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {getTranslation('retry', language)}
            </button>
          </div>
        </ErrorContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header selectedYear={selectedYear} onYearChange={setSelectedYear} />
      <DashboardGrid>
        <DriverStats drivers={driverData} />
        <DriverComparison drivers={driverData} />
      </DashboardGrid>
      <DriverScatterPlot drivers={driverData} />
      <RaceEvolutionGraph />
    </AppContainer>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App; 