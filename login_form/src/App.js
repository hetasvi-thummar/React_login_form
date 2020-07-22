import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Formlogin from "./Views/Formlogin";
import Dashboard from "./Views/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Formlogin} exact={true} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
