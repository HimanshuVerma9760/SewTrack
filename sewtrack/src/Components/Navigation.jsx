import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  CssBaseline,
  Box,
  Skeleton,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Grid2,
  Typography,
  Button,
  Alert,
  ImageListItem,
  IconButton,
  Tooltip,
  MenuItem,
  Menu,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  Create,
  Dashboard,
  FormatAlignCenter,
  GroupAdd,
  ListAlt,
  ListAltOutlined,
  ListAltRounded,
  LocalHospital,
  Logout,
  Notes,
  Person,
} from "@mui/icons-material";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
// import useAuth from "../../util/useAuth";
import { deepOrange, indigo } from "@mui/material/colors";
// import ModalContent from "../Modal/ModalContent";
import { motion } from "motion/react";
// import { useQuery } from "@tanstack/react-query";
// import { getUser, queryClient } from "../../util/http";
import toast, { Toaster } from "react-hot-toast";
const Conn = import.meta.env.VITE_CONN_URI;

const drawerWidth = 240;

export default function Navigation() {
  //   const [isVerified, setIsVerified] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  //   const [profilePicture, setProfilePicture] = useState(null);
  //   const { user } = useRouteLoaderData("rootUser");
  const navigation = useNavigation();
  const nav = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePrompt = () => {
    setAnchorEl(null);
  };
  //   const {
  //     data: profilePicturePath,
  //     isPending,
  //     isError,
  //     error,
  //   } = useQuery({
  //     queryKey: ["get-user", { userId: user.userId }],
  //     queryFn: () => getUser({ userId: user.userId }),
  //   });

  //   const isAdmin = useRef(false);

  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }
  //   function handleClose() {
  //     // queryClient.invalidateQueries({
  //     //   queryKey: ["get-user", { userId: user.userId }],
  //     // });
  //     // setShowPrompt(false);
  //   }
  //   if (showPrompt) {
  //     return (
  //       <ModalContent
  //         type="fileUpload"
  //         isOpen={showPrompt}
  //         onClose={handleClose}
  //         message={{
  //           message: "Select picture",
  //           caption: "Select your profile picture",
  //         }}
  //       />
  //     );
  //   }
  //   if (!user) {
  //     return (
  //       <Skeleton
  //         variant="rectangular"
  //         width={300}
  //         height={500}
  //         sx={{ borderRadius: "10px" }}
  //       />
  //     );
  //   } else {
  //     if (user.role === "Admin" || user.role === "Super-Admin")
  //       isAdmin.current = true;
  //   }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <ImageListItem sx={{ paddingBottom: "1.5rem", paddingTop: "0.2rem" }}>
          <img
            style={{ height: "4.5em", width: "4.8rem", margin: "auto" }}
            loading="lazy"
            src="/SewTrack.png"
            alt="hospital"
          />
        </ImageListItem>
        <Typography
          variant="h6"
          fontWeight="bold"
          paddingLeft="20px"
          marginBottom="14px"
          marginTop="14px"
        >
          Main menu
        </Typography>
        <List
          sx={{
            paddingLeft: "1rem",
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="dashboard"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                style={{ display: "flex", gap: "2rem" }}
                sx={
                  nav.pathname.split("/")[1] === "dashboard" && {
                    backgroundColor: "whitesmoke",
                  }
                }
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  <Dashboard />
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Dashboard
                </Typography>
              </ListItemButton>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="customers"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                style={{ display: "flex", gap: "2rem" }}
                sx={
                  nav.pathname.split("/")[1] === "customers" && {
                    backgroundColor: "whitesmoke",
                  }
                }
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  <GroupAdd />
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Customers
                </Typography>
              </ListItemButton>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              to="/appointments"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                style={{ display: "flex", gap: "2rem" }}
                sx={
                  nav.pathname.split("/")[1] === "appointments" && {
                    backgroundColor: "whitesmoke",
                  }
                }
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  <ListAlt />
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Appointments
                </Typography>
              </ListItemButton>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ListItemButton
              sx={{ display: "flex", gap: "2rem" }}
              onClick={logoutHandler}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                <Logout />
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Logout
              </Typography>
            </ListItemButton>
          </motion.div>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid2
          display="flex"
          justifyContent="space-between"
          sx={{
            backgroundColor: indigo[300],
            color: "white",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ alignSelf: "center" }}
          >
            Sew Track
          </Typography>
          <Tooltip title="Change profile picture">
            <IconButton onClick={handleClick}>
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                src={"any"}
              >
                B
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClosePrompt}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Toaster />
            <MenuItem
              onClick={() => {
                setShowPrompt(true);
                handleClosePrompt();
              }}
            >
              Change Profile Picture
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClosePrompt();
                navigate("/users/profile");
              }}
            >
              View Profile
            </MenuItem>
          </Menu>
        </Grid2>
        <Box sx={{ p: 3, marginTop: "0.5rem", overflow: "hidden" }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.4,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            {navigation.state === "loading" ? (
              <Grid2 display="flex" justifyContent="center">
                <CircularProgress />
              </Grid2>
            ) : (
              <Outlet />
            )}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
