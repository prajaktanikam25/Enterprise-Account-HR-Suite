import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';

const EditExpense = ({ handleClose, theEditData }) => {
    const [purpose, setPurpose] = useState(theEditData.purpose)
    const [category, setCategory] = useState([])
    const [amount, setAmount] = useState(theEditData.amount)
    const [remark, setRemark] = useState(theEditData.remark)
    const [paymentMode, setPaymentMode] = useState(theEditData.paymentMode)
    const [date, setDate] = useState(theEditData.date)
    const [approved, setApproved] = useState(theEditData.approved)
    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])

    const [myOptions3, setMyOptions3] = useState(theEditData.organization);
    const [myOptions4, setMyOptions4] = useState(theEditData.department);
    const [myOptions5, setMyOptions5] = useState(theEditData.category);

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
        const ExpenseData = {
            purpose: purpose,
            category: myOptions5,
            paymentMode: paymentMode,
            remark: remark,
            amount: amount,
            date: date,
            approved: approved,
            organization: myOptions3,
            department: myOptions4,
            status: theEditData.status,
            isDeleted: 0
        }
        axios.put(BASE_URL + '/updateExpense/' + theEditData._id, ExpenseData)
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
                            type="text"
                            disabled
                            value={new Date(date).toLocaleDateString('en-GB')}
                            // onChange={(e) => setDate(e.target.value)}
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
                            disabled
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
                            disabled
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
                    disabled
                    type="text"
                    fullWidth
                    value={approved}
                    onChange={(e) => setApproved(e.target.value)}
                    variant="outlined"
                    size='small'
                />

            </form>

            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Update</Button>
            </div>

        </>

    )
}

export default EditExpense;
