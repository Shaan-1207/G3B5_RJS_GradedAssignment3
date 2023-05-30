import axios from "axios";

const removeFavorites = async (movieId: number) => {
  const response = await axios.delete(`http://localhost:8000/favourite/${movieId}`);
  return response.status;
};

export default removeFavorites;
