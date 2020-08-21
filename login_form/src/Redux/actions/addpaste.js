import axios from "axios";
import { toast } from "react-toastify";
import { fetchPaste } from "./fetchpaste";

export const addPaste = (content, Expiration, Exposure, title, setModal) => {
  const jwt = localStorage.getItem("jwt");

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
        dispatch(fetchPaste());
        toast.success("successfully Added", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "ADDPASTE_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
