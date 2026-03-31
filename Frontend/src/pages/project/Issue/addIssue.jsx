import React, { useState, useEffect } from "react";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { uid } from "uid";

const AddIssue = ({ handleClose }) => {

    const [issueTitle, setIssueTitle] = useState('')
    const [description, setDescription] = useState('')
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

    const addIssue = () => {
        var pmsName = pms.filter((x) => x.label == myOptions1);
        const user = localStorage.getItem('name')

        const Project = {
            id: pmsName[0].id,
            projectTitle: pmsName[0].label,
            issue: [{
                id: uid(),
                date: new Date(),
                empName: user,
                issueTitle: issueTitle,
                description: description,
                status: status
            }],
        }
        console.log(Project)
        axios.put(BASE_URL + '/addIssue/' + pmsName[0].id, Project)
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
                    <Grid item xs={12}>
                        <InputLabel>Issue Title</InputLabel>
                        <TextField
                            placeholder='Enter Issue Title'
                            fullWidth
                            size='small'
                            value={issueTitle}
                            onChange={(e) => setIssueTitle(e.target.value)}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            placeholder='Enter Description'
                            autoFocus
                            size='small'
                            value={description}
                            fullWidth
                            onChange={(e) => setDescription(e.target.value)}
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
                <Button onClick={addIssue} variant="contained" color="primary">
                    ADD
                </Button>
            </div>
        </>
    );
};

export default AddIssue;
