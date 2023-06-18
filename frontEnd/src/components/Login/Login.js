import * as React from 'react';
import { Box, Button, Container, CssBaseline, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import "./Login.css";

export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const codeRef = React.useRef();

    const [code, setCode] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState('');
    const [surveyAnswered] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    React.useEffect(() => {
        codeRef.current.focus();
    }, []);

    function handleChange(e) {
        setCode(e.target.value);
    }

    function handleClose() {
        setOpenAlert(false);
    }

    function handleKeyDown(event) {
        console.log('event key', event.key);
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    }

    function handleLogin(e) {
        e.preventDefault();

        axios.post("http://localhost:3030/api/studentCode",
            JSON.stringify({ code, surveyAnswered }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(result => {
            console.log('result', result);
            setAuth({ code: result.data.codigoAcceso, surveyAnswered: result.data.answeredSurvey });
            setCode('');
            navigate(from, { replace: true });
        }).catch(error => {
            setErrorMsg('Ya se ha respondido una encuesta con el código ingresado o es incorrecto.');
            setOpenAlert(true);
            setCode('');
            window.console.log('No es posible obtener datos con ese código. Error: ' + error);
        });
    }

    return (
        <Stack>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAlert}
                message={errorMsg}
                onClose={handleClose}
                autoHideDuration={3000}
            />
            <Container component="main" maxWidth="xs">
                <Box sx={{ boxShadow: 3, borderRadius: 2, px: 4, py: 6, marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5">Ingrese código de encuesta</Typography>
                    <p></p>
                    <Typography className="anonMessage" variant="subtitle2">Para acceder a la encuesta, por favor ingrese el código que recibió por correo.</Typography>
                    <Box >
                        <TextField margin="normal" ref={codeRef} id="passCode" label="Código de acceso" value={code} onChange={handleChange} onKeyDown={handleKeyDown} fullWidth required />
                        <Button className="customButton" type="submit" variant="contained" onClick={handleLogin} fullWidth>Ingresar</Button>
                    </Box>
                </Box>
            </Container>
        </Stack>
    );
}