import { Company, Movie } from "../types/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getMovies = async (): Promise<Movie[] | null> => {
  try {
    const response = await fetch(`${SERVER_URL}/movies`);
    const json = await response.json();
    return json
  } catch (error) {
    return null
  }
}

export const getCompanies = async (): Promise<Company[] | null> => {
  try {
    const response = await fetch(`${SERVER_URL}/movieCompanies`);
    const json = await response.json();
    return json
  } catch (error) {
    return null
  }
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