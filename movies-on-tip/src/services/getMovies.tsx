import axios from "axios";
import IMovies from "../models/IMovies";

const getMoviesComing = async () => {
  const response = await axios.get(`http://localhost:8000/movies-coming`);
  console.log(response.data);
  return response.data;
};

const getFavorites = async () => {
  const response = await axios.get(`http://localhost:8000/favourite`);
  console.log(response.data);
  return response.data;
};

const getMoviesInTheaters = async () => {
  const response = await axios.get(`http://localhost:8000/movies-in-theaters`);
  console.log(response.data);
  return response.data;
};


const getTopRated = async () => {
  const response = await axios.get(`http://localhost:8000/top-rated-movies`);
  console.log(response.data);
  return response.data;
};

const getTopRatedIndian = async () => {
  const response = await axios.get(`http://localhost:8000/top-rated-india`);
  console.log(response.data);
  return response.data;
};


//Details API
const getMoviesInTheatersById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/movies-in-theaters/${id}`);
  console.log(response.data);
  return response.data as IMovies;
};
const getTopRatedIndianById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/top-rated-india/${id}`);
  console.log(response.data);
  return response.data as IMovies;
};
const getTopRatedById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/top-rated-movies/${id}`);
  console.log(response.data);
  return response.data as IMovies;
};
const getFavoritesById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/favourite/${id}`);
  console.log(response.data);
  return response.data as IMovies;
};
const getMoviesComingById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/movies-coming/${id}`);
  console.log(response.data);
  return response.data as IMovies;
};

export {
  getMoviesComing,
  getFavorites,
  getMoviesInTheaters,
  getTopRated,
  getTopRatedIndian,

// Details functions
  getMoviesInTheatersById,
  getTopRatedIndianById,
  getTopRatedById,
  getFavoritesById,
  getMoviesComingById
};
