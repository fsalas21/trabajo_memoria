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
    const from = location.state?.from?.pathname || '/encuesta-estudiante';

    const codeRef = React.useRef();

    const [code, setCode] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState('');
    const [surveyAnswered] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const [params, setParams] = React.useState(null);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search).get('accessCode');
        setParams(queryParams);
        if (params) {
            setCode(params);
        }
    }, [location.search, params]);

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
        let payload = { 'code': code, 'surveyAnswered': surveyAnswered };

        axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/studentCode",
            payload)
            .then(result => {
                console.log('payload ok', payload);
                console.log('result', result);
                setAuth({ code: result.data.codigoAcceso, surveyAnswered: result.data.answeredSurvey });
                setCode('');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log('payload okn\'t', payload);
                setErrorMsg('Ya se ha respondido una encuesta con el código ingresado o es incorrecto.');
                setOpenAlert(true);
                setCode('');
                window.console.log('No es posible obtener datos con ese código. Error: \n' + error);
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