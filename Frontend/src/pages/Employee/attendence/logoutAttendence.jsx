import React, { useState } from 'react';
import { Grid, InputLabel, TextField, Button, } from "@mui/material";
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import moment from 'moment/moment';


const CheckOut = ({ thelogoutData, handleClose }) => {
    const [organization, setOrganization] = useState(thelogoutData.organization)
    const [name, setName] = useState(thelogoutData.fname + " " + thelogoutData.lname)

    const checkOutAttendence = () => {

        var now = new Date();

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        if (moment(thelogoutData.date).format('YYYY-MM-DD') == moment(now).format('YYYY-MM-DD')) {
            if (currentHour < 16) {
                const Data = {
                    fname: thelogoutData.fname,
                    lname: thelogoutData.lname,
                    date: thelogoutData.date,
                    checkOut: now,
                    disableLogout: 1,
                    attendence: 2,
                    organization: organization
                }
                axios.put(BASE_URL + '/updateAttendence/' + thelogoutData._id, Data)
            }
            else {
                const Data = {
                    fname: thelogoutData.fname,
                    lname: thelogoutData.lname,
                    date: thelogoutData.date,
                    checkOut: now,
                    disableLogout: 1,
                    attendence: thelogoutData.attendence,
                    organization: organization
                }
                axios.put(BASE_URL + '/updateAttendence/' + thelogoutData._id, Data)

            }
        }
        else {
            return alert('Sorry You can not Logout for Previous Day')
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
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder='Enter the Organization Name'
                            value={organization}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Employee Name</InputLabel>
                        <TextField
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
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder='Enter the Company Name'
                            value={new Date(thelogoutData.date).toLocaleDateString('en-GB')}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Check In Time</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder='Enter the Company Name'
                            value={new Date(thelogoutData.checkInTime).toLocaleTimeString('en-GB')}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>

            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="error" onClick={checkOutAttendence}>Check Out</Button>
            </div>

        </>

    )
}

export default CheckOut;
