import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { sideAppBarWidth } from "./SideAppBar";

export default function Appbar({ onMenuClick, sideAppBarOpen, pageTitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const subPages = {
    "/note": [
      { label: "All Notes", path: "/notes" },
      { label: "Create New Note", path: "/notes/create" },
    ],
    "/finance": [
      { label: "Log Transaction", path: "/finances/create" },
    ],
    "/nutrition": [
      { label: "Log Nutrition", path: "/nutrition/create" }
    ]
  }

  const currentPath = location.pathname;
  const currentPage = Object.keys(subPages).find((perfix) =>
    currentPath.startsWith(perfix)
  );
  const actions = currentPage ? subPages[currentPage] : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "fixed", backgroundColor: "#5D7FA3" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Typography variant="h6" component="div" color="rgb(0,0,0)">
              {pageTitle}
            </Typography>
          </Box>

          {actions && (
            <Box sx={{
              pr: 18,
              gap: 1,
              color: "rgb(0,0,0)",
              transition: "margin 0.3s",
              marginLeft: sideAppBarOpen ? `${sideAppBarWidth}px` : 0,
            }}>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  color="rgb(0,0,0)"
                  onClick={() => {
                    if (action.path) {
                      navigate(action.path);
                    }
                  }}
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
