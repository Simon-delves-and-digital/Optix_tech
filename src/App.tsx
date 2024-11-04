import { useRef, useState, Children, useEffect} from 'react';
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer }from "@reduxjs/toolkit"
import { getCompanies, getMovies } from './API/api';
const SERVER_URL=import.meta.env.VITE_SERVER_URL

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [
  {id: "1", name: "Test Productions"},
];

// TODO: use https://giddy-beret-cod.cyclic.app/movies
const mockMovieData: any = [
  {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
  {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
];


export const App = () =>  {
  const [movies, setMovies] = useState([]);
  const [filmCompanies, setFilmCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(0); 

  const loadData = async () => {
    setError("");
    setLoading(true)
    
    let fetchedMovies = await getMovies()
    let fetchedCompanies = await getCompanies()

    if(fetchedMovies && fetchedCompanies) {
      setMovies(fetchedMovies)
      setFilmCompanies(fetchedCompanies)
    }
    else
    {
      if (!fetchedMovies) {
        setMovies([])
        setError("Failed to load film data")
      }
      if (!fetchedCompanies){
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
      {error &&<p>{error}</p>}
      <p>Total movies displayed {movies.length}</p>
      <span>Title - Review - Film Company</span>
      <br/>
      {movies.map((movie: any) => 
        <span onClick={() => {setSelectedMovie(movie)}}>
          {movie.title}{" "}
          {movie.reviews.reduce((acc: any, i: any) => (acc + i)/movie.reviews.length, 0)?.toString().substring(0, 3)}{" "}
          {/* {filmCompanies.find((f: any) => f.id === movie.filmCompanyId)?.name} */}
          <br/>
        </span>
      )}
      <br/>
      <div>
       {/* {selectedMovie ? selectedMovie.title as any ? "You have selected " +  selectedMovie.title  as any : "No Movie Title" : "No Movie Selcted"} */}
       {selectedMovie && <p>Please leave a review below</p> }
       {selectedMovie && 
        <form onSubmit={() => {}}>
          <label>
          Review:
          <input type="text"/>
        </label>
        </form>}
      </div>
    </div>
  );
}