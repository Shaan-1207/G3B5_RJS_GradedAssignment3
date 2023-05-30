import { Route, Routes } from "react-router-dom";
import NavbarMenu from "../HeaderFooter/NavbarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

import ComingSoon from "../Movies/Movies/ComingSoon";
import Favorites from "../Movies/Movies/Favorites";
import './App.css';
import TopRatedIndian from "../Movies/Movies/TopRatedIndian";
import TopRated from "../Movies/Movies/TopRated";
import MoviesInTheaters from "../Movies/Movies/MoviesInTheaters";

import TopRatedDetails from "../Movies/MoviesDetails/TopRatedDetails";
import TopRatedIndianDetails from "../Movies/MoviesDetails/TopRatedIndianDetails";
import MoviesInTheatersDetails from "../Movies/MoviesDetails/MoviesInTheatersDetails";
import FavoriteDetails from "../Movies/MoviesDetails/FavoriteDetails";
import ComingSoonDetails from "../Movies/MoviesDetails/ComingSoonDetails";
import About from "../About/About";
import Footer from "../HeaderFooter/Footer";

const App = () => {
  return (
    <>
      <NavbarMenu />

      <Container className="my-4">
        <Routes>
          <Route path="/" element= {<MoviesInTheaters />}/>
          <Route path="/coming-soon" element= {<ComingSoon />}/>
          <Route path="/favorites" element= {<Favorites />}/>
          <Route path="/top-rated-indian" element= {<TopRatedIndian />}/>
          <Route path="/top-rated-movies" element= {<TopRated />}/>
          <Route path="/movies-in-theaters" element= {<MoviesInTheaters />}/>
          <Route path="/about" element= {<About />}/>
          
          {/* Rendor Details */}
          <Route path="/movies-in-theaters/:id/" element= {<MoviesInTheatersDetails />}/>
          <Route path="/top-rated-indian/:id/" element= {<TopRatedIndianDetails />}/>
          <Route path="/top-rated-movies/:id/" element= {<TopRatedDetails />}/>
          <Route path="/coming-soon/:id/" element= {<ComingSoonDetails />}/>
          <Route path="/favorites/:id/" element= {<FavoriteDetails />}/>
       
        </Routes>
       
      </Container>
      <Footer />
    </>
  );
};

export default App;
