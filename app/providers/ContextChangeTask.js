import { useState, createContext } from 'react';

export const ChangeTaskContext = createContext(null);
export const SetChangeTaskContext = createContext(null);

export const ContextChangeTask = ({ children }) => {
  const [change, setChange] = useState('');
  return (
    <ChangeTaskContext.Provider value={change}>
      <SetChangeTaskContext.Provider value={setChange}>{children}</SetChangeTaskContext.Provider>
    </ChangeTaskContext.Provider>
  );
};
