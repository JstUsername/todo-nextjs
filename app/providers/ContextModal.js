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
