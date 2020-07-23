import axios from "axios";
import { toast } from "react-toastify";

export const LoginData = (identifier, password, history) => {
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
        dispatch({
          type: "LOGINDATA_SUCCESS",
          identifier: res.data.identifier,
          password: res.data.password,
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

export const AddPaste = (content, Expiration, Exposure, title) => {
  let jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "ADDPASTE_PENDING" });
    axios
      .post(
        "https://pastebindemo.herokuapp.com/pastes",
        {
          content: content,
          Expiration: Expiration,
          Exposure: Exposure,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "ADDPASTE_SUCCESS",
        });
        toast.success("successfully Added", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ADDPASTE_FAILURE",
        });
      });
  };
};

export const FetchPaste = () => {
  let jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "FETCHPASTE_PENDING" });
    axios
      .get("https://pastebindemo.herokuapp.com/pastes", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "FETCHPASTE_SUCCESS",
          paste: res.data,
        });
        // console.log(`paste:${JSON.stringify(res.data)}`);
      })
      .catch((error) => {
        dispatch({
          type: "FETCHPASTE_FAILURE",
        });
      });
  };
};