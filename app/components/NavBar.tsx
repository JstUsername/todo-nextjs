import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
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
import theme from '../theme';

export default function AppNavBar() {
  const dispatch = useDispatch();

  const handleSearch = debounce((event) => {
    dispatch({ type: 'CHANGE_SEARCH', payload: event.target.value });
  }, 500);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" sx={{ boxShadow: 'none' }}>
          <Toolbar>
            <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: theme.palette.primary.dark }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" color="primary.dark" sx={{ flexGrow: 1 }}>
              To-do list
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, m: -1.5 }}>
              <IconButton
                size="large"
                edge="start"
                aria-label="telegram"
                href="https://t.me/JstUser"
                target="_blank"
                sx={{ color: theme.palette.primary.dark }}
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                aria-label="github"
                href="https://github.com/JstUsername/todo-nextjs"
                target="_blank"
                sx={{ color: theme.palette.primary.dark }}
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
            <Search theme={theme}>
              <SearchIconWrapper theme={theme}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                theme={theme}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                theme={theme}
                sx={{ width: '100%' }}
              />
            </Search>
            <Button
              variant="contained"
              color="success"
              onClick={() => dispatch({ type: 'OPEN_ADD' })}
              sx={{ color: 'primary.main', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              New task
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

const Search = styled('div')`
  position: relative;
  padding-left: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.primary.main};
  width: 100%;
`;

const SearchIconWrapper = styled('div')`
  height: 100%;
  position: absolute;
  display: flex;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.palette.primary.dark};
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  & .MuiInputBase-input {
    padding: ${(props) => props.theme.spacing(1, 1, 1, 0)};
    padding-left: 32px;
    transition: ${(props) => props.theme.transitions.create('width')};
  }
`;
