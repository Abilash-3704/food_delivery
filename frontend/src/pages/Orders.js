import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useGlobalContext from '../hooks/useGlobalContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const {user, setOrder} = useGlobalContext();
  const getOrders = async () => {
    const response = await fetch('/api/users/getOrders', {
      method: 'POST',
      body: JSON.stringify({userId: user}),
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      setOrders(json.orders);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  const navigate = useNavigate();
  const handleClick = arg => {
    setOrder(arg);
    navigate('/prevOrder');
  };
  return (
    <>
      <div className="flex-co justify-center items-center w-6/12 m-auto rounded-xl border border-violet-600">
        {orders.map(x => (
          <div className="inline">
            <p
              className="cursor-pointer text-center"
              onClick={() => handleClick(x.orders)}>
              {x.createdAt.slice(0, 10)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
