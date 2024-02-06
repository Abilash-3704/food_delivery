import React, {useState, useEffect} from 'react';
import useGlobalContext from '../hooks/useGlobalContext';

export default function Home() {
  const {user, location} = useGlobalContext();
  const [data, setData] = useState([]);
  const menu = [];
  const key = '7e7a8dd1aa1146aebf28b969e8faaa01';
  // const key = `${process.env.API_KEY}`;
  const getMenu = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${key}&number=50`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    if (response.ok) {
      //   console.log(json);
      json.recipes.map(x => {
        // setMenu([...menu, {id: x.id, title: x.title, image: x.image}]);
        menu.push({id: x.id, title: x.title, image: x.image});
      });
      setData(menu);
    }
  };
  useEffect(() => {
    getMenu();
    console.log(user + location);
  }, []);
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
  return (
    <div className="grid place-items-center my-4">
      <h1 className="font-poppins text-2xl">MENU</h1>
      <div className="my-4 grid grid-cols-3 gap-5 w-3/5 ">
        {data?.map(x => (
          <div className="flex-col p-2 border rounded-lg" key={x.id}>
            <img src={x.image} alt="" className="w-full" />
            <h1 className="font-poppins p-2 ">{x.title}</h1>
            <button
              className="border rounded-lg p-2 bg-violet-800 text-white"
              onClick={() => cartHandler({name: x.title})}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
