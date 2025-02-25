import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import authService from "../services/authService";
import { useSelector } from "react-redux";

const drawerWidth = 240;

function Sidebar() {
  const profileDetails = useSelector((state) => state.profile.profileDetails);

  const navigate = useNavigate();

  const logout = (event) => {
    authService.logout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Box sx={{ width: "100%", height: "auto", p: "20px 20px" }}>
          <img
            src="/tamcherry-logo.png"
            alt="Logo of tamcherry"
            style={{ width: 120, height: "auto" }}
          />
        </Box>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/search">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </List>
      </Box>
      <Box>
        <List>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ListItem button component={Link} to="/user">
              <ListItemIcon>
                <SupervisedUserCircleOutlined />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: "-20px" }}
                primary={
                  profileDetails && profileDetails.name
                    ? profileDetails.name[0]
                    : "User"
                }
              />
            </ListItem>
            <ListItemIcon button onClick={() => logout()}>
              <LogoutOutlined />
            </ListItemIcon>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
