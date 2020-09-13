import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header/Header';
import Slide from './Slider/Slide';
import PopularMovies from './PopularMovies/PopularMovies';
import NewReleases from './NewReleases/NewReleases';
import RecentMovies from './RecentMovies/RecentMovies';
import Footer from './Footer/Footer';
import SingleMovie from './SingleMoviePage/MoviePage';
import './App.css';


function App() {







  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/react-movie-database">
            <Header />
            <Slide />
            <PopularMovies title="Popular Movies" />
            <NewReleases title="New Releases" />
            <RecentMovies title="Recent Movies" />
          </Route>
          <Route path="/:id" component={SingleMovie} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
