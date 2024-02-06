import {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext';

export default function useGlobalContext() {
  const context = useContext(GlobalContext);
  return context;
}
