import { useState, createContext } from 'react';

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
