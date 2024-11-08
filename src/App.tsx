import { useState, useEffect } from 'react';
import { getMovies } from './API/api';
import { Movie } from './types/types';
import { MovieTable } from './components/molecules/MovieTable/MovieTable';
import { Button } from '@mui/material';
const SERVER_URL = import.meta.env.VITE_SERVER_URL


export const App = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setError("");
    setLoading(true)

    let fetchedMovies = await getMovies()

    if (fetchedMovies) {
      setMovies(fetchedMovies)
    }
    else {
      setMovies([])
      setError("Failed to load film data")
    }

    setLoading(false)
  }

  const refreshButton = (buttonText: string) => {
    return <Button disabled={loading} variant="contained" onClick={loadData}>{buttonText}</Button>
  };

  useEffect(() => {
    loadData()
  }, [SERVER_URL]);

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      {error && <p>{error}</p>}
      <MovieTable
        movies={movies}
      />

      {refreshButton("Refresh")}
    </div>
  );
}