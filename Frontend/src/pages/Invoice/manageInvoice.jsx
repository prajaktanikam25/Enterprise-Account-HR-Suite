import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Popover } from '@mui/material';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
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

import { BASE_URL } from '../../utils/constant';
import ViewInvoice from './viewInvoice';




const ManageInvoice = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [obj1, setObj1] = useState(null);
    const [open1, setOpen1] = useState(false);

    const handleClickOpen = (row) => {
        setOpen1(true);
        setObj1(row)
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
        await axios.get(BASE_URL + `/getInvoice`)
            .then((response) => {
                setAPIData(response.data);
                console.log(response)
            }
            );
    }

    useEffect(() => {
        getDepartmentData()
    }, [APIData]);


    const navigate = useNavigate()
    const changePage = () => {
        navigate('/addInvoice');
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice No</TableCell>
                                <TableCell align="center">Client Name</TableCell>
                                <TableCell align="center">Mobile Number </TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Total Amount </TableCell>

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
                                            INV-{index + 1001}
                                        </TableCell>
                                        <TableCell align="center">{row.billerName}</TableCell>
                                        <TableCell align="center">{row.clientContact}</TableCell>
                                        <TableCell align="center">{row.clientEmail}</TableCell>
                                        <TableCell align="center">{row.totalAmount}</TableCell>


                                        <TableCell align="center">
                                            <IconButton onClick={() => handleClickOpen(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <Dialog open={open1} fullWidth maxWidth={'md'}>
                <DialogTitle>View Invoice
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
                    <ViewInvoice theViewInvoice={obj1} handleClose={handleClose1} />
                </DialogContent>
            </Dialog>
        </DefaultLayout>

    )
}

export default ManageInvoice;