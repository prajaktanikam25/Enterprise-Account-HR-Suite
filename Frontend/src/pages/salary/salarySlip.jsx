import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableContainer from '@mui/material/TableContainer';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import ViewSalarySlip from './viewSalarySlip';



const ManageSalarySlip = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [open1, setOpen1] = useState(false);
    const [obj, setObj] = useState(null)

    const handleClickOpen = (row) => {
        setObj(row)
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
    const role = localStorage.getItem('role')

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])

    const getDepartmentData = async () => {
        await axios.get(BASE_URL + `/getSalarySlip`)
            .then((response) => {
                setAPIData(response.data);
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
        getDepartmentData()
    }, []);

    return (


        <div className='flex flex-col gap-10'>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No</TableCell>
                            <TableCell align="center">Employee Name</TableCell>
                            <TableCell align="center">Slip Generated Date</TableCell>
                            <TableCell align="center">Salary Amount</TableCell>
                            <TableCell align="center">Mode of Payment</TableCell>
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
                                        SAL {index + 101}
                                    </TableCell>
                                    <TableCell align="center">{row.empName}</TableCell>
                                    <TableCell align="center">{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell align="center">₹ {row.net_amount + row.incentive}</TableCell>
                                    <TableCell align="center">{row.mode_of_payment}</TableCell>

                                    <TableCell align="center">
                                        <IconButton onClick={() => handleClickOpen(row)}>
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    </TableCell>


                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open1} fullWidth maxWidth={'md'}>
                <DialogTitle >Salary Slip
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
                    <ViewSalarySlip theSalaryData={obj} handleClose={handleClose1}></ViewSalarySlip>
                </DialogContent>
            </Dialog>
        </div>



    )
}

export default ManageSalarySlip;