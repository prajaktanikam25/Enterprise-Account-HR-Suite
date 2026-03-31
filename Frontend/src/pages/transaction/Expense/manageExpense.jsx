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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
    Box,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    Chip,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import AddExpense from './addExpense';
import EditExpense from './editExpense';
import StatusExpense from './statusExpense';
import ImportExpense from './importExpense';
import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ManageExpense = () => {


    const [open1, setOpen1] = useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [APIData, setAPIData] = useState([])
    const [MonthWise, setMonthWise] = useState([])
    const org = localStorage.getItem('org')
    const [onType, setOnType] = useState("")
    const getExpenseData = async () => {
        if (role == "Admin") {
            await axios.get(BASE_URL + `/getExpense?name=&search=Waiting`)
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

    const searchData = async (searchString) => {
        if (searchString) {
            // console.log("inside")
            await axios.get(BASE_URL + `/getExpense?name=&search=${searchString}`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            getExpenseData()
        }
    }

    const filterData = async (type) => {
        await axios.get(BASE_URL + `/getExpense?name=&search=${type ? type : 'Waiting'}`)
            .then((response) => {
                setAPIData(response.data);
            }
            );
        handleClose()
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
    const MonthWiseData = async () => {
        await axios.get(BASE_URL + `/monthwise-report-expence`)
            .then((response) => {
                setMonthWise(response.data);
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
    // Import Dialog
    const [showImport, setShowImport] = useState(false);
    //Dialog Form
    const CloseImport = () => setShowImport(false);
    const handleShowImport = () => {
        setShowImport(true);
    };

    const role = localStorage.getItem('role')
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    useEffect(() => {
        getExpenseData()
        MonthWiseData()
        filterData()
    }, [open1, show, show2, showImport, onType]);

    return (
        <div className='flex flex-col gap-10'>
            {/* <TableOne />
                <TableTwo /> */}
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8} sm={10} lg={8}>
                        <input
                            type='text'
                            placeholder='Search Here'
                            style={{ backgroundColor: 'white' }}
                            onChange={(e) => searchData(e.target.value)}
                            className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />
                    </Grid>
                    <Grid item xs={6} md={10} sm={2} lg={4}>
                        <Button variant="contained" size='large' onClick={handleShowImport}>Import</Button>&nbsp;
                        <Button variant="contained" size='large' onClick={handleClickOpen}>Add</Button>&nbsp;
                        <Button
                            id="demo-customized-button"
                            size='large'
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Filter
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => { filterData('Waiting') }} disableRipple>
                                Waiting
                            </MenuItem>
                            <MenuItem
                                onClick={() => { filterData('Approved') }} disableRipple>
                                Approved
                            </MenuItem>
                            <MenuItem
                                onClick={() => { filterData('Reject') }} disableRipple>
                                Reject
                            </MenuItem>
                        </StyledMenu>

                    </Grid>
                </Grid>
            </Box>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5'>
                {MonthWise.map((item, index) => (
                    <Grid item xs={12} md={8} key={index}>
                        <div className='rounded-sm border border-stroke bg-white py-6 px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <CalendarMonthIcon style={{ fontSize: "50px" }} />
                                </Grid>
                                <Grid item xs={8}>
                                    <h5 className='text-title-sm font-bold text-black dark:text-white'>
                                        {monthNames[item.month - 1]}
                                    </h5>
                                    <h5 className='text-title-sm text-black dark:text-white' style={{ color: "red" }}>
                                        ₹ {item.total_expense_month}
                                    </h5>
                                    {/* <span className='text-sm font-medium'><b>({item.organization})</b></span> */}
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ))}
            </div>
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
                            if (row.isDeleted == 0) {
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
                                        <TableCell align="center">₹ {row.amount}</TableCell>
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
                                                <IconButton onClick={() => handledelete(row)}>
                                                    <DeleteIcon />
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

export default ManageExpense;