import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Popover } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
import AddLoan from './addLoan';
import EditLoan from './editLoan';
import StudentOnboardingForm from './student';



const ManageOrganzation = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate()

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

    const getLoanData = async () => {
        await axios.get(BASE_URL + `/getLoan`)
            .then((response) => {
                setAPIData(response.data);
                // console.log(response.data)
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

    useEffect(() => {
        getLoanData()
    }, [show, open1]);

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
                            <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Loan ID</TableCell>
                                <TableCell align="center">Organization Name</TableCell>
                                <TableCell align="center">Department Name</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Loan Type</TableCell>
                                <TableCell align="center">Disbursed Amount</TableCell>
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
                                            Loan-{index + 1001}
                                        </TableCell>
                                        <TableCell align="center">{row.organization}</TableCell>
                                        <TableCell align="center">{row.department}</TableCell>
                                        <TableCell align="center">{row.employee}</TableCell>
                                        <TableCell align="center">{row.loanType}</TableCell>
                                        <TableCell align="center">{row.disbursedAmt}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleShow(row)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}    
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <StudentOnboardingForm></StudentOnboardingForm> */}
                <Dialog open={open1} fullWidth>
                    <DialogTitle>Loan Request
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
                        <AddLoan handleClose={handleClose1}></AddLoan>
                    </DialogContent>

                </Dialog>

                {/* Edit Data */}
                <Dialog open={show} fullWidth>
                    <DialogTitle>View Loan Detail's
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
                        <EditLoan theEditData={obj1} handleClose={CloseEdit}></EditLoan>
                    </DialogContent>

                </Dialog>
            </div>

        </DefaultLayout>

    )
}

export default ManageOrganzation;