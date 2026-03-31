import React, { useEffect, useState } from 'react';
import { Grid, IconButton, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const EditOrganization = ({ theEditData, handleClose }) => {

    const [name, setName] = useState(theEditData.name)
    const [branchName, setBranchName] = useState(theEditData.branchName)
    const [email, setEmail] = useState(theEditData.email)
    const [address, setAddress] = useState(theEditData.address)
    const [mobile, setMobile] = useState(theEditData.mobile)

    const postData = () => {
        const UserOrg = {
            name: name,
            branchName: branchName,
            email: email,
            address: address,
            mobile: mobile
        }
        axios.put(BASE_URL + '/updateOrganization/' + theEditData._id, UserOrg)
        handleClose()
    }
    const changePage = () => {
        handleClose()
    }
    return (
        <>
            <form>
                <h3>Organization Name</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    disabled
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    size='small'
                />
                <h3>Branch Manager</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    disabled
                    type="text"
                    fullWidth
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    variant="outlined"
                    size='small'
                />
                <h3>Email</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
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
                <h3>Address</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    size='small'
                />
            </form>
            <br />

            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>
        </>

    )
}

export default EditOrganization;
