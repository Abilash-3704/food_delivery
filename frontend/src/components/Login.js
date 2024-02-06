import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useGlobalContext from '../hooks/useGlobalContext';

export default function Login() {
  const navigate = useNavigate();

  const {setUser, setLocation} = useGlobalContext();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const user = {userName, password};

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(json);
    }
    if (response.ok) {
      setError(null);
      setUserName('');
      setPassword('');
      // setUser(json._id);
      localStorage.setItem('user', json.token);
      setUser(json.token);

      console.log(json._id);
      setLocation('/home');
      navigate('/home');
    }
  };
  return (
    <div
      // className="grid place-items-center">
      className=" flex-col items-center justify-center w-6/12
        m-auto h-full">
      <form
        className="flex-col items-center justify-center w-96  m-auto font-poppins" // "grid place-items-center font-poppins  h-screen"
        onSubmit={handleSubmit}>
        {/* //w-5/6 m-auto bg-red-400 */}
        {/* flex-col w-5/6 items-center justify-center */}
        <div className="grid place-items-center  bg-violet-800 border rounded-xl text-white h-2/4 px-8  ">
          <div className="grid place-items-center ">
            <h3 className="text-2xl">Login</h3>
            <div className="flex-col my-4">
              <label className="block">Username</label>
              <input
                type="text"
                onChange={e => setUserName(e.target.value)}
                value={userName}
                className="border rounded border-white h-6 text-black"
              />
            </div>
            <div className="flex-col my-4">
              <label className="block">Password</label>
              <input
                type="text"
                onChange={e => setPassword(e.target.value)}
                value={password}
                className="border rounded border-white h-6 text-black"
              />
            </div>
            <button className="my-4 border px-6 py-1 rounded-lg border-white bg-violet-800 text-white">
              Login
            </button>
          </div>
        </div>
        {error && <p className="  text-lg text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
