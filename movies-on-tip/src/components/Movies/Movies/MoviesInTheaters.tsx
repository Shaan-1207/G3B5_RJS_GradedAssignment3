import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMoviesInTheaters } from "../../../services/getMovies";
import { Spinner, Card, Alert, Row, Col, Pagination } from "react-bootstrap";
import {
  faHeart,
  faMasksTheater,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import addFavorites from "../../../services/addFavorites";
import IMovies from "../../../models/IMovies";
import PaginationComponent from "../../utils/PaginationComponent";

const MoviesInTheaters: React.FC = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesInTheaters();
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
    setCurrentPage(1)
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
      {/* Search bar */}
      <form className="nosubmit">
        <input
          className="nosubmit an-search"
          type="search"
          placeholder="Search Movies In Theaters"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {loading && <Spinner animation="border" size="sm" />}

      <span>
        <FontAwesomeIcon
          icon={faMasksTheater}
          className="mx-2"
          size="sm"
        />
        <strong>Movies in theatre</strong>
      </span>

      {!loading && error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && (
        <>
          <Row xs={12} lg={5} className="my-3 row">
            {filteredMovies.length === 0 ? (
              <h4 className="error-text">Result not found...</h4>
            ) : (
              paginatedMovies.map((movie: IMovies) => (
                <Col className="my-2 col" key={movie.id}>
                  <Card style={{ textAlign: "center" }}>
                    
                    <Link
                      to={`/movies-in-theaters/${movie.id}`}
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

                    <Card.Body className="card-body">
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>
                        <span
                          className="sm-font fav-rem"
                          onClick={() => addFavorite(movie)}
                        >
                          Add to Favorites{" "}
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

export default MoviesInTheaters;
