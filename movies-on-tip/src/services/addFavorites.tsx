import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMovies from "../models/IMovies";

const addFavorites = async (movie: IMovies) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/favourite",
      movie,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      toast.success(
        <>
          <strong>{movie.title}</strong> added to favorites!
        </>,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }
      );
    } else {
      toast.error("Failed to add movie to favorites!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.status;
  } catch (error) {
    toast.error(
      <>
      <strong>{movie.title}</strong> is already in favorites`
    </>,
      {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    throw new Error("Failed to add to favorites");
  }
};

export default addFavorites;
