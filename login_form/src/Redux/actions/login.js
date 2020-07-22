import axios from "axios";
import { toast } from "react-toastify";

export const LoginData = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGINDATA_POST_PENDING" });
    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })

      .then((res) => {
        // toast.success(res.message, { position: toast.POSITION.TOP_CENTER });
        localStorage.setItem("token", res.data.token);

        dispatch({
          type: "LOGINDATA_POST_SUCCESS",
          identifier: res.data.identifier,
          password: res.data.password,
        });

        history.push("/dashboard");
      })
      .catch((error) => {
        // toast.error(error.message, { position: toast.POSITION.TOP_CENTER });

        dispatch({
          type: "LOGINDATA_POST_FAILURE",
        });
      });
  };
};
