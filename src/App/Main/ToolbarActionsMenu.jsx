import React, { useState } from "react";
import {
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Button,
  Typography,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import userAvatar from "../../assets/userAvatar.jpg";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";


const ToolbarActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [logOutDialog, setLogOutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isSmallScreen = useMediaQuery("(max-width:500px)");


  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  const handleLogOutClick = () => {
    setAnchorEl(null);
    setLogOutDialog(true);
  };

  const handleLogOut = () => {
    setLogOutDialog(false);
    setSnackbar({
      open: true,
      message: "Signed out successfully",
      severity: "success",
    });
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title="Become a Pro member">
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundImage: "linear-gradient(to right, #c31432, #240b36);", cursor: "pointer"
          }}
          borderRadius="1000px"
        >
          <IconButton  className="glowing-box-shadow">
            <SvgIcon viewBox="0 0 24 24" onClick={handleProfileClick}>
              <defs>
                <linearGradient
                  id="goldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f12711" />
                  <stop offset="100%" stopColor="#f5af19" />
                </linearGradient>
              </defs>
              <WorkspacePremiumIcon
                sx={{
                  width: 24,
                  height: 24,
                  fill: "url(#goldGradient)",
                }}
              />
            </SvgIcon>
          </IconButton>
          <Typography fontWeight="bold" pr={isSmallScreen ? "" :"10px"}>
          {!isSmallScreen && "Be a Pro Member"}
          </Typography>
        </Box>
      </Tooltip>
      {/* Profile button */}
      <Tooltip title="My Account">
        <IconButton onClick={handleProfileClick}>
          <Avatar src={userAvatar} alt="Profile" />
        </IconButton>
      </Tooltip>

      {/* Account menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box display="flex" flexDirection="row" px="15px" gap="8px">
          <Avatar src={userAvatar} alt="profile picture avatar" />
          <Box display="flex" flexDirection="column" textAlign="start">
            <Typography fontWeight="bold">John Doe</Typography>
            <Typography fontSize="12px" color="grey">
              Property Owner
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Link to="/profile">
          <MenuItem onClick={handleCloseMenu}>
            <PersonIcon sx={{ mr: 1 }} />
            Profile & Account
          </MenuItem>
        </Link>
        <Link to="/settings">
          <MenuItem onClick={handleCloseMenu}>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
        </Link>
        <Link to="/tenants">
          <MenuItem onClick={handleCloseMenu}>
            <PeopleIcon sx={{ mr: 1 }} />
            Manage Tenants
          </MenuItem>
        </Link>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <MenuItem onClick={handleLogOutClick}>
          <LogoutIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Logout confirmation dialog */}
      <Dialog open={logOutDialog} onClose={() => setLogOutDialog(false)}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Sign out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogOutDialog(false)} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogOut}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ToolbarActionsMenu;
