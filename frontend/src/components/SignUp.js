import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useGlobalContext from '../hooks/useGlobalContext';

export default function SignUp() {
  const navigate = useNavigate();

  const {setUser, setLocation} = useGlobalContext();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const user = {userName, password};
    // console.log(JSON.stringify(user));
    const response = await fetch('/api/users', {
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
      //   setUser(json._id);

      console.log(json);
      setLocation('/login');
      navigate('/login');
    }
  };
  return (
    <>
      <div
        // className="grid place-items-center">
        className=" flex-col items-center justify-center w-6/12
        m-auto h-full">
        <form
          // className="grid place-items-center font-poppins"
          className="flex-col items-center justify-center w-96  m-auto font-poppins"
          onSubmit={handleSubmit}>
          {/* //w-5/6 m-auto bg-red-400 */}
          {/* flex-col w-5/6 items-center justify-center */}
          <div className=" bg-violet-800 border rounded-xl text-white h-2/4 px-8">
            <div
              // className="grid place-items-center ">
              className="w-11/12 m-auto flex-col justify-center items-center">
              <h3 className="block text-2xl text-center">Sign Up</h3>
              <div className="flex-col my-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  onChange={e => setUserName(e.target.value)}
                  value={userName}
                  className="border rounded border-white h-6 w-full text-black"
                />
              </div>
              <div className="flex-col my-4">
                <label className="block">Password</label>
                <input
                  type="text"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  className="border rounded border-white h-6 w-full text-black"
                />
              </div>
              {/* <Link to={link}> */}
              <button className="my-4 mx-auto block border px-6 py-1 rounded-lg border-white bg-violet-800 text-white">
                Sign Up
              </button>
              {/* </Link> */}
            </div>
          </div>
          {error && (
            <p className="  text-lg text-red-600 text-center">{error}</p>
          )}
          {/* <h3>{userId ? userId : null}</h3> */}
        </form>
        {/* {error && <div className="flex  text-lg text-red-600">{error}</div>} */}
        {/* <div className="flex">
          {error && (
            <p className=" bg-green-600  text-lg text-red-600 text-center">
              {error}
            </p>
          )}
        </div> */}
      </div>
    </>
  );
}
