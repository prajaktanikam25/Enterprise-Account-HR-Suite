import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';

const EditDeduction = ({ handleClose ,theEditData}) => {
    const [purpose, setPurpose] = useState(theEditData.purpose)
    const [percentage, setPercentage] = useState(theEditData.percentage)
    const [department, setDepartment] = useState([])
    const [organization, setOrganization] = useState([])

    const [myOptions3, setMyOptions3] = useState(theEditData.organization);
    const [myOptions4, setMyOptions4] = useState(theEditData.department);

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
        const deduction = {
            purpose: purpose,
            percentage: percentage,
            department: deptName[0].label,
            organization: orgName[0].label,
        }
        console.log(deduction)
        axios.put(BASE_URL + '/updateDeduction', deduction)
        handleClose()
    }
    const changePage = () => {
        handleClose()
    }
    return (
        <>
            <form>
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
                <h3>Percentage (%)</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
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

export default EditDeduction;
