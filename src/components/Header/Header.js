import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css'

export default function Header() {

    const pageDict = [
        {id: 0, Name: 'Inicio', Url: '/'},
        {id: 1, Name: 'Seguimiento', Url: '/seguimiento'},
        {id: 2, Name: 'Encuesta', Url: '/encuesta-estudiante'}
    ];

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
                        <IconButton size='large' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
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
                            >   {pageDict.map((page) => (
                                <MenuItem key={page.Name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{page.Name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, '& button': { m: 1 } }}>
                        {pageDict.map((page) => {
                            return (
                                <Link href={page.Url} key={page.id}  underline='none'>
                                    <Button className='headerButton' key={page.id} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', borderColor: 'white', borderWidth: '2px' }} size='large' variant='outlined'>
                                        {page.Name}
                                    </Button>
                                </Link>
                            )
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, '& button': { m: 1 } }} display='flex' justifyContent='flex-end'>
                        <Button className='headerButton' onClick={handleLogOut} sx={{ my: 2, color: 'white', display: 'block', bgcolor: 'red', fontSize: 14,  ':hover': { bgcolor: '#B30000' } }} variant='contained'>Cerrar Sesión</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}