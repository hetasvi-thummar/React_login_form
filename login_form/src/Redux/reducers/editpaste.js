const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const editPasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PASTE_PENDING":
      return { ...state, loading: true, data: null };

    case "EDIT_PASTE_SUCCESS":
      return { ...state, loading: false, data: action.data };

    case "EDIT_PASTE_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default editPasteReducer;
