import React, { useState } from "react";
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";

const ViewAttendence = ({ theEditData, handleClose }) => {
    const [empId, setEmpId] = useState(theEditData.empId)
    const [fname, setFname] = useState(theEditData.fname)
    const [lname, setLname] = useState(theEditData.lname)
    const [date, setDate] = useState(theEditData.date)
    const [attendence, setAttendence] = useState(theEditData.attendence)
    const [isApproved, setIsApproved] = useState(theEditData.isApproved)
    const [organization, setOrganization] = useState(theEditData.organization)

    const name = localStorage.getItem('name')

    const updateData = () => {
        const Data = {
            empId: empId,
            fname: fname,
            lname: lname,
            date: date,
            attendence: attendence,
            isApproved: isApproved,
            isDeleted: 0,
            organization: organization,
            updatedBy: name
        }
        axios.put(BASE_URL + '/updateAttendence/' + theEditData._id, Data)
        handleClose()
    }

    const changePage = () => {
        handleClose()
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>First Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        placeholder='Enter the First Name'
                        type="text"
                        fullWidth
                        value={theEditData.fname}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Last Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Last Name'
                        value={theEditData.lname}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>Check In Time</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Last Name'
                        value={new Date(theEditData.checkInTime).toLocaleTimeString('en-GB')}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Check Out Time</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Last Name'
                        value={new Date(theEditData.checkOut).toLocaleTimeString('en-GB')}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>Attendence</InputLabel>
                    <FormControl sx={{ width: '100%' }}
                        size="small">
                        <Select
                            labelId="demo-select-small"
                            placeholder='Select the Role'
                            value={attendence}
                            onChange={(e) => setAttendence(e.target.value)}
                            label="."
                        >
                            <MenuItem value={0}>Absent</MenuItem>
                            <MenuItem value={1}>Present</MenuItem>
                            <MenuItem value={2}>Half-Day</MenuItem>
                            <MenuItem value={3}>Late Mark</MenuItem>
                            {/* <MenuItem value={3}>Leave</MenuItem> */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>Organization</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Last Name'
                        value={theEditData.organization}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>Approve Status</InputLabel>
                    <FormControl sx={{ width: '100%' }}
                        size="small">
                        <Select
                            placeholder='Select the Role'
                            value={isApproved}
                            onChange={(e) => setIsApproved(e.target.value)}
                        >
                            <MenuItem value="Waiting">Waiting</MenuItem>
                            <MenuItem value="Verified">Verified</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button variant="contained" onClick={changePage}>
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={updateData} variant="contained" color="primary">
                    Approve
                </Button>
            </div>
        </>
    )
}

export default ViewAttendence