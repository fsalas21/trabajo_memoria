// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import { AppBar, Box, Button, Stack, Toolbar, Tooltip } from '@mui/material';
import ActionButton from '../ActionButton/ActionButton';
import FileDownloadDoneRoundedIcon from '@mui/icons-material/FileDownloadDoneRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
// import Papa from 'papaparse';
import './Table.css';

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

const columns = [
    { field: 'nombre', headerName: 'Nombres', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'correo', headerName: 'Correo', sorteable: false, flex: 1,align: 'center', headerAlign: 'center'},
    { field: 'surveySentDate', headerName: 'Fecha de Encuesta Enviada', flex: 1, align: 'center', valueFormatter: params =>  formatDate(params?.value), headerAlign: 'center' },
    { field: 'answeredSurvey', headerName: 'Encuesta Respondida', flex: 1, align: 'center', valueFormatter: params => transformBooleanValue(params?.value), headerAlign: 'center' },
    { field: 'timesSent', headerName: 'Veces Enviada la Encuesta', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'action', headerName: 'Acciones', flex: 1, sortable: false, renderCell : ActionButton, align: 'center', headerAlign: 'center' }

];

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

const TableTracking = () => {

    const [tableData, setTableData] = React.useState([]);
    const [file, setFile] = React.useState();
    const [existingFile, setExistingFile] = React.useState(false);

    const fileReader = new FileReader();

    React.useEffect(() => {
        async function fetchData() {
            const { data: response } = await axios.get("http://localhost:3030/api/seguimiento/");
            setTableData(response);
        }
        fetchData();
    }, []);

    // POST Estudiantes nuevos luego de agregar el CSV
    function addStudents(student) {
        axios.post("http://localhost:3030/api/seguimiento", student)
            .then(response => console.log('Añadidos', response));
    }

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
                let date = new Date().toISOString().slice(0,23)
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
                    return obj;
                });
                // setFileArray(array);
                console.log('array', array);
                array.forEach(element => {
                    let student = {
                        nombre: element.Nombres,
                        apellidos: element.Apellidos,
                        correo: element.Correo,
                        surveySentDate: date,
                        answeredSurvey: false,
                        timesSent: 1,
                    }
                    console.log('Nombre:', student);
                    addStudents(student);
                })

                // csvFileToArray(csvOutput);
            };
            fileReader.readAsText(file);
        }
    }

    const downloadTemplate = ({data}) => {
        const blob = new Blob([data], {type: 'text/csv'});
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
    }

    function exportCSV(e) {
        e.preventDefault();
        let HEADERS = ['Nombres', 'Apellidos', 'Correo'];
        downloadTemplate({data: [...HEADERS]});
    }

    return (
        <Box justifyContent='center' sx={{ marginTop: '30px', marginInline: '30px' }}>
            <AppBar position="static" sx={{ bgcolor: '#00498A', borderRadius: '7px', marginBottom: '10px' }} elevation={0}>
                <Toolbar>
                    <Stack direction='row' spacing={2} >
                        <Tooltip title="Cargar archivo con nueva data" arrow>
                            <Button sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<FileDownloadDoneRoundedIcon/>} className='appBarButton' variant="outlined" onClick={exportCSV}>
                                Decargar Template
                            </Button>
                        </Tooltip>
                        <Tooltip title="Cargar archivo con nueva data" arrow>
                            <span>
                                <Button sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<FileUploadRoundedIcon/>} className='appBarButton' component='label' variant="outlined" >
                                    Cargar Archivo
                                    <input hidden accept=".csv" type="file" onChange={handleFileChange} />
                                </Button>
                            </span>
                        </Tooltip>
                        <Tooltip title="Enviar archivo al servidor" arrow>
                            <span>
                                <Button  sx={{ my: 2, color: 'white', borderColor: 'white', borderWidth: '1px' }} startIcon={<SendRoundedIcon/>} disabled={!existingFile} className='appBarButton' variant="outlined" onClick={(e) => {handleUploadFile(e) }}>
                                    Enviar
                                </Button>
                            </span>
                        </Tooltip>
                    </Stack>
                    {/* <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, '& button': { m: 1 } }}>
                    </Box> */}
                </Toolbar>
            </AppBar>
            <StripedDataGrid
                autoHeight
                rows={tableData}
                columns={columns}
                getRowId={(row) => row._id}
                hideFooter
                disableRowSelectionOnClick
                density='comfortable'
                getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
            {/* <div>
                <table>
                    <thead>
                        <tr key={"header"}>
                            {headerKeys.map((key) => (
                            <th>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fileArray.map((item) => (
                            <tr key={item.id}>
                                {Object.values(item).map((val) => (
                                    <td>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </Box>
    )

}

export default TableTracking;