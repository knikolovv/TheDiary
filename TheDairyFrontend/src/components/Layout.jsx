import { useState } from 'react';
import Appbar from './Appbar';
import SideAppBar, { sideAppBarWidth } from './SideAppBar';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const [sideAppBarOpen, setsideAppBarOpen] = useState(false);
  const location = useLocation();

  const toggleSideAppBar = () => {
    setsideAppBarOpen((prev) => !prev);
  };

  const pageTitleMap = {
    "/finance": "Finances",
    "/note": "Notes",
    "/calendar": "Calendar",
    "/food": "Foods"
  };

  const currentPath = Object.keys(pageTitleMap).find((path) =>
    location.pathname.startsWith(path)
  );

  const pageTitle = pageTitleMap[currentPath] || "The Diary";

  return (
    <div style={{
      height: '100vh',
    }}>
      <Appbar onMenuClick={toggleSideAppBar} sideAppBarOpen={sideAppBarOpen} sideAppBarWidth={`${sideAppBarWidth}px`} pageTitle={pageTitle} />
      <SideAppBar open={sideAppBarOpen} />

      <Box
        component="main"
        sx={{
          transition: 'margin 0.3s',
          marginLeft: sideAppBarOpen ? `${sideAppBarWidth}px` : 0,
          pt: 12,
        }}
      >
        {children}
      </Box>
    </div>
  );
}
