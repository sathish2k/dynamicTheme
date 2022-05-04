const InitialState = true

const loadingReducer = (state = InitialState, action) => {
  if (action.type === 'LOADING') {
    return action.payload;
  }
  return state;
};

export default loadingReducer;
