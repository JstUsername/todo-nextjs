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
import theme from '@/app/theme';
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function TaskList({ complete, setComplete, searchQuery }) {
  const removeTask = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex !== -1) {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
    const newComplete = complete.filter((val) => val !== value);
    setComplete(newComplete);
    if (newComplete.length === 0) {
      setRun(true);
    }
  };

  const [change, setChange] = useState('');
  const handleClickChange = (value) => () => {
    const currentIndex = complete.indexOf(value);
    setChange(complete[currentIndex]);
    setOpen(true);
  };

  const [changeTask, setChangeTask] = useState('');
  const handleChange = (event) => {
    setChangeTask(event.target.value);
  };

  const handleSaveChange = () => {
    if (changeTask !== change && changeTask !== undefined) {
      setComplete(complete.map((val) => (val.id === change.id ? { id: change.id, text: changeTask } : val)));
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

  if (complete.length !== 0) {
    return (
      <div>
        <Box m={3} display="flex" alignItems="center" borderRadius={1} bgcolor={'#FFFFFF'}>
          <List dense sx={{ width: '100%' }} disablePadding>
            {complete
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
            <StyledModal theme={theme}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="transition-modal-title" variant="h6" component="h2" color="primary.dark">
                  Change task
                </Typography>
                <IconButton size="large" edge="start" color="primary.dark" aria-label="close" onClick={handleClose}>
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
            </StyledModal>
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

const StyledModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${(props) => props.theme.palette.primary.main};
  box-shadow:
    0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12);
  padding: 16px;
`;

const CssTextField = styled(TextField)`
  width: 100%;
  & label.Mui-focused {
    color: #505050;
  },
  & .MuiInput-underline:after {
    border-bottom-color: #737373;
  },
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #737373;
    },
    &:hover fieldset {
      border-color: #383838;
    },
    &.Mui-focused fieldset {
      border-color: #505050;
      border-width: 1px;
    },
  },
`;
