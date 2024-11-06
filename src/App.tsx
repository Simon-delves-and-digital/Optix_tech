import { useState, useEffect } from 'react';
import { getCompanies, getMovies } from './API/api';
import { Company, Movie } from './types/types';
const SERVER_URL=import.meta.env.VITE_SERVER_URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL


export const App = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [filmCompanies, setFilmCompanies] = useState([] as Company[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const loadData = async () => {
    setError("");
    setLoading(true)

    let fetchedMovies = await getMovies()
    let fetchedCompanies = await getCompanies()

    if (fetchedMovies && fetchedCompanies) {
      setMovies(fetchedMovies)
      setFilmCompanies(fetchedCompanies)
    }
    else {
      if (!fetchedMovies) {
        setMovies([])
        setError("Failed to load film data")
      }
      if (!fetchedCompanies) {
        setFilmCompanies([])
        setError("Failed to load film company data")
      }
    }

    setLoading(false)
  }

  const refreshButton = (buttonText: any) => {
    if (!loading) {
      return <button onClick={loadData}>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }
  };
  useEffect(() => {
    loadData()
  }, [SERVER_URL]);

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      {refreshButton("Refresh")}
      {error && <p>{error}</p>}
      <p>Total movies displayed {movies.length}</p>
      <span>Title - Review - Film Company</span>
      <br />
      <br/>
        companies={filmCompanies} />
      {movies.map((movie: any) =>
        <span key={movie.title} onClick={() => { setSelectedMovie(movie) }}>
          {movie.title}
          {movie.reviews.reduce((acc: any, i: any) => (acc + i) / movie.reviews.length, 0)?.toString().substring(0, 3)}{" "}
          {filmCompanies.find((f: any) => f.id === movie.filmCompanyId)?.name}
          <br />
        </span>
      )}
      <br />
      <div>
        {selectedMovie ? selectedMovie.title as any ? "You have selected " + selectedMovie.title as any : "No Movie Title" : "No Movie Selcted"}
        {selectedMovie && <p>Please leave a review below</p>}
        {selectedMovie &&
          <form onSubmit={() => { }}>
            <label>
              Review:
              <input type="text" />
            </label>
          </form>}
      </div>
    </div>
  );
}