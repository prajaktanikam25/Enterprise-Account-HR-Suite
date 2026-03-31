import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Divider, Grid, Popover } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';


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
import AddDeduction from './addDeduction';
import { BASE_URL } from '../../../utils/constant';
import EditDeduction from './editDeduction';


const ManageDeduction = () => {

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

    const getIncomeData = async () => {
        await axios.get(BASE_URL + `/getDeduction`)
            .then((response) => {
                setAPIData(response.data);
                console.log(APIData)
            }
            );
    }
    useEffect(() => {
        getIncomeData()
    }, [APIData]);
    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const CloseEdit = () => setShow(false);
    const handleShow = (row) => {
        setObj1(row);
        setShow(true);
    };

    return (
        <div className='flex flex-col gap-10'>
            {/* <TableOne />
                <TableTwo /> */}
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
                            <TableCell>Sr No</TableCell>
                            <TableCell align="center">Organization</TableCell>
                            <TableCell align="center">Department </TableCell>
                            <TableCell align="center">Purpose </TableCell>
                            <TableCell align="center">Percentage (%)</TableCell>
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
                                        DEDUCT-{index + 11}
                                    </TableCell>
                                    <TableCell align="center">{row.organization}</TableCell>
                                    <TableCell align="center">{row.department}</TableCell>
                                    <TableCell align="center">{row.purpose}</TableCell>
                                    <TableCell align="center">{row.percentage}</TableCell>

                                    <TableCell align="center">
                                        <IconButton onClick={() => handleShow(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open1} fullWidth>
                <DialogTitle>Add Deduction
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
                    <AddDeduction handleClose={handleClose1} ></AddDeduction>
                </DialogContent>

            </Dialog>
            {/* Edit Commission */}
            <Dialog open={show}  fullWidth>
                <DialogTitle>Edit Deduction
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
                    <EditDeduction handleClose={CloseEdit} theEditData={obj1}></EditDeduction>
                
                </DialogContent>
            </Dialog>
        </div>


    )
}

export default ManageDeduction;