import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../hooks/useTypeSelector';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fade from '@mui/material/Fade';
import TaskItem from './TaskItem';
import Confetti from './Confetti';
import { ToDoTask } from '../types/types';

export default function TaskList() {
  const dispatch = useDispatch();
  const { taskList, search } = useTypeSelector((state) => state.todoSearch);

  const [run, setRun] = useState<boolean>(false);

  // prettier-ignore
  const removeTask = useCallback((removeTask: ToDoTask) => {
      dispatch({ type: 'REMOVE_TASK', payload: removeTask });
    }, [taskList]);

  // prettier-ignore
  const handleClickChange = useCallback((changeTask: ToDoTask) => {
      const currentIndex = taskList.indexOf(changeTask);
      dispatch({ type: 'CHANGE_TASK', payload: taskList[currentIndex] });
      dispatch({ type: 'OPEN_CHANGE' });
  }, [taskList]);

  // prettier-ignore
  const handleToggle = useCallback((toggleTask: ToDoTask) => {
      dispatch({ type: 'TOGGLE_TASK', payload: toggleTask });
    }, [taskList]);

  useEffect(() => {
    if (taskList.length === 0) {
      setRun(true);
    }
  }, [taskList]);

  if (taskList.length === 0 || taskList[0].text === '') {
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
  return (
    <div>
      <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
        <List dense sx={{ width: '100%' }} disablePadding>
          {taskList
            .filter((val) => (search !== '' ? val.text.toLowerCase().includes(search.toLowerCase()) : val))
            .map((task) => {
              return (
                <Fade key={task.id}>
                  <TaskItem
                    task={task}
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
}
