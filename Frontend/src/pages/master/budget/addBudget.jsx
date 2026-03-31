import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';

const AddBudget = ({ handleClose }) => {
    const [amount, setAmount] = useState('')
    const [purpose, setPurpose] = useState()
    const [date, setDate] = useState()
    const [department, setDepartment] = useState([])
    const [organization, setOrganization] = useState([])

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

    /**Add Department */
    const postData = () => {
        var orgName = organization.filter(x => x.label == myOptions3)
        var deptName = department.filter(x => x.label == myOptions4)
        const Budget = {
            amount: amount,
            purpose: purpose,
            date: date,
            department: deptName[0].label,
            organization: orgName[0].label,
        }
        console.log(department)
        axios.post(BASE_URL + '/saveBudget', Budget)
        handleClose()
    }
    const changePage = () => {
        handleClose()
    }
    return (
        <>
            {/* <IconButton style={{ width: '6%' }}>
                    <img src={Food} alt="" />
                </IconButton> 
            */}
            <form>
                <h3>Budget Amount</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                    size='small'
                />
                <h3>Purpose</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size='small'
                />
                <h3>Date</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    fullWidth
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
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>
        </>

    )
}

export default AddBudget;
