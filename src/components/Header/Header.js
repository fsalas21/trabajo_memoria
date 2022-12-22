import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Header() {

    const pages = ['Inicio', 'Seguimiento', 'Encuesta'];
    // const pageDict = {
    //     Inicio: '/',
    //     Seguimiento: '/seguimiento',
    //     Encuesta: '/encuesta'
    // };
    const settings = ['Cerrar Sesión'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // console.log(
    //     Object.entries(pageDict).map(
    //         ([key, value]) => `My key is ${key} and my value is ${value}`
    //     )
    // )

    return (
        <AppBar position='static' sx={{ bgcolor: '#00498A' }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none'} }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>{page}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, '& button': { m: 1 } }}>
                        {pages.map((page) => {
                            console.log(page);
                            return (
                                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} variant='outlined'>
                                {page}
                                </Button>
                            )
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Configuración'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: 'inherit' }}>
                                    <AccountCircleRoundedIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center'>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;