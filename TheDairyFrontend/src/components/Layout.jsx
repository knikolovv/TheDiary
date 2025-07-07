import { useState } from 'react';
import Appbar from './Appbar';
import SideAppBar, { sideAppBarWidth } from './SideAppBar';
import Box from '@mui/material/Box';

export default function Layout({ children }) {
  const [sideAppBarOpen, setsideAppBarOpen] = useState(false);

  const togglesideAppBar = () => {
    setsideAppBarOpen((prev) => !prev);
  };

  return (
    <>
      <Appbar onMenuClick={togglesideAppBar} />
      <SideAppBar open={sideAppBarOpen} />

      <Box
        component="main"
        sx={{
          transition: 'margin 0.3s',
          marginLeft: sideAppBarOpen ? `${sideAppBarWidth}px` : 0,
          padding: 2,
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </>
  );
}
