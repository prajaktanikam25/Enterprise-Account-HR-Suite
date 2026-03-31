import React, { useState, useEffect } from "react";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";

const ViewProjetDetails = ({ theEditData, handleClose }) => {

    const [projectTitle, setProjectTitle] = useState(theEditData.projectTitle)
    const [projectManager, setProjectManager] = useState(theEditData.projectManager)
    const [projectHandleBy, setProjectHandleBy] = useState(theEditData.projectHandleBy)
    const [startDate, setStartDate] = useState(theEditData.startDate)
    const [endDate, setEndDate] = useState(theEditData.endDate)
    const [description, setDescription] = useState(theEditData.description)
    const [status, setStatus] = useState(theEditData.status)

    const [products, setProducts] = useState(theEditData.milestone);

    const updateProject = () => {
        const Project = {
            projectTitle: projectTitle,
            projectManager: projectManager,
            projectHandleBy: projectHandleBy,
            startDate: startDate,
            endDate: endDate,
            description: description,
            status: status,
            createdBy: 1
        }
        axios.put(BASE_URL + '/updateProject/' + theEditData._id, Project)
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
                        <InputLabel>Project Name</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>PM/ PMO</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={projectManager}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Employee</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={projectHandleBy}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>Start Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={startDate}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>End Date</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            placeholder="Enter the Requested Amount"
                            value={endDate}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            placeholder="Enter the Disbursed Amount"
                            value={description}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                </Grid>
                <br />
                <b>MILESTONE LIST</b>
                <br />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Milestone</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Render product rows */}
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.startDate}</TableCell>
                                    <TableCell>{product.endDate}</TableCell>
                                    <TableCell>
                                        {(function () {
                                            if (product.status == 'Green') {
                                                return <> <Chip label="Green" color="success" /></>
                                            }
                                            else if (product.status == 'Amber') {
                                                return <> <Chip label="Amber" color="warning" /></>
                                            }
                                            else {
                                                return <><Chip label="Red" color="error" /></>
                                            }
                                        })()}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <InputLabel>Status</InputLabel>
                        <FormControl sx={{ width: "100%" }} size="small">
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="On Hold">On Hold</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Client Review">Client Review</MenuItem>
                                <MenuItem value="Payment Done">Payment Done</MenuItem>
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
                <Button onClick={updateProject} variant="contained" color="primary">
                    Update
                </Button>
            </div>

        </>
    );
};

export default ViewProjetDetails;
