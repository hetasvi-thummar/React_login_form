import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import { Loginform, Dashboard, Myrouter } from "./Components";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Myrouter path="/" component={Loginform} exact={true} />
          <Myrouter path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <ToastContainer hideProgressBar={true} />
    </Provider>
  );
};
export default App;
