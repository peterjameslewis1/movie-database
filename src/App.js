import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header/Header';
import Slide from './Slider/Slide';
import PopularMovies from './PopularMovies/PopularMovies';
import Slider2 from './Slider2/Slider2';
import Dropdown from './Dropdown/Dropdown';
import Footer from './Footer/Footer';
import SingleMovie from './SingleMoviePage/MoviePage';
import Results from './ResultsPage/Results';
import './App.css';


function App(props) {



  const pathname = window.location.pathname;


  return (
    <Router>
      <div className="App">
        <Switch>

          <Route exact path="/react-movie-database/">
            <Header />
            <Slide />
            <PopularMovies title="Popular Movies" />
            <Slider2 title="New Releases" />
            <Dropdown title="Recent Movies" />

          </Route>

          <Route exact path="/react-movie-database/tv/">
            <Header />
            <Slide />
            <PopularMovies title="Popular Shows" />
            <Slider2 title="Top Rated" />
            <Dropdown title="More" />

          </Route>

          <Route exact path="/react-movie-database/:id" component={SingleMovie} />
          <Route exact path="/react-movie-database/tv/:id" component={SingleMovie} />

          <Route exact path="/react-movie-database/genres/:genre" render={(props) => (<Results title={props.match.params.genre} />)} />
          <Route path="/react-movie-database/tv/genres/:genre" render={(props) => (<Results title={props.match.params.genre} />)} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
