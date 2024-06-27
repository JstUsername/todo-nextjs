import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../hooks/useTypeSelector';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
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

  return (
    <div>
      <AnimatePresence initial={false}>
        {taskList.length === 0 || taskList[0].text === '' ? (
          <motion.div
            key="notask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
          >
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
              position="absolute"
              left={0}
              right={0}
              zIndex={1}
            >
              <motion.div
                key="text1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.25, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
              >
                <Typography fontSize={18} fontWeight={500} textAlign="center" color="#505050">
                  There's nothing to do today! 🎉
                </Typography>
              </motion.div>
              <motion.div
                key="text2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.5, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
              >
                <Typography fontSize={18} fontWeight={500} textAlign="center" color="#505050">
                  Use the "New task" button to add tasks. 📝
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
      <Box
        m={3}
        display="flex"
        alignItems="center"
        borderRadius={1}
        bgcolor={'#FFFFFF'}
        position="absolute"
        left={0}
        right={0}
        zIndex={2}
      >
        <List dense sx={{ width: '100%' }} disablePadding>
          <AnimatePresence>
            {taskList.length !== 0 && taskList[0].text !== '' ? (
              taskList
                .filter((val) => (search !== '' ? val.text.toLowerCase().includes(search.toLowerCase()) : val))
                .map((task) => {
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      exit={{ opacity: 0 }}
                    >
                      <TaskItem
                        task={task}
                        handleToggle={handleToggle}
                        handleClickChange={handleClickChange}
                        removeTask={removeTask}
                      />
                    </motion.div>
                  );
                })
            ) : (
              <></>
            )}
          </AnimatePresence>
        </List>
      </Box>
    </div>
  );
}
