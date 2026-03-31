import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import axios from 'axios';

const AddDepartment = ({ handleClose }) => {
    const [name, setName] = useState('')
    const [organization, setOrganization] = useState([])

    const [myOptions3, setMyOptions3] = useState('');

    const changePage = () => {
        handleClose()
    }

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            console.log(res.data)
            var array = []
            for (var i = 0; i < res.data.length; i++) {
                array.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setOrganization(array);
        });
    }, []);

    /**Add Department */
    const postData = () => {
        var orgName = organization.filter(x => x.label == myOptions3)
        const department = {
            name: name,
            organization: orgName[0].label,
        }
        console.log(department)
        axios.post(BASE_URL + '/saveDepartment', department)
        handleClose()
    }

    return (
        <>
            <form>
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
                <h3>Department Name</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    placeholder='Enter the Department Name'
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default AddDepartment;
