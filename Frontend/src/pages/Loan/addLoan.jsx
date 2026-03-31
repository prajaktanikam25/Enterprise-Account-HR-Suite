import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const AddLoan = ({ handleClose }) => {
    const [organization, setOrganization] = useState([]);
    const [department, setDepartment] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [loanType, setLoanType] = useState("");
    const [requestAmount, setRequestAmount] = useState();
    const [returnDate, setReturnDate] = useState("");
    const [disbursedDate, setdisbursedDate] = useState("");
    const [disbursedAmt, setDisbursedAmt] = useState();
    const [gurantee, setGurantee] = useState("");
    const [approvedBy, setApprovedBy] = useState("")
    const [status, setStatus] = useState("")

    const [myOptions1, setMyOptions1] = useState("");
    const [myOptions2, setMyOptions2] = useState("");
    const [myOptions3, setMyOptions3] = useState("");

    const [myOptions4, setMyOptions4] = useState("");
    const [myOptions5, setMyOptions5] = useState("");

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            console.log(res.data);
            var array1 = [];
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].name, id: res.data[i]._id });
            }
            setOrganization(array1);
        });

        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            console.log(res.data);
            var arr1 = [];
            for (var i = 0; i < res.data.length; i++) {
                arr1.push({ label: res.data[i].firstName + " " + res.data[i].lastName, id: res.data[i]._id });
            }
            setEmployee(arr1);
        });
        axios.get(BASE_URL + `/getDepartment`).then((res) => {
            console.log(res.data);
            var array2 = [];
            for (var i = 0; i < res.data.length; i++) {
                array2.push({ label: res.data[i].name, id: res.data[i]._id });
            }
            setDepartment(array2);
        });
    }, []);

    const postLoanData = () => {
        var orgName = organization.filter((x) => x.label == myOptions1);
        var deptName = department.filter((x) => x.label == myOptions2);
        var empName = employee.filter((x) => x.label == myOptions3);

        var guranteeName = employee.filter((x) => x.label == myOptions4);
        var approvedName = employee.filter((x) => x.label == myOptions5);

        const LoanData = {
            organization: orgName[0].label,
            department: deptName[0].label,
            employee: empName[0].label,
            loanType: loanType,
            requestAmount: requestAmount,
            disbursedDate: disbursedDate,
            returnDate: returnDate,
            disbursedAmt: disbursedAmt,
            gurantee: guranteeName[0].label,
            approvedBy: approvedName[0].label,
            status: status,
            isDeleted: 0

        };
        axios.post(BASE_URL + "/saveLoan", LoanData);
        console.log(LoanData)
        handleClose();
    };

    const changePage = () => {
        handleClose();
    };

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Orangnization</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={organization}
                            value={myOptions1}
                            onChange={(e) => setMyOptions1(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Organization"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Department</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={department}
                            value={myOptions2}
                            onChange={(e) => setMyOptions2(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Department"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <InputLabel>Employee Name</InputLabel>
                <Autocomplete
                    style={{ width: "100%" }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={employee}
                    value={myOptions3}
                    onChange={(e) => setMyOptions3(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            variant="outlined"
                            label="Select the Employee"
                            size="small"
                        />
                    )}
                />
                <InputLabel>Loan Type</InputLabel>
                <FormControl sx={{ width: "100%" }} size="small">
                    <Select
                        labelId="demo-select-small"
                        label="."
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                    >
                        <MenuItem value="advance-salary">Advance Salary</MenuItem>
                        <MenuItem value="medical-emergency">Medical Emergency</MenuItem>
                        <MenuItem value="personal Reason">Personal Reason</MenuItem>
                        <MenuItem value="loan">Loan</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Request Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={requestAmount}
                            onChange={(e) => setRequestAmount(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6}><InputLabel>Return Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            variant="outlined"
                            size="small"
                        /></Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Disbursed Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Disbursed Amount"
                            value={disbursedAmt}
                            onChange={(e) => setDisbursedAmt(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Disbursed Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={disbursedDate}
                            onChange={(e) => setdisbursedDate(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Gurantor Employee</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={employee}
                            value={myOptions4}
                            onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Gurantor Employee"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Approved By</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={employee}
                            value={myOptions5}
                            onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Approved By"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={postLoanData} variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AddLoan;
