'use client';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import AppNavBar from './components/NavBar';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { ContextModal, ContextChangeTask, ContextToDo, ContextSearch } from './components/Context';

export default function Root() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <Page>
        <ContextToDo>
          <ContextSearch>
            <ContextModal>
              <AppNavBar />
              <ContextChangeTask>
                <TaskList />
                <Modal />
              </ContextChangeTask>
            </ContextModal>
          </ContextSearch>
        </ContextToDo>
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
