'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import GitIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingLeft: 16,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FFFFFF',
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 32,
    transition: theme.transitions.create('width'),
  },
}));

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

let newTask;
let id = 0;
const handleChange = (event) => {
  newTask = { id: id, text: event.target.value };
  id += 1;
};

export default function AppNavBar({ onClick, onChange }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTask = () => {
    if (newTask !== undefined) {
      onClick(newTask);
      handleClose();
    }
  };

  const handleSearch = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="main" sx={{ boxShadow: 'none' }}>
          <Toolbar>
            <IconButton size="large" edge="start" aria-label="menu" color={'#505050'} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" color={'#505050'} sx={{ flexGrow: 1 }}>
              To-do list
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, m: -1.5 }}>
              <IconButton
                size="large"
                edge="start"
                color={'#505050'}
                aria-label="telegram"
                href="https://t.me/JstUser"
                target="_blank"
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color={'#505050'}
                aria-label="github"
                href="https://github.com/JstUsername/todo-nextjs"
                target="_blank"
              >
                <GitIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <AppBar
          position="static"
          color="secondary"
          sx={{
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Search>
              <SearchIconWrapper sx={{ color: '#505050' }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                sx={{ width: '100%' }}
              />
            </Search>{' '}
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              New task
            </Button>
          </Toolbar>
        </AppBar>
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
              <Typography id="transition-modal-title" variant="h6" component="h2" color={'#505050'}>
                New task
              </Typography>
              <IconButton size="large" edge="start" color={'#505050'} aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, mt: 1 }}>
              <TextField
                id="outlined-basic"
                label="The task for today"
                variant="outlined"
                size="small"
                onChange={handleChange}
                sx={{ width: '100%' }}
              />
              <Box sx={{ display: 'flex', width: '100%', gap: 1, justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleTask}
                  sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  Add
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
}
