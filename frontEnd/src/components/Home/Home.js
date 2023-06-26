import axios from "axios";
import * as React from 'react';
import { Box, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import './Home.css';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const VOC_SECTION_TITLE = 'Vocacional';
const RA_TITLE = 'Rendimiento Académico';
const AU_TITLE = 'Ambiente Universitario';

export default function Home() {

    const [formattedSurveyData, setFormattedSurveyData] = React.useState();
    const [radioButton, setRadioButton] = React.useState(SEF_SECTION_TITLE);
    const [years, setYears] = React.useState([]);
    const [selectedYear, setSelectedYear] = React.useState('');

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    React.useEffect(() => {
        async function fetchData() {
            const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
            const yearArray = [];
            console.log('response', response);
            setFormattedSurveyData(JSON.parse(JSON.stringify(response)).map(formatData(this)));
            response.forEach(element => {
                if (!yearArray.includes(element.anno_retiro_universidad)) {
                    yearArray.push(element.anno_retiro_universidad);
                }
            });
            setYears(yearArray.sort());
        }

        fetchData();
    }, []);

    function handleRadioChange(e) {
        e.preventDefault();
        setRadioButton(e.target.value);
    }

    function handleYearChange(event) {
        setSelectedYear(event.target.value);
    }

    function formatData(self) {
        return record => {
            let object = {};
            object.campus = record.campus;
            object.anno_ingreso_carrera = record.anno_ingreso_carrera;
            object.ingreso_universidad = record.anno_ingreso_universidad;
            object.retiro_universidad = record.anno_retiro_universidad;
            object.retiro_universidad = record.anno_retiro_universidad;
            object.razones = record.razones;
            object.SEF = record.SEF;
            object.OTHER_SEF = record.OTHER_SEF;
            object.VOC = record.VOC;
            object.OTHER_VOC = record.OTHER_VOC;
            object.Detail_VOC = record.Detail_VOC;
            object.RA1 = record.RA1;
            object.OTHER_RA1 = record.OTHER_RA1;
            object.RA2 = record.RA2;
            object.OTHER_RA2 = record.OTHER_RA2;
            object.AU = record.AU;
            object.OTHER_AU = record.OTHER_AU;
            object.Detail_AU = record.Detail_AU;
            object.otro_motivo = record.otro_motivo;
            return object;
        };

    }

    console.log('formattedSurveyData', formattedSurveyData);

    return (
        <Box display='flex' justifyContent="center" alignItems='center' sx={{ border: '1px dashed grey', my: 2, mx: 2 }}>
            <Grid container sx={{ border: '1px dashed blue' }}>
                <Grid item xs={3} sx={{ p: 2, border: '1px dashed red' }}>
                    <Card variant='outlined' >
                        <CardHeader title={
                            <Typography textAlign='center' variant="h3">Filtros</Typography>
                        } />
                        <ColoredLine color='#E0E0E0' />
                        <CardContent sx={{ mx: 2 }}>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel >Año de retiro</InputLabel>
                                <Select label="Año de retiro" value={selectedYear} onChange={handleYearChange}>
                                    {years.map(option => {
                                        return (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <ColoredLine color='#E0E0E0' />
                            <FormControl>
                                <FormLabel>Razones generales</FormLabel>
                                <RadioGroup value={radioButton} onChange={handleRadioChange}>
                                    <FormControlLabel value={SEF_SECTION_TITLE} control={<Radio size="small" />} label={SEF_SECTION_TITLE} />
                                    <FormControlLabel value={VOC_SECTION_TITLE} control={<Radio size="small" />} label={VOC_SECTION_TITLE} />
                                    <FormControlLabel value={RA_TITLE} control={<Radio size="small" />} label={RA_TITLE} />
                                    <FormControlLabel value={AU_TITLE} control={<Radio size="small" />} label={AU_TITLE} />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={9} sx={{ p: 2, border: '1px dashed red' }}>
                    <Card variant='outlined'>
                        <CardHeader title={
                            <Typography textAlign='center' variant="h3">Gráficos</Typography>
                        } />
                        <CardContent>
                            <p>hola</p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}