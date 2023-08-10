import * as React from 'react';
import { Alert, AppBar, Box, Button, Collapse, IconButton, Snackbar, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import FileDownloadDoneRoundedIcon from '@mui/icons-material/FileDownloadDoneRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SendIcon from '@mui/icons-material/Send';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './Table.css';

const SENT_EMAIL_MESSAGE = 'Se ha reenviado el correo al estudiante.';
const ERROR_SENT_EMAIL_MESSAGE = 'Hubo un problema la enviar el correo.';

function transformBooleanValue(bool) {
    return bool ? 'Si' : 'No';
}

function formatDate(date) {
    var newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

export default function TableTracking() {

    const [clickedIndex, setClickedIndex] = React.useState('-1');
    const [existingFile, setExistingFile] = React.useState(false);
    const [file, setFile] = React.useState();
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [sendEmailMsg, setSendEmailMsg] = React.useState('');
    const [tableData, setTableData] = React.useState([]);

    function handleSnackClose() {
        setOpenAlert(false);
    }

    const fileReader = new FileReader();

    const handleUpdateStudent = React.useCallback(
        (row) => () => {
            console.log('handleUpdateStudent row Params: ', row);
            let status = { rut: row.RUT, answeredSurvey: true };
            axios.put("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/updateSurveyStatus", status)
                .then(result => {
                    console.log('Estado actualizado. Resultado: \n', result);
                    refreshAfterTime(600);
                })
                .catch(error => {
                    console.log('No se ha encontrado un estudiante con ese RUT. Error: \n', error);
                });
        },
        [],
    );

    const handleResendMail = React.useCallback(
        (row) => () => {
            console.log('handleResendMail row params', row);
            let status = { rut: row.RUT, timesSent: row.timesSent + 1 };
            const nombres = row.nombre;
            const code = row.codigoAcceso;
            const correo = row.correo;
            resendEmail(nombres, code, correo);
            axios.put("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/updateTimesSent", status)
                .then(result => {
                    console.log('Estado actualizado. Resultado: \n', result);
                    refreshAfterTime(2000);
                })
                .catch(error => {
                    console.log('No se ha encontrado un estudiante con ese RUT. Error: \n', error);
                });
            setOpenAlert(true);
        },
        [],
    );

    const detailStyles = React.useMemo(() => ({
        borderTop: '1px solid',
        borderTopColor: 'black',
        pt: 1
    }), []);

    const columns = React.useMemo(() => [
        {
            field: 'id', headerName: '', sortable: false, renderCell: (cellValues) => {
                return (
                    <IconButton onClick={() => { clickedIndex === cellValues.id ? setClickedIndex('-1') : setClickedIndex(cellValues.id); console.log('cellValues:', cellValues); }}>
                        {cellValues.id === clickedIndex ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                );
            },
            width: 60
        },
        {
            field: 'nombre', headerName: 'Nombres', renderCell: (cellValues) => {
                return (
                    <Box>
                        <div className='nameCol'>{cellValues.row.nombre}</div>
                        <Collapse in={cellValues.id === clickedIndex}>
                            <Box sx={detailStyles}>
                                Código de acceso:
                            </Box>
                        </Collapse>
                    </Box>
                );
            },
            flex: 0.8, align: 'center', headerAlign: 'center'
        },
        {
            field: 'apellidos', headerName: 'Apellidos', renderCell: (cellValues) => {
                return (
                    <Box>
                        <div className='nameCol'>{cellValues.row.apellidos}</div>
                        <Collapse in={cellValues.id === clickedIndex}>
                            <Box sx={detailStyles}>
                                <Typography variant='caption' sx={{ fontStyle: 'italic' }} >{cellValues.row.codigoAcceso}</Typography>
                            </Box>
                        </Collapse>
                    </Box>
                );
            },
            flex: 1, align: 'center', headerAlign: 'center'
        },
        { field: 'correo', headerName: 'Correo', sortable: false, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'celular', headerName: 'Teléfono', sortable: false, flex: 0.8, align: 'center', headerAlign: 'center' },
        { field: 'surveySentDate', headerName: 'Fecha de Encuesta Enviada', flex: 0.8, align: 'center', valueFormatter: params => formatDate(params?.value), headerAlign: 'center' },
        { field: 'answeredSurvey', headerName: 'Encuesta Respondida', flex: 1, align: 'center', valueFormatter: params => transformBooleanValue(params?.value), headerAlign: 'center' },
        { field: 'timesSent', headerName: 'Veces Enviada la Encuesta', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'actions', type: 'actions', width: 60, sortable: false, getActions: (params) => [
                <GridActionsCellItem icon={<SendIcon />} label="Reenviar encuesta" onClick={handleResendMail(params.row)} showInMenu />,
                <GridActionsCellItem icon={<NotInterestedIcon />} label="No desea responder" onClick={handleUpdateStudent(params.row)} showInMenu />
            ], align: 'center', headerAlign: 'center'
        }
    ], [handleResendMail, handleUpdateStudent, clickedIndex, detailStyles]);

    React.useEffect(() => {
        async function fetchData() {
            const { data: response } = await axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/seguimiento");
            setTableData(response);
        }
        fetchData();
    }, []);

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setExistingFile(true);
        }
    }

    function handleUploadFile(e) {
        // e.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                let csvOutput = event.target.result;
                let date = new Date().toISOString().slice(0, 23);
                console.log('csvOutput', csvOutput);
                console.log('file', file);
                const csvHeader = csvOutput.slice(0, csvOutput.indexOf("\r\n")).split(",");
                const csvRows = csvOutput.slice(csvOutput.indexOf("\n") + 1).split(/\r?\n/).filter(element => element);

                const array = csvRows.map(row => {
                    const values = row.split(",");
                    const obj = csvHeader.reduce((object, header, index) => {
                        object[header] = values[index];
                        return object;
                    }, {});
                    console.log('CSV Object', obj);
                    return obj;
                });
                array.forEach(element => {
                    const codigo = randomCode();
                    console.log('Access Code', codigo);
                    let student = {
                        nombre: element.Nombres,
                        apellidos: element.Apellidos,
                        correo: element.Correo,
                        celular: element.Telefono,
                        surveySentDate: date,
                        RUT: element.RUT,
                        codigoAcceso: codigo,
                        answeredSurvey: false,
                        timesSent: 1,
                    };
                    console.log('Student Data:', student);
                    addStudents(student);
                });
            };
            fileReader.readAsText(file);
        }
        setIsDataLoaded(true);
    }

    console.log('isDataLoaded', isDataLoaded);
    if (isDataLoaded) {
        refresh();
    }

    function addStudents(student) {
        axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/seguimiento", student)
            .then(response => {
                console.log('Nombre', student.nombre);
                console.log('Codigo', student.codigoAcceso);
                console.log('Correo', student.correo);
                sendEmail(student.nombre, student.codigoAcceso, student.correo);
            });
    }

    function sendEmail(name, code, email) {
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            { to_name: name, message: code, to_email: email },
            process.env.REACT_APP_PUBLIC_KEY
        ).then(
            result => console.log('result', result.text),
            error => console.log('error', error.text)
        );
    }

    function resendEmail(name, code, email) {
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            { to_name: name, message: code, to_email: email },
            process.env.REACT_APP_PUBLIC_KEY)
            .then(result => {
                setSendEmailMsg(SENT_EMAIL_MESSAGE);
            })
            .catch(error => {
                console.log('error', error.text);
                setSendEmailMsg(ERROR_SENT_EMAIL_MESSAGE);
            });
    }

    function refresh() {
        setTimeout(function () {
            window.location.reload();
        }, 6000);
    }

    function refreshAfterTime(time) {
        setTimeout(function () {
            window.location.reload();
        }, time);
    }

    const downloadTemplate = ({ data }) => {
        const blob = new Blob(["\uFEFF" + data], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.download = 'template.csv';
        a.href = window.URL.createObjectURL(blob);
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvent);
        a.remove();
    };

    function randomCode() {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        // Create an array of 32-bit unsigned integers
        const randomValues = new Uint32Array(15);

        // Generate random values
        window.crypto.getRandomValues(randomValues);
        randomValues.forEach((value) => {
            result += characters.charAt(value % charactersLength);
        });
        return result;
    }

    function exportCSV(e) {
        e.preventDefault();
        let HEADERS = ['RUT', 'Nombres', 'Apellidos', 'Correo', 'Telefono'];
        downloadTemplate({ data: [...HEADERS] });
    }

    return (
        <Box justifyContent='center' sx={{ marginTop: '30px', marginInline: '30px', marginBottom: '30px' }}>
            <Stack>
                <AppBar position="static" sx={{ bgcolor: '#00498A', borderRadius: '7px', marginBottom: '10px' }} elevation={0}>
                    <Toolbar>
                        <Stack direction='row' spacing={2} >
                            <Tooltip title="Cargar archivo con nueva data" arrow>
                                <Button sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<FileDownloadDoneRoundedIcon />} className='appBarButton' variant="outlined" onClick={exportCSV}>
                                    Decargar Template
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cargar archivo con nueva data" arrow>
                                <span>
                                    <Button sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<FileUploadRoundedIcon />} className='appBarButton' component='label' variant="outlined" >
                                        Cargar Archivo
                                        <input hidden accept=".csv" type="file" onChange={handleFileChange} />
                                    </Button>
                                </span>
                            </Tooltip>
                            <Tooltip title="Enviar archivo al servidor" arrow>
                                <span>
                                    <Button sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<SendRoundedIcon />} disabled={!existingFile} className='appBarButton' variant="outlined" onClick={(e) => { handleUploadFile(e); }}>
                                        Enviar
                                    </Button>
                                </span>
                            </Tooltip>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={openAlert}
                    onClose={handleSnackClose}
                    autoHideDuration={6000}
                >
                    <Alert onClose={handleSnackClose} severity="info" sx={{ width: '100%' }}>
                        {sendEmailMsg}
                    </Alert>
                </Snackbar>
                <StripedDataGrid
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    rows={tableData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowHeight={90}
                    hideFooterPagination={false}
                    disableRowSelectionOnClick
                    getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                />
            </Stack>
        </Box>
    );

};