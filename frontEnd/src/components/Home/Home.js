import axios from "axios";
import * as React from 'react';
import { Box, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, Cell, PieChart, Pie, Sector, LineChart, Line, Legend } from "recharts";
import './Home.css';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const VOC_SECTION_TITLE = 'Vocacional';
const RA_TITLE = 'Rendimiento Académico';
const AU_TITLE = 'Ambiente Universitario';
const TODAS = 'Todas';

const COLORS = ["#0CC0ED", "#0CF7E8", "#00E093", "#0CF763", "#0CED1F"];

export default function Home() {

    const [formattedSurveyData, setFormattedSurveyData] = React.useState();
    const [globalReasonsCount, setGlobalReasonsCount] = React.useState();
    const [retiredByYearCount, setRetiredByYearCount] = React.useState();
    const [radioButton, setRadioButton] = React.useState(SEF_SECTION_TITLE);
    const [years, setYears] = React.useState([]);
    const [selectedYear, setSelectedYear] = React.useState('');

    const [activeIndex, setActiveIndex] = React.useState(0);
    const onMouseOver = React.useCallback((data, index) => {
        setActiveIndex(index);
    }, []);
    const onMouseLeave = React.useCallback((data, index) => {
        setActiveIndex(0);
    }, []);

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
            yearArray.push("Todos");
            console.log('Response Survey', response.survey);
            setFormattedSurveyData(JSON.parse(JSON.stringify(response.survey)).map(formatSurveyData(this)));
            response.survey.forEach(element => {
                if (!yearArray.includes(element.anno_retiro_universidad)) {
                    yearArray.push(element.anno_retiro_universidad);
                }
            });
            setYears(yearArray.sort());
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        async function fetchPipelinesData() {
            const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
            const yearArray = [];
            yearArray.push("Todos");
            console.log('Response Aggregation', response.globalReasons);
            setGlobalReasonsCount(JSON.parse(JSON.stringify(response.globalReasons)).map(formatGlobalReasonsData(this)));
            setRetiredByYearCount(JSON.parse(JSON.stringify(response.retiredByYear)).map(formatRetireByYearData(this)));
        }
        fetchPipelinesData();
    }, []);

    console.log('globalReasons', globalReasonsCount);
    console.log('retiredByYear', retiredByYearCount);


    function handleRadioChange(e) {
        e.preventDefault();
        setRadioButton(e.target.value);
    }

    function handleYearChange(event) {
        setSelectedYear(event.target.value);
    }

    function formatSurveyData(self) {
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

    function renderActiveShape(props) {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}: ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Porcentaje: ${(percent * 100).toFixed(0)}%)`}
                </text>
            </g>
        );
    };

    function formatGlobalReasonsData() {
        return record => {
            let object = {};
            object.Razon = record.x;
            object.Cantidad = record.y;
            return object;
        };
    }

    function formatRetireByYearData() {
        return record => {
            let object = {};
            object.Año = record.x;
            object.Cantidad = record.y;
            return object;
        };
    }

    console.log('formattedSurveyData', formattedSurveyData);

    return (
        <Box display='flex' justifyContent="center" alignItems='center' sx={{ my: 2, mx: 2 }}>
            <Grid container>
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
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <FormLabel>Razones de retiro</FormLabel>
                                <RadioGroup value={radioButton} onChange={handleRadioChange}>
                                    <FormControlLabel value={TODAS} control={<Radio size="small" />} label={TODAS} />
                                    <FormControlLabel value={SEF_SECTION_TITLE} control={<Radio size="small" />} label={SEF_SECTION_TITLE} />
                                    <FormControlLabel value={VOC_SECTION_TITLE} control={<Radio size="small" />} label={VOC_SECTION_TITLE} />
                                    <FormControlLabel value={RA_TITLE} control={<Radio size="small" />} label={RA_TITLE} />
                                    <FormControlLabel value={AU_TITLE} control={<Radio size="small" />} label={AU_TITLE} />
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9} sx={{ p: 2, border: '1px dashed grey' }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography textAlign='center' variant="h3">Gráficos</Typography>} />
                        <CardContent>
                            <LineChart width={700} height={300} data={retiredByYearCount} margin={{ left: 200 }}>
                                <CartesianGrid strokeDasharray={"3 3"} />
                                <XAxis dataKey="Año" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" isAnimationActive={false} dataKey="Cantidad" stroke="#8884d8" dot={true} />
                            </LineChart>

                            <BarChart layout="vertical" width={700} height={300} data={globalReasonsCount} margin={{ left: 200 }} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" />
                                <Tooltip />
                                <Bar dataKey={"Cantidad"} fill="red">
                                    {
                                        COLORS.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>

                            <PieChart width={900} height={250}>
                                <Pie activeIndex={activeIndex} data={globalReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" outerRadius={80} fill="red" activeShape={renderActiveShape} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} >
                                    {
                                        COLORS.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}