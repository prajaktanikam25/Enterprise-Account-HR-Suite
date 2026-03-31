import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Chip,
    Divider,
    Grid,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Paper from "@mui/material/Paper";
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import DefaultLayout from "../../../layout/DefaultLayout";
import { BASE_URL } from "../../../utils/constant";
import AddMilestone from "./addMilestone";

const ManageMilestone = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    const [open1, setOpen1] = useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [APIData, setAPIData] = useState([]);
    const [APITaskData, setAPITaskData] = useState([]);
    const [searchValue, setSearchValue] = useState('')

    const user = localStorage.getItem('name')
    const role = localStorage.getItem('role')

    const getProjectData = async () => {
        if (role == 'Employee')
            await axios.get(BASE_URL + `/getProject?search=${searchValue}&name=` + user)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        else {
            await axios.get(BASE_URL + `/getProject?search=${searchValue}`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
    };
    const searchData = async (searchString) => {
        if (searchString) {
            setSearchValue(searchString)
        }
        else {
            setSearchValue('')
        }
    }

    const [obj1, setObj1] = useState({});
    const [show, setShow] = useState(false);
    //Dialog Form
    const CloseEdit = () => setShow(false);
    const handleShow = (row, id) => {
        row.prId = id
        setObj1(row);
        setShow(true);
    };

    const handleObjChange = (attribute, value) => {
        setObj1({ ...obj1, [attribute]: value });
        console.log(obj1)
    };

    const handleUpdate = async () => {
        var response = await axios.put(BASE_URL + "/updateMileStone", obj1)
        CloseEdit()
    }

    useEffect(() => {
        getProjectData();
    }, [show, open1, searchValue]);

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-10">
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={10} sm={10} lg={11}>
                            <input
                                type='text'
                                placeholder='Search Here'
                                style={{ backgroundColor: 'white' }}
                                onChange={(e) => searchData(e.target.value)}
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sm={2} lg={1}>
                            <Button
                                aria-describedby={id}
                                variant="contained"
                                size="large"
                                onClick={handleClickOpen}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Project Title</TableCell>
                                <TableCell align="center">Emplyoee Name</TableCell>
                                <TableCell align="center">Milestone Name</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((row, index) => {
                                return row.milestone.map((mile, index1) => {
                                    return (
                                        <TableRow
                                            key={index1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.projectTitle}</TableCell>
                                            <TableCell align="center">
                                                {row.projectHandleBy}
                                            </TableCell>
                                            <TableCell align="center">{mile.name}</TableCell>
                                            <TableCell align="center">{mile.startDate}</TableCell>
                                            <TableCell align="center">{mile.endDate}</TableCell>
                                            <TableCell align="center">
                                                {(function () {
                                                    if (mile.status == "Green") {
                                                        return (
                                                            <>
                                                                {" "}
                                                                <Chip label="Green" color="success" />
                                                            </>
                                                        );
                                                    } else if (mile.status == "Amber") {
                                                        return (
                                                            <>
                                                                {" "}
                                                                <Chip label="Amber" color="warning" />
                                                            </>
                                                        );
                                                    } else {
                                                        return (
                                                            <>
                                                                <Chip label="Red" color="error" />
                                                            </>
                                                        );
                                                    }
                                                })()}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleShow(mile, row._id)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                });
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open1} fullWidth>
                    <DialogTitle>
                        Create Milestone for Project
                        <IconButton
                            aria-label="close"
                            onClick={handleClose1}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <AddMilestone handleClose={handleClose1}></AddMilestone>
                    </DialogContent>
                </Dialog>

                {/* Edit Data */}
                <Dialog open={show} fullWidth maxWidth={"md"}>
                    <DialogTitle>
                        Modify Milestone
                        <IconButton
                            aria-label="close"
                            onClick={CloseEdit}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item md={6}>
                                <InputLabel>Name</InputLabel>
                                <TextField
                                    value={obj1.name}
                                    size="small"
                                    fullWidth
                                    onChange={(e) => handleObjChange("name", e.target.value)}
                                ></TextField>
                            </Grid>
                            <Grid item md={6}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    size="small"
                                    fullWidth
                                    name="status"
                                    value={obj1.status}
                                    onChange={(e) => handleObjChange("status", e.target.value)}
                                >
                                    <MenuItem value="Red">Red</MenuItem>
                                    <MenuItem value="Amber">Amber</MenuItem>
                                    <MenuItem value="Green">Green</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item md={6}>
                                <InputLabel>Start Date</InputLabel>
                                <TextField
                                    type="date"
                                    value={obj1.startDate}
                                    onChange={(e) => handleObjChange("startDate", e.target.value)}
                                    size="small"
                                    fullWidth
                                ></TextField>
                            </Grid>
                            <Grid item md={6}>
                                <InputLabel>End Date</InputLabel>
                                <TextField
                                    type="date"
                                    value={obj1.endDate}
                                    onChange={(e) => handleObjChange("endDate", e.target.value)}
                                    size="small"
                                    fullWidth
                                ></TextField>
                            </Grid>
                        </Grid>

                        {/* <ViewProjetDetails theEditData={obj1} handleClose={CloseEdit}></ViewProjetDetails> */}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={CloseEdit}>Cancel</Button>
                        {(function () {
                            if (role == "Admin") {
                                return (
                                    <>
                                        <Button variant="contained" onClick={handleUpdate}>Update</Button>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        
                                    </>
                                );
                            }
                        })()}
                    </DialogActions>
                </Dialog>
            </div>
        </DefaultLayout>
    );
};

export default ManageMilestone;