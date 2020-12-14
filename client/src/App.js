import React, {useEffect} from 'react';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import MainApp from "./components/layout/MainApp";

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
            <MainApp />
      </Provider>
)
}

export default App;
