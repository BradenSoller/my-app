import React, { useEffect } from 'react';

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';






import HomePage from './UserPage/Home';



function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
     
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
          
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <Route
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <HomePage />
          </Route>

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
    
          </Route>

          <Route
            exact
            path="/login"
          >
          
          </Route>

          <Route
            exact
            path="/registration"
          >
          
          </Route>

          <Route
            exact
            path="/home"
          >
          
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;

