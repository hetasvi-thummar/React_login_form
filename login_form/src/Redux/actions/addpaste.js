import axios from "axios";
import { toast } from "react-toastify";

export const addPaste = (content, Expiration, Exposure, title, toggle) => {
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
        toast.success("successfully Added", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ADDPASTE_FAILURE",
        });
        toast.error("Failed to Add", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
