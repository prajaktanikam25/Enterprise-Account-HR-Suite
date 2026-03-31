import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Alert,
    Snackbar,
    IconButton,
    Table,
    Chip,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import AddLeave from './addLeave';
import EditLeave from './editLeave';



const ManageLeave = () => {

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
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])
    const role = localStorage.getItem('role')
    const name = localStorage.getItem('name')
    const dept = localStorage.getItem('dept')

    const getLoanData = async () => {
        if (role == "Employee") {
            await axios.get(BASE_URL + `/getLeave?empName=` + name)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else if (role == "Manager") {
            await axios.get(BASE_URL + `/getLeave?organization=` + dept)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/getLeave`)
                .then((response) => {
                    setAPIData(response.data);
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

    const [openSnak, setOpenSnak] = useState(false);

    const handleClickSnak = (row) => {
        axios.delete(BASE_URL + `/deleteLeave/` + row._id)
        setOpenSnak(true);
    };

    const handleCloseSnak = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnak(false);
    };

    useEffect(() => {
        getLoanData()
    }, [show, openSnak]);
    return (

        <DefaultLayout>
            {role != null ? (<>
                <div className='flex flex-col gap-10'>
                    {role == "Admin" ? (<>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={12} sm={10} lg={12}>
                                    <input
                                        type='text'
                                        placeholder='Search Here'
                                        style={{ backgroundColor: 'white' }}
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </Grid>

                            </Grid>
                        </Box>

                    </>) : (<>
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
                                    <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen}>Add</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>)}

                    <TableContainer component={Paper}>
                        <Table sx={{ width: "100%" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Leave ID</TableCell>
                                    <TableCell align="center">Employee</TableCell>
                                    <TableCell align="center">Leave Reason</TableCell>
                                    <TableCell align="center">No of Days</TableCell>
                                    <TableCell align="center">Leave Start Date</TableCell>
                                    <TableCell align="center">Leave End Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    {(function () {
                                        if (role == "Admin" || role == "Manager" || role == "Accountant") {
                                            return <TableCell align="center">Action</TableCell>
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
                                                Leave-{index + 101}
                                            </TableCell>
                                            <TableCell align="center">{row.empName}</TableCell>
                                            <TableCell align="center">{row.leaveReason}</TableCell>
                                            <TableCell align="center">{row.no_of_days}</TableCell>
                                            <TableCell align="center">{row.startDate}</TableCell>
                                            <TableCell align="center">{row.endDate}</TableCell>
                                            <TableCell align="center">

                                                {(function () {
                                                    if (row.status == 0) {
                                                        return <> <Chip label="Approved" color="success" /></>
                                                    }
                                                    else if (row.status == 1) {
                                                        return <> <Chip label="Waiting" color="warning" /></>
                                                    }
                                                    else if (row.status == 2) {
                                                        return <> <Chip label="Cancel" /> </>
                                                    }
                                                    else {
                                                        return <><Chip label="Reject" color="error" /></>
                                                    }
                                                })()}

                                            </TableCell>
                                            {(function () {
                                                if (role == "Admin" || role == "Manager" || role == "Accountant") {
                                                    return <><TableCell align="center">
                                                        <IconButton onClick={() => handleShow(row)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
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
                    <Dialog open={open1} fullWidth>
                        <DialogTitle>Apply for Leave
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
                            <AddLeave handleClose={handleClose1}></AddLeave>
                        </DialogContent>

                    </Dialog>

                    {/* Edit Data */}
                    <Dialog open={show} fullWidth>
                        <DialogTitle>Apply For Leave
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
                            <EditLeave theEditData={obj1} handleClose={CloseEdit}></EditLeave>
                        </DialogContent>

                    </Dialog>
                </div>
            </>) : (<><div style={{ textAlign: 'center' }}>
                <h3>Please Login Properly ! You are not authorize to View Data</h3>
            </div></>)}
        </DefaultLayout>

    )
}

export default ManageLeave;