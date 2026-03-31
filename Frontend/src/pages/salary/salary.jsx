import React, { useState, useEffect } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import {
    Grid, TextField, InputLabel, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import axios from "axios";

const Salary = ({ theEditData, handleClose }) => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0];

    const [empName, setEmpName] = useState(theEditData.fname + " " + theEditData.lname)
    const [department, setDepartment] = useState('')
    const [organization, setOrganization] = useState('')
    const [dateofjoining, setDateOfJoining] = useState('')
    const [bankName, setBankName] = useState('')
    const [lateMark, setLateMark] = useState(theEditData.latemark)
    const [workingday, setWorkingDay] = useState(30)
    const [presentDay, setpresentDay] = useState(theEditData.present)
    const [halfDay, setHalfDay] = useState(theEditData.half_day)
    const [absentDay, setAbsentDay] = useState(theEditData.absent)
    const [LIC, setLIC] = useState('')
    const [PT, setPT] = useState('')
    const [PF, setPF] = useState('')

    const [grossAmount, setGrossAmount] = useState('')
    const [presentDaySal, setpresentDaySal] = useState('')
    const [totalDeduction, setTotalDeduction] = useState('')
    const [netAmount, setNetAmount] = useState('')

    const [modeofPayment, setModeOfPayment] = useState('bank-transfer')

    const [incentive, setIncentive] = useState(0)

    const [employee, setEmployee] = useState({})
    const [HolidayData, setHolidayData] = useState({})


    const getEmployeeData = () => {

        axios.get(BASE_URL + `/getHoliday`)
            .then((response) => {
                setHolidayData(response.data[0]);
            }
            );
        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            for (var i = 0; i < res.data.length; i++) {

                if (res.data[i].firstName == theEditData.fname) {

                    setEmployee({
                        id: res.data[i]._id,
                        department: res.data[i].department,
                        organization: res.data[i].organization,
                        salary: res.data[i].salary,
                        designation: res.data[i].designation,
                        baseSalary: res.data[i].base_salary,
                        doj: res.data[i].date_of_joining,
                        bankName: res.data[i].bank.bankName,
                        accountNo: res.data[i].bank.accountNo,
                        lic: res.data[i].LIC,
                        pt: res.data[i].PT,
                        pf: res.data[i].PF
                    });
                }

            }

        });
    }

    const calculateSalary = () => {

        var salary = employee.baseSalary
        var perDaySal = salary / workingday;

        if (lateMark < 3) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal              //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal;

        }
        else if (lateMark > 2 && lateMark < 5) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal

            var lateSalary = perDaySal / 2            //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal - lateSalary;

        }
        else if (lateMark > 4 && lateMark < 7) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal

            var lateSalary = 1 * perDaySal           //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal - perDaySal;

        }
        else if (lateMark > 6 && lateMark < 10) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal

            var lateSalary = 2 * perDaySal             //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal - lateSalary;
        }
        else if (lateMark > 9 && lateMark < 12) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal

            var lateSalary = 3 * perDaySal           //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal - lateSalary;
        }
        else if (lateMark > 11 && lateMark < 15) {
            var presentSal = presentDay * perDaySal;

            setpresentDaySal(presentSal)

            var absentSal = absentDay * perDaySal;

            var halfDaySal = halfDay * (perDaySal / 2);

            var weekSal = HolidayData.total * perDaySal;

            var lateSal = lateMark * perDaySal

            var lateSalary = 4 * perDaySal           //late Mark Logic

            var finalSal = presentSal + weekSal + lateSal - lateSalary;
        }
        else {
            var lateSal = 0
        }

        var gross_Amount = finalSal + halfDaySal
        // console.log(finalSal + halfDaySal)
        // - absentSal 

        setGrossAmount(gross_Amount)

        setTotalDeduction(employee.pt + employee.pf)
        var net_Amount = gross_Amount - (employee.pt + employee.pf)

        setNetAmount(net_Amount + employee.lic)

    }
    const postSalarySlip = () => {
        const empSlip = {
            empName: empName,
            department: employee.department,
            organization: employee.organization,
            designation: employee.designation,
            date_of_joining: employee.doj,
            working_day: workingday,
            present_day: presentDay,
            late_day: lateMark,
            half_day: halfDay,
            absent_day: absentDay,
            bankName: employee.bankName,
            incentive: incentive,
            accountNo: employee.accountNo,
            LIC: employee.lic,
            PF: employee.pf,
            PT: employee.pt,
            salary: employee.baseSalary,
            gross_amount: Math.round(grossAmount * 100) / 100,
            total_deduction: totalDeduction,
            net_amount: Math.round(netAmount * 100) / 100,
            mode_of_payment: modeofPayment,
            date: defaultValue
        }
        axios.post(BASE_URL + '/saveSalary', empSlip)
        console.log(empSlip)
        handleClose()
    }
    const changePage = () => {
        handleClose()
    }
    useEffect(() => {
        getEmployeeData()
        calculateSalary()
    }, [employee]);


    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Employee Name</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Employee Name"
                            value={empName}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <InputLabel>No of Present Day</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Bank Name"
                            value={presentDay}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>No of Absent Day</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Account No"
                            value={absentDay}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>No of Half Day</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Account No"
                            value={halfDay}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>Late Mark</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Late Mark Count"
                            value={lateMark}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>No of Holiday</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter No of Holiday"
                            value={HolidayData.total}
                            onChange={(e) => setHolidayData({ ...HolidayData, ["total"]: e.target.value })}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Employee Deduction</InputLabel>
                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">PF</TableCell>
                                        <TableCell align="center">PT</TableCell>
                                        <TableCell align="center">LIC</TableCell>
                                        <TableCell align="center">Incentive</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">{employee.pf}</TableCell>
                                        <TableCell align="center">{employee.pt}</TableCell>
                                        <TableCell align="center">{employee.lic}</TableCell>
                                        <TableCell align="center">0</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Base Pay</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Base Pay"
                            value={employee.salary / 12}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Worked Day Salary</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Base Pay"
                            value={presentDaySal}

                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Total Deduction Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type='number'
                            value={totalDeduction}
                            fullWidth
                            placeholder="Enter the Deduction Amount"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Gross Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            value={Math.round(grossAmount * 100) / 100}

                            placeholder="Enter the Net Amount"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Net Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            // Math.round(numberYouWantToRound * 100)/100
                            value={Math.round(netAmount * 100) / 100}

                            placeholder="Enter the Net Amount"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: '8px' }}>
                        <InputLabel>Payment Mode</InputLabel>
                        <FormControl sx={{ width: '100%' }} size="small">
                            <Select
                                value={modeofPayment}
                                onChange={(e) => setModeOfPayment(e.target.value)}
                            >
                                <MenuItem value="net-banking">Net Banking</MenuItem>
                                <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                                <MenuItem value="upi">UPI Payment</MenuItem>
                                <MenuItem value="cheque">Cheque</MenuItem>
                                <MenuItem value="cash">Cash</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>

            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button variant="contained" onClick={changePage}>
                    Cancel
                </Button>
                &nbsp;
                <Button variant="contained" color="primary" onClick={postSalarySlip}>
                    Submit
                </Button>
            </div>
        </>
    )
}

export default Salary