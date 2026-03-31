import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';

const StatusExpense = ({ handleClose, theStatusData }) => {
    const [purpose, setPurpose] = useState(theStatusData.purpose)
    const [category, setCategory] = useState(theStatusData.category)
    const [amount, setAmount] = useState(theStatusData.amount)
    const [remark, setRemark] = useState(theStatusData.remark)
    const [paymentMode, setPaymentMode] = useState(theStatusData.paymentMode)
    const [date, setDate] = useState(theStatusData.date)
    const [approved, setApproved] = useState(theStatusData.approved)
    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])

    const [myOptions3, setMyOptions3] = useState(theStatusData.organization);
    const [myOptions4, setMyOptions4] = useState(theStatusData.department);

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
        const ExpenseData = {
            purpose: purpose,
            category: category,
            paymentMode: paymentMode,
            remark: remark,
            amount: amount,
            date: date,
            approved: approved,
            organization: myOptions3,
            department: myOptions4,
            isDeleted: 0,
            status: "Approved"
        }
        axios.put(BASE_URL + '/updateExpense/' + theStatusData._id, ExpenseData)
        console.log(ExpenseData)
        handleClose()
    }

    const postData1 = () => {
        var orgName = organization.filter(x => x.label == myOptions3)
        console.log(orgName)
        var deptName = department.filter(x => x.label == myOptions4)
        console.log(deptName)
        const ExpenseData = {
            purpose: purpose,
            category: category,
            paymentMode: paymentMode,
            remark: remark,
            amount: amount,
            date: date,
            approved: approved,
            organization: myOptions3,
            department: myOptions4,
            isDeleted: 0,
            status: "Reject"
        }
        axios.put(BASE_URL + '/updateExpense/' + theStatusData._id, ExpenseData)
        console.log(ExpenseData)
        handleClose()
    }

    const changePage = () => {
        handleClose()
    }
    return (
        <>
            <form>
                <h3>Payment Title</h3>
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
                <h3>Amount</h3>
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
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData1} variant="contained" color="error">Reject</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="success">Approve</Button>
            </div>

        </>

    )
}

export default StatusExpense;
