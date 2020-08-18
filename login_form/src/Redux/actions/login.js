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
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("username", res.data.user.username);

        dispatch({
          type: "LOGINDATA_SUCCESS",
        });

        toast.success("successfully login", {
          position: toast.POSITION.TOP_CENTER,
        });

        history.push("/dashboard");
      })

      .catch((error) => {
        dispatch({
          type: "LOGINDATA_FAILURE",
        });
        toast.error("Invalid username or password", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
