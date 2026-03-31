import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import TableContainer from '@mui/material/TableContainer';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import AddHoliday from './addHoliday';
import EditHoliday from './editHoliday';




const ManageHolidayList = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [open1, setOpen1] = useState(false);
    const [obj, setObj] = useState(null)

    const handleClickOpen = (row) => {
        setObj(row)
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const role = localStorage.getItem('role')

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])

    const getDepartmentData = async () => {
        await axios.get(BASE_URL + `/getAllHoliday`)
            .then((response) => {
                setAPIData(response.data);
            }
            );
    }

    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const CloseEdit = () => setShow(false);
    const handleShow = (row) => {
        setObj1(row);
        setShow(true);
    };

    useEffect(() => {
        getDepartmentData()
    }, [open1, show]);

    return (


        <div className='flex flex-col gap-10'>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={10} sm={10} lg={11}>
                        <input
                            type='text'
                            placeholder='Search Here'
                            style={{ backgroundColor: 'white' }}
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </Grid>
                    <Grid item xs={4} md={2} sm={2} lg={1}>
                        <Button aria-describedby={id} variant="contained" onClick={handleClickOpen} size='large' >Add</Button>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Month/Year</TableCell>
                            <TableCell align="center">Sunday</TableCell>
                            <TableCell align="center">Holidays</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((row, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="center">{row.name} - {row.year}</TableCell>
                                    <TableCell align="center">{row.sunday}</TableCell>
                                    <TableCell align="center">{row.holiday}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>

                                    <TableCell align="center">
                                        <IconButton onClick={() => handleShow(row)}>
                                            <EditIcon></EditIcon>
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open1} fullWidth>
                <DialogTitle>Create Monthly Holiday
                    <IconButton
                        aria-label="close"
                        onClick={handleClose1}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,

                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <AddHoliday handleClose={handleClose1}></AddHoliday>
                </DialogContent>

            </Dialog>

            {/* Edit Data */}
            <Dialog open={show} fullWidth>
                <DialogTitle>Update Monthly Holiday
                    <IconButton
                        aria-label="close"
                        onClick={CloseEdit}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,

                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <EditHoliday theEditData={obj1} handleClose={CloseEdit}></EditHoliday>
                </DialogContent>

            </Dialog>
        </div>



    )
}

export default ManageHolidayList;