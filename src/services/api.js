import axios from 'axios';

// Since we can't directly scrape the website due to CORS, we'll create mock data
// In a real implementation, you would need a backend proxy or use a CORS proxy service

const MOCK_DRIVER_DATA = {
  2025: [
    {
      id: 1,
      name: "Max Verstappen",
      team: "Red Bull Racing",
      position: 1,
      points: 575,
      wins: 19,
      podiums: 21,
      polePositions: 12,
      fastestLaps: 9
    },
    {
      id: 2,
      name: "Sergio Pérez",
      team: "Red Bull Racing",
      position: 2,
      points: 285,
      wins: 2,
      podiums: 9,
      polePositions: 2,
      fastestLaps: 3
    },
    {
      id: 3,
      name: "Lewis Hamilton",
      team: "Mercedes",
      position: 3,
      points: 234,
      wins: 0,
      podiums: 6,
      polePositions: 1,
      fastestLaps: 2
    },
    {
      id: 4,
      name: "Carlos Sainz",
      team: "Ferrari",
      position: 4,
      points: 200,
      wins: 1,
      podiums: 3,
      polePositions: 2,
      fastestLaps: 1
    },
    {
      id: 5,
      name: "Fernando Alonso",
      team: "Aston Martin",
      position: 5,
      points: 206,
      wins: 0,
      podiums: 8,
      polePositions: 0,
      fastestLaps: 1
    },
    {
      id: 6,
      name: "Lando Norris",
      team: "McLaren",
      position: 6,
      points: 205,
      wins: 0,
      podiums: 7,
      polePositions: 1,
      fastestLaps: 2
    },
    {
      id: 7,
      name: "Charles Leclerc",
      team: "Ferrari",
      position: 7,
      points: 199,
      wins: 0,
      podiums: 6,
      polePositions: 5,
      fastestLaps: 0
    },
    {
      id: 8,
      name: "George Russell",
      team: "Mercedes",
      position: 8,
      points: 175,
      wins: 0,
      podiums: 2,
      polePositions: 1,
      fastestLaps: 2
    },
    {
      id: 9,
      name: "Oscar Piastri",
      team: "McLaren",
      position: 9,
      points: 97,
      wins: 0,
      podiums: 2,
      polePositions: 0,
      fastestLaps: 1
    },
    {
      id: 10,
      name: "Lance Stroll",
      team: "Aston Martin",
      position: 10,
      points: 74,
      wins: 0,
      podiums: 0,
      polePositions: 0,
      fastestLaps: 0
    }
  ],
  2024: [
    {
      id: 1,
      name: "Max Verstappen",
      team: "Red Bull Racing",
      position: 1,
      points: 575,
      wins: 19,
      podiums: 21,
      polePositions: 12,
      fastestLaps: 9
    },
    {
      id: 2,
      name: "Sergio Pérez",
      team: "Red Bull Racing",
      position: 2,
      points: 285,
      wins: 2,
      podiums: 9,
      polePositions: 2,
      fastestLaps: 3
    },
    {
      id: 3,
      name: "Lewis Hamilton",
      team: "Mercedes",
      position: 3,
      points: 234,
      wins: 0,
      podiums: 6,
      polePositions: 1,
      fastestLaps: 2
    }
  ],
  2023: [
    {
      id: 1,
      name: "Max Verstappen",
      team: "Red Bull Racing",
      position: 1,
      points: 575,
      wins: 19,
      podiums: 21,
      polePositions: 12,
      fastestLaps: 9
    },
    {
      id: 2,
      name: "Sergio Pérez",
      team: "Red Bull Racing",
      position: 2,
      points: 285,
      wins: 2,
      podiums: 9,
      polePositions: 2,
      fastestLaps: 3
    },
    {
      id: 3,
      name: "Lewis Hamilton",
      team: "Mercedes",
      position: 3,
      points: 234,
      wins: 0,
      podiums: 6,
      polePositions: 1,
      fastestLaps: 2
    }
  ]
};

// Function to simulate API call with delay
const simulateApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Main function to fetch driver data
export const fetchDriverData = async (year) => {
  try {
    // In a real implementation, you would make an actual API call here
    // const response = await axios.get(`https://api.motorsportstats.com/f1/${year}/drivers`);
    // return response.data;
    
    // For now, we'll use mock data
    const data = MOCK_DRIVER_DATA[year] || MOCK_DRIVER_DATA[2025];
    return await simulateApiCall(data, 800);
  } catch (error) {
    console.error('Error fetching driver data:', error);
    throw new Error('Failed to fetch driver data');
  }
};

// Function to fetch specific driver details (for future use)
export const fetchDriverDetails = async (driverId) => {
  try {
    // Mock implementation
    const allDrivers = Object.values(MOCK_DRIVER_DATA).flat();
    const driver = allDrivers.find(d => d.id === driverId);
    
    if (!driver) {
      throw new Error('Driver not found');
    }
    
    return await simulateApiCall(driver, 500);
  } catch (error) {
    console.error('Error fetching driver details:', error);
    throw new Error('Failed to fetch driver details');
  }
};

// Function to fetch team statistics (for future use)
export const fetchTeamStats = async (year) => {
  try {
    const drivers = MOCK_DRIVER_DATA[year] || MOCK_DRIVER_DATA[2025];
    
    // Group drivers by team and calculate team stats
    const teamStats = drivers.reduce((acc, driver) => {
      if (!acc[driver.team]) {
        acc[driver.team] = {
          name: driver.team,
          points: 0,
          wins: 0,
          podiums: 0,
          polePositions: 0,
          fastestLaps: 0,
          drivers: []
        };
      }
      
      acc[driver.team].points += driver.points;
      acc[driver.team].wins += driver.wins;
      acc[driver.team].podiums += driver.podiums;
      acc[driver.team].polePositions += driver.polePositions;
      acc[driver.team].fastestLaps += driver.fastestLaps;
      acc[driver.team].drivers.push(driver.name);
      
      return acc;
    }, {});
    
    return await simulateApiCall(Object.values(teamStats), 600);
  } catch (error) {
    console.error('Error fetching team stats:', error);
    throw new Error('Failed to fetch team statistics');
  }
}; 