import React, { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [genre, setGenre] = useState("Hip-Hop");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findArtists = async () => {
    setLoading(true);
    setError("");
    setArtists([]);
    try {
      const response = await fetch(`/api/genre/${genre}/artists`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setError(`No artists found for the genre "${genre}".`);
      }
      setArtists(data);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1>Music Explorer</h1>
          <p>Discover artists by genre</p>
        </header>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter a genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && findArtists()}
            className={styles.input}
          />
          <button
            onClick={findArtists}
            disabled={loading}
            className={styles.button}
          >
            {loading ? "" : "Find Artists"}
            {loading && <div className={styles.spinner}></div>}
          </button>
        </div>
      </div>

      <div className={styles.resultsContainer}>
        {error && !loading && <p className={styles.error}>{error}</p>}

        {artists.length > 0 && !loading && (
          <ul className={styles.resultsList}>
            {artists.map((item, index) => (
              <li key={index} className={styles.resultsItem}>
                {item.artist}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
