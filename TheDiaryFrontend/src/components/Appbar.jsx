import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { sideAppBarWidth } from "./SideAppBar";
import { Link } from "react-router-dom";

export default function Appbar({ onMenuClick, sideAppBarOpen, pageTitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const subPages = {
    "/note": [
      { label: "Create New Note", path: "/notes/create" },
    ],
    "/finance": [
      { label: "Log Transaction", path: "/finances/log-transaction" },
    ],
    "/nutrition": [
      { label: "Log Meal", path: "/nutrition/log-meal" },
      { label: "Log Food", path: "/nutrition/log-food" }
    ]
  };

  const currentPath = Object.keys(subPages).find((prefix) =>
    location.pathname.startsWith(prefix)
  );
  const actions = currentPath ? subPages[currentPath] : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "fixed", backgroundColor: "#EBE7E0" }}>
        <Toolbar sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="rgb(0,0,0)">
              <Link
                to={`/${pageTitle.charAt(0).toLowerCase() + pageTitle.slice(1)}`} 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {pageTitle === "The Diary" ? "The Diary" : `The Diary - ${pageTitle}`}
              </Link>
            </Typography>
          </Box>
          {actions && (
            <Box
              sx={{
                justifyContent: "center",
                position: "absolute",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 2,
                transition: "left 0.3s",
                left: sideAppBarOpen
                  ? `calc(50% + ${sideAppBarWidth / 2}px)`
                  : "50%",
              }}
            >
              {actions.map((action) => (
                <Button
                  key={action.label}
                  sx={{ color: "rgb(0,0,0)" }}
                  onClick={() => navigate(action.path)}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
