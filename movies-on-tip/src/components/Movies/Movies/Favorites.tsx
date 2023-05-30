import { useState, useEffect } from "react";
import { Alert, Row, Spinner, Col, Card } from "react-bootstrap";
import { faHeart, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import removeFavorites from "../../../services/removeFavorites";
import { getFavorites } from "../../../services/getMovies";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import IMovies from "../../../models/IMovies";
import PaginationComponent from "../../utils/PaginationComponent";

const Favorites = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState("");


  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (movieId: number, movieTitle: string) => {
    try {
      await removeFavorites(movieId);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
      toast.success(
        <>
          <strong>{movieTitle}</strong> removed from favorites`
        </>,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        }
      );
    } catch (error) {
      console.error("Failed to remove movie from favorites:", error);
      toast.error("Failed to remove movie from favorites!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter((movie: IMovies) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const paginatedMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <form className="nosubmit">
        <input
          className="nosubmit an-search"
          type="search"
          placeholder="Search Favorites Movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {loading && <Spinner animation="border" size="sm" />}
      <span>
        <FontAwesomeIcon icon={faHeart} className="mx-2" size="sm" />
        <strong>Favorite Movies</strong>
      </span>

      {!loading && error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && (
        <>
          <Row xs={12} lg={5} className="my-3">
            {filteredMovies.length === 0 ? (
              <h4 className="error-text">Result not found...</h4>
            ) : (
              paginatedMovies.map((movie: IMovies) => (
                <Col className="my-2" key={movie.id}>
                  <Card style={{ textAlign: "center" }}>
                    <Link
                      to={`/favorites/${movie.id}`}
                      className="poster-container"
                    >
                      <Card.Img
                        variant="top"
                        src={movie.posterurl}
                        alt={movie.title}
                        className="poster-card"
                      />
                      <div className="poster-overlay">
                        <FontAwesomeIcon icon={faEye} />
                        <span className="preview-text">Show Details</span>
                      </div>
                    </Link>

                    <Card.Body>
                      <Card.Text className="title-font">
                        {movie.title}
                      </Card.Text>
                      <Card.Text style={{ marginTop: "0", paddingTop: "0" }}>
                        <span
                          className="sm-font fav-rem"
                          onClick={() => removeFavorite(movie.id, movie.title)}
                        >
                          Remove From Favourites{" "}
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          {/* Pagination */}
          <div className="pagination-container">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredMovies.length / moviesPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
