import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const { isAuthenticated, signout } = useContext(AuthContext)

  const menuOptions = [
    { label: "Home", path: "/discover" },
    { label: "Favorites", path: "/movies/favorites", auth: true },
    { label: "Watchlist", path: "/movies/watchlist", auth: true },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Trending This Week", path: "/movies/trending/this-week" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Profile", path: "/users/profile", auth: true },
    { label: "Login", path: "/users/login", guest: true},
    { label: "Sign Up", path: "/users/signup", guest: true}
  ];

  const filteredMenu = menuOptions.filter(opt => {
  if (isAuthenticated && opt.guest) return false;
  if (!isAuthenticated && opt.auth) return false;
  return true;
  })

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{backgroundColor: "#3f5737"}}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }} >
            TMDB Client
          </Typography>
            {isMobile ? (
              <>
                <IconButton 
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu 
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {filteredMenu.map((opt) => (
                    <MenuItem 
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                    {isAuthenticated && (
                      <MenuItem color="inherit" onClick={() => { signout(); navigate('/'); }}>
                        Sign out
                      </MenuItem>
                    )}
                </Menu>
              </>
            ) : (
              <>
                {filteredMenu.map((opt) => (
                  <Button 
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                {isAuthenticated && (
                  <Button color="inherit" onClick={() => { signout(); navigate('/'); }}>
                    Sign out
                  </Button>
                )}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
