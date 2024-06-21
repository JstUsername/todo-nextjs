'use client';
import { useCallback, useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fade from '@mui/material/Fade';
import { useWindowSize } from '@react-hook/window-size';
import TaskItem from './TaskItem';
import { CompleteContext, SetCompleteContext, SetChangeContext, SetChangeTaskContext } from './Context';
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function TaskList({ searchQuery }) {
  const complete = useContext(CompleteContext);
  const setComplete = useContext(SetCompleteContext);
  const setOpen = useContext(SetChangeContext);
  const setChange = useContext(SetChangeTaskContext);

  const removeTask = useCallback(
    (value) => () => {
      const newComplete = complete.filter((val) => val !== value);
      setComplete(newComplete);
      if (newComplete.length === 0) {
        setRun(true);
      }
    },
    [complete],
  );

  const handleClickChange = useCallback(
    (value) => () => {
      const currentIndex = complete.indexOf(value);
      setChange(complete[currentIndex]);
      setOpen(true);
    },
    [complete],
  );

  const handleToggle = useCallback(
    (value) => () => {
      const newComplete = (arr) =>
        arr.map((val) => (val === value ? { id: val.id, text: val.text, checked: !val.checked } : val));
      setComplete((prev) => newComplete(prev));
    },
    [complete],
  );

  const { width, height } = useWindowSize();
  const [run, setRun] = useState(false);

  if (complete.length !== 0) {
    return (
      <div>
        <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
          <List dense sx={{ width: '100%' }} disablePadding>
            {complete
              .filter((val) => (searchQuery !== '' ? val.text.toLowerCase().includes(searchQuery.toLowerCase()) : val))
              .map((value) => {
                return (
                  <Fade key={value.id}>
                    <TaskItem
                      value={value}
                      handleToggle={handleToggle}
                      handleClickChange={handleClickChange}
                      removeTask={removeTask}
                    />
                  </Fade>
                );
              })}
          </List>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Confetti width={width} height={height} run={run} recycle={false} gravity={0.25} />
        <Box
          m={3}
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={1}
          bgcolor={'#FFFFFF'}
        >
          <Typography fontSize={18} fontWeight={500} textAlign="center" color="#505050">
            There's nothing to do today! 🎉
          </Typography>
          <Typography fontSize={18} fontWeight={500} textAlign="center" color="#505050">
            Use the "New task" button to add tasks. 📝
          </Typography>
        </Box>
      </div>
    );
  }
}
