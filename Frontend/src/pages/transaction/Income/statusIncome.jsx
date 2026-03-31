import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';

const StatusIncome = ({ handleClose, theStatusData }) => {
    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])
    const [companyName, setCompanyName] = useState(theStatusData.companyName)
    const [purpose, setPurpose] = useState(theStatusData.purpose)
    const [clientName, setClientName] = useState(theStatusData.clientName)
    const [paymentMode, setPaymentMode] = useState(theStatusData.paymentMode)
    // const [commission, setCommission] = useState([])
    const [invoiceNo, setInvoiceNo] = useState(theStatusData.invoiceNo)
    const [gst, setGst] = useState(theStatusData.gst)
    const [amount, setAmount] = useState(theStatusData.amount)
    const [totalAmount, setTotalAmount] = useState(theStatusData.totalAmount)
    const [paidAmount, setPaidAmount] = useState(theStatusData.paidAmount)
    const [pendingAmount, setPendingAmount] = useState(theStatusData.pendingAmount)
    const [employee, setEmployee] = useState(theStatusData.employee)
    const [date, setDate] = useState(theStatusData.date)

    const [myOptions3, setMyOptions3] = useState(theStatusData.organization);
    const [myOptions4, setMyOptions4] = useState(theStatusData.department);
    // const [myOptions5, setMyOptions5] = useState(theStatusData.commission);

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            // console.log(res.data)
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setOrganization(array1);
        });
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + `/getDepartment`).then((res) => {
            // console.log(res.data)
            var array2 = []
            for (var i = 0; i < res.data.length; i++) {
                array2.push({ label: res.data[i].name, id: res.data[i]._id })
            }
            setDepartment(array2);
        });
    }, []);

    // useEffect(() => {
    //     axios.get(BASE_URL + `/getCommission`).then((res) => {
    //         // console.log(res.data)
    //         var array3 = []
    //         for (var i = 0; i < res.data.length; i++) {
    //             array3.push({ label: res.data[i].type, id: res.data[i]._id })
    //         }
    //         setCommission(array3);
    //     });
    // }, []);

    const gstamt = (gst * totalAmount / 100)
    // const finalamt =((gstamt + amount))
    const finalamt = parseInt(totalAmount) - parseInt(gstamt);

    const pendAmt = (finalamt - paidAmount)

    const updateData = () => {
        const IncomeData = {
            organization: myOptions3,
            department: myOptions4,
            companyName: companyName,
            purpose: purpose,
            clientName: clientName,
            paymentMode: paymentMode,
            // commission: {
            //     name: theStatusData.commission.name,
            //     percentage: theStatusData.commission.percentage,
            //     amount: theStatusData.commission.amount
            // },
            invoiceNo: invoiceNo,
            gst: gst,
            gstAmount: gstamt,
            amount: amount,
            totalAmount: totalAmount,
            paidAmount: paidAmount,
            pendingAmount: pendAmt,
            employee: employee,
            date: date,
            status: "Received"
        }
        axios.put(BASE_URL + '/updateIncome/' + theStatusData._id, IncomeData)
        // console.log(IncomeData)
        handleClose()
    }
    const updateData1 = () => {
        const IncomeData = {
            organization: myOptions3,
            department: myOptions4,
            companyName: companyName,
            purpose: purpose,
            clientName: clientName,
            paymentMode: paymentMode,
            // commission: {
            //     name: theStatusData.commission.name,
            //     percentage: theStatusData.commission.percentage,
            //     amount: theStatusData.commission.amount
            // },
            invoiceNo: invoiceNo,
            gst: gst,
            gstAmount: gstamt,
            amount: amount,
            totalAmount: totalAmount,
            paidAmount: paidAmount,
            pendingAmount: pendAmt,
            employee: employee,
            date: theStatusData.date,
            status: "Outstanding"
        }
        axios.put(BASE_URL + '/updateIncome/' + theStatusData._id, IncomeData)
        console.log(IncomeData)
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

                <InputLabel>Invoice No</InputLabel>
                <TextField
                    autoFocus
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    margin="dense"
                    type="text"
                    disabled
                    fullWidth
                    variant="outlined"
                    size='small'
                />

                <InputLabel>Total Amount</InputLabel>
                <TextField
                    autoFocus
                    value={finalamt}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    margin="dense"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size='small'
                />

            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={updateData1} variant="contained" color="error">Not Recieved</Button>&nbsp;
                <Button onClick={updateData} variant="contained" color="success">Recieved</Button>
            </div>
        </>
    )
}

export default StatusIncome;
