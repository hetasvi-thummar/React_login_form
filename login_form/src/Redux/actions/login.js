import axios from "axios";
import { toast } from "react-toastify";

export const loginData = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGINDATA_PENDING" });
    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })

      .then((res) => {
        toast.success("successfully login", {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("username", res.data.user.username);
        dispatch({
          type: "LOGINDATA_SUCCESS",
        });
        history.push("/dashboard");
      })

      .catch((error) => {
        toast.error("Invalid username or password", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: "LOGINDATA_FAILURE",
        });
      });
  };
};
