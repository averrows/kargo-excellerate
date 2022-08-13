import "./App.scss";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import store from "./reducer";
import Driver from "./pages/driver";
import Shipment from "./pages/shipment";
import Truck from "./pages/truck";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/driver" element={<Driver />}></Route>
            <Route path="/truck" element={<Truck />}></Route>
            {/* YOUR CODE HERE */}
            <Route path="/shipment" element={<Shipment />}></Route>
            <Route exact path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
