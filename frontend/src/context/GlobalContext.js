import {createContext, useReducer} from 'react';

export const GlobalContext = createContext();

const user = localStorage.getItem('user');
const globalState = {
  user: user,
  location: '/',
  cart: [],
  order: [],
};
export const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      // console.log('payload ' + action.payload);

      // console.log('user: ' + state.user);
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        cart: [...state.cart, action.payload],
      };
    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
export const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, globalState);

  const setUser = id => {
    dispatch({type: 'SET_USER', payload: id});
  };
  const setLocation = loc => {
    dispatch({type: 'SET_LOCATION', payload: loc});
  };
  const addToCart = obj => {
    dispatch({type: 'ADD_TO_CART', payload: obj});
  };
  const setOrder = ord => {
    dispatch({type: 'SET_ORDER', payload: ord});
  };
  return (
    <GlobalContext.Provider
      value={{
        // ...state,
        setUser,
        setLocation,
        addToCart,
        setOrder,
        user: state.user,
        location: state.location,
        order: state.order,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
