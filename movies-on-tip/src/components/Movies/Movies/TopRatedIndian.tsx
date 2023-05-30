import { useState, useEffect } from "react";
import { getTopRatedIndian } from "../../../services/getMovies";
import { Spinner, Card, Alert, Row, Col } from "react-bootstrap";
import {
  faHeart,
  faFireFlameCurved,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import addFavorites from "../../../services/addFavorites";
import IMovies from "../../../models/IMovies";
import PaginationComponent from "../../utils/PaginationComponent";

const TopRatedIndian = () => {
  // const {id} = useParams<Params>();
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedIndian();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const addFavorite = async (movie: IMovies) => {
    try {
      const response = await addFavorites(movie);
      console.log("Added to favorites:", response);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
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
          placeholder="Search Top Rated Indian Movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {loading && <Spinner animation="border" size="sm" />}

      <span>
        <FontAwesomeIcon icon={faFireFlameCurved} className="mx-2" size="sm" />
        <strong>Top Rated Indian Movies</strong>
      </span>

      {!loading && error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && movies && (
        <>
          <Row xs={12} lg={5} className="my-3">
            {filteredMovies.length === 0 ? (
              <h4 className="error-text">Result not found...</h4>
            ) : (
              paginatedMovies.map((movies: IMovies) => (
                <Col className="my-2">
                  <Card style={{ textAlign: "center" }}>
                    <Link
                      to={`/top-rated-indian/${movies.id}`}
                      className="poster-container"
                    >
                      <Card.Img
                        variant="top"
                        src={movies.posterurl}
                        alt={movies.title}
                        className="poster-card"
                      />
                      <div className="poster-overlay">
                        <FontAwesomeIcon icon={faEye} />
                        <span className="preview-text">Show Details</span>
                      </div>
                    </Link>

                    <Card.Body>
                      <Card.Title className="title-font">
                        {movies.title}
                      </Card.Title>

                      <Card.Text style={{ marginTop: "0", paddingTop: "0" }}>
                        <span
                          className="sm-font fav-rem"
                          onClick={() => addFavorite(movies)}
                        >
                          Add to Favourites{" "}
                          <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "#8b0404" }}
                          />
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

export default TopRatedIndian;
