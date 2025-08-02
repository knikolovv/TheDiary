import React from "react";
import { Drawer, Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sideAppBarWidth = 240;

export default function SideAppBar({ open }) {
    const navigate = useNavigate();

    const menuItems = [
        { text: "Calendar", path: "/calendar" },
        { text: "Finances", path: "/finances" },
        { text: "Nutrition", path: "/nutrition" },
        { text: "Notes", path: "/notes" },
    ];

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: sideAppBarWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sideAppBarWidth,
                    boxSizing: "border-box",
                    top: "64px",
                    backgroundColor:"#EBE7E0"
                },
            }}
        >
            <Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemText primary={
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: 500,
                                    }}>
                                    {item.text}
                                </Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export { sideAppBarWidth };
