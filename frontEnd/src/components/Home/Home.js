import axios from "axios";
import * as React from 'react';
import { Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, Cell, PieChart, Pie, LineChart, Line, Legend } from "recharts";
import './Home.css';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const VOC_SECTION_TITLE = 'Vocacional';
const RA_TITLE = 'Rendimiento Académico';
const AU_TITLE = 'Ambiente Universitario';
const TODAS = 'Todas';
const TODOS = 'Todos';

const RAZONES = [TODAS, SEF_SECTION_TITLE, VOC_SECTION_TITLE, RA_TITLE, AU_TITLE];

const COLORS = ["#115f9a", "#1984c5", "#22a7f0", "#48b5c4", "#76c68f", "#a6d75b", "#c9e52f", "#d0ee11", "#d0f400"];


export default function Home() {

    const [formattedSurveyData, setFormattedSurveyData] = React.useState();
    const [retiredByYearCount, setRetiredByYearCount] = React.useState();
    const [globalReasonsCount, setGlobalReasonsCount] = React.useState();
    const [academicReasonOneCount, setAcademicReasonOneCount] = React.useState();
    const [academicReasonTwoCount, setAcademicReasonTwoCount] = React.useState();
    const [atmosphericReasonsCount, setAtmosphericReasonsCount] = React.useState();
    const [vocationalRasonsCount, setVocationalRasonsCount] = React.useState();
    const [economicReasonsCount, setEconomicReasonsCount] = React.useState();
    const [years, setYears] = React.useState([]);
    const [selectedYear, setSelectedYear] = React.useState(TODOS);
    const [selectedReason, setSelectedReson] = React.useState(TODAS);

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
            setFormattedSurveyData(JSON.parse(JSON.stringify(response.survey)).map(formatSurveyData(this)));
            const yearArray = [];
            yearArray.push(TODOS);
            formattedSurveyData.forEach(element => {
                if (!yearArray.includes(element.retiro_universidad)) {
                    yearArray.push(element.retiro_universidad);
                }
            });
            setYears(yearArray.sort().reverse());
        }
        fetchData();
    }, [formattedSurveyData]);

    React.useEffect(() => {
        async function fetchPipelinesData() {
            console.log('Se llamo a la BD');
            const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
            setRetiredByYearCount(JSON.parse(JSON.stringify(response.retiredByYear)).map(formatRetireByYearData(this)));
            setGlobalReasonsCount(JSON.parse(JSON.stringify(response.globalReasons)).map(formatReasonsData(this)));
            setAcademicReasonOneCount(JSON.parse(JSON.stringify(response.academicReasonOne)).map(formatReasonsData(this)));
            setAcademicReasonTwoCount(JSON.parse(JSON.stringify(response.academicReasonTwo)).map(formatReasonsData(this)));
            setAtmosphericReasonsCount(JSON.parse(JSON.stringify(response.atmosphericReasons)).map(formatReasonsData(this)));
            setVocationalRasonsCount(JSON.parse(JSON.stringify(response.vocationalRasons)).map(formatReasonsData(this)));
            setEconomicReasonsCount(JSON.parse(JSON.stringify(response.economicReasons)).map(formatReasonsData(this)));
        }
        fetchPipelinesData();
    }, []);

    function handleYearChange(event) {
        setSelectedYear(event.target.value);
    }

    function handleReasonChange(event) {
        setSelectedReson(event.target.value);
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

    function renderCustomizedLabel(props) {
        // console.log('props', props);
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${value}`}
            </text>
        );
    };

    function formatReasonsData() {
        return record => {
            let object = {};
            object.Razon = record.x.replace(" (pedir detallar)", "");
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

    return (
        <Box display='flex' justifyContent="center" alignItems='center' sx={{ my: 2, mx: 2 }}>
            <Grid container>
                <Grid item xs={12} >
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography textAlign='left' variant="h5">Filtros</Typography>
                            <br />
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel >Año de retiro</InputLabel>
                                <Select label="Año de retiro" value={selectedYear} onChange={handleYearChange}>
                                    {years.map(option => {
                                        return (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel>Razones de retiro</InputLabel>
                                <Select label="Razones de Retiro" value={selectedReason} onChange={handleReasonChange}>
                                    {RAZONES.map(option => {
                                        return (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Typography textAlign='center' variant="h4">Gráficos</Typography>
                            <Box className="graphics">
                                <Typography textAlign='center' variant="h7">Deserción por años</Typography>
                                <LineChart width={900} height={300} data={retiredByYearCount} >
                                    <CartesianGrid strokeDasharray={"3 3"} />
                                    <XAxis dataKey="Año" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" isAnimationActive={false} dataKey="Cantidad" stroke="#8884d8" dot={true} />
                                </LineChart>
                            </Box>
                            <ColoredLine color='#E0E0E0' />
                            <div style={{ display: selectedReason === TODAS ? 'block' : 'none' }}>
                                <Box className="graphics">
                                    <Typography textAlign='center' variant="h7">Razones Globales de Deserción</Typography>
                                    <BarChart layout="horizontal" width={900} height={300} data={globalReasonsCount} barSize={90}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <YAxis type="number" />
                                        <XAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} tick={{ fontSize: 14, width: 250 }} dataKey="Razon" type="category" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue" >
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </Box>
                            </div>

                            <div style={{ display: selectedReason === RA_TITLE ? 'block' : 'none' }}>
                                <Box className="graphics">
                                    <PieChart width={1000} height={500}>
                                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                                        <Pie data={academicReasonOneCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={30} >
                                            {COLORS.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                    <PieChart width={1000} height={500}>
                                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                                        <Pie data={academicReasonTwoCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={30} >
                                            {COLORS.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Box>
                                {/* <Box className="graphics">
                                    <Typography textAlign='center' variant="h5">Razones Académicas</Typography>
                                    <BarChart layout="vertical" width={900} height={300} data={academicReasonOneCount}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue">
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                    <BarChart layout="vertical" width={900} height={300} data={academicReasonTwoCount} >
                                        <CartesianGrid strokeDasharray="6 6" />
                                        <XAxis type="number" />
                                        <YAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue">
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </Box> */}
                            </div>

                            <div style={{ display: selectedReason === SEF_SECTION_TITLE ? 'block' : 'none' }}>
                                <Box className="graphics">
                                    <PieChart width={1000} height={500}>
                                        <Legend layout="vertical" verticalAlign="middle" align="right" width={300} />
                                        <Pie data={economicReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={30} >
                                            {COLORS.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Box>
                                {/* <Box className="graphics">
                                    <Typography textAlign='center' variant="h5">Situación Económica y Familiar</Typography>
                                    <BarChart layout="vertical" width={900} height={300} data={economicReasonsCount} >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue">
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </Box> */}
                            </div>

                            <div style={{ display: selectedReason === VOC_SECTION_TITLE ? 'block' : 'none' }}>
                                <Box className="graphics">
                                    <PieChart width={1000} height={500}>
                                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                                        <Pie data={vocationalRasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={30} >
                                            {COLORS.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Box>
                                {/* <Box className="graphics">
                                    <Typography textAlign='center' variant="h5">Vocacional</Typography>
                                    <BarChart layout="vertical" width={900} height={300} data={vocationalRasonsCount} >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue">
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </Box> */}
                            </div>

                            <div style={{ display: selectedReason === AU_TITLE ? 'block' : 'none' }}>
                                <Box className="graphics">
                                    <PieChart width={1000} height={500}>
                                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                                        <Pie data={atmosphericReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={30} >
                                            {COLORS.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Box>
                                {/* <Box className="graphics">
                                    <Typography textAlign='center' variant="h5">Ambiente Universitario</Typography>
                                    <BarChart layout="horizontal" width={900} height={300} data={atmosphericReasonsCount} >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <YAxis type="number" />
                                        <XAxis tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} dataKey="Razon" type="category" padding="gap" />
                                        <Tooltip />
                                        <Bar dataKey={"Cantidad"} fill="blue">
                                            {
                                                COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </Box> */}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}