const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;

// Replace with your actual AllSportsAPI key
const API_KEY = '4b4402b69a0978377eb8957b8f42a8776e3ccb7e66d4c91aa798944b36d598b3';

app.get('/api/basketball-matches', async (req, res) => {
  try {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    const response = await axios.get('https://apiv2.allsportsapi.com/basketball/', {
      params: {
        met: 'Fixtures',
        APIkey: API_KEY,
        from: formatDate(today),
        to: formatDate(endDate)
      }
    });

    const matches = response.data.result?.map(match => ({
      eventDate: match.event_date,
      eventTime: match.event_time,
      homeTeam: match.event_home_team,
      awayTeam: match.event_away_team,
      league: match.league_name,
      eventStatus: match.event_status
    })) || [];

    res.json(matches);
  } catch (error) {
    console.error('Error fetching basketball matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch basketball matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Basketball match server running on http://localhost:${PORT}`);
});
