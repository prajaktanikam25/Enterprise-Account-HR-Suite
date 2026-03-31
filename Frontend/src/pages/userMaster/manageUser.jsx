import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { BASE_URL } from '../../utils/constant';
import AddUser from './addUser';
import EditUser from './editUser';


const ManageUser = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate()

    const changePage = () => {
        navigate('/addExpense')
    }
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
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

    const getUserMaster = async () => {
        await axios.get(BASE_URL + `/getUser`)
            .then((response) => {
                setAPIData(response.data);
                // console.log(APIData)
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

    const [openSnak, setOpenSnak] = useState(false);

    const handleClickSnak = (row) => {
        axios.delete(BASE_URL + `/deleteUser/` + row._id)
        setOpenSnak(true);
    };

    const handleCloseSnak = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnak(false);
    };

    useEffect(() => {
        getUserMaster()
    }, [open1, show, openSnak]);

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
                                <TableCell>Emp Id</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Mobile Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">User Name</TableCell>
                                {/* <TableCell align="center">Status</TableCell> */}
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
                                            {index + 101}
                                        </TableCell>
                                        <TableCell align="center">{row.fname} {row.lname}</TableCell>
                                        <TableCell align="center">{row.mobile}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.role}</TableCell>
                                        <TableCell align="center">{row.userName}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleShow(row)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleShow(row)}>
                                                <LockResetIcon />
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
            </div>
            <Dialog open={open1} fullWidth>
                <DialogTitle>Add User Master
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
                    <AddUser handleClose={handleClose1}></AddUser>
                </DialogContent>
            </Dialog>

            {/* Edit Page */}
            <Dialog open={show} fullWidth>
                <DialogTitle>Edit User Master
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
                    <EditUser handleClose={CloseEdit} theViewData={obj1} ></EditUser>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default ManageUser;