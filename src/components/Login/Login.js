import * as React from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import "./Login.css";

export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    console.log('from', from);
    console.log('location', navigate);

    const codeRef = React.useRef();
    const errRef = React.useRef();

    const [code, setCode] = React.useState("");
    const [surveyAnswered] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');

    React.useEffect(() => {
        codeRef.current.focus();
    }, []);

    React.useEffect(() => {
        setErrMsg('');
    }, [code]);

    function handleChange(e) {
        setCode(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        console.log('Codigo', JSON.stringify({ code }));

        try {
            const response = await axios.post("http://localhost:3030/api/studentCode",
                JSON.stringify({ code, surveyAnswered }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log('Response data', response?.data);
            setAuth({ code });
            setCode('');
            navigate(from, { replace: true });
        } catch (error) {
            console.log('Error', error);
        }
        // axios.post("http://localhost:3030/api/studentCode", JSON.stringify({code, surveyAnswered}), 
        // {
        //     headers: {'Content-Type': 'application/json'},
        //     withCredentials: true
        // })
        // .then(res => {
        //     console.log('res', res.data);
        //     setAuth({ code });
        // })
        // .catch(error => {
        //     window.console.log('Error:', error);
        //     window.console.log('Error response:', error?.response);
        //     setErrMsg(error)
        // })
    }

    return (
        <Container component="main" maxWidth="xs">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
            <Box sx={{ boxShadow: 3, borderRadius: 2, px: 4, py: 6, marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CssBaseline />
                <Typography component="h1" variant="h5">Ingrese código de encuesta</Typography>
                <p></p>
                <Typography className="anonMessage" variant="subtitle2">Para acceder a la encuesta, por favor ingrese el código que recibió por correo.</Typography>
                <Box >
                    <TextField margin="normal" ref={codeRef} id="passCode" label="Código de acceso" value={code} onChange={handleChange} fullWidth required />
                    <Button className="customButton" type="submit" variant="contained" onClick={handleLogin} fullWidth>Ingresar</Button>
                </Box>
            </Box>
        </Container>
    );
}