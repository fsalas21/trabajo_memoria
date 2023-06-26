import * as React from 'react';
import { Alert, Button, Menu, MenuItem, Snackbar, Stack } from '@mui/material';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ActionButton.css';

const SENT_EMAIL_MESSAGE = 'Se ha reenviado el correo al estudiante.';
const ERROR_SENT_EMAIL_MESSAGE = 'Hubo un problema la enviar el correo.';

const ActionButton = (estudiante) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [sendEmailMsg, setSendEmailMsg] = React.useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function sendEmail(name, code, email) {
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            { to_name: name, message: code, to_email: email },
            process.env.REACT_APP_PUBLIC_KEY)
            .then(result => {
                console.log('result', result);
                console.log('result', result.text);
                // setSendEmailStatus(result.status);
                setSendEmailMsg(SENT_EMAIL_MESSAGE);
            })
            .catch(error => {
                console.log('error', error.text);
                // setSendEmailStatus(error.status);
                setSendEmailMsg(ERROR_SENT_EMAIL_MESSAGE);
            });
    }

    function handleResendMail() {
        const nombres = estudiante.nombre;
        const code = estudiante.codigoAcceso;
        const correo = estudiante.correo;
        sendEmail(nombres, code, correo);
        setAnchorEl(null);
        setOpenAlert(true);
    }

    function handleClose() {
        console.log('params', estudiante);
        setAnchorEl(null);
    };

    function handleSnackClose() {
        setOpenAlert(false);
    }

    function refresh() {
        setTimeout(function () {
            window.location.reload();
        }, 600);
    }

    function handleUpdateStudent() {
        let status = { rut: estudiante.RUT, answeredSurvey: true };
        console.log('Estudiante: ', estudiante);
        console.log('Rut', estudiante.RUT);
        axios.put("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/updateSurveyStatus", status)
            .then(result => {
                console.log('Estado actualizado. Resultado: \n', result);
                refresh();
            })
            .catch(error => {
                console.log('No se ha encontrado un estudiante con ese RUT. Error: \n', error);
            });
        setAnchorEl(null);
    }

    return (
        <Stack>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openAlert}
                onClose={handleSnackClose}
                autoHideDuration={6000}
            >
                <Alert onClose={handleSnackClose} severity="info" sx={{ width: '100%' }}>
                    {sendEmailMsg}
                </Alert>
            </Snackbar>
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
                <MenuItem sx={{ fontSize: 13 }} onClick={handleResendMail} disableRipple>Reenviar Correo</MenuItem>
                <MenuItem sx={{ fontSize: 13 }} onClick={handleUpdateStudent} disableRipple>No desea responder</MenuItem>
                {/* <MenuItem sx={{ fontSize: 13 }} onClick={handleClose} disableRipple>Cerrar Seguimiento</MenuItem> */}
            </Menu>
        </Stack>
    );
};

export default ActionButton;