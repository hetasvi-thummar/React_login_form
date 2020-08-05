const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGINDATA_PENDING":
      return { ...state, loading: true, data: null };

    case "LOGINDATA_SUCCESS":
      return { ...state, loading: false };

    case "LOGINDATA_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };

    default:
      return { ...state };
  }
};

export default loginReducer;
