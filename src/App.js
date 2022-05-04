import "./App.css";
import Routes from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store()}>
      <ThemeProvider>
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
