import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

export default function Navbar() {
  const {user, setUser} = useGlobalContext();
  //   const [to, setTo] = useState('');
  //   const [text, setText] = useState('LOG IN');
  let location = useLocation();
  //   useEffect(() => {
  //   if (location === '/') {
  //     setTo('/login');

  //     setText('LOG IN');
  //   }
  //   if (location === '/login') {
  //     setTo('/');

  //     setText('SIGN UP');
  //   }
  //   if (location === '/home') {
  //     setTo('/login');

  //     setText('LOG OUT');
  //   }
  //   }, []);
  const NAVBAR_TEXTS = [
    {page: '/', text: 'LOG IN', to: '/login'},
    {page: '/login', text: 'SIGN UP', to: '/'},
    // {page: '/home', text: 'LOG OUT', to: '/login'},
  ];
  return (
    <div className="w-full bg-violet-800 text-white text-2xl py-4 flex justify-around items-center font-poppins">
      <h1>FOOD DELIVERY</h1>
      <Link to={NAVBAR_TEXTS.find(el => el.page === location.pathname)?.to}>
        <h1>{NAVBAR_TEXTS.find(el => el.page === location.pathname)?.text}</h1>
      </Link>
      {user ? (
        <>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem('user');
              setUser(null);
            }}>
            <h1>LOG OUT</h1>
          </Link>
          <Link to="/cart">
            <h1>CART</h1>
          </Link>
          <Link to="/orders">
            <h1>ORDERES</h1>
          </Link>
        </>
      ) : null}
    </div>
  );
}
