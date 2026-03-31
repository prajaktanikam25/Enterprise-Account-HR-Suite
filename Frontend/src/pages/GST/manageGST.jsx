import React, { useState, useEffect } from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import axios from 'axios';
import { Button, Divider, Grid, Popover } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
    Box,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { BASE_URL } from '../../utils/constant';

const ManageGst = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [open1, setOpen1] = useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    function createData(no, name, amount, cat, org, protein) {
        return { no, name, amount, cat, org, protein };
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])

    const getIncomeData = async () => {
        await axios.get(BASE_URL + `/getTaxation`)
            .then((response) => {
                setAPIData(response.data);

            }
            );
    }
    useEffect(() => {
        getIncomeData()
    }, [open1]);

    const role = localStorage.getItem('role')
    return (
        <>
            <DefaultLayout>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8} sm={10} lg={8}>
                            <input
                                type='text'
                                placeholder='Search Here'
                                style={{ backgroundColor: 'white' }}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </Grid>
                        <Grid item xs={6} md={10} sm={2} lg={4}>
                            <Button variant="contained" size='large' onClick={handleClickOpen}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No</TableCell>
                                <TableCell align="center">Date </TableCell>
                                <TableCell align="center">Purpose</TableCell>
                                <TableCell align="center">Total Amount</TableCell>
                                <TableCell align="center">GST Amount</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Status</TableCell>
                                {role == "Admin" ? (
                                    <TableCell align="center">Action</TableCell>) : (<></>)}
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
                                            TAX-{index + 101}
                                        </TableCell>
                                        <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{row.purpose}</TableCell>
                                        <TableCell align="center">₹ {row.totalAmount}</TableCell>
                                        <TableCell align="center">₹ {row.gstAmount}</TableCell>
                                        <TableCell align="center">{row.department}</TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        {role == "Admin" ? (
                                            <TableCell align="center">
                                                {(function () {
                                                    if (row.status == "Waiting") {
                                                        return <Chip label="Pending" color="warning" onClick={() => handleShow2(row)} />;
                                                    }
                                                    else if (row.status == "Not Received") {
                                                        return <Chip label="Not Received" color="error" onClick={() => handleShow2(row)} />
                                                    }
                                                    else {
                                                        return <Chip label="Recieved" color="success" onClick={() => handleShow2(row)} />
                                                    }
                                                })()}
                                            </TableCell >
                                        ) : (
                                            <TableCell align="center"> {(function () {
                                                if (row.status == "Waiting") {
                                                    return <Chip label="Pending" color="warning" />;
                                                }
                                                else if (row.status == "Not Received") {
                                                    return <Chip label="Not Received" color="error" />
                                                }
                                                else {
                                                    return <Chip label="Recieved" color="success" />
                                                }
                                            })()}
                                            </TableCell >
                                        )}
                                        {role == "Admin" ? (
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleShow(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        ) : (<></>)
                                        }


                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DefaultLayout>

        </>
    )
}

export default ManageGst;