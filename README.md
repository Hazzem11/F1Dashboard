# F1 Driver Statistics Dashboard

A modern, interactive React dashboard for displaying Formula 1 driver statistics and performance data. This dashboard provides comprehensive insights into F1 driver performance with beautiful visualizations and interactive features.

## 🏎️ Features

- **Interactive Driver Statistics**: View detailed statistics for each F1 driver including points, wins, podiums, pole positions, and fastest laps
- **Driver Comparison**: Compare up to 3 drivers side-by-side with interactive charts
- **Season Overview**: Comprehensive season statistics with standings table
- **Beautiful Visualizations**: Multiple chart types including bar charts, line charts, radar charts, and pie charts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Year Selection**: Switch between different F1 seasons (2020-2025)
- **Modern UI**: F1-themed design with dark mode and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd F1Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📊 Dashboard Components

### 1. Header
- F1-themed header with year selector
- Season navigation (2020-2025)
- Responsive design with mobile optimization

### 2. Driver Statistics
- Individual driver cards with key metrics
- Interactive selection for detailed charts
- Performance overview with bar charts
- Hover effects and smooth animations

### 3. Driver Comparison
- Select up to 3 drivers for comparison
- Multiple chart types (line charts, radar charts)
- Detailed comparison table
- Interactive driver selection buttons

### 4. Season Overview
- Season-wide statistics cards
- Points distribution pie chart
- Complete driver standings table
- Color-coded podium positions

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Styled Components**: CSS-in-JS for component styling
- **Recharts**: Professional chart library for data visualization
- **Axios**: HTTP client for API requests
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # Main header with year selector
│   ├── DriverStats.js         # Individual driver statistics
│   ├── DriverComparison.js    # Driver comparison charts
│   └── SeasonOverview.js      # Season overview and standings
├── services/
│   └── api.js                 # API service and mock data
├── App.js                     # Main application component
├── index.js                   # Application entry point
└── index.css                  # Global styles
```

## 🎨 Design Features

- **F1 Branding**: Official F1 red (#e10600) color scheme
- **Dark Theme**: Professional dark background with glassmorphism effects
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Interactive Elements**: Clickable cards and buttons with feedback

## 🔧 Customization

### Adding New Seasons
To add data for new seasons, update the `MOCK_DRIVER_DATA` object in `src/services/api.js`:

```javascript
const MOCK_DRIVER_DATA = {
  2026: [
    {
      id: 1,
      name: "Driver Name",
      team: "Team Name",
      position: 1,
      points: 100,
      wins: 5,
      podiums: 10,
      polePositions: 3,
      fastestLaps: 2
    },
    // ... more drivers
  ]
};
```

### Styling Customization
The dashboard uses styled-components for styling. You can customize colors, fonts, and layouts by modifying the styled components in each component file.

## 🌐 API Integration

Currently, the dashboard uses mock data. To integrate with real F1 APIs:

1. Update the `fetchDriverData` function in `src/services/api.js`
2. Replace mock data with actual API calls
3. Handle CORS issues by using a backend proxy or CORS proxy service

Example API integration:
```javascript
export const fetchDriverData = async (year) => {
  try {
    const response = await axios.get(`https://api.motorsportstats.com/f1/${year}/drivers`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch driver data');
  }
};
```

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- F1 official branding and colors
- Motorsport Stats for data inspiration
- Recharts for excellent chart library
- React community for amazing tools and libraries

## 📞 Support

If you have any questions or need help with the dashboard, please open an issue on GitHub or contact the development team.

---

**Note**: This dashboard currently uses mock data. For production use, integrate with real F1 APIs or data sources. 