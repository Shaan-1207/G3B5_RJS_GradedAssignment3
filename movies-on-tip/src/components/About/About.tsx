import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Row, Col } from "react-bootstrap";

const About: React.FC = () => {
  return (
    <Container>
      <h2>About Movie On The Tip</h2>
      <hr />
      <div className="row-with-line">
        <Row>
          <Col>
            <div className="description_container">
              <div className="description"></div>
              <div className="description">
                <h5>Seamless Movie Search: </h5>
                <p>
                  As a user, you have the power to search for movies across
                  different categories, including: Coming Soon, Movies in
                  Theaters, Top Rated Indian and Top Rated Movies.
                </p>
              </div>
              <div className="description">
                <h5> Comprehensive Movie Information: </h5>
                <p>
                  As a user, you can access all the essential details about a
                  movie. From captivating posters to captivating titles, we
                  provide you with the basic information.
                </p>
              </div>
              <div className="description">
                <h5>Dive into Movie Details: </h5>
                <p>
                  Selecting a movie opens up a whole new world of information
                  and excitement. You can delve into the comprehensive details
                  of a movie, allowing you to gain insights into the plot, cast,
                  reviews, and more. Get ready to immerse yourself in the
                  stories that captivate your imagination.
                </p>
              </div>
              <div className="description">
                <h5>Personalize Your Favorite List: </h5>
                <p>
                  With Movies on the Tip, adding a movie to your favorite list
                  is just a click away. As a user, you have the ability to
                  curate your own collection of beloved movies by simply
                  clicking the favorite button.
                </p>
              </div>
              <div className="description">
                <h5> Access Your Favorite List: </h5>
                <p>
                  Your favorite list is always within reach. As a user, you can
                  easily access and view your curated collection of favorite
                  movies.
                </p>
              </div>
              <div className="description">
                <h5>Manage Your Favorites: </h5>
                <p>
                  Your preferences may change over time, and that's as a user
                  you can customize your favorite list, you can remove a movie
                  from your favorite list effortlessly.
                </p>
              </div>

              <div className="project_brief">
                <h6>~Created By Shahid aka Saidullah & Aayushi</h6>
                <p>
                  This is a React Group assignment G3B5_RJS_GradedAssignment3
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <h5 className="v-head">Video Demonstration</h5>
            <div className="video-container">
              <ReactPlayer url="https://youtu.be/NTtew449syM" controls={true} />
            </div>
          </Col>
        </Row>
        <div className="vertical-line"></div>
      </div>
    </Container>
  );
};

export default About;
