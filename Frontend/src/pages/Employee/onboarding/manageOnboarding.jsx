import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Popover } from '@mui/material';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
    Box,
    Alert,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Snackbar,
    TableRow,
} from '@mui/material';
import AddOnboarding from './addOnboarding';
import { BASE_URL } from '../../../utils/constant';
import ViewOnboarding from './viewOnboarding';
import EditOnboarding from './editOnboading';



const ManageOnboarding = () => {

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


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])

    const getDepartmentData = async () => {
        await axios.get(BASE_URL + `/getEmployee`)
            .then((response) => {
                setAPIData(response.data);
                // console.log(response)
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

    const [obj2, setObj2] = useState(null);
    const [show2, setShow2] = useState(false);
    //Dialog Form
    const CloseEdit2 = () => setShow2(false);
    const handleShow2 = (row) => {
        setObj2(row);
        setShow2(true);
    };
    const [openSnak, setOpenSnak] = useState(false);

    const handleClickSnak = (row) => {
        axios.delete(BASE_URL + `/deleteEmp/` + row._id)
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
    }, [open1, show, show2, openSnak]);

    const navigate = useNavigate()
    const changePage = () => {
        navigate('/emp-onboard')
    }
    return (

        <DefaultLayout>
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
                            <Button aria-describedby={id} variant="contained" size='large' onClick={changePage}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Emp Code</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Mobile Number</TableCell>
                                <TableCell align="center">Designation</TableCell>
                                <TableCell align="center">Date of Joining</TableCell>
                                <TableCell align="center">Organization </TableCell>
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
                                            EMP-{index + 801}
                                        </TableCell>
                                        <TableCell align="center">{row.firstName} {row.lastName}</TableCell>
                                        <TableCell align="center">{row.mobileNo}</TableCell>
                                        <TableCell align="center">{row.designation}</TableCell>
                                        <TableCell align="center">{new Date(row.date_of_joining).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleShow(row)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleShow2(row)}>
                                                <EditIcon />
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
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open1} fullWidth maxWidth='lg'>
                    <DialogTitle>Employee Onboarding
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
                        <AddOnboarding handleClose={handleClose1} />
                    </DialogContent>
                </Dialog>
                {/* Edit  Department */}
                <Dialog open={show} fullWidth>
                    <DialogTitle>View Employee Detail's
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
                        <ViewOnboarding handleClose={CloseEdit} theEditData={obj1}></ViewOnboarding>
                    </DialogContent>
                </Dialog>

                <Dialog open={show2} fullWidth maxWidth={'md'}>
                    <DialogTitle>Edit Employee Detail's
                        <IconButton
                            aria-label="close"
                            onClick={CloseEdit2}
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
                        <EditOnboarding handleClose={CloseEdit2} theUpdateData={obj2}></EditOnboarding>
                    </DialogContent>
                </Dialog>
            </div>

        </DefaultLayout>

    )
}

export default ManageOnboarding;