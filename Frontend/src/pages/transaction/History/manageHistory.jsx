import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Popover } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';

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
import AddIncome from '../Income/addIncome';
import { BASE_URL } from '../../../utils/constant';
import EditIncome from '../Income/editIncome';
import StatusIncome from '../Income/statusIncome';

const ManageHistory = () => {

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
    const org = localStorage.getItem('org')
    const [APIData, setAPIData] = useState([])

    const getIncomeData = async () => {
        if (role == "Admin") {
            await axios.get(BASE_URL + `/getIncome?name=`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else if (role == "Accountant") {
            await axios.get(BASE_URL + `/getIncome?name=`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/getIncome?name=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }

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
    const [obj2, setObj2] = useState(null);
    const [show2, setShow2] = useState(false);
    //Dialog Form
    const CloseEdit2 = () => setShow2(false);
    const handleShow2 = (row) => {
        setObj2(row);
        setShow2(true);
    };

   
    const role = localStorage.getItem('role')
    return (
        <div className='flex flex-col gap-10'>
            {/* <TableOne />
                <TableTwo /> 
            */}
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No</TableCell>
                            <TableCell align="center">Date </TableCell>
                            <TableCell align="center">Purpose</TableCell>
                            <TableCell align="center">Total Amount</TableCell>
                            <TableCell align="center">Recieved Amount</TableCell>
                            <TableCell align="center">GST Amount</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Organization</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {role == "Admin" ?
                                (
                                    <TableCell align="center">Action</TableCell>
                                ) : (<></>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((row, index) => {
                            if (row.isDeleted == 0 && row.status!="Waiting") {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            INC-{index + 101}
                                        </TableCell>
                                        <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{row.purpose}</TableCell>
                                        <TableCell align="center">₹ {row.totalAmount}</TableCell>
                                        <TableCell align="center">₹ {row.paidAmount}</TableCell>
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
                                            <>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => handleShow(row)}>
                                                        <EditIcon />
                                                    </IconButton>                                                   
                                                </TableCell>
                                            </>
                                        ) : (<></>)
                                        }
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open1} maxWidth={'md'} fullWidth >
                <DialogTitle>Add Income Detail's
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
                    <AddIncome handleClose={handleClose1} />
                </DialogContent>

            </Dialog>
            {/* Edit Page */}
            <Dialog open={show} maxWidth={'md'} fullWidth>
                <DialogTitle>Edit Department
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
                    <EditIncome handleClose={CloseEdit} theEditData={obj1} ></EditIncome>
                </DialogContent>
            </Dialog>

            {/* Status Change */}
            <Dialog open={show2} maxWidth={'md'} fullWidth>
                <DialogTitle>Approved Income
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
                    <StatusIncome handleClose={CloseEdit2} theStatusData={obj2}></StatusIncome>
                </DialogContent>
            </Dialog>

        </div>

    )
}

export default ManageHistory;