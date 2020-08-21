import axios from "axios";
import { toast } from "react-toastify";
import { fetchPaste } from "./fetchpaste";

export const editPaste = (
  content,
  Expiration,
  Exposure,
  title,
  id,
  setNewModal
) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_PASTE_PENDING" });
    axios
      .put(
        `https://pastebindemo.herokuapp.com/pastes/${id}`,
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
          type: "EDIT_PASTE_SUCCESS",
          data: res.data,
        });
        setNewModal(false);
        dispatch(fetchPaste());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_PASTE_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setNewModal(true);
      });
  };
};
