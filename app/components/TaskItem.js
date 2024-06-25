import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';

const TaskItem = forwardRef(({ value, handleToggle, handleClickChange, removeTask }, ref) => {
  const labelId = `checkbox-list-secondary-label-${value.id}`;
  return (
    <div ref={ref}>
      <ListItem
        key={value.id}
        secondaryAction={
          <Box sx={{ display: 'flex', gap: 2, mr: -1 }}>
            <Checkbox
              edge="end"
              size="medium"
              color="success"
              onChange={() => handleToggle(value)}
              checked={value.checked === true}
              inputProps={{ 'aria-labelledby': labelId }}
              sx={{ width: '48px', color: '#505050' }}
            />
            <IconButton size="large" edge="start" color="error" aria-label="delete" onClick={() => removeTask(value)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        disablePadding
      >
        <ListItemButton onClick={() => handleClickChange(value)} sx={{ p: 2 }}>
          <ListItemText
            id={labelId}
            primary={
              <>
                <Typography
                  fontSize={18}
                  maxWidth={'fit-content'}
                  whiteSpace={'wrap'}
                  color={'primary.dark'}
                  className={value.checked === true ? 'strikethrough' : ''}
                  sx={{ wordWrap: 'break-word' }}
                >
                  {value.text}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
});

export default TaskItem;
