import React from 'react';
import useGlobalContext from '../hooks/useGlobalContext';

export default function OrderDisplay() {
  const {order, user} = useGlobalContext();
  console.log(user);
  return (
    <>
      <div className="grid place-items-center my-4">
        <div className="my-4 grid grid-cols-3 gap-5 w-3/5 ">
          {order.map(x => (
            <div className="flex-col p-2 border rounded-lg" key={x._id}>
              {/* <img src={x.image} alt="" className="w-full" /> */}
              <h1 className="font-poppins p-2 ">{x.name}</h1>
              <p>{x.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
