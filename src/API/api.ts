const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getMovies = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/movies`);
    const json = await response.json();
    return json
  } catch (error) {
    return null
  }
}

export const getCompanies = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/movieCompanies`);
    const json = await response.json();
    return json
  } catch (error) {
    return null
  }
}