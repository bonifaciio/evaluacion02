import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  CalendarToday,
  LocalHospital,
  Hotel,
  Receipt,
  AccountCircle,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user, logout, hasAnyRole } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
      roles: [
        "ROLE_ADMIN",
        "ROLE_MEDICO",
        "ROLE_RECEPCIONISTA",
        "ROLE_ENFERMERA",
      ],
    },
    {
      text: "Pacientes",
      icon: <People />,
      path: "/pacientes",
      roles: [
        "ROLE_ADMIN",
        "ROLE_MEDICO",
        "ROLE_RECEPCIONISTA",
        "ROLE_ENFERMERA",
      ],
    },
    {
      text: "Citas",
      icon: <CalendarToday />,
      path: "/citas",
      roles: ["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_RECEPCIONISTA"],
    },
    {
      text: "Médicos",
      icon: <LocalHospital />,
      path: "/medicos",
      roles: ["ROLE_ADMIN", "ROLE_RECEPCIONISTA"],
    },
    {
      text: "Consultas",
      icon: <LocalHospital />,
      path: "/consultas",
      roles: ["ROLE_ADMIN", "ROLE_MEDICO"],
    },
    {
      text: "Hospitalizaciones",
      icon: <Hotel />,
      path: "/hospitalizaciones",
      roles: ["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_ENFERMERA"],
    },
    {
      text: "Facturas",
      icon: <Receipt />,
      path: "/facturas",
      roles: ["ROLE_ADMIN", "ROLE_RECEPCIONISTA"],
    },
    {
      text: "Usuarios",
      icon: <AccountCircle />,
      path: "/usuarios",
      roles: ["ROLE_ADMIN"],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              Sistema de Gestión Hospitalaria
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {user?.nombreUsuario?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography textAlign="center">
                    {user?.nombreUsuario} ({user?.rol})
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Toolbar />
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {menuItems
              .filter((item) => hasAnyRole(item.roles))
              .map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
