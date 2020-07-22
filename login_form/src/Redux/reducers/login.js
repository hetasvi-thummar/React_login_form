const initialState = {
  loading: false,
  data: null,
  error: "",
  message: null,
  success: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGINDATA_POST_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGINDATA_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
        success: action.message,
      };
    case "LOGINDATA_POST_FAILURE":
      return {
        ...state,
        loading: false,
        success: "",
        error: action.message,
      };

    default:
      return { ...state };
  }
};

export default LoginReducer;
