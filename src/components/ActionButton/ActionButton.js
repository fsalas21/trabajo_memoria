import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import {styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import './ActionButton.css'

const ActionButton = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                className='actionButton'
                size='medium'
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >Opciones</Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem sx={{ fontSize: 15 }} onClick={handleClose} disableRipple>Reenviar Correo</MenuItem>
                <MenuItem sx={{ fontSize: 15 }} onClick={handleClose} disableRipple>No desea responder</MenuItem>
                <MenuItem sx={{ fontSize: 15 }} onClick={handleClose} disableRipple>Cerrar Seguimiento</MenuItem>
            </Menu>
        </div>
    )
}

export default ActionButton;