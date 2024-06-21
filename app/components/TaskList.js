import { useCallback, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fade from '@mui/material/Fade';
import TaskItem from './TaskItem';
import { ToDoContext, SetToDoContext, SetModalContext, SetChangeTaskContext, SearchContext } from './Context';
import Confetti from './Confetti';

export default function TaskList() {
  const complete = useContext(ToDoContext);
  const setComplete = useContext(SetToDoContext);
  const setOpen = useContext(SetModalContext);
  const setChange = useContext(SetChangeTaskContext);
  const search = useContext(SearchContext);

  const [run, setRun] = useState(false);

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
      setOpen({ state: true, type: 'change' });
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

  if (complete.length !== 0) {
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
