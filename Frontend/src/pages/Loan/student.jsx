import React, { useState } from 'react';
import { TextField, Button, Container, Stepper, Step, StepLabel, Grid, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudentOnboardingForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const steps = ['Project', 'Milestone', 'Task'];

    const handleNext = (e) => {
        e.preventDefault()
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here

        navigate('/')
        console.log("dasda")
        console.log(`Submitted: ${name}, ${email}, ${phoneNumber}`);
        // You can send the form data to an API or perform any other action
    };

    return (
        <Container maxWidth="lg">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <form onSubmit={activeStep === steps.length - 1?handleSubmit:handleNext}>
                {activeStep === 0 && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Project Title"
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Project PMO/PM"
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Project Handle By"
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <React.Fragment>



                            <TextField
                                size='small'
                                variant="outlined"
                                fullWidth
                                value={name}
                                type='date'
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                size='small'
                                variant="outlined"
                                fullWidth
                                type='date'

                                margin="normal"
                            />
                            <TextField
                                size='small'
                                label="Description"
                                variant="outlined"
                                fullWidth

                                margin="normal"
                            />
                        </React.Fragment>
                    </>


                )}

                {activeStep === 1 && (
                    <React.Fragment>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />

                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            margin="normal"
                        />
                    </React.Fragment>
                )}

                {activeStep === 2 && (
                    <React.Fragment>
                        <TextField
                            label="USERNAME"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />

                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            margin="normal"
                        />
                    </React.Fragment>
                )}

                <div style={{ textAlign: "right" }}>
                    {activeStep !== 0 && (
                        <Button variant="outlined" color="primary" onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    &nbsp;
                    <Button variant="contained" type={"submit"} color="primary" >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default StudentOnboardingForm;