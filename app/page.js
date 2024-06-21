'use client';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import AppNavBar from './components/NavBar';
import TaskList from './components/TaskList';
import ModalAdd from './components/ModalAdd';
import { ContextAdd, ContextChange, ContextChangeTask, ContextComplete, ContextSearch } from './components/Context';
import ModalChange from '@/app/components/ModalChange';

export default function Root() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <Page>
        <ContextComplete>
          <ContextSearch>
            <ContextAdd>
              <AppNavBar />
              <ModalAdd />
            </ContextAdd>
            <ContextChange>
              <ContextChangeTask>
                <TaskList />
                <ModalChange />
              </ContextChangeTask>
            </ContextChange>
          </ContextSearch>
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
