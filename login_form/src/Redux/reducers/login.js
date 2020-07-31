const initialState = {
  loading: false,
  data: null,
  error: "",
  message: null,
  success: "",
  addpaste: { loading: false, data: null, message: null },
  fetchpaste: { loading: false, paste: null, message: null },
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGINDATA_PENDING":
      return { ...state, loading: true, data: null };
    case "LOGINDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case "LOGINDATA_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case "ADDPASTE_PENDING":
      return {
        ...state,
        addpaste: { loading: true, data: null },
      };
    case "ADDPASTE_SUCCESS":
      return {
        ...state,
        addpaste: {
          loading: false,
          data: action.data,
        },
      };
    case "ADDPASTE_FAILURE":
      return {
        ...state,
        addpaste: { loading: false, message: action.message },
      };
    case "FETCHPASTE_PENDING":
      return {
        ...state,
        fetchpaste: { loading: true, paste: null },
      };
    case "FETCHPASTE_SUCCESS":
      return {
        ...state,
        fetchpaste: { loading: false, paste: action.paste },
      };
    case "FETCHPASTE_FAILURE":
      return {
        ...state,
        fetchpaste: { loading: false, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default LoginReducer;
