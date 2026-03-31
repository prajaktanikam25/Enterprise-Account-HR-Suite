import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const EditLoan = ({ theEditData, handleClose }) => {
    const [organization, setOrganization] = useState([]);
    const [department, setDepartment] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [loanType, setLoanType] = useState(theEditData.loanType);
    const [requestAmount, setRequestAmount] = useState(theEditData.requestAmount);
    const [returnDate, setReturnDate] = useState(theEditData.returnDate);
    const [disbursedDate, setdisbursedDate] = useState(theEditData.disbursedDate);
    const [disbursedAmt, setDisbursedAmt] = useState(theEditData.disbursedAmt);
    // const [gurantee, setGurantee] = useState();
    // const [approvedBy, setApprovedBy] = useState("")
    const [status, setStatus] = useState(theEditData.gurantee.status)

    const [myOptions1, setMyOptions1] = useState(theEditData.organization);
    const [myOptions2, setMyOptions2] = useState(theEditData.department);
    const [myOptions3, setMyOptions3] = useState(theEditData.employee);

    const [myOptions4, setMyOptions4] = useState(theEditData.gurantee);
    const [myOptions5, setMyOptions5] = useState(theEditData.approvedBy);

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
            organization: myOptions1,
            department: myOptions2,
            employee: myOptions3,
            loanType: loanType,
            requestAmount: requestAmount,
            disbursedDate: disbursedDate,
            returnDate: returnDate,
            disbursedAmt: disbursedAmt,
            gurantee: myOptions4,
            approvedBy: myOptions5,
            status: status,
            isDeleted: 0

        };
        axios.post(BASE_URL + "/updateLoan/" + theEditData._id, LoanData);
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
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={myOptions1}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Department</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={myOptions2}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <InputLabel>Employee Name</InputLabel>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    placeholder="Enter the Requested Amount"
                    value={myOptions3}
                    variant="outlined"
                    size="small"
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
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputLabel>Return Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={new Date(returnDate).toLocaleDateString('en-GB')}                           
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
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Disbursed Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={new Date(disbursedDate).toLocaleDateString('en-GB')}
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
        </>
    );
};

export default EditLoan;
