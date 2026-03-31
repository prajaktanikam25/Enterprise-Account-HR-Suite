import React, { useEffect, useState } from 'react';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constant';
import moment from 'moment/moment';

const EditOnboarding = ({ theUpdateData, handleClose }) => {
    console.log(theUpdateData)
    const [fname, setFname] = useState(theUpdateData.firstName)
    const [lname, setLname] = useState(theUpdateData.lastName)
    const [email, setEmail] = useState(theUpdateData.email)
    const [mobile, setMobile] = useState(theUpdateData.mobileNo)
    const [address, setAddress] = useState(theUpdateData.address)
    const [empType, setEmpType] = useState(theUpdateData.employeeType)
    const [empPreComp, setEmpPreComp] = useState(theUpdateData.lastCompanyName)
    const [lastCTC, setLastCTC] = useState(theUpdateData.lastCTC)
    const [date_of_joining, setDateOFJoining] = useState(theUpdateData.date_of_joining)
    const [annualCTC, setAnnualCTC] = useState(theUpdateData.salary)
    const [designation, setDesignation] = useState(theUpdateData.designation)
    const [deductionType, setDeductionType] = useState('')
    const [deduction, setDeduction] = useState('')
    const [baseSalary, setBaseSalary] = useState('')
    const [reportingManager, setReportingManager] = useState(theUpdateData.reporting_Manager)
    const [panCard, setPanCard] = useState(theUpdateData.document[0].pan)
    const [aadhar, setAadhar] = useState(theUpdateData.document[0].aadhar)
    const [emergencyPerson, setEmergencyPerson] = useState(theUpdateData.emergency.name)
    const [emergencyContact, setEmergencyContact] = useState(theUpdateData.emergency.mobile)

    const [organization, setOrganization] = useState([])
    const [department, setDepartment] = useState([])

    const [bankName, setBankName] = useState(theUpdateData.bank.bankName)
    const [accountNo, setAccountNo] = useState(theUpdateData.bank.accountNo)
    const [ifsc, setIFSC] = useState(theUpdateData.bank.ifsc)
    const [branch, setBranch] = useState(theUpdateData.bank.branch)

    const [LIC, setLIC] = useState(theUpdateData.LIC)
    const [PF, setPF] = useState(theUpdateData.PF)
    const [PT, setPT] = useState(theUpdateData.PT)


    const [myOptions3, setMyOptions3] = useState(theUpdateData.organization);
    const [myOptions4, setMyOptions4] = useState(theUpdateData.department);

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

    const changePage = () => {
        handleClose()
    }

    const base = parseInt(annualCTC) / 12;
    console.log(base)

    const finalamt = parseInt(base)
    // const finalamt = parseInt(base) - parseInt(LIC) - parseInt(PF) - parseInt(PT);
    console.log(finalamt)

    const postData = () => {
        var orgName = organization.filter(x => x.label == myOptions3)
        var deptName = department.filter(x => x.label == myOptions4)

        const Onboarding = {
            firstName: fname,
            lastName: lname,
            email: email,
            mobileNo: mobile,
            address: address,
            employeeType: empType,
            lastCompanyName: empPreComp,
            lastCTC: lastCTC,
            date_of_joining: date_of_joining,
            designation: designation,
            salary: annualCTC,
            LIC: LIC,
            PF: PF,
            PT: PT,
            base_salary: finalamt,
            reporting_Manager: reportingManager,
            document: {
                pan: panCard,
                aadhar: aadhar
            },
            emergency: {
                name: emergencyPerson,
                mobile: emergencyContact
            },
            bank: {
                bankName: bankName,
                accountNo: accountNo,
                ifsc: ifsc,
                branch: branch
            },
            department: theUpdateData.department,
            organization: theUpdateData.organization,
        }

        axios.put(BASE_URL + '/updateEmployee/' + theUpdateData._id, Onboarding)
        handleClose()
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>First Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        placeholder='Enter the First Name'
                        type="text"
                        fullWidth
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Last Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Last Name'
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>Email</h3>
                    <TextField
                        autoFocus
                        disabled
                        margin="dense"
                        type="email"
                        fullWidth
                        placeholder='Enter the Email'
                        value={email}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Mobile Number</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Mobile Number'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h3>Address</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Permanent Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <InputLabel>Employee Type</InputLabel>
                    <FormControl sx={{ width: '100%' }}

                        size="small">
                        <Select
                            disabled
                            labelId="demo-select-small"
                            placeholder='Select the Role'
                            value={empType}
                            onChange={(e) => setEmpType(e.target.value)}
                            label="."
                        >
                            <MenuItem value="Employee">Employee</MenuItem>
                            <MenuItem value="Intern">Intern</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>Designation</InputLabel>
                    <FormControl sx={{ width: '100%' }}
                        size="small">
                        <Select
                            placeholder='Select the Designation'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        >
                            <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                            <MenuItem value="Digital Marketing Manager">Digital Marketing Manager</MenuItem>
                            <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                            <MenuItem value="Operation Manager">Operation Manager</MenuItem>
                            <MenuItem value="Finance Advisor">Finance Advisor</MenuItem>
                            <MenuItem value="HR/Accountant">HR/Accountant</MenuItem>
                            <MenuItem value="Team Leader">Team Leader</MenuItem>
                            <MenuItem value="HR Intern">HR Intern</MenuItem>
                            <MenuItem value="Buisness Development">Buisness Development</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>

                    <InputLabel>Orangnization</InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        disabled
                        fullWidth
                        placeholder='Enter the Mobile Number'
                        value={theUpdateData.organization}
                        // onChange={(e) => setMobile(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>Department</InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        disabled
                        fullWidth
                        placeholder='Enter the Mobile Number'
                        value={theUpdateData.department}
                        // onChange={(e) => setMobile(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <br />
            <b><h1>Professional Detail's</h1></b>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Employee Last Company Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Company Name'
                        value={empPreComp}
                        // onChange={(e) => setEmpPreComp(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Employee Last CTC</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the CTC in numbers'
                        value={lastCTC}
                        onChange={(e) => setLastCTC(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Joining Date</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type='date'
                        fullWidth
                        placeholder='Enter the Company Name'
                        value={moment(date_of_joining).format('YYYY-MM-DD')}
                        onChange={(e) => setDateOFJoining(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Annual CTC</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the CTC in numbers'
                        value={annualCTC}
                        onChange={(e) => setAnnualCTC(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <InputLabel>PF</InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the Amount'
                        value={PF}
                        onChange={(e) => setPF(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>PT</InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the Amount'
                        value={PT}
                        onChange={(e) => setPT(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel>LIC</InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the Amount'
                        value={LIC}
                        onChange={(e) => setLIC(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Base Salary</h3>
                    <TextField
                        autoFocus
                        disabled
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Monthly Salary'
                        value={finalamt}
                        onChange={(e) => setBaseSalary(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Reporting Manager</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"

                        fullWidth
                        placeholder='Enter the Reporting Manager'
                        value={reportingManager}
                        onChange={(e) => setReportingManager(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Pan Number</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Pan Card'
                        value={panCard}
                        onChange={(e) => setPanCard(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Aadhar Number</h3>
                    <TextField
                        autoFocus
                        margin="dense"

                        fullWidth
                        placeholder='Enter the Aadhar Number'
                        value={aadhar}
                        onChange={(e) => setAadhar(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Emergency Contact Person Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Emergency Person Name'
                        value={emergencyPerson}
                        onChange={(e) => setEmergencyPerson(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Emergency Contact Number</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Emergency Number'
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>
            <br />
            <b><h1>Bank Detail's</h1></b>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h3>Bank Name</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Bank Name'
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Account Number</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        placeholder='Enter the Account Number'
                        value={accountNo}
                        onChange={(e) => setAccountNo(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>IFSC CODE</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the IFSC Code'
                        value={ifsc}
                        onChange={(e) => setIFSC(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Branch</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder='Enter the Branch Name'
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid>

            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Update</Button>
            </div>
        </>
    )
}

export default EditOnboarding;
