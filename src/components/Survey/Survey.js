import { Box, Button, Card, CardContent, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import * as React from 'react';
import "./survey.css";

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
const AU_DETAIL_QUESTION = 'Detalles de su respuesta anterior.'

const OTRO_TITLE = 'Otros motivos';
const OTRO_QUESTION = 'Detalle qué otros motivos lo habrían motivado a dejar la carrera y/o universidad';

const SurveyForm = () => {

    const [value, setValueRadio] = React.useState('');

    const [stateReasons, setValueCheckboxReasons] = React.useState({
        SEF : false,
        VOC : false,
        RA : false,
        AU : false,
        otro : false
    });

    const { SEF, VOC, RA, AU, otro } = stateReasons;

    const handleRadioChange = (event) => {
        setValueRadio(event.target.value);
        console.log(event.target.value);
    };

    const handleChangeCheckboxReasons = (event) => {
        setValueCheckboxReasons({
            ...stateReasons,
            [event.target.name]: event.target.checked,
        });
    };

    const onSubmitCheckbox = (event) => {
        event.preventDefault();
        console.table(stateReasons);
    }

    return (
        <Box display='flex' justifyContent='center'>
            <div>
                {/* Inicio de encuesta */}
                <Card sx={{ minWidth: 275, maxWidth: 1000 }}>
                    <CardContent>
                        <Typography variant='h2' align='center' > Encuesta Deserción Estudiantil </Typography>
                        <Typography><br/></Typography>
                        <Typography variant='body2'> El objetivo de esta encuesta es conocer los motivos por los cuales estudiantes del DI se han retirado o abandonado su carrera en los últimos  años, de tal manera de contar con evidencias que permitan definir planes de mejoras para reducir la deserción. <br/> <b>Las respuestas serán completamente anónimas</b>, solo se piden algunos datos para temas de mantención de la base de datos. </Typography>
                        <br/>
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
                                            <FormControl variant='outlined'>
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
                {/* Sección de selección de motivos */}
                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                    <CardContent>
                        <Typography variant='h2' align='center' > {TITLE} </Typography>
                        <Typography><br/></Typography>
                        <Typography variant='body2'> {DESCRIPTION} </Typography>
                    </CardContent>
                </Card>
                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                    <CardContent>
                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                            <FormLabel component='legend'>Seleccione al menos una opción.</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox checked={SEF} onChange={handleChangeCheckboxReasons} name='SEF' />
                                } label='Situación Económica y Familiar' />
                                <FormControlLabel control={
                                    <Checkbox checked={VOC} onChange={handleChangeCheckboxReasons} name='VOC' />
                                } label='Vocacional' />
                                <FormControlLabel control={
                                    <Checkbox checked={RA} onChange={handleChangeCheckboxReasons} name='RA' />
                                } label='Rendimiento Académico' />
                                <FormControlLabel control={
                                    <Checkbox checked={AU} onChange={handleChangeCheckboxReasons} name='AU' />
                                } label='Ambiente Universitario' />
                                <FormControlLabel control={
                                    <Checkbox checked={otro} onChange={handleChangeCheckboxReasons} name='otro' />
                                } label='Otro (Terminar formulario)' />
                            </FormGroup>
                        </FormControl>
                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                Submit
                        </Button>
                    </CardContent>
                </Card>
                {/* Habilitar preguntas dependiendo de las opciones anteriores */}
                {
                    stateReasons['SEF'] &&
                    <div>
                        <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                            <CardContent>
                                <Typography variant='h2' align='center' > {SEF_SECTION_TITLE} </Typography>
                                <Typography><br/></Typography>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ SEF_QUESTION }</FormLabel>
                                            {/* <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SEC} onChange={handleChangeCheckbox} name='SEC' />
                                                } label='Situación Económica y Familiar' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={VOC} onChange={handleChangeCheckbox} name='VOC' />
                                                } label='Vocacional' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={RA} onChange={handleChangeCheckbox} name='RA' />
                                                } label='Rendimiento Académico' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={AU} onChange={handleChangeCheckbox} name='AU' />
                                                } label='Ambiente Universitario' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={otro} onChange={handleChangeCheckbox} name='otro' />
                                                } label='Otro (Terminar formulario)' />
                                            </FormGroup> */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                }
                {
                    stateReasons['VOC'] &&
                    <div>
                        <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                            <CardContent>
                                <Typography variant='h2' align='center' > {VOC_SECTION_TITLE} </Typography>
                                <Typography><br/></Typography>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ VOC_QUESTION }</FormLabel>
                                            {/* <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SEC} onChange={handleChangeCheckbox} name='SEC' />
                                                } label='Situación Económica y Familiar' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={VOC} onChange={handleChangeCheckbox} name='VOC' />
                                                } label='Vocacional' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={RA} onChange={handleChangeCheckbox} name='RA' />
                                                } label='Rendimiento Académico' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={AU} onChange={handleChangeCheckbox} name='AU' />
                                                } label='Ambiente Universitario' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={otro} onChange={handleChangeCheckbox} name='otro' />
                                                } label='Otro (Terminar formulario)' />
                                            </FormGroup> */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                }
                {
                    stateReasons['RA'] &&
                    <div>
                        <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                            <CardContent>
                                <Typography variant='h2' align='center' > {RA_TITLE} </Typography>
                                <Typography><br/></Typography>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ RA_FIRST_QUESTION }</FormLabel>
                                            {/* <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SEC} onChange={handleChangeCheckbox} name='SEC' />
                                                } label='Situación Económica y Familiar' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={VOC} onChange={handleChangeCheckbox} name='VOC' />
                                                } label='Vocacional' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={RA} onChange={handleChangeCheckbox} name='RA' />
                                                } label='Rendimiento Académico' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={AU} onChange={handleChangeCheckbox} name='AU' />
                                                } label='Ambiente Universitario' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={otro} onChange={handleChangeCheckbox} name='otro' />
                                                } label='Otro (Terminar formulario)' />
                                            </FormGroup> */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ RA_SECOND_QUESTION }</FormLabel>
                                            {/* <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SEC} onChange={handleChangeCheckbox} name='SEC' />
                                                } label='Situación Económica y Familiar' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={VOC} onChange={handleChangeCheckbox} name='VOC' />
                                                } label='Vocacional' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={RA} onChange={handleChangeCheckbox} name='RA' />
                                                } label='Rendimiento Académico' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={AU} onChange={handleChangeCheckbox} name='AU' />
                                                } label='Ambiente Universitario' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={otro} onChange={handleChangeCheckbox} name='otro' />
                                                } label='Otro (Terminar formulario)' />
                                            </FormGroup> */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                }
                {
                    stateReasons['AU'] &&
                    <div>
                        <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                            <CardContent>
                                <Typography variant='h2' align='center' > {AU_TITLE} </Typography>
                                <Typography><br/></Typography>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ AU_QUESTION }</FormLabel>
                                            {/* <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SEC} onChange={handleChangeCheckbox} name='SEC' />
                                                } label='Situación Económica y Familiar' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={VOC} onChange={handleChangeCheckbox} name='VOC' />
                                                } label='Vocacional' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={RA} onChange={handleChangeCheckbox} name='RA' />
                                                } label='Rendimiento Académico' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={AU} onChange={handleChangeCheckbox} name='AU' />
                                                } label='Ambiente Universitario' />
                                                <FormControlLabel control={
                                                    <Checkbox checked={otro} onChange={handleChangeCheckbox} name='otro' />
                                                } label='Otro (Terminar formulario)' />
                                            </FormGroup> */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ AU_DETAIL_QUESTION }</FormLabel>
                                            {/* RESPUESTA DE TEXTO */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                }
                {
                    stateReasons['otro'] &&
                    <div>
                        <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                            <CardContent>
                                <Typography variant='h2' align='center' > {OTRO_TITLE} </Typography>
                                <Typography><br/></Typography>
                                <Card variant='outlined' sx={{ minWidth: 275, maxWidth: 1000 }}>
                                    <CardContent>
                                        <FormControl sx={{ m: 3 }} component='fieldset' variant='standard' required>
                                            <FormLabel component='legend'>{ OTRO_QUESTION }</FormLabel>
                                            {/* RESPUESTA DE TEXTO */}
                                        </FormControl>
                                        <Button variant='contained' onClick={onSubmitCheckbox}>
                                                Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                }
            </div>
        </Box>
    )
}

export default SurveyForm;