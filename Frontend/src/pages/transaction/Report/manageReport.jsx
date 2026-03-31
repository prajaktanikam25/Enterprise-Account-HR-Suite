import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { BASE_URL } from '../../../utils/constant';
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    Button,
    Select,
    MenuItem,
    FormControl,
    TableHead,
    IconButton,
    TableRow,
} from '@mui/material';
import ManageDeduct from './deduct';

const MAnageReport = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [open1, setOpen1] = useState(false);
    const [obj, setObj] = useState(null)

    const handleClickOpen = (row, report) => {
        row.report = report
        setObj(row)
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
    const [APIDataReport, setAPIDataReport] = useState({})
    const [APIDataIncome, setAPIDataIncome] = useState([])
    const [APIDataExpense, setAPIDataExpense] = useState([])
    const role = localStorage.getItem('role')
    const [organization, setOrganization] = useState(org)

    const [deduction, setDeduction] = useState([])

    const getDeductionData = async (orgName) => {
        axios.get(BASE_URL + `/getDeduction`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                // console.log(res.data)
                if (res.data[i].organization == orgName) {
                    array1.push({ label: res.data[i].purpose, per: res.data[i].percentage, id: res.data[i]._id })
                }
            }
            setDeduction(array1);
        });
    }

    const getIncomeData = async () => {
        if (role == "Admin" || "Accountant") {
            await axios.get(BASE_URL + `/report?org=` + organization)
                .then((response) => {

                    setAPIData(response.data);
                }
                );

            await axios.get(BASE_URL + `/report-income`)
                .then((response) => {
                    setAPIDataIncome(response.data);
                }
                );
            await axios.get(BASE_URL + `/report-expense`)
                .then((response) => {
                    setAPIDataExpense(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/report?org=` + org)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
            await axios.get(BASE_URL + `/report-income?org=` + org)
                .then((response) => {
                    setAPIDataIncome(response.data);
                }
                );
            await axios.get(BASE_URL + `/report-expense?org=` + org)
                .then((response) => {
                    setAPIDataExpense(response.data);
                }
                );
        }
        await axios.get(BASE_URL + `/getDeductReport`)
            .then((response) => {

                setAPIDataReport(response.data);
            }
            );
    }

    const finalOutput = (row) => {
        for (var j = 0; j < deduction.length; j++) {
            for (var i = 0; i < APIDataReport.length; i++)
                // console.log(APIDataReport[i])
                if (APIDataReport[i]) {
                    console.log(deduction[j])
                    // console.log(item.label, APIDataReport[i].deductionLabel)
                    if (deduction[j].label == APIDataReport[i].deductionLabel &&
                        row._id.organization == APIDataReport[i].organization &&
                        row._id.month == APIDataReport[i].month &&
                        row._id.year == APIDataReport[i].year) {
                        return <>
                            {APIDataReport[i].deductionAmount}
                        </>;
                    }

                    else {
                        return <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleClickOpen(deduction[j], row)}>
                                Deduction
                            </Button>
                        </>
                    }
                }
                else {
                    console.log("rohit")
                    return (<>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleClickOpen(deduction[j], row)}>
                            Deduction
                        </Button>
                    </>)
                }
        }

    }

    useEffect(() => {
        getIncomeData()
    }, [APIData]);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];


    return (
        <div className='flex flex-col gap-10'>
            {/* <TableOne />
                <TableTwo /> 
            */}
            {role == "Admin" ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "40%" }} size="small">
                                <Select
                                    value={organization}
                                    onChange={(e) => {
                                        setOrganization(e.target.value);
                                        getDeductionData(e.target.value)
                                    }}
                                >
                                    <MenuItem value="BooStock">BooStock</MenuItem>
                                    <MenuItem value="I Tech Mentor">I Tech Mentor</MenuItem>
                                    <MenuItem value="Unity share">Unity Share</MenuItem>
                                    <MenuItem value="My self">My self</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </>) : (<></>)
            }
            <h3>Overall Organization Report</h3>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Month & Year </TableCell>
                            <TableCell align="center">Organization </TableCell>
                            <TableCell align="center">Total Income</TableCell>
                            <TableCell align="center">Total Expense</TableCell>
                            <TableCell align="center">Total GST Amount</TableCell>
                            <TableCell align="center">Profit/Loss</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {deduction.map((row, index) => {
                                return (
                                    <TableCell key={index} align="center">{row.label}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((row, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{monthNames[row._id.month - 1]}-{row._id.year}</TableCell>
                                    <TableCell align="center">{row._id.organization}</TableCell>
                                    <TableCell align="center">
                                        ₹ {row.income.length != 0 ? row.income[0].total_income : 0}
                                    </TableCell>
                                    <TableCell align="center">₹ {row.expense}</TableCell>
                                    <TableCell align="center">₹ {row.income.length != 0 ? row.income[0].total_GST : 0}</TableCell>
                                    <TableCell align="center">
                                        ₹ {row.income.length != 0 ? <>{row.income[0].total_income - row.expense}</> : <>{0 - row.expense}</>}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.income.length != 0 ? <>
                                            {(function () {
                                                if ((row.income[0].total_income - row.expense) < 0) {
                                                    return <Chip label="Loss" color="error" />;
                                                }
                                                else if ((row.income[0].total_income - row.expense) > 0) {
                                                    return <Chip label="Profit" color="success" />
                                                }
                                                else {
                                                    return <Chip label="No Loss" color="warning" />
                                                }
                                            })()}
                                        </> : <Chip label="Loss" color="error" />}

                                    </TableCell>

                                    {/* {deduction.map((item, index) => {

                                        return ( */}
                                    <TableCell align="center">
                                        {finalOutput(row)}
                                    </TableCell>

                                    {/* )


                                    })} */}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <h4>Organization Wise Income & Expense Report</h4>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Month & Year </TableCell>
                                    <TableCell align="center">Organization </TableCell>
                                    <TableCell align="center">Total Income</TableCell>
                                    <TableCell align="center">Total GST Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {APIDataIncome.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{monthNames[row.month - 1]} {row.year}</TableCell>
                                            <TableCell align="center">{row.organization}</TableCell>
                                            <TableCell align="center">₹ {row.total_income_month}</TableCell>
                                            <TableCell align="center">₹ {row.total_gst_income}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Month & Year </TableCell>
                                    <TableCell align="center">Organization </TableCell>
                                    <TableCell align="center">Total Expense</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {APIDataExpense.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{monthNames[row.month - 1]} {row.year}</TableCell>
                                            <TableCell align="center">{row.organization}</TableCell>
                                            <TableCell align="center">₹ {row.total_expense_month}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog open={open1} maxWidth={'md'} fullWidth >
                <DialogTitle>Apply Deduction for
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
                    <ManageDeduct theDedcutData={obj} handleClose={handleClose1}></ManageDeduct>
                </DialogContent>
            </Dialog>
        </div >

    )
}

export default MAnageReport;