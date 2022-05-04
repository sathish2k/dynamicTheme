import axios from "axios";

const setTheme = (theme) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .put(process.env.REACT_APP_BASE_URL + "/api/me",{theme:theme}, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setLoading(false));
        dispatch({ type: "SET_THEME", payload: res.data.user });
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};
const setLoading = (val) => {
  return {
    type: "LOADING",
    payload: val,
  };
};
const setUser = (val) => {
  return {
    type: "SET_USER",
    payload: val,
  };
};

const getUser = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/me", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};

export { setTheme, getUser, setUser, setLoading };
