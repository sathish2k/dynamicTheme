const InitialState = null;

const userReducer = (state = InitialState, action) => {
  if (action.type === "SET_USER") {
    return action.payload;
  }
  if (action.type === "SET_THEME") {
    return { ...state, ...action.payload };
  }
  return state;
};

export default userReducer;
