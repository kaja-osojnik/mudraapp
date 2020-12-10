import React, {Fragment, useEffect} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/layout/Home";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        // eslint-disable-next-line
    }, [])

  return(
      <Provider store={store}>
          <Router>
              <Fragment>
                  <Navbar />
                  <main>
                      <div className="main-first-wrap">
                          <div className="main-wrapper">
                              <Route exact path="/" component={Home} />
                              <Switch>
                                  <Route exact path="/register" component={Register} />
                                  <Route exact path="/login" component={Login} />
                                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                              </Switch>
                          </div>
                      </div>
                  </main>
              </Fragment>
          </Router>
      </Provider>
)
}

export default App;
