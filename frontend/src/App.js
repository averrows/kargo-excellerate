import "./App.scss";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import store from "./reducer";
import Driver from "./pages/driver";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/driver" element={<Driver />}></Route>
            {/* YOUR CODE HERE */}

            <Route exact path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
