import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {
    Grid,
    Autocomplete,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { BASE_URL } from "../../../utils/constant";
import axios from "axios";

const AddGst = ({ handleClose }) => {
    const [organization, setOrganization] = useState([]);
    const [department, setDepartment] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [clientName, setClientName] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [commission, setCommission] = useState([]);
    const [invoiceNo, setInvoiceNo] = useState("");
    const [gst, setGst] = useState(18);
    const [amount, setAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState();
    const [paidAmount, setPaidAmount] = useState();
    const [pendingAmount, setPendingAmount] = useState("");
    const [employee, setEmployee] = useState([]);
    const [date, setDate] = useState();
    const [tick, setTick] = useState(0);
    const [status, setStatus] = useState("Waiting");

    const [myOptions3, setMyOptions3] = useState("");
    const [myOptions4, setMyOptions4] = useState("");
    const [myOptions5, setMyOptions5] = useState("");
    const [myOptions6, setMyOptions6] = useState("");

    useEffect(() => {
        axios.get(BASE_URL + `/getOrganization`).then((res) => {
            console.log(res.data);
            var array1 = [];
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].name, id: res.data[i]._id });
            }
            setOrganization(array1);
        });

        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            console.log(res.data);
            var arr1 = [];
            for (var i = 0; i < res.data.length; i++) {
                arr1.push({ label: res.data[i].firstName + " " + res.data[i].lastName, id: res.data[i]._id });
            }
            setEmployee(arr1);
        });
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + `/getDepartment`).then((res) => {
            console.log(res.data);
            var array2 = [];
            for (var i = 0; i < res.data.length; i++) {
                array2.push({ label: res.data[i].name, id: res.data[i]._id });
            }
            setDepartment(array2);
        });
    }, []);

    // useEffect(() => {
    //     axios.get(BASE_URL + `/getCommission`).then((res) => {
    //         // console.log(res.data)
    //         var array3 = [];
    //         for (var i = 0; i < res.data.length; i++) {
    //             array3.push({
    //                 label: res.data[i].type + " [" + res.data[i].percentage + "%]",
    //                 id: res.data[i]._id,
    //                 type: res.data[i].type,
    //                 percentage: res.data[i].percentage,
    //             });
    //         }
    //         setCommission(array3);
    //     });
    // }, []);

    const gstamt = (tick * amount) / 100;
    // console.log(gstamt)
    // const finalamt =((gstamt + amount))
    // var com1 = myOptions5.split(" ");
    // var com2 = commission.filter((x) => x.type == com1[0]);
    // if (com2.length != 0) {
    //     var comName = com2[0].type;
    //     var comm = com2[0].percentage;
    // }
    // else {
    //     comm = 0
    //     comName= "No Commission"
    // }

    const finalamt = parseInt(amount) - parseInt(gstamt);
    // const commAmt = (comm * finalamt) / 100;

    // const CalAmt = parseInt(finalamt) - parseInt(commAmt)

    //   console.log(finalamt);

    const pendAmt = finalamt - paidAmount;

    const postData = () => {
        var orgName = organization.filter((x) => x.label == myOptions3);
        var deptName = department.filter((x) => x.label == myOptions4);
        var commName = commission.filter((x) => x.label == myOptions5);
        var empName = employee.filter((x) => x.label == myOptions6);
        const IncomeData = {
            organization: orgName[0].label,
            department: deptName[0].label,
            companyName: companyName,
            purpose: purpose,
            clientName: clientName,
            paymentMode: paymentMode,
            invoiceNo: invoiceNo,
            gst: tick,
            amount: amount,
            totalAmount: finalamt,
            paidAmount: paidAmount,
            pendingAmount: pendAmt,
            employee: empName[0].label,
            date: date,
            status: status,
            // commission: {
            //     name: comName,
            //     percentage: comm,
            //     amount: CalAmt
            // },
            // deduction: {
            //     name: comName,
            //     percentage: comm,
            //     amount: CalAmt
            // },
            // employee: {
            //     name: comName,
            //     percentage: comm,
            //     amount: CalAmt
            // },
        };
        axios.post(BASE_URL + "/saveTaxation", IncomeData);
        console.log(IncomeData);
        handleClose();
    };

    const changePage = () => {
        handleClose();
    };

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Invoice No</InputLabel>
                        <TextField
                            autoFocus
                            value={invoiceNo}
                            onChange={(e) => setInvoiceNo(e.target.value)}
                            margin="dense"
                            type="text"
                            placeholder="Enter the Invoice Number"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Date</InputLabel>
                        <TextField
                            autoFocus
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            margin="dense"
                            type="date"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Orangnization</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
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
                            style={{ width: "100%" }}
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
                <h3>Purpose</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    placeholder="Enter the Purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                {(function () {
                    if (myOptions3 == "I Tech Mentor") {
                        return (
                            <>
                                <h3>Company Name</h3>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    placeholder="Enter the Company Name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                            </>
                        );
                    } else {
                        return <></>;
                    }
                })()}

                <h3>Client Name</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    value={clientName}
                    placeholder="Enter the Client Name"
                    onChange={(e) => setClientName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                />
                <InputLabel>Payment Mode</InputLabel>
                <FormControl sx={{ width: "100%" }} size="small">
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
                        <MenuItem value="e-wallets">E-Wallets</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2}>
                    {/* <Grid item xs={6}>
                        <InputLabel>Commission</InputLabel>
                        <Autocomplete
                            style={{ width: "100%" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={commission}
                            value={myOptions5}
                            onChange={(e) => setMyOptions5(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Commission"
                                    size="small"
                                />
                            )}
                        />
                    </Grid> */}
                    <Grid item xs={6}>
                        <InputLabel>Select the GST</InputLabel>
                        <FormControl>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={tick}
                                onChange={(e) => setTick(e.target.value)}
                            >
                                <FormControlLabel value={18} control={<Radio />} label="GST" />
                                <FormControlLabel value={0} control={<Radio />} label="No GST" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    {(function () {
                        if (tick == 18) {
                            return (
                                <>
                                    <Grid item xs={6}>
                                        <h3>Total Amount (18% GST)</h3>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            type="text"
                                            value={finalamt}
                                            onChange={(e) => setTotalAmount(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                </>
                            );
                        } else {
                            return <>
                                <Grid item xs={6}>
                                    <h3>Total Amount (0% GST)</h3>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        type="text"
                                        value={finalamt}
                                        onChange={(e) => setTotalAmount(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                            </>;
                        }
                    })()}

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Paid Amount</InputLabel>
                        <TextField
                            autoFocus
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(e.target.value)}
                            margin="dense"
                            type="text"
                            placeholder="Enter the Initial Paid Amount"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Pending Amount</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            disabled
                            value={pendAmt}
                            onChange={(e) => setPendingAmount(e.target.value)}
                            type="text"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <InputLabel>Employee (For Sales)</InputLabel>
                <Autocomplete
                    style={{ width: "100%" }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={employee}
                    value={myOptions6}
                    onChange={(e) => setMyOptions6(e.currentTarget.innerHTML)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            variant="outlined"
                            label="Select the Employee"
                            size="small"
                        />
                    )}
                />
            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={postData} variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AddGst;
