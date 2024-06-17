'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWindowSize } from '@react-hook/window-size';
import TaskItem from './TaskItem';
import { styled } from '@mui/material/styles';
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function TaskList({ data, searchQuery }) {
  const [complete, setComplete] = useState(data);
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

  const [change, setChange] = useState('');
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

  const [checked, setChecked] = useState([]);
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

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { width, height } = useWindowSize();
  const [run, setRun] = useState(false);

  if (data.length !== 0) {
    return (
      <div>
        <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
          <List dense sx={{ width: '100%' }} disablePadding>
            {data
              .filter((val) => (searchQuery !== '' ? val.text.toLowerCase().includes(searchQuery.toLowerCase()) : val))
              .map((value) => {
                return (
                  <Fade in={complete} key={value.id}>
                    <TaskItem
                      value={value}
                      handleToggle={handleToggle}
                      checked={checked}
                      handleClickChange={handleClickChange}
                      removeTask={removeTask}
                    />
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
                <CssTextField
                  id="outlined-basic"
                  label="The task for today"
                  defaultValue={change.text}
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

const StyledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  backgroundColor: 'primary.main',
  boxShadow: 24,
  p: 2,
};

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#505050',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#737373',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#737373',
    },
    '&:hover fieldset': {
      borderColor: '#383838',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#505050',
      borderWidth: 1,
    },
  },
});
