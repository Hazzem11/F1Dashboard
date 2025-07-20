import axios from 'axios';

// Function to calculate total points from racePoints array
const calculateTotalPoints = (racePoints) => {
    return racePoints.reduce((total, points) => total + points, 0);
};

// Function to process driver data and calculate totals
const processDriverData = (drivers) => {
    return drivers.map(driver => ({
        ...driver,
        points: calculateTotalPoints(driver.racePoints)
    }));
};

// Updated mock data with realistic race-by-race data that calculates totals correctly
const MOCK_DRIVER_DATA = {
    2025: [
        {
            id: 1,
            name: "Oscar Piastri",
            team: "McLaren",
            position: 1,
            wins: 5,
            podiums: 10,
            polePositions: 4,
            fastestLaps: 4,
            racePoints: [2, 25, 15, 25, 25, 25, 15, 15, 25, 12, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 1,
            name: "Lando Norris",
            team: "McLaren",
            position: 2,
            wins: 4,
            podiums: 10,
            polePositions: 3,
            fastestLaps: 5,
            racePoints: [25, 18, 18, 15, 12, 18, 18, 25, 18, 0, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 3,
            name: "Max Verstappen",
            team: "Red Bull",
            position: 3,
            wins: 2,
            podiums: 5,
            polePositions: 4,
            fastestLaps: 1,
            racePoints: [18, 0, 0, 25, 0, 12, 15, 0, 18, 10, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 4,
            name: "George Russell",
            team: "Mercedes",
            position: 4,
            wins: 1,
            podiums: 5,
            polePositions: 1,
            fastestLaps: 1,
            racePoints: [15, 10, 0, 18, 0, 0, 12, 0, 0, 12, 18, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 5,
            name: "Charles Leclerc",
            team: "Ferrari",
            position: 5,
            wins: 0,
            podiums: 4,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [4, 0, 12, 0, 10, 10, 0, 12, 15, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 6,
            name: "Lewis Hamilton",
            team: "Ferrari",
            position: 6,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [1, 15, 0, 10, 25, 0, 6, 10, 0, 8, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 7,
            name: "Kimi Antonelli",
            team: "Mercedes",
            position: 7,
            wins: 0,
            podiums: 1,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [12, 0, 10, 0, 12, 15, 8, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 8,
            name: "Alex Albon",
            team: "Williams",
            position: 8,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [10, 12, 0, 0, 8, 6, 0, 4, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 9,
            name: "Nico Hulkenberg",
            team: "Kick Sauber",
            position: 9,
            wins: 0,
            podiums: 1,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [6, 0, 15, 12, 0, 8, 0, 0, 0, 6, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 10,
            name: "Esteban Ocon",
            team: "Haas",
            position: 10,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 8, 6, 0, 6, 4, 0, 2, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 11,
            name: "Isack Hadjar",
            team: "Racing Bulls",
            position: 11,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 6, 0, 6, 4, 0, 2, 0, 6, 0, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 12,
            name: "Lance Stroll",
            team: "Aston Martin",
            position: 12,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [8, 4, 4, 8, 0, 2, 0, 0, 0, 2, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 13,
            name: "Pierre Gasly",
            team: "Alpine",
            position: 13,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 4, 2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 14,
            name: "Fernando Alonso",
            team: "Aston Martin",
            position: 14,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 15,
            name: "Carlos Sainz",
            team: "Williams",
            position: 15,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 16,
            name: "Liam Lawson",
            team: "Racing Bulls",
            position: 16,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 17,
            name: "Yuki Tsunoda",
            team: "Red Bull",
            position: 17,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 18,
            name: "Ollie Bearmean",
            team: "Haas",
            position: 18,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 19,
            name: "Gabriel Bortoleto",
            team: "Kick Sauber",
            position: 19,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            id: 20,
            name: "Franco Colapinto",
            team: "Alpine",
            position: 20,
            wins: 0,
            podiums: 0,
            polePositions: 0,
            fastestLaps: 0,
            racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ],
    2024: [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing", position: 1, wins: 7, podiums: 12, polePositions: 5, fastestLaps: 4, racePoints: [25, 18, 0, 25, 12, 10, 25, 15, 0, 25, 25, 18, 0, 15, 25, 25, 18, 10, 0, 25, 12, 6, 25, 0] },
        { id: 2, name: "Lando Norris", team: "McLaren", position: 2, wins: 6, podiums: 11, polePositions: 4, fastestLaps: 5, racePoints: [15, 25, 12, 18, 0, 0, 18, 0, 15, 12, 18, 25, 25, 25, 18, 18, 25, 25, 18, 0, 10, 15, 0, 18] },
        { id: 3, name: "Charles Leclerc", team: "Ferrari", position: 3, wins: 5, podiums: 10, polePositions: 3, fastestLaps: 3, racePoints: [0, 0, 25, 10, 25, 25, 0, 12, 18, 15, 0, 10, 18, 18, 15, 12, 0, 15, 25, 18, 25, 0, 12, 25] },
        { id: 4, name: "Carlos Sainz", team: "Ferrari", position: 4, wins: 3, podiums: 8, polePositions: 2, fastestLaps: 2, racePoints: [10, 15, 15, 12, 18, 0, 12, 18, 10, 6, 15, 0, 10, 0, 0, 0, 15, 18, 10, 15, 15, 25, 10, 6] },
        { id: 5, name: "George Russell", team: "Mercedes", position: 5, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [18, 10, 10, 6, 15, 18, 15, 25, 0, 4, 10, 12, 15, 12, 18, 0, 10, 12, 8, 10, 6, 0, 18, 15] },
        { id: 6, name: "Lewis Hamilton", team: "Mercedes", position: 6, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, racePoints: [6, 12, 0, 4, 10, 6, 6, 10, 25, 0, 0, 0, 12, 10, 0, 15, 8, 4, 6, 6, 8, 18, 6, 8] },
        { id: 7, name: "Oscar Piastri", team: "McLaren", position: 7, wins: 1, podiums: 5, polePositions: 1, fastestLaps: 1, racePoints: [12, 8, 18, 8, 0, 12, 10, 8, 12, 10, 12, 15, 0, 8, 0, 0, 0, 10, 0, 4, 0, 10, 0, 0] },
        { id: 8, name: "Fernando Alonso", team: "Aston Martin", position: 8, wins: 0, podiums: 4, polePositions: 0, fastestLaps: 0, racePoints: [8, 6, 6, 0, 8, 4, 8, 0, 6, 8, 6, 8, 8, 0, 10, 8, 6, 6, 4, 0, 4, 0, 15, 0] },
        { id: 9, name: "Lance Stroll", team: "Aston Martin", position: 9, wins: 0, podiums: 2, polePositions: 0, fastestLaps: 0, racePoints: [0, 4, 8, 15, 0, 15, 0, 6, 0, 15, 8, 6, 0, 0, 6, 6, 12, 8, 2, 8, 18, 0, 0, 0] },
        { id: 10, name: "Pierre Gasly", team: "Alpine", position: 10, wins: 0, podiums: 1, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 6, 0, 0, 4, 8, 18, 0, 4, 4, 4, 0, 4, 0, 0, 6, 0, 0, 0, 8, 4] },
        { id: 11, name: "Esteban Ocon", team: "Alpine", position: 11, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [2, 0, 4, 0, 4, 0, 0, 2, 0, 0, 0, 2, 6, 6, 4, 0, 0, 0, 0, 2, 0, 4, 4, 0] },
        { id: 12, name: "Yuki Tsunoda", team: "Racing Bulls", position: 12, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 2, 6, 0, 4, 0, 0, 0, 2, 2, 0, 2] },
        { id: 13, name: "Nico Hulkenberg", team: "Kick Sauber", position: 13, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 2, 0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 0, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0] },
        { id: 14, name: "Valtteri Bottas", team: "Kick Sauber", position: 14, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 15, name: "Alex Albon", team: "Williams", position: 15, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1] },
        { id: 16, name: "Logan Sargeant", team: "Williams", position: 16, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
        { id: 17, name: "Liam Lawson", team: "Racing Bulls", position: 17, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
        { id: 18, name: "Isack Hadjar", team: "Racing Bulls", position: 18, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
        { id: 19, name: "Gabriel Bortoleto", team: "Kick Sauber", position: 19, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 20, name: "Franco Colapinto", team: "Alpine", position: 20, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
    2023: [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing", position: 1, wins: 7, podiums: 12, polePositions: 5, fastestLaps: 4, racePoints: [18, 25, 0, 18, 25, 12, 10, 25, 15, 0, 25, 25, 18, 0, 15, 25, 25, 18, 10, 0, 25, 12, 6, 25] },
        { id: 2, name: "Lando Norris", team: "McLaren", position: 2, wins: 6, podiums: 11, polePositions: 4, fastestLaps: 5, racePoints: [25, 12, 18, 0, 0, 18, 0, 15, 12, 18, 25, 25, 25, 18, 18, 25, 25, 18, 0, 10, 15, 0, 18, 15] },
        { id: 3, name: "Charles Leclerc", team: "Ferrari", position: 3, wins: 5, podiums: 10, polePositions: 3, fastestLaps: 3, racePoints: [0, 25, 10, 25, 25, 0, 12, 18, 15, 0, 10, 18, 18, 15, 12, 0, 15, 25, 18, 25, 0, 12, 25, 0] },
        { id: 4, name: "Carlos Sainz", team: "Ferrari", position: 4, wins: 3, podiums: 8, polePositions: 2, fastestLaps: 2, racePoints: [15, 15, 12, 18, 0, 12, 18, 10, 6, 15, 0, 10, 0, 0, 0, 15, 18, 10, 15, 15, 25, 10, 6, 10] },
        { id: 5, name: "George Russell", team: "Mercedes", position: 5, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [10, 10, 6, 15, 18, 15, 25, 0, 4, 10, 12, 15, 12, 18, 0, 10, 12, 8, 10, 6, 0, 18, 15, 6] },
        { id: 6, name: "Lewis Hamilton", team: "Mercedes", position: 6, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, racePoints: [12, 0, 4, 10, 6, 6, 10, 25, 0, 0, 0, 12, 10, 0, 15, 8, 4, 6, 6, 8, 18, 6, 8, 12] },
        { id: 7, name: "Oscar Piastri", team: "McLaren", position: 7, wins: 1, podiums: 5, polePositions: 1, fastestLaps: 1, racePoints: [8, 18, 8, 0, 12, 10, 8, 12, 10, 12, 15, 0, 8, 0, 0, 0, 10, 0, 4, 0, 10, 0, 0, 0] },
        { id: 8, name: "Fernando Alonso", team: "Aston Martin", position: 8, wins: 0, podiums: 4, polePositions: 0, fastestLaps: 0, racePoints: [6, 6, 0, 8, 4, 8, 0, 6, 8, 6, 8, 8, 0, 10, 8, 6, 6, 4, 0, 4, 0, 15, 0, 0] },
        { id: 9, name: "Lance Stroll", team: "Aston Martin", position: 9, wins: 0, podiums: 2, polePositions: 0, fastestLaps: 0, racePoints: [4, 8, 15, 0, 15, 0, 6, 0, 15, 8, 6, 0, 0, 6, 6, 12, 8, 2, 8, 18, 0, 0, 0, 0] },
        { id: 10, name: "Pierre Gasly", team: "Alpine", position: 10, wins: 0, podiums: 1, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 6, 0, 0, 4, 8, 18, 0, 4, 4, 4, 0, 4, 0, 0, 6, 0, 0, 0, 8, 4, 2] },
        { id: 11, name: "Esteban Ocon", team: "Alpine", position: 11, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 4, 0, 4, 0, 0, 2, 0, 0, 0, 2, 6, 6, 4, 0, 0, 0, 0, 2, 0, 4, 4, 0, 2] },
        { id: 12, name: "Yuki Tsunoda", team: "Racing Bulls", position: 12, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 2, 6, 0, 4, 0, 0, 0, 2, 2, 0, 2, 0] },
        { id: 13, name: "Nico Hulkenberg", team: "Kick Sauber", position: 13, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [2, 0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 0, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1] },
        { id: 14, name: "Valtteri Bottas", team: "Kick Sauber", position: 14, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 15, name: "Alex Albon", team: "Williams", position: 15, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
        { id: 16, name: "Logan Sargeant", team: "Williams", position: 16, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
        { id: 17, name: "Liam Lawson", team: "Racing Bulls", position: 17, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0] },
        { id: 18, name: "Isack Hadjar", team: "Racing Bulls", position: 18, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
        { id: 19, name: "Gabriel Bortoleto", team: "Kick Sauber", position: 19, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 20, name: "Franco Colapinto", team: "Alpine", position: 20, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
    2022: [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing", position: 1, wins: 8, podiums: 13, polePositions: 6, fastestLaps: 5, racePoints: [25, 0, 18, 25, 10, 25, 12, 0, 25, 18, 0, 25, 15, 25, 0, 18, 25, 0, 25, 12, 25, 0, 10, 25] },
        { id: 2, name: "Lando Norris", team: "McLaren", position: 2, wins: 5, podiums: 10, polePositions: 4, fastestLaps: 4, racePoints: [18, 25, 0, 18, 25, 0, 15, 25, 0, 12, 25, 18, 0, 10, 25, 25, 18, 15, 0, 25, 12, 6, 25, 0] },
        { id: 3, name: "Charles Leclerc", team: "Ferrari", position: 3, wins: 4, podiums: 9, polePositions: 3, fastestLaps: 2, racePoints: [0, 18, 25, 0, 25, 25, 0, 12, 18, 25, 0, 10, 18, 18, 15, 12, 0, 25, 15, 18, 25, 0, 12, 10] },
        { id: 4, name: "Carlos Sainz", team: "Ferrari", position: 4, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [10, 15, 15, 12, 18, 0, 12, 18, 10, 6, 15, 0, 10, 0, 0, 0, 15, 18, 10, 15, 15, 25, 10, 6] },
        { id: 5, name: "George Russell", team: "Mercedes", position: 5, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [8, 10, 10, 6, 15, 18, 15, 25, 0, 4, 10, 12, 15, 12, 18, 0, 10, 12, 8, 10, 6, 0, 18, 15] },
        { id: 6, name: "Lewis Hamilton", team: "Mercedes", position: 6, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, racePoints: [6, 12, 0, 4, 10, 6, 6, 10, 25, 0, 0, 0, 12, 10, 0, 15, 8, 4, 6, 6, 8, 18, 6, 8] },
        { id: 7, name: "Oscar Piastri", team: "McLaren", position: 7, wins: 1, podiums: 5, polePositions: 1, fastestLaps: 1, racePoints: [12, 8, 18, 8, 0, 12, 10, 8, 12, 10, 12, 15, 0, 8, 0, 0, 0, 10, 0, 4, 0, 10, 0, 0] },
        { id: 8, name: "Fernando Alonso", team: "Aston Martin", position: 8, wins: 0, podiums: 4, polePositions: 0, fastestLaps: 0, racePoints: [4, 6, 6, 0, 8, 4, 8, 0, 6, 8, 6, 8, 8, 0, 10, 8, 6, 6, 4, 0, 4, 0, 15, 0] },
        { id: 9, name: "Lance Stroll", team: "Aston Martin", position: 9, wins: 0, podiums: 2, polePositions: 0, fastestLaps: 0, racePoints: [0, 4, 8, 15, 0, 15, 0, 6, 0, 15, 8, 6, 0, 0, 6, 6, 12, 8, 2, 8, 18, 0, 0, 0] },
        { id: 10, name: "Pierre Gasly", team: "Alpine", position: 10, wins: 0, podiums: 1, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 6, 0, 0, 4, 8, 18, 0, 4, 4, 4, 0, 4, 0, 0, 6, 0, 0, 0, 8, 4] },
        { id: 11, name: "Esteban Ocon", team: "Alpine", position: 11, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [2, 0, 4, 0, 4, 0, 0, 2, 0, 0, 0, 2, 6, 6, 4, 0, 0, 0, 0, 2, 0, 4, 4, 0] },
        { id: 12, name: "Yuki Tsunoda", team: "Racing Bulls", position: 12, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 2, 6, 0, 4, 0, 0, 0, 2, 2, 0, 2] },
        { id: 13, name: "Nico Hulkenberg", team: "Kick Sauber", position: 13, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 2, 0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 0, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0] },
        { id: 14, name: "Valtteri Bottas", team: "Kick Sauber", position: 14, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 15, name: "Alex Albon", team: "Williams", position: 15, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1] },
        { id: 16, name: "Logan Sargeant", team: "Williams", position: 16, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
        { id: 17, name: "Liam Lawson", team: "Racing Bulls", position: 17, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
        { id: 18, name: "Isack Hadjar", team: "Racing Bulls", position: 18, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
        { id: 19, name: "Gabriel Bortoleto", team: "Kick Sauber", position: 19, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 20, name: "Franco Colapinto", team: "Alpine", position: 20, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
    2021: [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing", position: 1, wins: 6, podiums: 11, polePositions: 4, fastestLaps: 3, racePoints: [25, 18, 0, 25, 12, 10, 25, 15, 0, 25, 25, 18, 0, 15, 25, 25, 18, 10, 0, 25, 12, 6, 25, 0] },
        { id: 2, name: "Lando Norris", team: "McLaren", position: 2, wins: 5, podiums: 10, polePositions: 4, fastestLaps: 4, racePoints: [15, 25, 12, 18, 0, 0, 18, 0, 15, 12, 18, 25, 25, 25, 18, 18, 25, 25, 18, 0, 10, 15, 0, 18] },
        { id: 3, name: "Charles Leclerc", team: "Ferrari", position: 3, wins: 4, podiums: 9, polePositions: 3, fastestLaps: 2, racePoints: [0, 0, 25, 10, 25, 25, 0, 12, 18, 15, 0, 10, 18, 18, 15, 12, 0, 15, 25, 18, 25, 0, 12, 25] },
        { id: 4, name: "Carlos Sainz", team: "Ferrari", position: 4, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [10, 15, 15, 12, 18, 0, 12, 18, 10, 6, 15, 0, 10, 0, 0, 0, 15, 18, 10, 15, 15, 25, 10, 6] },
        { id: 5, name: "George Russell", team: "Mercedes", position: 5, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [18, 10, 10, 6, 15, 18, 15, 25, 0, 4, 10, 12, 15, 12, 18, 0, 10, 12, 8, 10, 6, 0, 18, 15] },
        { id: 6, name: "Lewis Hamilton", team: "Mercedes", position: 6, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, racePoints: [6, 12, 0, 4, 10, 6, 6, 10, 25, 0, 0, 0, 12, 10, 0, 15, 8, 4, 6, 6, 8, 18, 6, 8] },
        { id: 7, name: "Oscar Piastri", team: "McLaren", position: 7, wins: 1, podiums: 5, polePositions: 1, fastestLaps: 1, racePoints: [12, 8, 18, 8, 0, 12, 10, 8, 12, 10, 12, 15, 0, 8, 0, 0, 0, 10, 0, 4, 0, 10, 0, 0] },
        { id: 8, name: "Fernando Alonso", team: "Aston Martin", position: 8, wins: 0, podiums: 4, polePositions: 0, fastestLaps: 0, racePoints: [8, 6, 6, 0, 8, 4, 8, 0, 6, 8, 6, 8, 8, 0, 10, 8, 6, 6, 4, 0, 4, 0, 15, 0] },
        { id: 9, name: "Lance Stroll", team: "Aston Martin", position: 9, wins: 0, podiums: 2, polePositions: 0, fastestLaps: 0, racePoints: [0, 4, 8, 15, 0, 15, 0, 6, 0, 15, 8, 6, 0, 0, 6, 6, 12, 8, 2, 8, 18, 0, 0, 0] },
        { id: 10, name: "Pierre Gasly", team: "Alpine", position: 10, wins: 0, podiums: 1, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 6, 0, 0, 4, 8, 18, 0, 4, 4, 4, 0, 4, 0, 0, 6, 0, 0, 0, 8, 4] },
        { id: 11, name: "Esteban Ocon", team: "Alpine", position: 11, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [2, 0, 4, 0, 4, 0, 0, 2, 0, 0, 0, 2, 6, 6, 4, 0, 0, 0, 0, 2, 0, 4, 4, 0] },
        { id: 12, name: "Yuki Tsunoda", team: "Racing Bulls", position: 12, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 2, 6, 0, 4, 0, 0, 0, 2, 2, 0, 2] },
        { id: 13, name: "Nico Hulkenberg", team: "Kick Sauber", position: 13, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 2, 0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 0, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0] },
        { id: 14, name: "Valtteri Bottas", team: "Kick Sauber", position: 14, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 15, name: "Alex Albon", team: "Williams", position: 15, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1] },
        { id: 16, name: "Logan Sargeant", team: "Williams", position: 16, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
        { id: 17, name: "Liam Lawson", team: "Racing Bulls", position: 17, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
        { id: 18, name: "Isack Hadjar", team: "Racing Bulls", position: 18, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
        { id: 19, name: "Gabriel Bortoleto", team: "Kick Sauber", position: 19, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 20, name: "Franco Colapinto", team: "Alpine", position: 20, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
    2020: [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing", position: 1, wins: 7, podiums: 12, polePositions: 5, fastestLaps: 4, racePoints: [18, 25, 0, 18, 25, 12, 10, 25, 15, 0, 25, 25, 18, 0, 15, 25, 25, 18, 10, 0, 25, 12, 6, 25] },
        { id: 2, name: "Lando Norris", team: "McLaren", position: 2, wins: 6, podiums: 11, polePositions: 4, fastestLaps: 5, racePoints: [25, 12, 18, 0, 0, 18, 0, 15, 12, 18, 25, 25, 25, 18, 18, 25, 25, 18, 0, 10, 15, 0, 18, 15] },
        { id: 3, name: "Charles Leclerc", team: "Ferrari", position: 3, wins: 5, podiums: 10, polePositions: 3, fastestLaps: 3, racePoints: [0, 25, 10, 25, 25, 0, 12, 18, 15, 0, 10, 18, 18, 15, 12, 0, 15, 25, 18, 25, 0, 12, 25, 0] },
        { id: 4, name: "Carlos Sainz", team: "Ferrari", position: 4, wins: 3, podiums: 8, polePositions: 2, fastestLaps: 2, racePoints: [15, 15, 12, 18, 0, 12, 18, 10, 6, 15, 0, 10, 0, 0, 0, 15, 18, 10, 15, 15, 25, 10, 6, 10] },
        { id: 5, name: "George Russell", team: "Mercedes", position: 5, wins: 2, podiums: 7, polePositions: 2, fastestLaps: 2, racePoints: [10, 10, 6, 15, 18, 15, 25, 0, 4, 10, 12, 15, 12, 18, 0, 10, 12, 8, 10, 6, 0, 18, 15, 6] },
        { id: 6, name: "Lewis Hamilton", team: "Mercedes", position: 6, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, racePoints: [12, 0, 4, 10, 6, 6, 10, 25, 0, 0, 0, 12, 10, 0, 15, 8, 4, 6, 6, 8, 18, 6, 8, 12] },
        { id: 7, name: "Oscar Piastri", team: "McLaren", position: 7, wins: 1, podiums: 5, polePositions: 1, fastestLaps: 1, racePoints: [8, 18, 8, 0, 12, 10, 8, 12, 10, 12, 15, 0, 8, 0, 0, 0, 10, 0, 4, 0, 10, 0, 0, 0] },
        { id: 8, name: "Fernando Alonso", team: "Aston Martin", position: 8, wins: 0, podiums: 4, polePositions: 0, fastestLaps: 0, racePoints: [6, 6, 0, 8, 4, 8, 0, 6, 8, 6, 8, 8, 0, 10, 8, 6, 6, 4, 0, 4, 0, 15, 0, 0] },
        { id: 9, name: "Lance Stroll", team: "Aston Martin", position: 9, wins: 0, podiums: 2, polePositions: 0, fastestLaps: 0, racePoints: [4, 8, 15, 0, 15, 0, 6, 0, 15, 8, 6, 0, 0, 6, 6, 12, 8, 2, 8, 18, 0, 0, 0, 0] },
        { id: 10, name: "Pierre Gasly", team: "Alpine", position: 10, wins: 0, podiums: 1, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 6, 0, 0, 4, 8, 18, 0, 4, 4, 4, 0, 4, 0, 0, 6, 0, 0, 0, 8, 4, 2] },
        { id: 11, name: "Esteban Ocon", team: "Alpine", position: 11, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 4, 0, 4, 0, 0, 2, 0, 0, 0, 2, 6, 6, 4, 0, 0, 0, 0, 2, 0, 4, 4, 0, 2] },
        { id: 12, name: "Yuki Tsunoda", team: "Racing Bulls", position: 12, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 2, 0, 0, 0, 4, 0, 2, 0, 4, 0, 0, 2, 6, 0, 4, 0, 0, 0, 2, 2, 0, 2, 0] },
        { id: 13, name: "Nico Hulkenberg", team: "Kick Sauber", position: 13, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [2, 0, 0, 2, 0, 0, 0, 4, 0, 2, 0, 0, 4, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1] },
        { id: 14, name: "Valtteri Bottas", team: "Kick Sauber", position: 14, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 15, name: "Alex Albon", team: "Williams", position: 15, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
        { id: 16, name: "Logan Sargeant", team: "Williams", position: 16, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
        { id: 17, name: "Liam Lawson", team: "Racing Bulls", position: 17, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0] },
        { id: 18, name: "Isack Hadjar", team: "Racing Bulls", position: 18, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
        { id: 19, name: "Gabriel Bortoleto", team: "Kick Sauber", position: 19, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { id: 20, name: "Franco Colapinto", team: "Alpine", position: 20, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, racePoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
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
        const data = MOCK_DRIVER_DATA[year] || MOCK_DRIVER_DATA[2025];
        return await simulateApiCall(processDriverData(data), 800);
    } catch (error) {
        console.error('Error fetching driver data:', error);
        throw new Error('Failed to fetch driver data');
    }
};

// Function to fetch specific driver details (for future use)
export const fetchDriverDetails = async (driverId) => {
    try {
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