import { CompanyApiReuslt, Movie, MovieApiReuslt } from "../types/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getMovies = async (): Promise<Movie[] | null> => {

  const movies = [] as MovieApiReuslt[];
  const companies = [] as CompanyApiReuslt[];

  //get movie data
  try {
    const response = await fetch(`${SERVER_URL}/movies`);
    const json = await response.json();
    movies.push(...json)
  } catch (error) {
    return null
  }

  //get company data
  try {
    const response = await fetch(`${SERVER_URL}/movieCompanies`);
    const json = await response.json();
    companies.push(...json)
  } catch (error) {
  }

  const movesWithData = movies.map((movie: MovieApiReuslt) => {
    const { id, title } = movie
    //average review
    const total = movie.reviews.reduce((partialSum, a) => partialSum + a, 0)
    const avg = total / movie.reviews.length
    const rounded = avg.toFixed(1)

    //company for the film
    const company = companies.find((f: any) => f.id === movie.filmCompanyId)?.name || "--error retriving company data--"

    return { id, title, averageReview: rounded, company }
  })
  return movesWithData
}

export const submitReview = async (): Promise<string> => {
  try {
    const response = await fetch(`${SERVER_URL}/submitReview`, {
      method: "POST",
    });

    const json = await response.json();

    return json.message

  } catch (error) {
    return ""
  }
}