import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const AddLeave = ({ handleClose }) => {
    const userName = localStorage.getItem('name')

    const [empName, setEmpName] = useState(userName);
    const [leaveReason, setLeaveReason] = useState("");
    const [no_of_days, setNoOfDays] = useState();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState(1);

    const dept = localStorage.getItem('dept')
    const org = localStorage.getItem('org')

    const postLeaveData = () => {
        const LeaveData = {
            empName: empName,
            leaveReason: leaveReason,
            no_of_days: no_of_days,
            startDate: startDate,
            endDate: endDate,
            department: dept,
            organization: org,
            status: status
        };
        axios.post(BASE_URL + "/saveLeave", LeaveData);
        handleClose();
    };

    const changePage = () => {
        handleClose();
    };

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    { }
                    <Grid item xs={6}>
                        <InputLabel>Employee Name</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            disabled
                            fullWidth
                            placeholder="Enter the Employee Name"
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                            variant="outlined"
                            size="small"
                        />


                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>No of Days</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            fullWidth
                            placeholder="Enter the No of Days"
                            value={no_of_days}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            variant="outlined"
                            size="small"
                        />

                    </Grid>
                </Grid>
                <InputLabel>Leave Reason</InputLabel>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    placeholder="Please Enter the Leave Reason"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    variant="outlined"
                    size="small"
                />

                <Grid container spacing={2}>


                    <Grid item xs={6}><InputLabel>Start Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            variant="outlined"
                            size="small"
                        /></Grid>
                    <Grid item xs={6}><InputLabel>Return Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            variant="outlined"
                            size="small"
                        /></Grid>

                </Grid>


            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={postLeaveData} variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AddLeave;
