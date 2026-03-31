import React, { useState, useEffect } from "react";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { uid } from "uid";

const AddTask = ({ handleClose }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [status, setStatus] = useState('In Progress')

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

    const addTask = () => {
        var pmsName = pms.filter((x) => x.label == myOptions1);
        const user = localStorage.getItem('name')

        const Project = {
            id: pmsName[0].id,
            projectTitle: pmsName[0].label,
            task: [{
                id: uid(),
                empName: user,
                name: name,
                description: description,
                date: new Date(),
                startTime: startTime,
                endTime: endTime,
                status: status
            }],
            createdBy: 1
        }
        axios.put(BASE_URL + '/addTask/' + pmsName[0].id, Project)
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Task Name</InputLabel>
                        <TextField
                            placeholder='Enter Task Name'
                            name="name"
                            fullWidth
                            size='small'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            placeholder='Description'
                            name="description"
                            fullWidth
                            size='small'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Start Time</InputLabel>
                        <TextField
                            placeholder='Enter Start Time'
                            name="startTime"
                            fullWidth
                            type="time"
                            size='small'
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>End Time</InputLabel>
                        <TextField
                            placeholder='Enter End Time'
                            name="endTime"
                            type="time"
                            fullWidth
                            size='small'
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>

                        <InputLabel>Status</InputLabel>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="On Hold">On Hold</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </form>
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={changePage} variant="contained">
                    Cancel
                </Button>
                &nbsp;
                <Button onClick={addTask} variant="contained" color="primary">
                    ADD
                </Button>
            </div>
        </>
    );
};

export default AddTask;
