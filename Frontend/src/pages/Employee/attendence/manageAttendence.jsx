import React, { useState, useEffect } from 'react';
import { Alert, Button, Chip, Grid, Pagination } from '@mui/material';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    Snackbar,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import { BASE_URL } from '../../../utils/constant';
import AddAttendence from './addAttendence';
import ViewAttendence from './ViewAttendence';
import EmpAttendence from './employeeAttendence';
import CheckOut from './logoutAttendence';


const ManageAttendenceLog = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [open1, setOpen1] = useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const [open12, setOpen12] = useState(false);

    const handleClickOpen1 = () => {
        setOpen12(true);
    };

    const handleClose12 = () => {
        setOpen12(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    function createData(no, name, amount, cat, org, protein) {
        return { no, name, amount, cat, org, protein };
    }
    const role = localStorage.getItem('role')
    const org = localStorage.getItem('org')

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])

    const [page, setPage] = useState(1);
    const [no_of_pages, setNoOfPages] = useState(0)

    const [searchValue, setSearchValue] = useState('')


    const getDepartmentData = async () => {
        if (role == "Employee") {
            await axios.get(BASE_URL + `/getAttendence?fname=Rohit`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else if (role == "Manager") {
            await axios.get(BASE_URL + `/getAttendence?search=${searchValue}&organization=` + org)
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/getAttendence?page=${page}&search=${searchValue}`)
                .then((response) => {
                    setAPIData(response.data.data);
                    setNoOfPages(response.data.totalPages)
                }
                );
        }
    }

    const searchData = async (searchString) => {
        if (searchString) {
            setPage(1)
            setSearchValue(searchString)
        }
        else {
            setSearchValue('')
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

    const [obj2, setObj2] = useState(null);
    const [show1, setShow1] = useState(false);
    //Dialog Form
    const CloseEdit1 = () => setShow1(false);
    const handleShow1 = (row) => {
        setObj2(row);
        setShow1(true);
    };
    const [openSnak, setOpenSnak] = useState(false);

    const handleClickSnak = (row) => {
        axios.delete(BASE_URL + `/deleteAttendence/` + row._id)
        setOpenSnak(true);
    };

    const handleCloseSnak = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnak(false);
    };
    useEffect(() => {
        getDepartmentData()
    }, [show, open1, open12, openSnak, show1, page, searchValue]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <div className='flex flex-col gap-11'>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={10} sm={10} lg={9}>
                        <input
                            type='text'
                            placeholder='Search Here'
                            style={{ backgroundColor: 'white' }}
                            onChange={(e) => searchData(e.target.value)}
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </Grid>
                    <Grid item xs={12} md={2} sm={2} lg={3}>
                        <Button aria-describedby={id} variant="contained" color='success' size='large' onClick={handleClickOpen}>Check IN</Button>&nbsp;
                        <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen1}>Attendence</Button>
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
                            {(function () {
                                if (role != "Employee") {
                                    return <>
                                        <TableCell align="center">Action</TableCell>
                                    </>
                                }
                                else {
                                    return <></>
                                }
                            })()}

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
                                        AL-{page * 10 - 10 + index + 101}
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
                                                return <>{new Date(row.checkOut).toLocaleTimeString('en-GB')}</>
                                            }

                                            else {
                                                return <>-</>
                                            }
                                        })()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.attendence == 0) {
                                                return <Chip label="Absent" color="error" />
                                            }
                                            else if (row.attendence == 1) {
                                                return <Chip label="Present" color="success" />
                                            }
                                            else if (row.attendence == 2) {
                                                return <Chip label="Half-Day" color="warning" />
                                            }
                                            else if (row.attendence == 3) {
                                                return <Chip label="Late Mark" />
                                            }
                                            else {
                                                return <Chip label="Leave" />
                                            }
                                        })()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(function () {
                                            if (row.isApproved == "Verified") {
                                                return <Chip label="Verified" color="success" />
                                            }
                                            else {
                                                return <Chip label="Waiting" color="warning" />
                                            }
                                        })()}
                                    </TableCell>
                                    {(function () {
                                        if (role != "Employee") {
                                            return <>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => handleShow(row)} >
                                                        <VisibilityIcon />
                                                    </IconButton>

                                                    {(function () {
                                                        if (row.disableLogout == 0) {
                                                            return <IconButton onClick={() => handleShow1(row)}>
                                                                <LogoutIcon />
                                                            </IconButton>
                                                        }
                                                        else {
                                                            return <IconButton style={{ color: 'green' }}>
                                                                <DoneIcon />
                                                            </IconButton>
                                                        }
                                                    })()}



                                                    <IconButton onClick={() => handleClickSnak(row)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <Snackbar open={openSnak} autoHideDuration={3000} onClose={handleCloseSnak}>
                                                        <Alert onClose={handleCloseSnak} severity="success" style={{ marginLeft: "280px" }}>
                                                            Record Deleted Succesfully
                                                        </Alert>
                                                    </Snackbar>

                                                </TableCell>
                                            </>
                                        }

                                        else {
                                            return <></>
                                        }
                                    })()}


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
                    {role == 'Admin' ? (<>  <AddAttendence handleClose={handleClose1} /></>) :
                        (<>
                            <EmpAttendence handleClose={handleClose1}></EmpAttendence>
                        </>)}


                </DialogContent>
            </Dialog>


            <Dialog open={open12} fullWidth maxWidth='md'>
                <DialogTitle>Attendence
                    <IconButton
                        aria-label="close"
                        onClick={handleClose12}
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
                    <AddAttendence handleClose={handleClose12} />
                </DialogContent>
            </Dialog>

            {/* Edit  Department */}
            <Dialog open={show} fullWidth>
                <DialogTitle>View Attendence Detail's
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
                    <ViewAttendence handleClose={CloseEdit} theEditData={obj1}></ViewAttendence>
                </DialogContent>
            </Dialog>

            <Dialog open={show1} fullWidth>
                <DialogTitle>It's Time to say Good Bye
                    <IconButton
                        aria-label="close"
                        onClick={CloseEdit1}
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
                    <CheckOut handleClose={CloseEdit1} thelogoutData={obj2}></CheckOut>
                </DialogContent>
            </Dialog>
        </div>



    )
}

export default ManageAttendenceLog;