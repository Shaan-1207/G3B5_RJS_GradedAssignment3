// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import IMovies from "../../../models/IMovies";
import { Spinner, Row, Col, Alert, Image } from "react-bootstrap";
import { getTopRatedById } from "../../../services/getMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import Rating from "../../utils/Rating/Rating";

type Params = {
  id: string;
};

const TopRatedDetails = () => {
  const { id } = useParams<Params>(); //id => 3 for example (use destructuring)

  const [movie, setMovie] = useState<IMovies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showPreview, setShowPreview] = useState(false); // State variable for preview visibility

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) {
          throw new Error("Movie ID not found");
        }

        const data = await getTopRatedById(id);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const openPreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      {loading && <Spinner animation="border" size="sm" />}

      {!loading && error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && movie && (
        <>
          <Link to={`/top-rated-movies`} className="rm-us">
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#081a3a" }} />
            <span className="mx-2">
              <strong>Go Back</strong>
            </span>
          </Link>

          <Row className="my-4">
            <Col xs={12} lg={4} className="poster-col">
              <div className="poster-container">
                <Image
                  className="detail_poster"
                  src={movie.posterurl}
                  alt={movie.title}
                  fluid
                />
                <div className="poster-overlay" onClick={openPreview}>
                  <FontAwesomeIcon icon={faEye} />
                  <span className="preview-text">Preview</span>
                </div>
              </div>
            </Col>

            <Col>
              <h2>
                {movie.title} ({movie.year})
              </h2>
              <hr />

              <Row className="my-2">
                <Col md={3}>
                  <strong>IMDb Rating:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>
                  {" "}
                  <Rating rating={movie.imdbRating} />
                </Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Content Rating:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.contentRating}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Average Rating:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.averageRating}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Duration:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.duration}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Genres:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.genres}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Actors:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.actors}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Release Date:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.releaseDate}</Col>
              </Row>

              <Row className="my-2">
                <Col md={3}>
                  <strong>Storyline:</strong>
                </Col>
                <Col md={{ span: 8, offset: 1 }}>{movie.storyline}</Col>
              </Row>
            </Col>
          </Row>

          {/* Preview Component */}
          {showPreview && (
            <div className="preview-overlay" onClick={closePreview}>
              <div className="preview-container">
                <Image
                  src={movie.posterurl}
                  alt={movie.title}
                  className="preview-image"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TopRatedDetails;
