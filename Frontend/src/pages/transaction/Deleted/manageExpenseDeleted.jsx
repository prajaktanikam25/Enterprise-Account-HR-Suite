import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import { BASE_URL } from '../../../utils/constant';
import { Button, Grid, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    Chip,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import AddExpense from '../Expense/addExpense';
import EditExpense from '../Expense/editExpense';
import StatusExpense from '../Expense/statusExpense';
import ImportExpense from '../Expense/importExpense';


const ManageExpenseDeleted = () => {

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
    const org = localStorage.getItem('org')

    const getExpenseData = async () => {
        if (role == "Admin") {
            await axios.get(BASE_URL + `/getExpense?name=`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else if (role == "Accountant") {
            await axios.get(BASE_URL + `/getExpense?name=`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/getExpense?name=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
    }

    const handledelete = (row) => {
        const ExpenseData = {
            purpose: row.purpose,
            category: row.category,
            paymentMode: row.paymentMode,
            remark: row.remark,
            amount: row.amount,
            date: row.date,
            approved: row.approved,
            organization: row.organization,
            department: row.department,
            isDeleted: 1
        }
        axios.put(BASE_URL + '/updateExpense/' + row._id, ExpenseData)
    }


    useEffect(() => {
        getExpenseData()
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
    // Import Dialog
    const [showImport, setShowImport] = useState(false);
    //Dialog Form
    const CloseImport = () => setShowImport(false);
    const handleShowImport = () => {
        setShowImport(true);
    };

    const role = localStorage.getItem('role')

    return (
        <div className='flex flex-col gap-10'>
            {/* <TableOne />
                <TableTwo /> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No</TableCell>
                            <TableCell align="center">Pupose</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Organization</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {role == "Admin" ? (
                                <TableCell align="center">Action</TableCell>) : (<></>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((row, index) => {
                            if (row.isDeleted == 1) {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            EXP-{index + 1001}
                                        </TableCell>
                                        <TableCell align="center">{row.purpose}</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.department}</TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        {role == "Admin" ? (
                                            <TableCell align="center"> {(function () {
                                                if (row.status == "Waiting") {
                                                    return <Chip label="Waiting" color="warning" onClick={() => handleShow2(row)} />;
                                                }
                                                else if (row.status == "Reject") {
                                                    return <Chip label="Reject" color="error" onClick={() => handleShow2(row)} />
                                                }
                                                else {
                                                    return <Chip label="Approved" color="success" onClick={() => handleShow2(row)} />
                                                }
                                            })()}
                                            </TableCell>
                                        ) : (
                                            <TableCell align="center"> {(function () {
                                                if (row.status == "Waiting") {
                                                    return <Chip label="Waiting" color="warning" />;
                                                }
                                                else if (row.status == "Reject") {
                                                    return <Chip label="Reject" color="error" />
                                                }
                                                else {
                                                    return <Chip label="Approved" color="success" />
                                                }
                                            })()}
                                            </TableCell>

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
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open1} maxWidth={'md'} fullWidth>
                <DialogTitle>Add Expense Detail's
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
                    <AddExpense handleClose={handleClose1} />
                </DialogContent>
            </Dialog>
            {/* Edit Page */}
            <Dialog open={show} maxWidth={'md'} fullWidth>
                <DialogTitle>Edit Expense
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
                    <EditExpense handleClose={CloseEdit} theEditData={obj1}></EditExpense>
                </DialogContent>
            </Dialog>

            {/* Status Change */}
            <Dialog open={show2} maxWidth={'md'} fullWidth>
                <DialogTitle>Approved Expense
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
                    <StatusExpense handleClose={CloseEdit2} theStatusData={obj2}></StatusExpense>
                </DialogContent>
            </Dialog>
            {/* Import Dialog */}

            <Dialog open={showImport} fullWidth>
                <DialogTitle>Import Expense
                    <IconButton
                        aria-label="close"
                        onClick={CloseImport}
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
                    <ImportExpense handleClose={CloseImport}></ImportExpense>
                </DialogContent>
            </Dialog>
        </div>



    )
}

export default ManageExpenseDeleted;