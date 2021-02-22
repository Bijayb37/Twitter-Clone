import jwtDecode from 'jwt-decode';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import {configureStore} from "../store"
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import Main from './Main';
import Navbar from './Navbar';


const store = configureStore()
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  //prevent manual tampering with ky of jwtToken
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}))
  }
}


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <Main />
      </div>
    </BrowserRouter>
  </Provider>
)

export default App;
