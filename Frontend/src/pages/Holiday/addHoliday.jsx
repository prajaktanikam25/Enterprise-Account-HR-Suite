import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { BASE_URL } from "../../utils/constant";
import { Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const AddHoliday = ({ handleClose }) => {
    const [month, setMonth] = useState('Jun');
    const [year, setYear] = useState(2023);
    const [sunday, setSunday] = useState('');
    const [holiday, setHoliday] = useState('');

    const [status, setStatus] = useState('')

    const total = parseInt(sunday) + parseInt(holiday)
    
    const postHolidayData = () => {

        const HolidayData = {
            name: month,
            year: year,
            sunday: sunday,
            holiday: holiday,
            total: total,
            status: status
        };
        axios.post(BASE_URL + "/saveHoliday", HolidayData);
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
                        <InputLabel>Month</InputLabel>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <MenuItem value="Jan">January</MenuItem>
                                <MenuItem value="Feb">February</MenuItem>
                                <MenuItem value="Mar">March</MenuItem>
                                <MenuItem value="Apr">April</MenuItem>
                                <MenuItem value="May">May</MenuItem>
                                <MenuItem value="Jun">June</MenuItem>
                                <MenuItem value="Jul">July</MenuItem>
                                <MenuItem value="Aug">August</MenuItem>
                                <MenuItem value="Sep">September</MenuItem>
                                <MenuItem value="Oct">October</MenuItem>
                                <MenuItem value="Nov">November</MenuItem>
                                <MenuItem value="Dec">December</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Year</InputLabel>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Sunday</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            fullWidth
                            min='0'
                            max='5'
                            placeholder="Enter No of Sunday"
                            value={sunday}
                            onChange={(e) => setSunday(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Holiday</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            fullWidth
                            min='0'
                            max='10'
                            placeholder="Enter No of Holiday"
                            value={holiday}
                            onChange={(e) => setHoliday(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Total</InputLabel>
                        <TextField
                            autoFocus
                            disabled
                            margin="dense"
                            type="number"
                            fullWidth
                            placeholder="Enter No of Sunday"
                            value={total}
                          
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={postHolidayData} variant="contained" color="primary">
                    Submit
                </Button>
            </div>

        </>
    );
};

export default AddHoliday;

