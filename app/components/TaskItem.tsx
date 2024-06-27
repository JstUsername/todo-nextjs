import { forwardRef, Ref } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { ToDoTask } from '../types/types';

interface TaskItemProps {
  task: ToDoTask;
  handleToggle: (toggleTask: ToDoTask) => void;
  handleClickChange: (changeTask: ToDoTask) => void;
  removeTask: (deleteTask: ToDoTask) => void;
}

const TaskItem = forwardRef(
  ({ task, handleToggle, handleClickChange, removeTask }: TaskItemProps, ref: Ref<HTMLDivElement>) => {
    const labelId = `checkbox-list-secondary-label-${task.id}`;
    return (
      <div ref={ref}>
        <ListItem
          secondaryAction={
            <Box sx={{ display: 'flex', gap: 2, mr: -1 }}>
              <Checkbox
                edge="end"
                size="medium"
                color="success"
                onChange={() => handleToggle(task)}
                checked={task.checked}
                inputProps={{ 'aria-labelledby': labelId }}
                sx={{ width: '48px', color: '#505050' }}
              />
              <IconButton size="large" edge="start" color="error" aria-label="delete" onClick={() => removeTask(task)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
          disablePadding
        >
          <ListItemButton onClick={() => handleClickChange(task)} sx={{ p: 2 }}>
            <ListItemText
              id={labelId}
              primary={
                <>
                  <Typography
                    fontSize={18}
                    maxWidth={'fit-content'}
                    whiteSpace={'wrap'}
                    color={'primary.dark'}
                    className={task.checked ? 'strikethrough' : ''}
                    sx={{ wordWrap: 'break-word' }}
                  >
                    {task.text}
                  </Typography>
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      </div>
    );
  },
);

export default TaskItem;
