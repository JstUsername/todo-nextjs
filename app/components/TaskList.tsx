import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../hooks/useTypeSelector';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fade from '@mui/material/Fade';
import TaskItem from './TaskItem';
import Confetti from './Confetti';

export default function TaskList() {
  const dispatch = useDispatch();
  const complete = useTypeSelector((state) => state.todo);
  const search = useTypeSelector((state) => state.search);

  const [run, setRun] = useState<boolean>(false);

  // prettier-ignore
  const removeTask = useCallback((value: { id: number; text: string; checked: boolean }) => {
      dispatch({ type: 'REMOVE_TASK', payload: value });
    }, [complete]);

  // prettier-ignore
  const handleClickChange = useCallback((value: { id: number; text: string; checked: boolean }) => {
      const currentIndex = complete.indexOf(value);
      dispatch({ type: 'CHANGE_TASK', payload: complete[currentIndex] });
      dispatch({ type: 'OPEN_CHANGE' });
  }, [complete]);

  // prettier-ignore
  const handleToggle = useCallback((value: { id: number; text: string; checked: boolean }) => {
      dispatch({ type: 'TOGGLE_TASK', payload: value });
    }, [complete]);

  useEffect(() => {
    if (complete.length === 0) {
      setRun(true);
    }
  });

  if (complete.length !== 0 && complete[0].text !== '') {
    return (
      <div>
        <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
          <List dense sx={{ width: '100%' }} disablePadding>
            {complete
              .filter((val) => (search !== '' ? val.text.toLowerCase().includes(search.toLowerCase()) : val))
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
        <Confetti run={run} />
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
