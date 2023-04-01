import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';


const columns = [
    // { field: '_id', headerName: 'Id', width: 70 },
    { field: 'nombre', headerName: 'Nombres', width: 70 },
    { field: 'apellidos', headerName: 'Apellidos', width: 70 },
    { field: 'correo', headerName: 'Correo', width: 200 },
    { field: 'surveySentDate', headerName: 'Fecha de Encuesta Enviada', width: 70 },
    { field: 'answeredSurvey', headerName: 'Encuesta Respondida', width: 70 },
    { field: 'timesSent', headerName: 'Veces Enviada la Encuesta', width: 70 },
];

const TableTracking = () => {

    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:5005/api/seguimiento")
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])

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

    return (
        <Box display='flex' justifyContent='center' sx={{marginTop: '30px', marginInline: '30px'}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field} align='center'>{column.headerName}</TableCell>
                            ))}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map(data => {
                            console.log(data.surveySentDate);
                            console.log(Date(data.surveySentDate));
                            return (
                                <TableRow key={data.nombre}>
                                    <TableCell scope='row' align='left'>{data.nombre}</TableCell>
                                    <TableCell scope='row' align='left'>{data.apellidos}</TableCell>
                                    <TableCell scope='row' align='left'>{data.correo}</TableCell>
                                    <TableCell scope='row' align='center'>{formatDate(data.surveySentDate)}</TableCell>
                                    <TableCell scope='row' align='center'>{transformBooleanValue(data.answeredSurvey)}</TableCell>
                                    <TableCell scope='row' align='center'>{data.timesSent}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default TableTracking;