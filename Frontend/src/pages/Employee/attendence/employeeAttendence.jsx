import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, Button, Autocomplete } from "@mui/material";
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';

const EmpAttendence = ({ handleClose }) => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date1).toISOString().split('T')[0];

    const [organization, setOrganization] = useState([])
    const [employee, setEmployee] = useState([])
    const [date, setDate] = useState(defaultValue)
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
                array3.push({ label: res.data[i].firstName, last: res.data[i].lastName, id: res.data[i]._id });
            }
            setEmployee(array3);
        });
    }, []);

    const org = localStorage.getItem('org')
    const name = localStorage.getItem('name')
    var now = new Date();
    const addAttendence = () => {

        const nameParts = name.split(" "); // Splitting by space

        const firstName = nameParts[0];
        const lastName = nameParts[1];

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();

        if (org == 'I Tech Mentor') {
            if ((currentHour === 10 && currentMinute >= 15) || // After 10:15 am
                (currentHour === 11 && currentMinute === 0))  // Before 11:00 am) 
            {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 3,                                        // Attendence Will Mark as Late Mark
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
            else if (currentHour > 11 && currentHour < 16) {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 2,                                        // Attendence Will Mark as Half- Day
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
            else {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 1,                                     // Attendence Will Mark as Present
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
        }

        else {
            if ((currentHour === 9 && currentMinute >= 10) || // After 09:05 am
                (currentHour === 10 && currentMinute === 0))  // Before 10:00 am) 
            {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 3,                                        // Attendence Will Mark as Late Mark
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
            else if (currentHour > 10 && currentHour < 16) {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 2,                                        // Attendence Will Mark as Half- Day
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
            else {
                const Data = {
                    fname: firstName,
                    lname: lastName,
                    date: date,
                    checkInTime: now,
                    attendence: 1,                                     // Attendence Will Mark as Present
                    isApproved: "Waiting",
                    isDeleted: 0,
                    disableLogout: 0,
                    organization: org,
                    createdBy: name
                }
                axios.post(BASE_URL + '/saveAttendence', Data)
            }
        }
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
                        <InputLabel>Oraganization</InputLabel>
                        <TextField
                            disabled
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder='Enter the Organization Name'
                            value={org}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Employee Name</InputLabel>
                        <TextField
                            disabled
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder='Enter the Employee Name'
                            value={name}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Date</InputLabel>
                        <TextField
                            disabled
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
                </Grid>
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained">Cancel</Button>&nbsp;
                <Button variant="contained" color="success" onClick={addAttendence}>Check In</Button>
            </div>

        </>

    )
}

export default EmpAttendence;
