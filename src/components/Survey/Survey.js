import * as React from 'react';
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import './survey.css';
import Header from '../Header/Header';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const CASA_CENTRAL = 'Campus Casa Central Valparaíso';
const CAMPUS_SJ = 'Campus Santiago San Joaquín';
// const FORMAT = 'Formato: 11111111-1';

const TITLE = 'Principales Motivos de Retiro';
const DESCRIPTION = 'A continuación por favor seleccione las casillas que más se asemejan a su motivo de retiro de la universidad.';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const SEF_QUESTION = '¿Cuál de las siguientes alternativas refleja mejor su problema?';

const VOC_SECTION_TITLE = 'Vocacional';
const VOC_QUESTION = '¿Qué gatilló Su problema vocacional?';

const RA_TITLE = 'Rendimiento Académico';
const RA_FIRST_QUESTION = '¿Cuál(es) de los siguientes problemas enfrentaste en lo personal? (puedes escoger más de una opción)';
const RA_SECOND_QUESTION = 'La Universidad influyó en tus problemas de rendimiento porque…';

const AU_TITLE = 'Ambiente Universitario';
const AU_QUESTION = '¿Cuál de las siguientes alternativas refleja mejor su problema?';


const DETAIL_QUESTION = 'Detalles de su respuesta anterior.'

const OTRO_TITLE = 'Otros motivos';
const OTRO_QUESTION = 'Detalle qué otros motivos lo habrían motivado a dejar la carrera y/o universidad';

const MAX_RUT_WIDTH = 10;
const MAX_ROL_WIDTH = 11;

const SurveyForm = () => {

    const [value, setValueRadio] = React.useState('');

    const [globalReasons, setGlobalReasonCheckbox] = React.useState([
        {id: '1', name: SEF_SECTION_TITLE, isGlobalChecked: false},
        {id: '2', name: VOC_SECTION_TITLE, isGlobalChecked: false},
        {id: '3', name: RA_TITLE, isGlobalChecked: false},
        {id: '4', name: AU_TITLE, isGlobalChecked: false},
        {id: '5', name: OTRO_TITLE, isGlobalChecked: false}
    ]);

    const [familyEconomicReasons, setFamilyEconomicCheckboxReasons] = React.useState([
        {id: '11', name: 'No seguí estudiando porque no tenía para costear mis estudios', isFamilyChecked: false},
        {id: '12', name: 'La lejanía con mi familia complicó mi calidad de estudiante', isFamilyChecked: false},
        {id: '13', name: 'Poca flexibilidad académica y de horario para compatibilizar trabajo-estudios', isFamilyChecked: false},
        {id: '14', name: 'Poca flexibilidad académica y de horario para compatibilizar estudios-pasatiempos', isFamilyChecked: false},
        {id: '15', name: OTRO_TITLE, isFamilyChecked: false}
    ]);

    const [vocationalReasons, setVocationalCheckboxReasons] = React.useState([
        {id: '21', name: 'No era mi primera preferencia para estudiar', isChecked: false},
        {id: '22', name: 'No recibí del DI la orientación que esperaba', isChecked: false},
        {id: '23', name: 'El nivel de estrés superaba mis capacidades', isChecked: false},
        {id: '24', name: 'Pensé que la carrera se trataba de otra cosa (pedir precisar)', isChecked: false},
        {id: '25', name: OTRO_TITLE, isChecked: false}
    ]);

    const [firstAcademicReasons, setFirstAcademicCheckboxReasons] = React.useState([
        {id: '31', name: 'Mi formación previa fue muy mala', isChecked: false},
        {id: '32', name: 'No tenía hábitos de estudio', isChecked: false},
        {id: '33', name: 'No iba mucho a clases y ayudantías', isChecked: false},
        {id: '34', name: 'No logré armar un grupo de estudios', isChecked: false},
        {id: '35', name: 'No asistí al CIAC regularmente', isChecked: false},
        {id: '36', name: OTRO_TITLE, isChecked: false}
    ]);

    const [secondAcademicReasons, setSecondAcademicCheckboxReasons] = React.useState([
        {id: '41', name: 'Los profesores no eran muy claros al explicar la materia', isChecked: false},
        {id: '42', name: 'Las clases y las metodologías que se imparten no son de calidad lo que dificulta el aprendizaje', isChecked: false},
        {id: '43', name: 'La exigencia no se compensaba con el nivel de calidad de la educación', isChecked: false},
        {id: '44', name: 'No había preocupación ni apoyo de la USM por los alumnos con problemas', isChecked: false},
        {id: '45', name: 'La coordinación docente fue mala y provocaba problemas de aprendizaje', isChecked: false},
        {id: '46', name: OTRO_TITLE, isChecked: false}
    ]);

    const [atmosphereReasons, setAtmosphereCheckboxReasons] = React.useState([
        {id: '51', name: 'No me sentí parte de la Universidad', isChecked: false},
        {id: '52', name: 'No me sentí parte del Departamento', isChecked: false},
        {id: '53', name: 'Los paros frecuentes no me gustaban', isChecked: false},
        {id: '54', name: 'Mal servicio dentro de la Universidad (pedir detallar)', isChecked: false},
        {id: '55', name: 'Mala infraestructura (pedir detallar)', isChecked: false},
        {id: '56', name: OTRO_TITLE, isChecked: false}
    ]);


    // ------ Validación de RUT correcto ------
    const [errorRutMessage, setErrorRutMessage] = React.useState(" ");

    const [rut, setRUT] = React.useState("");

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rut.length > MAX_RUT_WIDTH) {
            setErrorRutMessage('RUT contiene más de 9 dígitos.');
        }
        else if (regex.test(rut)) {
            setErrorRutMessage('RUT no debe contener letras o caracteres especiales.')
        }
    }, [rut]);

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rut.length <= MAX_RUT_WIDTH && !(regex.test(rut)) && errorRutMessage) {
            setErrorRutMessage("Formato 12345678-9");
        }
    }, [rut, errorRutMessage]);

    // ------ Validación de Rol correcto ------
    const [errorRolMessage, setErrorRolMessage] = React.useState(" ");

    const [rol, setRol] = React.useState("");

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rol.length > MAX_ROL_WIDTH) {
            setErrorRolMessage('Rol contiene más de 10 dígitos.');
        }
        else if (regex.test(rol)) {
            setErrorRolMessage('Rol no debe contener letras o caracteres especiales.')
        }
    }, [rol]);

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rol.length <= MAX_ROL_WIDTH && !(regex.test(rol)) && errorRolMessage) {
            setErrorRolMessage("Formato 20XX73XXX-X");
        }
    }, [rol, errorRolMessage]);

    // ------ Validacion del nombre y apellido --------

    const handleRadioChange = (event) => {
        setValueRadio(event.target.value);
        event.preventDefault();
    };

    const handleChangeCheckboxReasons = (reasonId, checkedReason) => {
        setGlobalReasonCheckbox(globalReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isGlobalChecked: checkedReason}
            }
            return motivo
        }));

    };

    function handleChangeCheckboxFamilyEconomy(reasonId, checkedReason) {
        setFamilyEconomicCheckboxReasons(familyEconomicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isFamilyChecked: checkedReason}
            }
            return motivo
        }));
    };

    function handleChangeCheckboxVocational(reasonId, checkedReason) {
        setVocationalCheckboxReasons(vocationalReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
            }
            return motivo
        }));
    };

    function handleChangeCheckboxFirstAcademic(reasonId, checkedReason) {
        setFirstAcademicCheckboxReasons(firstAcademicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
            }
            return motivo
        }));
    };

    function handleChangeCheckboxSecondAcademic(reasonId, checkedReason) {
        setSecondAcademicCheckboxReasons(secondAcademicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
            }
            return motivo
        }));
    };

    function handleChangeCheckboxAtmosphere(reasonId, checkedReason) {
        setAtmosphereCheckboxReasons(atmosphereReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
            }
            return motivo
        }));
    };

    const onSubmitGlobalCheckbox = (event) => {
        // event.preventDefault();
        console.log('globalReasons');
        let selectedGlobalReasons = []
        globalReasons.forEach(element => {
            console.log(element);
            if (element.isGlobalChecked) {
                selectedGlobalReasons.push(element.name);
            }
        })
        console.log('globalFiltered:', selectedGlobalReasons);
        console.table(globalReasons);
        // console.log('familyEconomicReasons');
        // console.table(familyEconomicReasons);
        // console.log('vocationalReasons');
        // console.table(vocationalReasons);
        // console.log('firstAcademicReasons');
        // console.table(firstAcademicReasons);
        // console.log('secondAcademicReasons');
        // console.table(secondAcademicReasons);
        // console.log('atmosphereReasons');
        // console.table(atmosphereReasons);
    }

    const onSubmitCheckbox = (event) => {
        console.log('hola');
    }

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const formatRut = (rut) => {
        rut = rut.replace('-', '');
        if (rut.length >= MAX_RUT_WIDTH-1) {
            let notFormattedRut = rut;
            let firstPart = notFormattedRut.substring(0, rut.length - 1);
            let dv = notFormattedRut.substring(rut.length - 1);
            return firstPart + '-' + dv;
        }
        return rut;
    }

    const formatRol = (rol) => {
        rol = rol.replace('-', '');
        if (rol.length >= MAX_ROL_WIDTH-1) {
            let notFormattedRut = rol;
            let firstPart = notFormattedRut.substring(0, rol.length - 1);
            let dv = notFormattedRut.substring(rol.length - 1);
            return firstPart + '-' + dv;
        }
        return rol;
    }

    const handleRUT = (event) => {
        console.log('event', event);
        event.target.value = formatRut(event.target.value);
        setRUT(event.target.value);
    }

    const handleRol = (event) => {
        event.target.value = formatRol(event.target.value);
        setRol(event.target.value);
    }

    // const validateNameLastname = (name) => {
    //     let regex = /[a-zA-Z]/;
    //     return name === null || regex.test(name)
    // }

    return (
        <div className='global-container'>
            <Header></Header>
            <Box display='flex' justifyContent='center' sx={{marginTop: '30px'}}>
                <div>
                    {/* Inicio de encuesta */}
                    <Card className='FirstCard'>
                        <CardContent>
                            <Card className='TitleSection'>
                                <CardContent>
                                        <Typography variant='h2' align='center' > Encuesta Deserción Estudiantil </Typography>
                                        <ColoredLine color='#fdfdfd' />
                                        <Typography variant='body2'> El objetivo de esta encuesta es conocer los globalReasons por los cuales estudiantes del DI se han retirado o abandonado su carrera en los últimos  años, de tal manera de contar con evidencias que permitan definir planes de mejoras para reducir la deserción. <br/> <b>Las respuestas serán completamente anónimas</b>, solo se piden algunos datos para temas de mantención de la base de datos. </Typography>
                                </CardContent>
                            </Card>
                            <br/>
                            <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                                <Grid container direction={'row'} spacing={5}>
                                    <Grid item xs={4}>
                                        <TextField id='nombre' label='Nombre' inputProps={{style: {textTransform: 'capitalize'}}} fullWidth required/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id='apellido_paterno' inputProps={{style: {textTransform: 'capitalize'}}} label='Apellido Paterno' fullWidth required />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id='apellido_materno' inputProps={{style: {textTransform: 'capitalize'}}} label='Apellido Materno' fullWidth required />
                                    </Grid>
                                </Grid>
                                <Grid container direction={'row'} spacing={5}>
                                    <Grid item xs={4}>
                                        <TextField id='anno_ingreso_carrera' label='Año de ingreso a la carrera' inputProps={{style: {textTransform: 'capitalize'}}} fullWidth required/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id='anno_ingreso_universidad' label='Año de ingreso a la universidad' fullWidth required />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id='anno_retiro_universidad' label='Año de retiro a la carrera' fullWidth required />
                                    </Grid>
                                </Grid>
                                <Grid container direction={'row'} columnSpacing={5}>
                                    <Grid item xs={4}>
                                        <TextField id='rut' label='RUT' error={rut.length > MAX_RUT_WIDTH || /[a-zA-Z]/.test(rut) } helperText={errorRutMessage} onChange={handleRUT} fullWidth required />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id='rol' label='Rol USM' error={rol.length > MAX_ROL_WIDTH || /[a-zA-Z]/.test(rol) } helperText={errorRolMessage} onChange={handleRol} fullWidth required />
                                    </Grid>
                                </Grid>
                                <Grid container direction={'row'} justifyContent='center'>
                                    <Grid item xs>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <FormControl>
                                                    <FormLabel id='campus'>Campus al que perteneció</FormLabel>
                                                    <RadioGroup name='campus-group' value={value} onChange={handleRadioChange}>
                                                        <FormControlLabel value={CASA_CENTRAL} control={<Radio />} label={CASA_CENTRAL}/>
                                                        <FormControlLabel value={CAMPUS_SJ} control={<Radio />} label={CAMPUS_SJ}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                            <ColoredLine color='#E0E0E0' />
                        <Card className='GlobalReasons' variant='outlined'>
                            <CardContent>
                                <Typography variant='h3' align='center' > {TITLE} </Typography>
                                <Typography className='cardSubtitle' variant='body2' align='center'> {DESCRIPTION} </Typography>
                                <ColoredLine color='#E0E0E0' />
                                <Paper className='paperTest' elevation={0}>
                                    <CheckboxComponent list={globalReasons} onChange={handleChangeCheckboxReasons} />
                                </Paper>
                                <div align='center'>
                                    <Button variant='outlined' size='small' endIcon={<SaveRoundedIcon />} onClick={onSubmitGlobalCheckbox}>Guardar</Button>
                                </div>
                                <div>
                                    {/* Situación Económica y Familiar */}
                                    {
                                        globalReasons[0].isGlobalChecked ? (
                                            <div>
                                                {/* <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}> */}
                                                <Card variant='outlined'>
                                                    <CardContent>
                                                        <Typography variant='h3' align='center' > {SEF_SECTION_TITLE} </Typography>
                                                        <ColoredLine color='#E0E0E0' />
                                                        <Typography className='cardSubtitle' variant='body'>{ SEF_QUESTION }</Typography>
                                                        <Paper className='paperTest' elevation={0}>
                                                            <CheckboxComponent list={familyEconomicReasons} onChange={handleChangeCheckboxFamilyEconomy} />
                                                        </Paper>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {/* Vocacional */}
                                    {
                                        globalReasons[1].isGlobalChecked ? (
                                        <div>
                                            <Card variant='outlined'>
                                                <CardContent>
                                                    <Typography variant='h3' align='center' > {VOC_SECTION_TITLE} </Typography>
                                                    <ColoredLine color='#E0E0E0' />
                                                    <Typography className='cardSubtitle' variant='body'>{ VOC_QUESTION }</Typography>
                                                    <Paper className='paperTest' elevation={0}>
                                                        <CheckboxComponent list={vocationalReasons} onChange={handleChangeCheckboxVocational} />
                                                    </Paper>
                                                    {   vocationalReasons[3].isChecked &&
                                                        <div>
                                                            <ColoredLine color='#E0E0E0' />
                                                            <Typography className='cardSubtitle' variant='body'>{ DETAIL_QUESTION }</Typography>
                                                            <Paper className='paperTest' elevation={0}>
                                                                <TextField
                                                                    sx={{'& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#E0E0E0'}, '&:hover fieldset': {borderColor: '#E0E0E0'}, '&.Mui-focused fieldset': {
                                                                        border: '1px solid #E0E0E0'} }}}
                                                                    multiline
                                                                    fullWidth
                                                                    rows={3}
                                                                    id="filled-textarea"
                                                                />
                                                            </Paper>
                                                        </div>
                                                    }
                                                </CardContent>
                                            </Card>
                                        </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {/* Rendimiento Académico */}
                                    {
                                        globalReasons[2].isGlobalChecked ? (
                                            <div>
                                                <Card variant='outlined'>
                                                    <CardContent>
                                                        <Typography variant='h3' align='center' > { RA_TITLE } </Typography>
                                                        <ColoredLine color='#E0E0E0' />
                                                        <Typography className='cardSubtitle' variant='body'>{ RA_FIRST_QUESTION }</Typography>
                                                        <Paper className='paperTest' elevation={0}>
                                                            <CheckboxComponent list={firstAcademicReasons} onChange={handleChangeCheckboxFirstAcademic} />
                                                        </Paper>
                                                        <ColoredLine color='#E0E0E0' />
                                                        <Typography className='cardSubtitle' variant='body'>{ RA_SECOND_QUESTION }</Typography>
                                                        <Paper className='paperTest' elevation={0}>
                                                            <CheckboxComponent list={secondAcademicReasons} onChange={handleChangeCheckboxSecondAcademic} />
                                                        </Paper>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {/* Ambiente Universitario */}
                                    {
                                        globalReasons[3].isGlobalChecked ? (
                                            <div>
                                                <Card variant='outlined'>
                                                    <CardContent>
                                                        <Typography variant='h3' align='center' > { AU_TITLE } </Typography>
                                                        <ColoredLine color='#E0E0E0' />
                                                        <Typography className='cardSubtitle' variant='body'>{ AU_QUESTION }</Typography>
                                                        <Paper className='paperTest' elevation={0}>
                                                            <CheckboxComponent list={atmosphereReasons} onChange={handleChangeCheckboxAtmosphere} />
                                                        </Paper>
                                                        {
                                                            (atmosphereReasons[3].isChecked ||
                                                            atmosphereReasons[4].isChecked ||
                                                            atmosphereReasons[5].isChecked ) &&
                                                            <div>
                                                                <ColoredLine color='#E0E0E0' />
                                                                <Typography className='cardSubtitle' variant='body'>{ DETAIL_QUESTION }</Typography>
                                                                <Paper className='paperTest' elevation={0}>
                                                                    <TextField
                                                                        sx={{'& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#E0E0E0'}, '&:hover fieldset': {borderColor: '#E0E0E0'}, '&.Mui-focused fieldset': {
                                                                            border: '1px solid #E0E0E0'} }}}
                                                                        multiline
                                                                        fullWidth
                                                                        rows={3}
                                                                        id="filled-textarea"
                                                                    />
                                                                </Paper>
                                                            </div>
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {/* Otros motivos */}
                                    {
                                        globalReasons[4].isGlobalChecked ? (
                                            <div>
                                                <Card variant='outlined'>
                                                    <CardContent>
                                                        <Typography variant='h3' align='center' > {OTRO_TITLE} </Typography>
                                                        <ColoredLine color='#E0E0E0' />
                                                        <Typography className='cardSubtitle' variant='body'>{ OTRO_QUESTION }</Typography>
                                                        <Paper className='paperTest' elevation={0}>
                                                            <TextField
                                                                sx={{'& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#E0E0E0'}, '&:hover fieldset': {borderColor: '#E0E0E0'}, '&.Mui-focused fieldset': {
                                                                    border: '1px solid #E0E0E0'} }}}
                                                                multiline
                                                                fullWidth
                                                                rows={3}
                                                                id="filled-textarea"
                                                            />
                                                        </Paper>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='footer-section' elevation={0}>
                            <CardContent>
                                <div align='center'>
                                    <Button variant='contained' size='large' onClick={onSubmitCheckbox}>Submit</Button>
                                </div>
                            </CardContent>
                        </Card>


                        </CardContent>
                    </Card>
                    {/* Sección de selección de globalReasons */}
                    {/* Habilitar preguntas dependiendo de las opciones anteriores */}
                </div>
            </Box>
        </div>
    );
}

export default SurveyForm;