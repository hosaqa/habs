import { useContext } from 'react';
import { StoresContext } from 'view/contexts';

const useStores = () => {
  return useContext(StoresContext);
};

export default useStores;
