// src/components/NavBar.js
import React, { useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '../asset/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authProvider.jsx';

function NavBar() {
    const navigate = useNavigate();
    const { isAdminLogin, isUserLogin ,username,loginAdmin,logoutAdmin,logoutUser,loginUser} = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleLogout=()=>{
        logoutAdmin();
        logoutUser();
        localStorage.removeItem('token');
      }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const url = process.env.REACT_APP_url;
    console.log(url);
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignup = ()=>{
        navigate('/signup');
    }

    const handleProfile=()=>{
        navigate('/profile');
    }

    const handleLogin = () => {
        navigate('/Login');
    };

    const handleProblem = ()=>{
        navigate('/Problem');
    };
    const handleAdd = ()=>{
        navigate('/addProblem');
    };

    return (
        <AppBar className='nav' position="static" sx={{ bgcolor: '#8e05ff' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CODING JUDGE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem sx={{ display: isUserLogin || isAdminLogin ? 'flex' : 'none' }} className='menuitem'>
                                <Typography textAlign="center">Explore</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleProblem} className='menuitem'>
                                <Typography sx={{ display: isUserLogin || isAdminLogin ? 'flex' : 'none' }}  textAlign="center">Problems</Typography>
                            </MenuItem>
                            <MenuItem sx={{ display: isUserLogin ? 'flex' : 'none' }} className='menuitem'>
                                <Typography textAlign="center">Contest</Typography>
                            </MenuItem>
                            <MenuItem sx={{ display: !isUserLogin && !isAdminLogin ? 'flex' : 'none' }} onClick={handleLogin} className='menuitem'>
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleSignup} sx={{ display: !isUserLogin && !isAdminLogin ? 'flex' : 'none' }} className='menuitem'>
                                <Typography textAlign="center">Signup</Typography>
                            </MenuItem>
                            <MenuItem sx={{ display: isAdminLogin ? 'flex' : 'none' }} onClick={handleAdd} className='menuitem'>
                                <Typography textAlign="center">Add Problem</Typography>
                            </MenuItem>
                            <MenuItem sx={{ display: isAdminLogin ? 'flex' : 'none' }} className='menuitem'>
                                <Typography textAlign="center">Create contest</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon className='icon' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CODING JUDGE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: isUserLogin || isAdminLogin ? 'block' : 'none' }}
                            className='menuitem'
                            onClick={()=>{navigate('/')}}
                        >
                            Explore
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: isUserLogin || isAdminLogin ? 'block' : 'none' }}
                            className='menuitem'
                            onClick={handleProblem}
                        >
                            Problems
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: isUserLogin ? 'block' : 'none' }}
                            className='menuitem'
                        >
                            Contest
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: !isUserLogin && !isAdminLogin ? 'block' : 'none' }}
                            className='menuitem'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={handleSignup}
                            sx={{ my: 2, color: 'white', display: !isUserLogin && !isAdminLogin ? 'block' : 'none' }}
                            className='menuitem'
                        >
                            Signup
                        </Button>
                        <Button
                        onClick={handleAdd}
                            sx={{ my: 2, color: 'white', display: isAdminLogin ? 'block' : 'none' }}
                            className='menuitem'
                        >
                            Add Problem
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: isAdminLogin? 'block' : 'none' }}
                            className='menuitem'
                        >
                            Create contest
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleProfile}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
