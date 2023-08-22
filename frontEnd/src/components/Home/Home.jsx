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
const TODAS = 'Todas';
const TODOS = 'Todos';

const CASA_CENTRAL = 'Campus Casa Central Valparaíso';
const CAMPUS_SJ = 'Campus Santiago San Joaquín';

const RAZONES = [TODAS, AU_TITLE, RA_TITLE, SEF_SECTION_TITLE, VOC_SECTION_TITLE];
const CAMPUS = [TODOS, CASA_CENTRAL, CAMPUS_SJ];

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
    const [generationYearCount, setGenerationYearCount] = React.useState();
    const [genderCount, setGenderCount] = React.useState();
    const [globalReasonsCount, setGlobalReasonsCount] = React.useState();
    const [academicReasonOneCount, setAcademicReasonOneCount] = React.useState();
    const [academicReasonTwoCount, setAcademicReasonTwoCount] = React.useState();
    const [atmosphericReasonsCount, setAtmosphericReasonsCount] = React.useState();
    const [vocationalRasonsCount, setVocationalRasonsCount] = React.useState();
    const [economicReasonsCount, setEconomicReasonsCount] = React.useState();
    const [years, setYears] = React.useState([TODOS]);
    const [selectedYear, setSelectedYear] = React.useState(TODOS);
    const [selectedCampus, setSelectedCampus] = React.useState(TODOS);
    const [selectedReason, setSelectedReason] = React.useState(TODAS);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function dummyFunction(value) {
        return;
    }

    const transformYear = React.useCallback((object) => {
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
    }, []);

    // React.useEffect(() => {
    //     async function fetchData() {
    //         const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas");
    //         setFormattedSurveyData(JSON.parse(JSON.stringify(response.survey)).map(formatSurveyData(this)));
    //         const setAnnos = new Set(formattedSurveyData?.map(item => item.retiro_universidad));
    //         // console.log('setAnnos: ', setAnnos);
    //         const sortedArry = Array.from(setAnnos).sort().reverse();
    //         // console.log('sortedArry: ', sortedArry);
    //         setYears([TODOS, ...sortedArry]);

    //         let detailVOCResponseArray = [];
    //         let detailAUResponseArray = [];
    //         let otherVOCOptionResponseArray = [];
    //         let otherAUOptionResponseArray = [];
    //         let otherRAOptionResponseArray = [];
    //         let otherSEFOptionResponseArray = [];
    //         let otrosMotivoResponseArray = [];

    //         formattedSurveyData?.forEach(element => {
    //             element.Detail_VOC !== "-" ? detailVOCResponseArray.push(element.Detail_VOC) : dummyFunction(element.Detail_VOC);
    //             element.Detail_AU !== "-" ? detailAUResponseArray.push(element.Detail_AU) : dummyFunction(element.Detail_AU);
    //             element.OTHER_VOC !== "-" ? otherVOCOptionResponseArray.push(element.OTHER_VOC) : dummyFunction(element.OTHER_VOC);
    //             element.OTHER_AU !== "-" ? otherAUOptionResponseArray.push(element.OTHER_AU) : dummyFunction(element.OTHER_AU);
    //             element.OTHER_RA1 !== "-" ? otherRAOptionResponseArray.push(element.OTHER_RA1) : dummyFunction(element.OTHER_RA1);
    //             element.OTHER_RA2 !== "-" ? otherRAOptionResponseArray.push(element.OTHER_RA2) : dummyFunction(element.OTHER_RA2);
    //             element.OTHER_SEF !== "-" ? otherSEFOptionResponseArray.push(element.OTHER_SEF) : dummyFunction(element.OTHER_SEF);
    //             element.otro_motivo !== "-" ? otrosMotivoResponseArray.push(element.otro_motivo) : dummyFunction(element.otro_motivo);
    //         });

    //         setDetailVocationalReasons(detailVOCResponseArray);
    //         setDetailAtmosphericReasons(detailAUResponseArray);
    //         setOtherAUOptionResponse(otherAUOptionResponseArray);
    //         setOtherVOCOptionResponse(otherVOCOptionResponseArray);
    //         setOtherRAOptionResponse(otherRAOptionResponseArray);
    //         setOtherSEFOptionResponse(otherSEFOptionResponseArray);
    //         setOtherOptionResponse(otrosMotivoResponseArray);
    //     }
    //     fetchData();
    // }, [formattedSurveyData, detailVOCResponse, detailAUResponse, otherAUOptionResponse, otherVOCOptionResponse, otherOptionResponse, otherRAOptionResponse, otherSEFOptionResponse]);


    const getData = React.useCallback(async () => {
        axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas")
            .then(response => {
                let formatted = JSON.parse(JSON.stringify(response.data.survey)).map(formatSurveyData(this));
                setFormattedSurveyData(formatted);
                const yearSet = new Set(formatted?.map(item => item.retiro_universidad));
                const sortedArry = Array.from(yearSet).sort().reverse();
                setYears([TODOS, ...sortedArry]);

                let detailVOCResponseArray = [];
                let detailAUResponseArray = [];
                let otherVOCOptionResponseArray = [];
                let otherAUOptionResponseArray = [];
                let otherRAOptionResponseArray = [];
                let otherSEFOptionResponseArray = [];
                let otrosMotivoResponseArray = [];

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

                setRetiredByYearCount(transformYear(response?.data?.retiredByYear));
                setGenerationYearCount(transformYear(response?.data?.generationYear));
                setGenderCount(JSON.parse(JSON.stringify(response?.data?.gender)).map(formatGenderData(this)));
                setGlobalReasonsCount(JSON.parse(JSON.stringify(response?.data?.globalReasons)).map(formatReasonsData(this)));
                setAcademicReasonOneCount(JSON.parse(JSON.stringify(response?.data?.academicReasonOne)).map(formatReasonsData(this)));
                setAcademicReasonTwoCount(JSON.parse(JSON.stringify(response?.data?.academicReasonTwo)).map(formatReasonsData(this)));
                setAtmosphericReasonsCount(JSON.parse(JSON.stringify(response?.data?.atmosphericReasons)).map(formatReasonsData(this)));
                setVocationalRasonsCount(JSON.parse(JSON.stringify(response?.data?.vocationalRasons)).map(formatReasonsData(this)));
                setEconomicReasonsCount(JSON.parse(JSON.stringify(response?.data?.economicReasons)).map(formatReasonsData(this)));
            });
    }, [transformYear, formattedSurveyData]);

    const fetchPipeData = React.useCallback(async () => {
        console.log('fetchPipeData React.useCallback');
        let pipeline;
        if (selectedYear !== TODOS || selectedCampus !== TODOS) {
            pipeline = JSON.stringify({ selectedCampus, selectedYear });
            const { data: newResponse } = await axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/respuestasFiltradas", { pipeline: pipeline });
            console.log('selectedYear !== TODOS || selectedCampus !== TODOS');
            console.log('newResponse?.retiredByYear', newResponse?.retiredByYear.map(formatRetireByYearData(this)));
            console.log('newResponse?.generationYear', newResponse?.generationYear);
            setRetiredByYearCount(JSON.parse(JSON.stringify(newResponse?.retiredByYear)).map(formatRetireByYearData(this)));
            setGenerationYearCount(JSON.parse(JSON.stringify(newResponse?.generationYear)).map(formatRetireByYearData(this)));
            setGlobalReasonsCount(JSON.parse(JSON.stringify(newResponse?.globalReasons)).map(formatReasonsData(this)));
            setGenderCount(JSON.parse(JSON.stringify(newResponse?.genderReasons)).map(formatGenderData(this)));
            setAcademicReasonOneCount(JSON.parse(JSON.stringify(newResponse?.academicReasonOne)).map(formatReasonsData(this)));
            setAcademicReasonTwoCount(JSON.parse(JSON.stringify(newResponse?.academicReasonTwo)).map(formatReasonsData(this)));
            setAtmosphericReasonsCount(JSON.parse(JSON.stringify(newResponse?.atmosphericReasons)).map(formatReasonsData(this)));
            setVocationalRasonsCount(JSON.parse(JSON.stringify(newResponse?.vocationalRasons)).map(formatReasonsData(this)));
            setEconomicReasonsCount(JSON.parse(JSON.stringify(newResponse?.economicReasons)).map(formatReasonsData(this)));
        }
        else {
            console.log('Todo en TODOS');
            if (submitting) {
                getData().then(() => {
                    setSubmitting(false);
                });
            }
        }
    }, [selectedYear, selectedCampus, getData, submitting]);

    React.useEffect(() => {
        fetchPipeData();
    }, [fetchPipeData, detailVOCResponse, detailAUResponse, otherAUOptionResponse, otherVOCOptionResponse, otherOptionResponse, otherRAOptionResponse, otherSEFOptionResponse]);


    function handleYearChange(event) {
        setSelectedYear(event.target.value);
        setSubmitting(true);
    }

    function handleReasonChange(event) {
        setSelectedReason(event.target.value);
        setSubmitting(true);
    }

    function handleCampusChange(event) {
        setSelectedCampus(event.target.value);
        setSubmitting(true);
    }

    function renderCustomizedLabel(props) {
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

    function renderCustomizedLabelGender(props) {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                {/* <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${value}`}</text> */}
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    };

    function renderCustomizedLabelGlobalReason(props) {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                {/* <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${value}`}</text> */}
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    };

    function formatSurveyData(self) {
        return record => {
            let object = {};
            object.anno_ingreso_carrera = record.anno_ingreso_carrera;
            object.AU = record.AU;
            object.campus = record.campus;
            object.Detail_AU = record.Detail_AU;
            object.Detail_VOC = record.Detail_VOC;
            object.ingreso_universidad = record.anno_ingreso_universidad;
            object.OTHER_AU = record.OTHER_AU;
            object.OTHER_RA1 = record.OTHER_RA1;
            object.OTHER_RA2 = record.OTHER_RA2;
            object.OTHER_SEF = record.OTHER_SEF;
            object.OTHER_VOC = record.OTHER_VOC;
            object.otro_motivo = record.otro_motivo;
            object.RA1 = record.RA1;
            object.RA2 = record.RA2;
            object.razones = record.razones;
            object.retiro_universidad = record.anno_retiro_universidad;
            object.SEF = record.SEF;
            object.VOC = record.VOC;
            return object;
        };

    }

    function formatReasonsData() {
        return record => {
            let object = {};
            object.Razon = record.x.replace(" (pedir detallar)", "");
            object.Cantidad = record.y;
            return object;
        };
    }

    function formatGenderData() {
        return record => {
            let object = {};
            object.Genero = record.label;
            object.Cantidad = record.value;
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
                        <CardContent> {/* Filtros */}
                            <Typography textAlign='left' variant="h5">Filtros</Typography>
                            <br />
                            <Stack direction="row">
                                <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                    <InputLabel >Año de retiro</InputLabel>
                                    <Select label="Año de retiro" value={selectedYear} onChange={handleYearChange}>
                                        {years.map(option => {
                                            return (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                    <InputLabel>Razones de retiro</InputLabel>
                                    <Select label="Razones de Retiro" value={selectedReason} onChange={handleReasonChange}>
                                        {RAZONES.map(option => {
                                            return (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                    <InputLabel>Campus</InputLabel>
                                    <Select label="Campus" value={selectedCampus} onChange={handleCampusChange}>
                                        {CAMPUS.map(option => {
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
                                            <Typography><b>Campus:</b> Al elegir esta opción, puedes examinar en detalle las respuesta de los ex-alumnos de cada campus.</Typography>
                                            <br />
                                            <Typography>Para ver de forma global las razones de deserción en todos los años, es necesario dejar seleccionadas ambas opciones en "Todos" o "Todas" respectivamente.</Typography>
                                        </Box>
                                    </Modal>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent> {/* Graficos */}
                            <Typography textAlign='center' variant="h4">Gráficos</Typography>
                            <Grid container>
                                <Grid item xs={selectedReason === TODAS ? 4 : 12}>
                                    <Box className="graphics" >
                                        <Typography textAlign='center' variant="h7">Deserción por años</Typography>
                                        <br />
                                        <div style={{ display: selectedYear === TODOS && selectedCampus === TODOS ? 'block' : 'none' }}>
                                            {/* <div> */}
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
                                        <div style={{ display: selectedCampus !== TODOS && selectedYear === TODOS ? 'block' : 'none' }}>
                                            <LineChart width={selectedReason === TODAS ? 400 : 900} height={300} data={retiredByYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" allowDuplicatedCategory={false} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" isAnimationActive={false} dataKey="Cantidad" stroke="#8884d8" dot={true} />
                                            </LineChart>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={selectedReason === TODAS ? 8 : 12}>
                                    <div style={{ display: (selectedReason === TODAS) ? 'block' : 'none' }}>
                                        <Box className="graphics">
                                            <Typography textAlign='center' variant="h7">Género</Typography>
                                            <PieChart width={800} height={300}>
                                                <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                                <Pie data={genderCount} dataKey="Cantidad" nameKey="Genero" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabelGender} outerRadius={120} innerRadius={30} >
                                                    {COLORS.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </Box>
                                    </div>
                                </Grid>
                                <Grid item xs={selectedReason === TODAS ? 4 : 12}>
                                    <Box className="graphics" >
                                        <br />
                                        <Typography textAlign='center' variant="h7">Deserción por generación</Typography>
                                        <br />
                                        <div style={{ display: selectedYear === TODOS && selectedCampus === TODOS ? 'block' : 'none' }}>
                                            <LineChart width={selectedReason === TODAS ? 400 : 900} height={300} data={generationYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" allowDuplicatedCategory={false} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" isAnimationActive={false} dataKey="CC" stroke="#8884d8" dot={true} />
                                                <Line type="monotone" isAnimationActive={false} dataKey="CSJ" stroke="#FF0000" dot={true} />
                                            </LineChart>
                                        </div>
                                        <div style={{ display: selectedCampus !== TODOS && selectedYear === TODOS ? 'block' : 'none' }}>
                                            <LineChart width={selectedReason === TODAS ? 400 : 900} height={300} data={generationYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" allowDuplicatedCategory={false} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" isAnimationActive={false} dataKey="Cantidad" stroke="#8884d8" dot={true} />
                                            </LineChart>
                                        </div>
                                        <div style={{ display: selectedYear !== TODOS ? 'block' : 'none' }}>
                                            <BarChart width={selectedReason === TODAS ? 400 : 900} height={300} data={generationYearCount}>
                                                <CartesianGrid strokeDasharray={"3 3"} />
                                                <XAxis dataKey="Año" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="Cantidad" fill={COLORS[2]} />
                                            </BarChart>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={selectedReason === TODAS ? 8 : 12}>
                                    <div style={{ display: (selectedReason === TODAS) ? 'block' : 'none' }}>
                                        <Box className="graphics">
                                            <Typography textAlign='center' variant="h7">Razones Globales de Deserción</Typography>
                                            <PieChart width={800} height={300}>
                                                <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                                <Pie data={globalReasonsCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabelGlobalReason} outerRadius={120} innerRadius={30} >
                                                    {COLORS.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </Box>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ display: selectedReason === RA_TITLE ? 'block' : 'none', marginTop: '50px' }}>
                                        <Typography variant="h4" textAlign='center'>{RA_TITLE}</Typography>
                                        <Grid container>
                                            <Grid item>
                                                <Box className="graphics">
                                                    <br />
                                                    <Typography variant="h7">¿Cuál(es) de los siguientes problemas enfrentaste en lo personal?</Typography>
                                                    <PieChart width={1000} height={500}>
                                                        <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                                        <Pie data={academicReasonOneCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                            {COLORS.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <br />
                                                <Box className="graphics">
                                                    <Typography textAlign='center' variant="h7">La Universidad influyó en tus problemas de rendimiento porque…</Typography>
                                                    <PieChart width={1000} height={500}>
                                                        <Legend layout="vertical" verticalAlign="middle" align="right" width={400} />
                                                        <Pie data={academicReasonTwoCount} dataKey="Cantidad" nameKey="Razon" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={150} innerRadius={30} >
                                                            {COLORS.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div style={{ display: selectedReason === SEF_SECTION_TITLE ? 'block' : 'none', marginTop: '50px' }}>
                                        <br />
                                        <Typography variant="h4" textAlign='center'>{SEF_SECTION_TITLE}</Typography>
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
                                        <br />
                                        <Typography variant="h4" textAlign='center'>{VOC_SECTION_TITLE}</Typography>
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
                                        <br />
                                        <Typography variant="h4" textAlign='center'>{AU_TITLE}</Typography>
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
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}