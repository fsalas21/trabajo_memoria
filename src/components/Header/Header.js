import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Header() {

    const pages = ['Inicio', 'Seguimiento', 'Encuesta'];
    // const pageDict = {
    //     Inicio: '/',
    //     Seguimiento: '/seguimiento',
    //     Encuesta: '/encuesta'
    // };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogOut = () => {
        setAnchorElUser(null);
    };


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
                                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', borderColor: 'white' }} variant='outlined'>
                                {page}
                                </Button>
                            )
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, '& button': { m: 1 } }} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleLogOut} sx={{ my: 2, color: 'white', display: 'block', bgcolor: 'red', fontSize: 14,  ':hover': { bgcolor: '#B30000' } }} variant='contained'>Cerrar Sesión</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;