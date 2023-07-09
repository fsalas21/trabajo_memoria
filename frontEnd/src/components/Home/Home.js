import axios from "axios";
import * as React from 'react';
import { Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography, IconButton, Stack, Modal } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, LineChart, Line, Legend, BarChart, Bar } from "recharts";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import './Home.css';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const VOC_SECTION_TITLE = 'Vocacional';
const RA_TITLE = 'Rendimiento Académico';
const AU_TITLE = 'Ambiente Universitario';
// const SEF_TRANSLATED = 'SEF';
// const VOC_TRANSLATED = 'VOC';
// const RA1_TRANSLATED = 'RA1';
// const RA2_TRANSLATED = 'RA2';
// const AU_TRANSLATED = 'AU';
const TODAS = 'Todas';
const TODOS = 'Todos';

const RAZONES = [
    TODAS,
    AU_TITLE,
    RA_TITLE,
    SEF_SECTION_TITLE,
    VOC_SECTION_TITLE,
];

const COLORS = ["#115f9a", "#1984c5", "#22a7f0", "#48b5c4", "#76c68f", "#a6d75b", "#c9e52f", "#d0ee11", "#d0f400"];
export default function Home() {

    const [otherOptionResponse, setOtherOptionResponse] = React.useState([]);
    const [otherAUOptionResponse, setOtherAUOptionResponse] = React.useState([]);
    const [otherSEFOptionResponse, setOtherSEFOptionResponse] = React.useState([]);
    const [otherRAOptionResponse, setOtherRAOptionResponse] = React.useState([]);
    const [otherVOCOptionResponse, setOtherVOCOptionResponse] = React.useState([]);
    const [detailAUResponse, setDetailAtmosphericReasons] = React.useState([]);
    const [detailVOCResponse, setDetailVocationalReasons] = React.useState([]);

    const [submitting, setSubmitting] = React.useState(true);
    const [formattedSurveyData, setFormattedSurveyData] = React.useState();
    const [retiredByYearCount, setRetiredByYearCount] = React.useState();
    const [globalReasonsCount, setGlobalReasonsCount] = React.useState();
    const [academicReasonOneCount, setAcademicReasonOneCount] = React.useState();
    const [academicReasonTwoCount, setAcademicReasonTwoCount] = React.useState();
    const [atmosphericReasonsCount, setAtmosphericReasonsCount] = React.useState();
    const [vocationalRasonsCount, setVocationalRasonsCount] = React.useState();
    const [economicReasonsCount, setEconomicReasonsCount] = React.useState();
    const [years, setYears] = React.useState([TODOS]);
    const [selectedYear, setSelectedYear] = React.useState(TODOS);
    const [selectedReason, setSelectedReson] = React.useState(TODAS);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function dummyFunction(value) {
        return;
    }

    // const ColoredLine = ({ color }) => (
    //     <hr
    //         style={{
    //             color: color,
    //             backgroundColor: color,
    //             height: 1
    //         }}
    //     />
    // );

    React.useMemo(() => {
        async function fetchData() {
            const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
            setFormattedSurveyData(JSON.parse(JSON.stringify(response.survey)).map(formatSurveyData(this)));

            let detailVOCResponseArray = [];
            let detailAUResponseArray = [];
            let otherVOCOptionResponseArray = [];
            let otherAUOptionResponseArray = [];
            let otherRAOptionResponseArray = [];
            let otherSEFOptionResponseArray = [];
            let otrosMotivoResponseArray = [];

            setYears([TODOS, ...new Set(formattedSurveyData?.map(item => item.retiro_universidad))]);

            formattedSurveyData?.forEach(element => {
                element.Detail_VOC !== "-" ? detailVOCResponseArray.push(element.Detail_VOC) : dummyFunction(element.Detail_VOC);
                element.Detail_AU !== "-" ? detailAUResponseArray.push(element.Detail_AU) : dummyFunction(element.Detail_AU);
                element.OTHER_VOC !== "-" ? otherVOCOptionResponseArray.push(element.OTHER_VOC) : dummyFunction(element.OTHER_VOC);
                element.OTHER_AU !== "-" ? otherAUOptionResponseArray.push(element.OTHER_AU) : dummyFunction(element.OTHER_AU);
                element.OTHER_RA1 !== "-" ? otherRAOptionResponseArray.push(element.OTHER_RA1) : dummyFunction(element.OTHER_RA1);
                element.OTHER_RA2 !== "-" ? otherRAOptionResponseArray.push(element.OTHER_RA2) : dummyFunction(element.OTHER_RA2);
                element.OTHER_SEF !== "-" ? otherSEFOptionResponseArray.push(element.OTHER_SEF) : dummyFunction(element.OTHER_SEF);
                element.otro_motivo !== "-" ? otrosMotivoResponseArray.push(element.otro_motivo) : dummyFunction(element.otro_motivo);
            });

            setDetailVocationalReasons(detailVOCResponseArray);
            setDetailAtmosphericReasons(detailAUResponseArray);
            setOtherAUOptionResponse(otherAUOptionResponseArray);
            setOtherVOCOptionResponse(otherVOCOptionResponseArray);
            setOtherRAOptionResponse(otherRAOptionResponseArray);
            setOtherSEFOptionResponse(otherSEFOptionResponseArray);
            setOtherOptionResponse(otrosMotivoResponseArray);
        }
        fetchData();
    }, [formattedSurveyData]);

    const transformRetiredByYear = React.useCallback((object) => {
        let formattedObj = object.map(record => {
            let newObj = {};
            newObj.Año = record.x;
            if (record.color === "Campus Casa Central Valparaíso") {
                newObj.CC = record.y;
                newObj.CSJ = 0;
            }
            else {
                newObj.CC = 0;
                newObj.CSJ = record.y;
            }
            return newObj;
        });

        let result = formattedObj.reduce((prev, next) => {
            if (next.Año in prev) {
                prev[next.Año].CC += next.CC;
                prev[next.Año].CSJ += next.CSJ;
            }
            else {
                prev[next.Año] = next;
            }
            return prev;
        }, {});


        let finalresult = Object.keys(result).map(x => result[x]);
        return finalresult;
        // let retiredYearsCC = object.filter(record => record.color === "Campus Casa Central Valparaíso").map(formatRetireByYearData(this));
        // let retiredYearsCSJ = object.filter(record => record.color === "Campus Santiago San Joaquín").map(formatRetireByYearData(this));
        // let seriesData = [
        //     {
        //         campus: "Campus Casa Central Valparaíso",
        //         data: retiredYearsCC
        //     },
        //     {
        //         campus: "Campus Santiago San Joaquín",
        //         data: retiredYearsCSJ
        //     }
        // ];
        // return seriesData;
    }, []);

    const getData = React.useCallback(async () => {
        const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
        console.log('response?.retiredByYear', response?.retiredByYear);
        console.log('trasnformed: ', transformRetiredByYear(response?.retiredByYear));

        // setRetiredByYearCount(JSON.parse(JSON.stringify(response?.retiredByYear)).map(formatRetireByYearData(this)));
        setRetiredByYearCount(transformRetiredByYear(response?.retiredByYear));
        setGlobalReasonsCount(JSON.parse(JSON.stringify(response?.globalReasons)).map(formatReasonsData(this)));
        setAcademicReasonOneCount(JSON.parse(JSON.stringify(response?.academicReasonOne)).map(formatReasonsData(this)));
        setAcademicReasonTwoCount(JSON.parse(JSON.stringify(response?.academicReasonTwo)).map(formatReasonsData(this)));
        setAtmosphericReasonsCount(JSON.parse(JSON.stringify(response?.atmosphericReasons)).map(formatReasonsData(this)));
        setVocationalRasonsCount(JSON.parse(JSON.stringify(response?.vocationalRasons)).map(formatReasonsData(this)));
        setEconomicReasonsCount(JSON.parse(JSON.stringify(response?.economicReasons)).map(formatReasonsData(this)));
    }, [transformRetiredByYear]);

    const fetchPipeData = React.useCallback(async () => {
        if (selectedYear !== TODOS) {
            let pipeline = JSON.stringify({ selectedYear });
            const { data: newResponse } = await axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/respuestasFiltradas", { pipeline: pipeline });
            setRetiredByYearCount(JSON.parse(JSON.stringify(newResponse?.retiredByYear)).map(formatRetireByYearData(this)));
            setGlobalReasonsCount(JSON.parse(JSON.stringify(newResponse?.globalReasons)).map(formatReasonsData(this)));
            setAcademicReasonOneCount(JSON.parse(JSON.stringify(newResponse?.academicReasonOne)).map(formatReasonsData(this)));
            setAcademicReasonTwoCount(JSON.parse(JSON.stringify(newResponse?.academicReasonTwo)).map(formatReasonsData(this)));
            setAtmosphericReasonsCount(JSON.parse(JSON.stringify(newResponse?.atmosphericReasons)).map(formatReasonsData(this)));
            setVocationalRasonsCount(JSON.parse(JSON.stringify(newResponse?.vocationalRasons)).map(formatReasonsData(this)));
            setEconomicReasonsCount(JSON.parse(JSON.stringify(newResponse?.economicReasons)).map(formatReasonsData(this)));
        }
        else {
            if (submitting) {
                getData().then(() => setSubmitting(false));
            }
        }
    }, [selectedYear, getData, submitting]);

    React.useEffect(() => {
        // async function fetchPipelinesData() {
        //     if (selectedYear !== TODOS) {
        //         let pipeline = JSON.stringify({ selectedYear });
        //         const { data: newResponse } = await axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/respuestasFiltradas", { pipeline: pipeline });
        //         setRetiredByYearCount(JSON.parse(JSON.stringify(newResponse?.retiredByYear)).map(formatRetireByYearData(this)));
        //         setGlobalReasonsCount(JSON.parse(JSON.stringify(newResponse?.globalReasons)).map(formatReasonsData(this)));
        //         setAcademicReasonOneCount(JSON.parse(JSON.stringify(newResponse?.academicReasonOne)).map(formatReasonsData(this)));
        //         setAcademicReasonTwoCount(JSON.parse(JSON.stringify(newResponse?.academicReasonTwo)).map(formatReasonsData(this)));
        //         setAtmosphericReasonsCount(JSON.parse(JSON.stringify(newResponse?.atmosphericReasons)).map(formatReasonsData(this)));
        //         setVocationalRasonsCount(JSON.parse(JSON.stringify(newResponse?.vocationalRasons)).map(formatReasonsData(this)));
        //         setEconomicReasonsCount(JSON.parse(JSON.stringify(newResponse?.economicReasons)).map(formatReasonsData(this)));
        //     }
        //     else {
        //         if (submitting) {
        //             getData().then(() => setSubmitting(false));
        //         }
        //     }
        // }
        // fetchPipelinesData();
        fetchPipeData();
        setSubmitting(true);
    }, [selectedYear, getData, submitting, fetchPipeData]);

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
                            <Stack direction="row">
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
                                <Box className="graphics">
                                    <IconButton onClick={handleOpen} size="large">
                                        <InfoRoundedIcon />
                                    </IconButton>
                                    <Modal open={open} onClose={handleClose}>
                                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                            <Typography variant="h6" component="h2" align="center">¿Cómo funciona la sección de gráficos?</Typography>
                                            <Typography>Existen dos opciones a elegir que moestraran distintos tipos de gráficos.</Typography>
                                            <br />
                                            <Typography><b>Año de retiro:</b> Es posible seleccionar algún año registrado donde haya existido deserción estudiantil. Esto permitirá ver de forma más específicas cuales fueron las razones de ese periodo. Para ver el estado global, basta con elegir la opción de <b>Todos</b>.</Typography>
                                            <br />
                                            <Typography><b>Razón de retiro:</b> Al elegir esta opción, puedes examinar en detalle las respuesta de los ex-alumnos que se sintieron identificados con ella.</Typography>
                                            <br />
                                            <Typography>Para ver de forma global las razones de deserción en todos los años, es necesario dejar seleccionadas ambas opciones en "Todos" o "Todas" respectivamente.</Typography>
                                        </Box>
                                    </Modal>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography textAlign='center' variant="h4">Gráficos</Typography>
                            <Grid container>
                                <Grid item xs={selectedReason === TODAS ? 4 : 12}>
                                    <Box className="graphics" >
                                        <Typography textAlign='center' variant="h7">Deserción por años</Typography>
                                        <br />
                                        <div style={{ display: selectedYear === TODOS ? 'block' : 'none' }}>
                                            <LineChart width={selectedReason === TODAS ? 400 : 900} height={300} data={retiredByYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" allowDuplicatedCategory={false} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" isAnimationActive={false} dataKey="CC" stroke="#8884d8" dot={true} />
                                                <Line type="monotone" isAnimationActive={false} dataKey="CSJ" stroke="#FF0000" dot={true} />
                                            </LineChart>
                                        </div>
                                        <div style={{ display: selectedYear !== TODOS ? 'block' : 'none' }}>
                                            <BarChart width={selectedReason === TODAS ? 400 : 900} height={300} data={retiredByYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="Cantidad" fill={COLORS[2]} />
                                            </BarChart>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <div style={{ display: (selectedReason === TODAS) ? 'block' : 'none' }}>
                                        <Box className="graphics">
                                            <Typography textAlign='center' variant="h7">Razones Globales de Deserción</Typography>
                                            <PieChart width={800} height={300}>
                                                <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                                <Pie data={globalReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120} innerRadius={30} >
                                                    {COLORS.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </Box>
                                    </div>
                                </Grid>
                                <div style={{ display: selectedReason === RA_TITLE ? 'block' : 'none' }}>
                                    <Box className="graphics">
                                        <PieChart width={1000} height={500}>
                                            <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                            <Pie data={academicReasonOneCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                {COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                        <PieChart width={1000} height={500}>
                                            <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                            <Pie data={academicReasonTwoCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                {COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </Box>
                                </div>

                                <div style={{ display: selectedReason === SEF_SECTION_TITLE ? 'block' : 'none' }}>
                                    <Box className="graphics">
                                        <PieChart width={1000} height={500}>
                                            <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                            <Pie data={economicReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                {COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </Box>
                                </div>

                                <div style={{ display: selectedReason === VOC_SECTION_TITLE ? 'block' : 'none' }}>
                                    <Box className="graphics">
                                        <PieChart width={1000} height={500}>
                                            <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                            <Pie data={vocationalRasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                {COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </Box>
                                </div>

                                <div style={{ display: selectedReason === AU_TITLE ? 'block' : 'none' }}>
                                    <Box className="graphics">
                                        <PieChart width={1000} height={500}>
                                            <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                            <Pie data={atmosphericReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                {COLORS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </Box>
                                </div>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}