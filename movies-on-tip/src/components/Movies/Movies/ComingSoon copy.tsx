import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Card, Alert, Row, Col } from "react-bootstrap";
import { faVideo, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMoviesComing } from "../../../services/getMovies";
import addFavorites from "../../../services/addFavorites";
import IMovies from "../../../models/IMovies";

const ComingSoon = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesComing();
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
  };

  const filteredMovies = movies.filter((movie: IMovies) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search bar */}
      <form className="nosubmit">
        <input
          className="nosubmit an-search"
          type="search"
          placeholder="Search Upcoming Movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {loading && <Spinner animation="border" size="sm" />}
      <span>
        <FontAwesomeIcon icon={faVideo} className="mx-2" size="sm" />
        <strong>Coming Soon</strong>
      </span>

      {!loading && error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && movies && (
        <>
          <Row xs={12} lg={5} className="my-3">
            {filteredMovies.length === 0 ? (
              <h4 className="error-text">Result not found...</h4>
            ) : (
              filteredMovies.map((movies: IMovies) => (
                <Col className="my-2" key={movies.id}>
                  <Card style={{ textAlign: "center" }}>
                    <Link
                      to={`/coming-soon/${movies.id}`}
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
                      <Card.Title>{movies.title}</Card.Title>
                      <Card.Text>
                        <span
                          className="sm-font fav-rem"
                          onClick={() => addFavorite(movies)}
                        >
                          Add to Favourites{" "}
                          <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "#8b0404" }}
                          />{" "}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default ComingSoon;
