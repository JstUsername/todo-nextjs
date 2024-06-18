'use client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

let newTask;
const handleChange = (event) => {
  newTask = { id: new Date().getTime(), text: event.target.value };
};

export default function ModalAdd({ onClick, handleClose, open }) {
  const handleTask = () => {
    if (newTask !== undefined) {
      onClick(newTask);
      handleClose();
    }
  };
  return (
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
        <StyledModal>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="transition-modal-title" variant="h6" component="h2" color="primary.dark">
              New task
            </Typography>
            <IconButton size="large" edge="start" color="primary.dark" aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, mt: 1 }}>
            <CssTextField id="outlined-basic" label="The task for today" size="small" onChange={handleChange} />
            <Box sx={{ display: 'flex', width: '100%', gap: 1, justifyContent: 'end' }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleTask}
                sx={{ color: 'primary.main', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{ color: 'primary.main', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </StyledModal>
      </Fade>
    </Modal>
  );
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
