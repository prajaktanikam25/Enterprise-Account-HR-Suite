import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Popover } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Paper from '@mui/material/Paper';
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Chip,
    TableRow,
} from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import Salary from './salary';


const ManageAttendenceReport = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate()

    const [open1, setOpen1] = useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const org = localStorage.getItem('org')
    const [APIData, setAPIData] = useState([])

    const role = localStorage.getItem('role')
    const [searchValue, setSearchValue] = useState('')

    const getAttendenceData = async () => {
        if (role == "Manager") {
            await axios.get(BASE_URL + `/total-attendence?name=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/total-attendence?name=${searchValue}`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
    }

    const searchData = async (searchString) => {
        if (searchString) {
            setSearchValue(searchString)
        }
        else {
            setSearchValue('')
        }
    }

    useEffect(() => {
        getAttendenceData()
    }, [searchValue]);

    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const CloseEdit = () => setShow(false);
    const handleShow = (row) => {
        setObj1(row);
        setShow(true);
    };
    return (

        <>

            <div className='flex flex-col gap-10'>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={10} sm={10} lg={11}>
                            <input
                                type='text'
                                placeholder='Search Here'
                                style={{ backgroundColor: 'white' }}
                                onChange={(e) => searchData(e.target.value)}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sm={2} lg={1}>

                            <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Attendence ID</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Present Day</TableCell>
                                <TableCell align="center">Absent Day</TableCell>
                                <TableCell align="center">Half Day</TableCell>                              
                                <TableCell align="center">Late Mark</TableCell>                              
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
                                        <TableCell component="th" scope="row">
                                            AR-{index + 1001}
                                        </TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        <TableCell align="center">{row.fname + " " + row.lname} </TableCell>
                                        <TableCell align="center">{row.present}</TableCell>
                                        <TableCell align="center">{row.absent}</TableCell>

                                        <TableCell align="center">{row.half_day}</TableCell>
                                        <TableCell align="center">{row.latemark}</TableCell>
                                  
                                      
                                        <TableCell align="center">
                                            <Button onClick={() => handleShow(row)} size='small' variant='contained'> Calculate</Button>&nbsp;

                                            {/* <IconButton onClick={() => handleShow(row)}>
                                                <VisibilityIcon />
                                            </IconButton> */}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open1} fullWidth>
                    <DialogTitle>Salary Slip
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
                        {/* <AddLoan handleClose={handleClose1}></AddLoan> */}
                    </DialogContent>

                </Dialog>

                {/* Edit Data */}
                <Dialog open={show} fullWidth>
                    <DialogTitle>Salary Generation
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
                        <Salary theEditData={obj1} handleClose={CloseEdit}></Salary>
                        {/* <EditLoan theEditData={obj1} handleClose={CloseEdit}></EditLoan> */}
                    </DialogContent>

                </Dialog>
            </div>



        </>

    )
}

export default ManageAttendenceReport;