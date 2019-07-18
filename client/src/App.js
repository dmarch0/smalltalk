import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import reducers from "./reducers";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logoutUser } from "./actions/authActions";
import Chat from "./components/chat/Chat";
import ProtectedRoute from "./components/common/ProtectedRoute";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });

  //Check for token expire
  console.log(decoded);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/login" component={Login} />
        <Switch>
          <ProtectedRoute exact path="/" component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
