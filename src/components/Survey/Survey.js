import * as React from 'react';
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import './survey.css';

const CASA_CENTRAL = 'Campus Casa Central Valparaíso';
const CAMPUS_SJ = 'Campus Santiago San Joaquín';
const FORMAT = 'Formato: 11111111-1';

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

const SurveyForm = () => {

    const [value, setValueRadio] = React.useState('');

    const [globalReasons, setGlobalReasonCheckbox] = React.useState([
        {id: '1', name: SEF_SECTION_TITLE, isChecked: false},
        {id: '2', name: VOC_SECTION_TITLE, isChecked: false},
        {id: '3', name: RA_TITLE, isChecked: false},
        {id: '4', name: AU_TITLE, isChecked: false},
        {id: '5', name: OTRO_TITLE, isChecked: false}
    ]);

    const [familyEconomicReasons, setFamilyEconomicCheckboxReasons] = React.useState([
        {id: '1', name: 'No seguí estudiando porque no tenía para costear mis estudios', isChecked: false},
        {id: '2', name: 'La lejanía con mi familia complicó mi calidad de estudiante', isChecked: false},
        {id: '3', name: 'Poca flexibilidad académica y de horario para compatibilizar trabajo-estudios', isChecked: false},
        {id: '4', name: 'Poca flexibilidad académica y de horario para compatibilizar estudios-pasatiempos', isChecked: false},
        {id: '5', name: OTRO_TITLE, isChecked: false}
    ]);

    const [vocationalReasons, setVocationalCheckboxReasons] = React.useState([
        {id: '1', name: 'No era mi primera preferencia para estudiar', isChecked: false},
        {id: '2', name: 'No recibí del DI la orientación que esperaba', isChecked: false},
        {id: '3', name: 'El nivel de estrés superaba mis capacidades', isChecked: false},
        {id: '4', name: 'Pensé que la carrera se trataba de otra cosa (pedir precisar)', isChecked: false},
        {id: '5', name: OTRO_TITLE, isChecked: false}
    ]);

    const [firstAcademicReasons, setFirstAcademicCheckboxReasons] = React.useState([
        {id: '1', name: 'Mi formación previa fue muy mala', isChecked: false},
        {id: '2', name: 'No tenía hábitos de estudio', isChecked: false},
        {id: '3', name: 'No iba mucho a clases y ayudantías', isChecked: false},
        {id: '4', name: 'No logré armar un grupo de estudios', isChecked: false},
        {id: '5', name: 'No asistí al CIAC regularmente', isChecked: false},
        {id: '6', name: OTRO_TITLE, isChecked: false}
    ]);

    const [secondAcademicReasons, setSecondAcademicCheckboxReasons] = React.useState([
        {id: '1', name: 'Los profesores no eran muy claros al explicar la materia', isChecked: false},
        {id: '2', name: 'Las clases y las metodologías que se imparten no son de calidad lo que dificulta el aprendizaje', isChecked: false},
        {id: '3', name: 'La exigencia no se compensaba con el nivel de calidad de la educación', isChecked: false},
        {id: '4', name: 'No había preocupación ni apoyo de la USM por los alumnos con problemas', isChecked: false},
        {id: '5', name: 'La coordinación docente fue mala y provocaba problemas de aprendizaje', isChecked: false},
        {id: '6', name: OTRO_TITLE, isChecked: false}
    ]);

    const [atmosphereReasons, setAtmosphereCheckboxReasons] = React.useState([
        {id: '1', name: 'No me sentí parte de la Universidad', isChecked: false},
        {id: '2', name: 'No me sentí parte del Departamento', isChecked: false},
        {id: '3', name: 'Los paros frecuentes no me gustaban', isChecked: false},
        {id: '4', name: 'Mal servicio dentro de la Universidad (pedir detallar)', isChecked: false},
        {id: '5', name: 'Mala infraestructura (pedir detallar)', isChecked: false},
        {id: '6', name: OTRO_TITLE, isChecked: false}
    ]);

    const handleRadioChange = (event) => {
        setValueRadio(event.target.value);
    };

    function handleChangeCheckboxReasons(reasonId, checkedReason) {
        setGlobalReasonCheckbox(globalReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
            }
            return motivo
        }));
    };

    function handleChangeCheckboxFamilyEconomy(reasonId, checkedReason) {
        setFamilyEconomicCheckboxReasons(familyEconomicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return {...motivo, isChecked: checkedReason}
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

    const onSubmitCheckbox = (event) => {
        event.preventDefault();
        console.table(globalReasons);
        console.table(familyEconomicReasons);
        console.table(vocationalReasons);
        console.table(firstAcademicReasons);
        console.table(secondAcademicReasons);
        console.table(atmosphereReasons);
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

    return (
        <Box display='flex' justifyContent='center' sx={{marginTop: '30px'}}>
            <div>
                {/* Inicio de encuesta */}
                <Card className='FirstCard' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                                    <TextField id='apellido_paterno' label='Apellido Paterno' fullWidth required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id='apellido_materno' label='Apellido Materno' fullWidth required />
                                </Grid>
                            </Grid>
                            <Grid container direction={'row'} columnSpacing={5}>
                                <Grid item xs={6}>
                                    <TextField id='rut' label='RUT' helperText={FORMAT} fullWidth required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id='rol' label='Rol USM' helperText={FORMAT} fullWidth required />
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
                    </CardContent>
                </Card>
                {/* Sección de selección de globalReasons */}
                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                    <CardContent>
                        <Typography variant='h3' align='center' > {TITLE} </Typography>
                        <Typography className='cardSubtitle' variant='body2' align='center'> {DESCRIPTION} </Typography>
                        <ColoredLine color='#E0E0E0' />
                        <Paper className='paperTest' elevation={0}>
                            <CheckboxComponent list={globalReasons} onChange={handleChangeCheckboxReasons} />
                        </Paper>
                        <div align='center'>
                            <Button variant='contained' onClick={onSubmitCheckbox}>Guardar</Button>
                        </div>
                    </CardContent>
                </Card>
                {/* Habilitar preguntas dependiendo de las opciones anteriores */}
                <div>
                    {/* Situación Económica y Familiar */}
                    {
                        globalReasons[0].isChecked &&
                        <div>
                            <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                    }
                    {/* Vocacional */}
                    {
                        globalReasons[1].isChecked &&
                        <div>
                            <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                    }
                    {/* Rendimiento Académico */}
                    {
                        globalReasons[2].isChecked &&
                        <div>
                            <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                    }
                    {/* Ambiente Universitario */}
                    {
                        globalReasons[3].isChecked &&
                        <div>
                            <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                    }
                    {/* Otros motivos */}
                    {
                        globalReasons[4].isChecked &&
                        <div>
                            <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
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
                    }
                    <div align='center'>
                        <Button variant='contained' onClick={onSubmitCheckbox}>Submit</Button>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default SurveyForm;