import { useState } from 'react';
import Appbar from './Appbar';
import SideAppBar, { sideAppBarWidth } from './SideAppBar';
import Box from '@mui/material/Box';

export default function Layout({ children }) {
  const [sideAppBarOpen, setsideAppBarOpen] = useState(false);

  const toggleSideAppBar = () => {
    setsideAppBarOpen((prev) => !prev);
  };

  return (
    <div style={{
      backgroundColor: '#2A2B2E',
      height: '100vh',
    }}>
      <Appbar onMenuClick={toggleSideAppBar} sideAppBarOpen={sideAppBarOpen} sideAppBarWidth={`${sideAppBarWidth}px`} />
      <SideAppBar open={sideAppBarOpen} />

      <Box
        component="main"
        sx={{
          transition: 'margin 0.3s',
          marginLeft: sideAppBarOpen ? `${sideAppBarWidth}px` : 0,
          pt:12,
          backgroundColor: '#2A2B2E',
        }}
      >
        {children}
      </Box>
    </div>
  );
}
