import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';

const AddExpense = ({ handleClose }) => {
    const [purpose, setPurpose] = useState('')
    const [category, setCategory] = useState([])
    const [amount, setAmount] = useState(0)
    const [remark, setRemark] = useState('')
    const [paymentMode, setPaymentMode] = useState('')
    const [date, setDate] = useState()
    const [approved, setApproved] = useState('Sunil Bengade')
    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])
    const [status, setStatus] = useState("Waiting")


    const [myOptions3, setMyOptions3] = useState('');
    const [myOptions4, setMyOptions4] = useState('');
    const [myOptions5, setMyOptions5] = useState("");

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
        axios.get(BASE_URL + `/getCategory`).then((res) => {
            console.log(res.data)
            var array25 = []
            for (var i = 0; i < res.data.length; i++) {
                array25.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setCategory(array25);
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
        var deptName = department.filter(x => x.label == myOptions4)
        var catName = category.filter(x => x.label == myOptions5)

        const ExpenseData = {
            purpose: purpose,
            category: catName[0].label,
            paymentMode: paymentMode,
            remark: remark,
            amount: amount,
            date: date,
            approved: approved,
            organization: orgName[0].label,
            department: deptName[0].label,
            status: status,
            isDeleted: 0
        }
        axios.post(BASE_URL + '/saveExpense', ExpenseData)
        console.log(ExpenseData)
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
                    fullWidth
                    placeholder='Enter the Payment Description'
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    variant="outlined"
                    size='small'
                />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Category</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={category}
                            value={myOptions5}
                            onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Category"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                {/* <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        labelId="demo-select-small"
                        label="."
                    >
                        <MenuItem value='Salary'>Salary</MenuItem>
                        <MenuItem value='Party'>Party</MenuItem>
                        <MenuItem value='Food'>Food</MenuItem>
                        <MenuItem value='Maintaince'>Maintaince</MenuItem>
                        <MenuItem value='Electric'>Electric</MenuItem>
                        <MenuItem value='WIFI'>WIFI</MenuItem>
                        <MenuItem value='Transport'>Transport</MenuItem>
                    </Select> */}

                <h3>Amount Spent</h3>
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
                <h3>Remark</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    value={remark}
                    placeholder='Enter the Remark'
                    onChange={(e) => setRemark(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size='small'
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Payment Mode</InputLabel>
                        <FormControl sx={{ width: '100%' }} size="small">
                            <Select
                                labelId="demo-select-small"
                                label="."
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                            >
                                <MenuItem value="net-banking">Net Banking</MenuItem>
                                <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                                <MenuItem value="upi">UPI Payment</MenuItem>
                                <MenuItem value="cheque">Cheque</MenuItem>
                                <MenuItem value="cash">Cash</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Date</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
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
                <h3>Approved By</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    disabled
                    value={approved}
                    onChange={(e) => setApproved(e.target.value)}
                    variant="outlined"
                    size='small'
                />

            </form>

            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>

        </>

    )
}

export default AddExpense;
