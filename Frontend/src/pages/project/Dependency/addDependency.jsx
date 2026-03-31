import React, { useState, useEffect } from "react";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { uid } from "uid";

const AddDependency = ({ handleClose }) => {

    const [dependencyTitle, setDependencyTitle] = useState('')
    const [description, setDescription] = useState('')
  
    const [pms, setPMS] = useState([])
    const [myOptions1, setMyOptions1] = useState('');
    const [emp, setEmp] = useState([])
    const [myOptions3, setMyOptions3] = useState('');


    useEffect(() => {
        axios.get(BASE_URL + `/getProject`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                array1.push({ label: res.data[i].projectTitle, id: res.data[i]._id })
            }
            setPMS(array1);
        });
        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            var array3 = [];
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].organization == 'I Tech Mentor')
                    array3.push({ label: res.data[i].firstName + " " + res.data[i].lastName, id: res.data[i]._id });
            }
            setEmp(array3);
        });
    }, []);

    const addDependency = () => {
        var pmsName = pms.filter((x) => x.label == myOptions1);
        var fname = emp.filter((x) => x.label == myOptions3);
        const Project = {
            id: pmsName[0].id,
            projectTitle: pmsName[0].label,
            dependency: [{
                id: uid(),
                date: new Date(),
                dependencyEmp: fname[0].label,
                dependencyTitle: dependencyTitle,
                description: description
            }],
        }
        console.log(Project)
        axios.put(BASE_URL + '/addDependency/' + pmsName[0].id, Project)
        handleClose()
    }

    const changePage = () => {
        handleClose();
    };

    return (
        <>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
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

                    <Grid item xs={6}>
                        <InputLabel>Employee List</InputLabel>
                        <Autocomplete
                            style={{ width: '100%' }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={emp}
                            value={myOptions3}
                            onChange={(e) => setMyOptions3(e.currentTarget.innerHTML)}
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
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Dependency Title</InputLabel>
                        <TextField
                            placeholder='Enter Dependency Title'
                            autoFocus
                            size='small'
                            value={dependencyTitle}
                            fullWidth
                            onChange={(e) => setDependencyTitle(e.target.value)}
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
                <Button onClick={addDependency} variant="contained" color="primary">
                    ADD
                </Button>
            </div>
        </>
    );
};

export default AddDependency;
