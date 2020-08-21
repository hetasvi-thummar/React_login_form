import axios from "axios";

export const fetchPaste = () => {
  const jwt = localStorage.getItem("jwt");

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
      })

      .catch((error) => {
        dispatch({
          type: "FETCHPASTE_FAILURE",
        });
      });
  };
};

export const fetchSinglePaste = (id) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "FETCH_SINGLEPASTE_PENDING" });
    axios
      .get(`https://pastebindemo.herokuapp.com/pastes/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "FETCH_SINGLEPASTE_SUCCESS",
          onepaste: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "FETCH_SINGLEPASTE_FAILURE",
        });
      });
  };
};
