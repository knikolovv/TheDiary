import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Appbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const subPages = {
    '/note': [
      { label: 'All Notes', path: '/notes' },
      { label: 'Create New Note', path: '/notes/create' },
    ],
  }

  const currentPath = location.pathname;
  const currentPage = Object.keys(subPages).find((perfix) =>
    currentPath.startsWith(perfix)
  );
  const actions = currentPage ? subPages[currentPage] : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Typography variant="h6" component="div">
              THE Diary
            </Typography>
          </Box>

          {actions && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  color="inherit"
                  onClick={() => navigate(action.path)}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
          <Box />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
