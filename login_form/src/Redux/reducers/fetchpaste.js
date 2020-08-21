const initialState = {
  loading: false,
  paste: null,
  error: false,
  message: null,
  singlePaste: { loading: false, onepaste: null },
};

const fetchPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHPASTE_PENDING":
      return { ...state, loading: true, paste: null };

    case "FETCHPASTE_SUCCESS":
      return { ...state, loading: false, paste: action.paste };

    case "FETCHPASTE_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };
    case "FETCH_SINGLEPASTE_PENDING":
      return { ...state, singlePaste: { loading: true, onepaste: null } };
    case "FETCH_SINGLEPASTE_SUCCESS":
      return {
        ...state,
        singlePaste: { loading: false, onepaste: action.onepaste },
      };
    case "FETCH_SINGLEPASTE_FAILURE":
      return {
        ...state,
        singlePaste: { loading: false, message: action.message, error: true },
      };

    default:
      return { ...state };
  }
};

export default fetchPasteReducer;
