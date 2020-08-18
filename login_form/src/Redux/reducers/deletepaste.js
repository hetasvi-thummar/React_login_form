const initialState = {
  loading: false,
  paste: null,
  error: false,
  message: null,
};

const deletePasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PASTE_PENDING":
      return { ...state, loading: true, paste: null };

    case "DELETE_PASTE_SUCCESS":
      return { ...state, loading: false, paste: action.paste };

    case "DELETE_PASTE_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default deletePasteReducer;
