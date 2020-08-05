const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const addPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDPASTE_PENDING":
      return { ...state, loading: true, data: null };

    case "ADDPASTE_SUCCESS":
      return { ...state, loading: false, data: action.data };

    case "ADDPASTE_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default addPasteReducer;
