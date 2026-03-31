import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import { BASE_URL } from '../../utils/constant';
import axios from 'axios';

const EditDepartment = ({ theEditData, handleClose }) => {
    const [name, setName] = useState(theEditData.name)
    const [organization, setOrganization] = useState([])

    const [myOptions3, setMyOptions3] = useState(theEditData.organization);

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
        axios.put(BASE_URL + '/updateDepartment/' + theEditData._id, department)
        console.log(department)
        handleClose()
    }

    const changePage = () => {
        handleClose()
    }


    return (
        <>
            <form>
                <h3>Department Name</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    size='small'
                />
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
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>

        </>

    )
}

export default EditDepartment;
