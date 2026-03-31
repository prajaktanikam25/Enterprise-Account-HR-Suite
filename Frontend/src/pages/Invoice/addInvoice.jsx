import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Select } from '@mui/material';
import DefaultLayout from "../../layout/DefaultLayout";
import Invoice from '../../images/logo/invoice.jpg'
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const AddInvoice = () => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date1).toISOString().split('T')[0]; // yyyy-mm-dd

    const [date, setDate] = useState(defaultValue)
    const [companyName, setCompanyName] = useState('')
    const [companyContact, setCompanyContact] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyCity, setCompanyCity] = useState('')
    const [companyPincode, setCompanyPincode] = useState('')
    const [clientName, setClientName] = useState('')
    const [clientContact, setClientContact] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientAddress, setClientAddress] = useState('')

    const [productName, setProductName] = useState('')
    const [quantity, setquantity] = useState(1)
    const [subAmount, setSubAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState('')
    const [remarks, setRemarks] = useState('')

    const finalamt = parseInt(quantity) * parseInt(subAmount);
    console.log(finalamt)


    const postInvoice = () => {
        const data = {
            date: date,
            companyName: companyName,
            companyContact: companyContact,
            companyEmail: companyEmail,
            companyAddress: companyAddress,
            companyCity: companyCity,
            companyPincode: companyPincode,
            billerName: clientName,
            clientContact: clientContact,
            clientEmail: clientEmail,
            clientAddress: clientAddress,
            productName: productName,
            quantity: quantity,
            subAmount: subAmount,
            totalAmount: finalamt,
            remarks: remarks
        }
        axios.post(BASE_URL + '/saveInvoice', data)
        changePage()

    }
    const changePage = () => {
        const navigate = useNavigate()
        navigate('/manage-onboarding')
    }
    return (
        <DefaultLayout>
            <form >
                <Grid>
                    <Grid item xs={8}>
                        <h1> Create Invoice </h1>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <img src={Invoice} alt="" width={'280px'} />
                    </Grid>
                    <Grid item xs={4}>

                        <h3>Date</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="date"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
                {/* <br />
                <b> <h3 style={{ color: 'green' }}>Company Detail's</h3></b>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Company Name</h3>
                        <TextField
                            autoFocus
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h3>Company Contact</h3>
                        <TextField
                            autoFocus
                            value={companyContact}
                            onChange={(e) => setCompanyContact(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <h3>Company Email</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Company Address</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h3>City</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={companyCity}
                            onChange={(e) => setCompanyCity(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Pincode</h3>
                        <TextField
                            autoFocus
                            value={companyPincode}
                            onChange={(e) => setCompanyPincode(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>*/}
                <br />
                <b><h3 style={{ color: 'green' }}>Client Detail's</h3></b>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Client Name</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h3>Client Contact</h3>
                        <TextField
                            autoFocus
                            value={clientContact}
                            onChange={(e) => setClientContact(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <h3>Client Email</h3>
                        <TextField
                            autoFocus
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3>Client Address</h3>
                        <TextField
                            autoFocus
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>

                </Grid>
                <br />
                <b><h6 style={{ textAlign: 'center', color: 'green' }}>Product Name</h6></b>

                <br />
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <h3>Product Description</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Quantity</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            value={quantity}
                            onChange={(e) => setquantity(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Sub Total</h3>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={subAmount}
                            onChange={(e) => setSubAmount(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                    </Grid>

                </Grid>
                <br />
                <br /><br /><br />
                <br />
                <Grid container spacing={6}>
                    <Grid xs display="flex" justifyContent="end" alignItems="right">
                        <b><label style={{ color: 'green' }}>Grand Total   :- </label></b>   &nbsp;  &nbsp;  &nbsp;₹ {finalamt}
                    </Grid>
                </Grid>

                <Grid container spacing={6}>
                    <Grid xs display="flex" justifyContent="end" alignItems="right">
                        <b><label style={{ color: 'green' }}>Tax Rate (0%) :- </label></b>  &nbsp;  &nbsp;  &nbsp; ₹ 0
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note/Remarks</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(event) => setRemarks(event.target.value)}
                                value={remarks}
                                placeholder="Write a Note or Remarks with max 500 words....." />
                        </Form.Group> */}
                    </Grid>
                </Grid>
                <br />
                <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={changePage}>Cancel</Button>&nbsp;
                    <Button onClick={postInvoice} variant="contained">Submit</Button>
                </div>
            </form>
        </DefaultLayout>
    )
}
export default AddInvoice