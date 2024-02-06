import React, {useState, useEffect} from 'react';
import useGlobalContext from '../hooks/useGlobalContext';
import {useLocation} from 'react-router-dom';

export default function Cart() {
  // let page = useLocation();
  const [cart, setCart] = useState([]);
  const {user} = useGlobalContext();

  const getCart = async () => {
    // console.log(user);
    // console.log('hi');
    const response = await fetch('/api/users/getCart', {
      method: 'POST',
      body: JSON.stringify({userId: user}),
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);
    const json = await response.json();
    // console.log(json.cart);
    if (response.ok) {
      setCart(json.cart);
      // console.log(cart);
    } else {
      // console.log('fail');
    }
  };
  //   getCart();
  useEffect(() => {
    getCart();
  }, [cart]);
  const cartHandler = async data => {
    console.log('clicked');

    const response = await fetch('/api/users/addToCart', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log('success');
      console.log(json);
    } else {
      console.log('fail');
    }
  };
  const handleSubmit = async e => {
    console.log('submit');
    e.preventDefault();
    const response = await fetch('/api/users/placeOrder', {
      method: 'POST',
      body: JSON.stringify({newOrder: cart}),
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('order placed successfully');
      setCart([]);
    } else {
      alert('failed');
    }
  };
  return (
    //grid place-items-center
    <>
      <h1>CART</h1>
      <form className="m-auto w-6/12" onSubmit={handleSubmit}>
        <div className="">
          {cart.length > 0 ? (
            cart.map(x => (
              <div className="flex justify-between" key={x.id}>
                <p className="text-red">{x.name}</p>
                <div className="flex gap-2">
                  <p>{x.quantity}</p>
                  <button
                    className="border rounded-lg p-2 bg-violet-800 text-white"
                    type="button"
                    onClick={() => cartHandler({name: x.name})}>
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-black">CART IS EMPTY</h1>
          )}
        </div>
        {cart.length > 0 ? (
          <button
            className="my-4 border px-6 py-1 rounded-lg border-white bg-violet-800 text-white"
            type="submit">
            PLACE ORDER
          </button>
        ) : null}
      </form>
    </>
  );
}
