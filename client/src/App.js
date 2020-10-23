import React, {Fragment} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return(
      <Provider store={store}>
          <Router>
              <Fragment>
                  <Navbar />
                  <main>
                      <div className="main-first-wrap">
                          <div className="main-wrapper">
                              <Route exact path="/" component={Landing} />
                              <Switch>
                                  <Route exact path="/register" component={Register} />
                                  <Route exact path="/login" component={Login} />
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
