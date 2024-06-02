'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useWindowSize } from '@react-hook/window-size';
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const StyledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 2,
};

export default function TaskList({ data, searchQuery }) {
  const [complete, setComplete] = React.useState(data);
  const removeTask = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex !== -1) {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
    setComplete(data.splice(data.indexOf(value), 1));
    if (data.length === 0) {
      setRun(true);
    }
  };

  const [change, setChange] = React.useState('');
  const handleClickChange = (value) => () => {
    const currentIndex = data.indexOf(value);
    setChange(data[currentIndex]);
    setOpen(true);
  };

  let changeTask;
  const handleChange = (event) => {
    changeTask = event.target.value;
  };

  const handleSaveChange = () => {
    if (changeTask !== change && changeTask !== undefined) {
      setComplete(data.splice(data.indexOf(change), 1, { id: change.id, text: changeTask }));
    }
    setOpen(false);
  };

  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const { width, height } = useWindowSize();
  const [run, setRun] = React.useState(false);

  if (data.length !== 0) {
    return (
      <div>
        <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
          <List dense sx={{ width: '100%' }} disablePadding>
            {data
              .filter((val) => (searchQuery != '' ? val.text.toLowerCase().includes(searchQuery.toLowerCase()) : val))
              .map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <Fade in={complete} key={value.id}>
                    <ListItem
                      key={value.id}
                      secondaryAction={
                        <Box sx={{ display: 'flex', gap: 2, mr: -1 }}>
                          <Checkbox
                            edge="end"
                            size="medium"
                            onChange={handleToggle(value)}
                            checked={checked.includes(value)}
                            inputProps={{ 'aria-labelledby': labelId }}
                            sx={{ width: '48px', color: '#505050' }}
                          />
                          <IconButton
                            size="large"
                            edge="start"
                            color={'error'}
                            aria-label="delete"
                            onClick={removeTask(value)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                      disablePadding
                    >
                      <ListItemButton onClick={handleClickChange(value)} sx={{ p: 2 }}>
                        <ListItemText
                          id={labelId}
                          primary={
                            <React.Fragment>
                              <Typography
                                fontSize={18}
                                maxWidth={'fit-content'}
                                whiteSpace={'wrap'}
                                color={'#505050'}
                                className={checked.includes(value) ? 'strikethrough' : ''}
                                sx={{ wordWrap: 'break-word' }}
                              >
                                {value.text}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </Fade>
                );
              })}
          </List>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={StyledModal}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Change task
                </Typography>
                <IconButton size="large" edge="start" color="inherit" aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, mt: 1 }}>
                <TextField
                  id="outlined-basic"
                  label="The task for today"
                  defaultValue={change.text}
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                />
                <Box sx={{ display: 'flex', width: '100%', gap: 1, justifyContent: 'end' }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveChange}
                    sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    Change
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                    sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
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
          flexDirection={'column'}
          alignItems="center"
          justifyContent="center"
          borderRadius={1}
          bgcolor={'#FFFFFF'}
        >
          <Typography fontSize={18} fontWeight={500} textAlign={'center'} color={'#505050'}>
            There's nothing to do today! 🎉
          </Typography>
          <Typography fontSize={18} fontWeight={500} textAlign={'center'} color={'#505050'}>
            Use the "New task" button to add tasks. 📝
          </Typography>
        </Box>
      </div>
    );
  }
}
