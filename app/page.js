'use client';

import { styled } from '@mui/material/styles';
import Head from 'next/head';
import AppNavBar from './components/NavBar';
import TaskList from './components/TaskList';
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
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <Page>
        <AppNavBar onClick={handleTask} onChange={handleSearch} />
        <TaskList data={tasks} searchQuery={search} />
      </Page>
    </>
  );
}

const Page = styled('div')`
  margin: 0;
  background-color: #f1f1f1;
  height: 100vh;
`;
