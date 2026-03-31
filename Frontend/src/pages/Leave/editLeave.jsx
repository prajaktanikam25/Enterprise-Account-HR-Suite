import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const EditLeave = ({ theEditData, handleClose }) => {
    const dept = localStorage.getItem('dept')
    const org = localStorage.getItem('org')

    const [empName, setEmpName] = useState(theEditData.empName);
    const [leaveReason, setLeaveReason] = useState(theEditData.leaveReason);
    const [no_of_days, setNoOfDays] = useState(theEditData.no_of_days);
    const [startDate, setStartDate] = useState(theEditData.startDate);
    const [endDate, setEndDate] = useState(theEditData.endDate);
    const [status, setStatus] = useState(theEditData.status);
    const [message, setMessage] = useState("");

    const updateLeaveData = () => {
        const LeaveData = {
            empName: empName,
            leaveReason: leaveReason,
            no_of_days: no_of_days,
            startDate: startDate,
            endDate: endDate,
            department: dept,
            organization: org,
            status: status,
            message: message

        };
        axios.put(BASE_URL + "/updateLeave/" + theEditData._id, LeaveData);
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
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={new Date(startDate).toLocaleDateString('en-GB')}
                            variant="outlined"
                            size="small"
                        /></Grid>
                    <Grid item xs={6}><InputLabel>Return Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={new Date(endDate).toLocaleDateString('en-GB')}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <InputLabel>Status</InputLabel>
                <FormControl sx={{ width: "100%" }} size="small">
                    <Select

                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value={0}>Approved</MenuItem>
                        <MenuItem value={1}>Waiting</MenuItem>
                        <MenuItem value={2}>Cancel</MenuItem>
                        <MenuItem value={3}>Reject</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel>Message</InputLabel>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    placeholder="Message (If Any)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    size="small"
                />
            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={updateLeaveData} variant="contained" color="primary">
                    Update
                </Button>
            </div>
        </>
    );
};

export default EditLeave;
