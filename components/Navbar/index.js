import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import Link from "next/link";

export default function Navbar({ handleDrawerToggle }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            size="large"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lancet Assessment
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}