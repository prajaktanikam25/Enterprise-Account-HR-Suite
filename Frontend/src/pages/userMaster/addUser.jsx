import React, { useEffect, useState } from 'react';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';


const AddUser = ({ handleClose }) => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])
    const [role, setRole] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [myOptions3, setMyOptions3] = useState('');
    const [myOptions4, setMyOptions4] = useState('');

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            console.log(res.data)
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setOrganization(array1);
        });
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + `/getDepartment`).then((res) => {
            console.log(res.data)
            var array2 = []
            for (var i = 0; i < res.data.length; i++) {
                array2.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setDepartment(array2);
        });
    }, []);

    const postData = () => {
        var orgName = organization.filter(x => x.label == myOptions3)
        console.log(orgName)
        var deptName = department.filter(x => x.label == myOptions4)
        console.log(deptName)
        const UserOrg = {
            fname: fname,
            lname: lname,
            mobile: mobile,
            email: email,
            organization: orgName[0].label,
            department: deptName[0].label,
            role: role,
            userName: userName,
            password: password
        }
        axios.post(BASE_URL + '/saveUser', UserOrg)
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
                        <h3>First Name</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
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
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
                <h3>Email</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    size='small'
                />

                <h3>Mobile Number</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    variant="outlined"
                    size='small'
                />
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
                        <InputLabel>Department</InputLabel>
                        <Autocomplete
                            style={{ width: '100%' }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={department}
                            value={myOptions4}
                            onChange={(e) => setMyOptions4(e.currentTarget.innerHTML)}
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
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <InputLabel>Role</InputLabel>
                        <FormControl sx={{ width: '100%' }}
                            size="small">
                            <Select
                                labelId="demo-select-small"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                label="."
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Employee">Employee</MenuItem>
                                <MenuItem value="Accountant">Accountant</MenuItem>
                                <MenuItem value="Manager">Branch Manager</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h3>User Name</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                        <h3>Password</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>
        </>
    )
}

export default AddUser;
