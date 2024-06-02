'use client';
<link rel="icon" href="/favicon.ico" sizes="any" />;
import AppNavBar from './components/navBar';
import TaskList from './components/taskList';
import { useState } from 'react';

let tasks = [];

export default function Root() {
  const [value, setValue] = useState('');
  const handleTask = (value) => {
    setValue(value);
    tasks = [...tasks, value];
  };
  const [search, setSearch] = useState('');
  const handleSearch = (query) => {
    setSearch(query);
  };
  return (
    <div>
      <AppNavBar onClick={handleTask} onChange={handleSearch} />
      <TaskList data={tasks} searchQuery={search} />
    </div>
  );
}
