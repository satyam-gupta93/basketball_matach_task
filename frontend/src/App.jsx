import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/basketball-matches')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches');
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Upcoming Basketball Matches</h1>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {matches.length === 0 ? (
          <p className="message">No upcoming matches found.</p>
        ) : (
          matches.map((match, index) => (
            <li
              key={index}
              className="item"
            >
              <div className="teams">
                {match.homeTeam} vs {match.awayTeam}
              </div>
              <div className="details">
                🕒 {match.eventDate} at {match.eventTime}
              </div>
              <div className="league">
                🏆 League: {match.league}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;