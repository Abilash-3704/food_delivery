import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

import useGlobalContext from './hooks/useGlobalContext';
import OrderDisplay from './pages/OrderDisplay';

function App() {
  const {user} = useGlobalContext();
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="home" /> : <SignUp />}
              />

              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/prevOrder" element={<OrderDisplay />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
