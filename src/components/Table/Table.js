// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ActionButton from '../ActionButton/ActionButton';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import './Table.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

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

    React.useEffect(() => {

        async function fetchData() {
            const { data: respose } = await axios.get("http://localhost:3030/api/seguimiento");
            setTableData(respose);
        }

        fetchData();

    }, [])

    return (
        <Box justifyContent='center' sx={{ marginTop: '30px', marginInline: '30px' }}>
            <AppBar position="static" sx={{ bgcolor: '#00498A', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }} elevation={0}>
                <Toolbar>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <div>
                        <input
                            accept=".csv"
                            type="file"
                            id="select-image"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="select-image">
                            <Tooltip title="Cargar archivo con nueva data" arrow>
                                <Button sx={{ my: 2, color: 'white', display: 'block', borderColor: 'white', borderWidth: '1px' }}
                                    className='appBarButton' variant="outlined">
                                        Subir Archivo
                                </Button>
                            </Tooltip>
                        </label>
                    </div>
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
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
            {/* <TableContainer component={Paper}>
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
            </TableContainer> */}
        </Box>
    )

}

export default TableTracking;