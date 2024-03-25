import * as React from 'react';
import { Box, Button, Container, CssBaseline, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import "./Login.css";
import Header from '../Header/Header';

export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const codeRef = React.useRef();

    const [correo, setCorreo] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState('');
    const [activo] = React.useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);

    const [params, setParams] = React.useState(null);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search).get('accessCode');
        setParams(queryParams);
        if (params) {
            setCorreo(params);
        }
    }, [location.search, params]);

    React.useEffect(() => {
        codeRef.current.focus();
    }, []);

    function handleChange(e) {
        setCorreo(e.target.value);
    }

    function handleClose() {
        setOpenAlert(false);
    }

    function handleKeyDown(event) {
        // console.log('event key', event.key);
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        let payload = { 'correo': correo, 'activo': activo };

        axios.post("/allowedUsers", payload)
            .then(result => {
                // console.log('payload ok', payload);
                // console.log('result', result);
                setAuth({ correo: result.data.codigoAcceso, activo: result.data.answeredSurvey });
                setCorreo('');
                navigate(from, { replace: true });
            })
            .catch(error => {
                // console.log('payload okn\'t', payload);
                // console.log('payload string', JSON.stringify(payload));
                setErrorMsg('Correo de usuario no encontrado.');
                setOpenAlert(true);
                setCorreo('');
                window.console.log('No es posible obtener datos con ese código. Error: \n' + error);
            });
    }

    return (
        <Stack>
            <Header />
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openAlert}
                message={errorMsg}
                onClose={handleClose}
                autoHideDuration={3000}
            />
            <Container component="main" maxWidth="xs">
                <Box sx={{ boxShadow: 3, borderRadius: 2, px: 4, py: 6, marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5">Ingrese su correo de carrera</Typography>
                    <p></p>
                    <Typography className="anonMessage" variant="subtitle2">Cada usuario tiene un cargo distinto lo cual le permitirá acceder a cierta información.</Typography>
                    <Box >
                        <TextField margin="normal" ref={codeRef} id="passCode" label="Correo" value={correo} onChange={handleChange} onKeyDown={handleKeyDown} fullWidth required />
                        <Button className="customButton" type="submit" variant="contained" onClick={handleLogin} fullWidth>Ingresar</Button>
                    </Box>
                </Box>
            </Container>
        </Stack>
    );
}