import React, { useState, useEffect } from 'react';
import { Button, Chip, Grid, Pagination } from '@mui/material';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import { BASE_URL } from '../../../utils/constant';
import EmpAttendence from './employeeAttendence';
import CheckOut from './logoutAttendence';


const ManageEmployeeAttendenceLog = () => {

    const [anchorEl, setAnchorEl] = useState(null);

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
    function createData(no, name, amount, cat, org, protein) {
        return { no, name, amount, cat, org, protein };
    }
    const role = localStorage.getItem('role')
    const fullName = localStorage.getItem('name')

    var names = fullName.split(' ');


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])
    const [page, setPage] = useState(1);
    const [no_of_pages, setNoOfPages] = useState(0)

    const getDepartmentData = async () => {
        if (role == "Employee") {
            await axios.get(BASE_URL + `/getAttendence?page=${page}&fname=` + names[0])
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/getAttendence?page=${page}`)
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }

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
    }, [show, open1, APIData]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
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
                        <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen}>LOG In</Button>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No</TableCell>
                            <TableCell align="center">Organization</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Employee Name</TableCell>
                            <TableCell align="center">Check In Time</TableCell>
                            <TableCell align="center">Check Out Time</TableCell>
                            <TableCell align="center">Attendence</TableCell>
                            <TableCell align="center">Status</TableCell>
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
                                        AL-{index + 101}
                                    </TableCell>
                                    <TableCell align="center">{row.organization}</TableCell>
                                    <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell align="center">{row.fname} {row.lname}</TableCell>
                                    <TableCell align="center">
                                        {new Date(row.checkInTime).toLocaleTimeString('en-GB')}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.checkOut) {
                                                return <> {new Date(row.checkOut).toLocaleTimeString('en-GB')}</>;
                                            }

                                            else {
                                                return <>-</>
                                            }
                                        })()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.attendence == 0) {
                                                return <Chip label="Absent" color="error" />;
                                            }
                                            else if (row.attendence == 1) {
                                                return <Chip label="Present" color="success" />;
                                            }
                                            else if (row.attendence == 2) {
                                                return <Chip label="Half-Day" color="warning" />;
                                            }
                                            else if (row.attendence == 3) {
                                                return <Chip label="Late Mark" />;
                                            }
                                            else {
                                                return <Chip label="Leave" />
                                            }
                                        })()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.isApproved == "Verified") {
                                                return <Chip label="Verified" color="success" />;
                                            }
                                            else {
                                                return <Chip label="Waiting" color="warning" />
                                            }
                                        })()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.disableLogout == 0) {
                                                return <IconButton onClick={() => handleShow(row)} style={{ color: 'red' }}>
                                                    <LogoutIcon />
                                                </IconButton>;
                                            }
                                            else {
                                                return <IconButton style={{ color: 'green' }}>
                                                    <DoneIcon />
                                                </IconButton>
                                            }
                                        })()}

                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={no_of_pages}
                    page={page} onChange={handlePageChange}
                    color="primary"
                />
            </div>
            <Dialog open={open1} fullWidth maxWidth='md'>
                <DialogTitle>Attendence
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
                    <EmpAttendence handleClose={handleClose1}></EmpAttendence>
                </DialogContent>
            </Dialog>
            {/* Edit  Department */}
            <Dialog open={show} fullWidth>
                <DialogTitle>It's Time to say Good Bye
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
                    <CheckOut handleClose={CloseEdit} thelogoutData={obj1}></CheckOut>
                </DialogContent>
            </Dialog>
        </div>



    )
}

export default ManageEmployeeAttendenceLog;