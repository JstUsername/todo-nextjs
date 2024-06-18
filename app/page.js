'use client';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import AppNavBar from './components/NavBar';
import TaskList from './components/TaskList';
import { useState } from 'react';
import ModalAdd from '@/app/components/ModalAdd';

export default function Root() {
  const [complete, setComplete] = useState([]);
  const [task, setTask] = useState('');
  const handleTask = (task) => {
    setTask(task);
    setComplete([...complete, task]);
  };

  const [search, setSearch] = useState('');
  const handleSearch = (query) => setSearch(query);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <Page>
        <AppNavBar handleOpen={handleOpen} />
        <ModalAdd onClick={handleTask} handleClose={handleClose} open={open} />
        <TaskList complete={complete} setComplete={setComplete} searchQuery={search} />
      </Page>
    </>
  );
}

const Page = styled('div')`
  margin: 0;
  background-color: #f1f1f1;
  height: 100vh;
`;
