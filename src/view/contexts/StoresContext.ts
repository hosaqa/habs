import { createContext } from 'react';
import store, { IStore } from 'stores';

export default createContext<IStore>(store);
