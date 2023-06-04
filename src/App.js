
import './App.css';
import Home from './pages/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';


function App() {
  return (
    <>
      <CartProvider >
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/myOrder" element={<MyOrder />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </>

  );
}

export default App;
