import * as React from 'react';
import { StoresContext } from 'view/contexts';
import stores from 'stores';
import Layout from 'view/components/Layout';

function App() {
  return (
    <StoresContext.Provider value={stores}>
      <Layout />
    </StoresContext.Provider>
  );
}

export default App;
