import React, { useState, useEffect } from "react";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { uid } from "uid";

const AddMilestone = ({ handleClose }) => {

    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('Amber')

    const [pms, setPMS] = useState([])
    const [myOptions1, setMyOptions1] = useState('');

    useEffect(() => {
        axios.get(BASE_URL + `/getProject`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].projectTitle, id: res.data[i]._id })
            }
            setPMS(array1);
        });
    }, []);

    const updateProject = () => {
        var pmsName = pms.filter((x) => x.label == myOptions1);

        const Project = {
            id: pmsName[0].id,
            projectTitle: pmsName[0].label,
            milestone: [{
                id: uid(),
                name: name,
                startDate: startDate,
                endDate: endDate,
                status: status
            }],
            createdBy: 1
        }
        console.log(Project)
        axios.put(BASE_URL + '/addMilestone/' + pmsName[0].id, Project)
        handleClose()
    }

    const changePage = () => {
        handleClose();
    };

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Project Title</InputLabel>
                        <Autocomplete
                            style={{ width: '100%' }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={pms}
                            value={myOptions1}
                            onChange={(e) => setMyOptions1(e.currentTarget.innerHTML)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Select the Project"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputLabel>Milestone Name</InputLabel>
                        <TextField
                            placeholder='Enter Milestone Name'
                            fullWidth
                            name="name"
                            size='small'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Status</InputLabel>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="Red">Red</MenuItem>
                                <MenuItem value="Amber">Amber</MenuItem>
                                <MenuItem value="Green">Green</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputLabel>Start Date</InputLabel>
                        <TextField
                            autoFocus
                            name="startDate"
                            type="date"
                            size='small'
                            value={startDate}
                            fullWidth
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>End Date</InputLabel>
                        <TextField
                            autoFocus
                            name="endDate"
                            fullWidth
                            type="date"
                            size='small'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
                <Button onClick={updateProject} variant="contained" color="primary">
                    ADD
                </Button>
            </div>
        </>
    );
};

export default AddMilestone;
