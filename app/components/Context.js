import { useState, createContext } from 'react';

export const ModalContext = createContext(null);
export const SetModalContext = createContext(null);

export const ContextModal = ({ children }) => {
  const [open, setOpen] = useState({ state: false, type: '' });
  return (
    <ModalContext.Provider value={open}>
      <SetModalContext.Provider value={setOpen}>{children}</SetModalContext.Provider>
    </ModalContext.Provider>
  );
};

export const ToDoContext = createContext(null);
export const SetToDoContext = createContext(null);

export const ContextToDo = ({ children }) => {
  const [complete, setComplete] = useState([]);
  return (
    <ToDoContext.Provider value={complete}>
      <SetToDoContext.Provider value={setComplete}>{children}</SetToDoContext.Provider>
    </ToDoContext.Provider>
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

export const SearchContext = createContext(null);
export const SetSearchContext = createContext(null);

export const ContextSearch = ({ children }) => {
  const [search, setSearch] = useState('');
  return (
    <SearchContext.Provider value={search}>
      <SetSearchContext.Provider value={setSearch}>{children}</SetSearchContext.Provider>
    </SearchContext.Provider>
  );
};
