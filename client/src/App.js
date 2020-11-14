import React, { useState } from 'react';
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
import DetailsPage from './DetailsPage/DetailsPage';
import Results from './ResultsPage/Results';
import Seasons from './DetailsPage/SingleSeason/Season';
import Episode from './DetailsPage/Episode/EpisodeBlock';
import Register from './auth/Register';
import Login from './auth/Login';
import './App.css';


function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userData, setUserData] = useState({
    status: 0
  })

  return (
    <Router>
      <div className="App">
        <Header userData={userData} authenticated={authenticated} />
        <Switch>

          <Route exact path="/">
            <Slide />
            <PopularMovies title="Popular Movies" />
            <Slider2 title="New Releases" />
            <Dropdown title="Recent Movies" />
          </Route>

          <Route exact path="/tv/">
            <Slide />
            <PopularMovies title="Popular Shows" />
            <Slider2 title="Top Rated" />
            <Dropdown title="More" />
          </Route>

          <Route exact path="/api/account">
            <div className="auth">
              <Login setAuthenticated={setAuthenticated} setUserData={setUserData} userData={userData} />
              <Register />
            </div>
          </Route>

          <Route exact path="/:id" component={DetailsPage} />
          <Route exact path="/tv/:id" component={DetailsPage} />

          <Route exact path="/genres/:genre" render={(props) => (<Results title={props.match.params.genre} />)} />
          <Route path="/tv/genres/:genre" render={(props) => (<Results title={props.match.params.genre} />)} />

          <Route path="/tv/season/:episode" component={Seasons} />
          <Route path="/tv/season/episode/:id" component={Episode} />
        </Switch>
        <Footer userData={userData} />
      </div>
    </Router>
  );
}

export default App;
