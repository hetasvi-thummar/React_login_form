const initialState = {
  loading: false,
  paste: null,
  error: false,
  message: null,
};

const fetchPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHPASTE_PENDING":
      return { ...state, loading: true, paste: null };

    case "FETCHPASTE_SUCCESS":
      return { ...state, loading: false, paste: action.paste };

    case "FETCHPASTE_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };

    default:
      return { ...state };
  }
};

export default fetchPasteReducer;
