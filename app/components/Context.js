import { useState, createContext } from 'react';

export const OpenContext = createContext(null);
export const SetOpenContext = createContext(null);

export const ContextAdd = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <OpenContext.Provider value={open}>
      <SetOpenContext.Provider value={setOpen}>{children}</SetOpenContext.Provider>
    </OpenContext.Provider>
  );
};

export const ChangeContext = createContext(null);
export const SetChangeContext = createContext(null);

export const ContextChange = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <ChangeContext.Provider value={open}>
      <SetChangeContext.Provider value={setOpen}>{children}</SetChangeContext.Provider>
    </ChangeContext.Provider>
  );
};

export const CompleteContext = createContext(null);
export const SetCompleteContext = createContext(null);

export const ContextComplete = ({ children }) => {
  const [complete, setComplete] = useState([]);
  return (
    <CompleteContext.Provider value={complete}>
      <SetCompleteContext.Provider value={setComplete}>{children}</SetCompleteContext.Provider>
    </CompleteContext.Provider>
  );
};

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
