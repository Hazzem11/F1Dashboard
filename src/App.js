import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import DriverStats from './components/DriverStats';
import DriverComparison from './components/DriverComparison';
import SeasonOverview from './components/SeasonOverview';
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

function App() {
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
        setError('Failed to load driver data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear]);

  if (loading) {
    return (
      <AppContainer>
        <Header selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <LoadingContainer>
          Loading F1 driver statistics...
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
            <h2>Error</h2>
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
              Retry
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
      <SeasonOverview drivers={driverData} year={selectedYear} />
    </AppContainer>
  );
}

export default App; 