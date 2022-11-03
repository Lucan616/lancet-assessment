import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Drawer, Toolbar } from "@mui/material";
import Navbar from "../Navbar";
import PatientsDrawerContent from "../PatientsDrawerContent";

/*
  TODO: 

  - improve responsiveness of drawer for mobile
*/

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
  }

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex' }}>
        {/* DRAWER */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <PatientsDrawerContent />
            </Box>
          </Drawer>
        </Box>
        {/* MAIN SECTION */}
        <Main 
          open={open}
        >
          <Toolbar />
          {children}
        </Main>
      </Box>
    </>
  )
}