import { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import theme from '@/app/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { ChangeContext, SetChangeContext, CompleteContext, SetCompleteContext, ChangeTaskContext } from './Context';

export default function ModalChange({ handleClose }) {
  const open = useContext(ChangeContext);
  const setOpen = useContext(SetChangeContext);
  const complete = useContext(CompleteContext);
  const setComplete = useContext(SetCompleteContext);
  const change = useContext(ChangeTaskContext);

  const [changeTask, setChangeTask] = useState('');
  const handleChange = (event) => {
    setChangeTask(event.target.value);
  };

  const handleSaveChange = () => {
    if (changeTask !== change.text && changeTask !== '') {
      setComplete(complete.map((val) => (val.id === change.id ? { id: change.id, text: changeTask } : val)));
    }
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
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
            <IconButton
              size="large"
              edge="start"
              color="primary.dark"
              aria-label="close"
              onClick={() => setOpen(false)}
            >
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
                onClick={() => setOpen(false)}
                sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
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
