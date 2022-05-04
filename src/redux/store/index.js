import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;
