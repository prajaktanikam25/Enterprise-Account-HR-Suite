import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, Button, Autocomplete } from "@mui/material";
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';

const AddAttendence = ({ handleClose }) => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date1).toISOString()

    const [organization, setOrganization] = useState([])
    const [employee, setEmployee] = useState([])
    const [date, setDate] = useState(defaultValue)
    const [checkInTime, setCheckInTime] = useState(defaultValue)
    const [attendence, setAttendence] = useState('')

    const [myOptions3, setMyOptions3] = useState('');
    const [myOptions5, setMyOptions5] = useState('');

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setOrganization(array1);
        });
        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            var array3 = [];
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].organization == myOptions3)
                    array3.push({ label: res.data[i].firstName + " " + res.data[i].lastName, id: res.data[i]._id });
            }
            setEmployee(array3);
        });
    }, [myOptions3]);

    var now = new Date();

    const addAttendence = () => {
        var orgName = organization.filter((x) => x.label == myOptions3);
        var fname = employee.filter((x) => x.label == myOptions5);
        // var lname = employee.filter((x) => x.last == myOptions5);
        const fullName = fname[0].label;
        const nameParts = fullName.split(" "); // Splitting by space

        const firstName = nameParts[0];
        const lastName = nameParts[1];

        const Data = {
            fname: firstName,
            lname: lastName,
            date: date,
            checkInTime: now,
            attendence: attendence,
            isApproved: "Verified",
            isDeleted: 0,
            disableLogout: 0,
            organization: orgName[0].label,
            createdBy: fullName
        }
        // console.log(Data)
        axios.post(BASE_URL + '/saveAttendence', Data)
        handleClose()
    }

    const changePage = () => {
        handleClose()
    }

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Orangnization</InputLabel>
                        <Autocomplete
                            style={{ width: '100%' }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={organization}
                            value={myOptions3}
                            onChange={(e) => setMyOptions3(e.currentTarget.innerHTML)}
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
                        <InputLabel>Employee</InputLabel>
                        <Autocomplete
                            style={{ width: '100%' }}
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
                                    label="Select the Employee"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            placeholder='Enter the Company Name'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Attendence</InputLabel>
                        <FormControl sx={{ width: '100%', marginTop: '5px' }}
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
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained">Cancel</Button>&nbsp;
                <Button variant="contained" color="primary" onClick={addAttendence}>Submit</Button>
            </div>
        </>

    )
}

export default AddAttendence;
