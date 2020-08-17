import axios from "axios";
import { toast } from "react-toastify";
import { fetchPaste } from "./fetchpaste";

export const deletePaste = (id) => {
  console.log(id);
  return (dispatch) => {
    dispatch({ type: "DELETE_PASTE_PENDING" });
    axios
      .delete(`https://pastebindemo.herokuapp.com/pastes/${id}`)

      .then((res) => {
        dispatch({
          type: "DELETE_PASTE_SUCCESS",
          paste: res.data,
        });
        dispatch(fetchPaste());
        toast.success("successfully deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_PASTE_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
