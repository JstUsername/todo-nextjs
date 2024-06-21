import { useState, createContext } from 'react';

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
