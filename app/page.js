'use client';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import AppNavBar from './components/NavBar';
import TaskList from './components/TaskList';
import ModalAdd from './components/ModalAdd';
import { ContextAdd, ContextChange, ContextChangeTask, ContextComplete } from './components/Context';
import ModalChange from '@/app/components/ModalChange';

export default function Root() {
  const [search, setSearch] = useState('');
  const handleSearch = (query) => setSearch(query);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <Page>
        <ContextComplete>
          <ContextAdd>
            <AppNavBar onChange={handleSearch} />
            <ModalAdd />
          </ContextAdd>
          <ContextChange>
            <ContextChangeTask>
              <TaskList searchQuery={search} />
              <ModalChange />
            </ContextChangeTask>
          </ContextChange>
        </ContextComplete>
      </Page>
    </>
  );
}

const Page = styled('div')`
  background-color: #f1f1f1;
  height: 100vh;
  width: 100%;
  margin: 0;
`;
