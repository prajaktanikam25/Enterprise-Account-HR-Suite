import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, DialogActions, Divider, FormControl, Grid, InputLabel, MenuItem, Popover, Select, TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Paper from '@mui/material/Paper';
import {
    Box,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import DefaultLayout from '../../../layout/DefaultLayout';
import { BASE_URL } from '../../../utils/constant';
import AddTask from './addTask';


const ManageTask = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate()

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
    const id = open ? 'simple-popover' : undefined;

    const [APIData, setAPIData] = useState([])
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
    }

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
        var response = await axios.put(BASE_URL + "/updateTask", obj1)
        CloseEdit()
    }


    useEffect(() => {
        getProjectData()
    }, [show, open1, searchValue]);

    return (

        <DefaultLayout>
            <div className='flex flex-col gap-10'>
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
                            <Button aria-describedby={id} variant="contained" size='large' onClick={handleClickOpen}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Project Title</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Task Name</TableCell>
                                <TableCell align="center">Task Date</TableCell>
                                <TableCell align="center">Start Time</TableCell>
                                <TableCell align="center">End Time</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((row, index) => {
                                return (
                                    row.task.map((task, index1) => {
                                        const key = `${index}-${index1}`;
                                        return (
                                            <TableRow
                                                key={key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.projectTitle}</TableCell>
                                                <TableCell align="center">{task.empName}</TableCell>
                                                <TableCell align="center">{task.name}</TableCell>
                                                <TableCell align="center">{new Date(task.date).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell align="center">{task.startTime}</TableCell>
                                                <TableCell align="center">{task.endTime}</TableCell>
                                                <TableCell align="center">
                                                    {(function () {
                                                        if (task.status == 'Completed') {
                                                            return <> <Chip label="Completed" color="success" /></>
                                                        }
                                                        else if (task.status == 'In Progrees') {
                                                            return <> <Chip label="In Progrees" color="warning" /></>
                                                        }
                                                        else {
                                                            return <><Chip label="In Progrees" color="warning" /></>
                                                        }
                                                    })()}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => handleShow(task, row._id)}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Dialog open={open1} fullWidth>
                    <DialogTitle>Add Task
                        <IconButton
                            aria-label="close"
                            onClick={handleClose1}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,

                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <AddTask handleClose={handleClose1}></AddTask>
                    </DialogContent>

                </Dialog>

                {/* Edit Data */}
                <Dialog open={show} fullWidth maxWidth={"md"}>
                    <DialogTitle>
                        Modify Task
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel>Task Name</InputLabel>
                                <TextField
                                    placeholder='Enter Task Name'
                                    fullWidth
                                    size='small'

                                    value={obj1.name}
                                // onChange={(e) => handleObjChange("name", e.target.value)}
                                />
                            </Grid>

                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel>Description</InputLabel>
                                <TextField
                                    placeholder='Description'
                                    fullWidth
                                    size='small'
                                    value={obj1.description}
                                    onChange={(e) => handleObjChange("description", e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel>Start Time</InputLabel>
                                <TextField
                                    placeholder='Enter Start Time'
                                    fullWidth
                                    type="time"
                                    disabled
                                    size='small'
                                    value={obj1.startTime}
                                    onChange={(e) => handleObjChange("startTime", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>End Time</InputLabel>
                                <TextField
                                    placeholder='Enter End Time'
                                    type="time"
                                    fullWidth
                                    size='small'
                                    value={obj1.endTime}
                                    onChange={(e) => handleObjChange("endTime", e.target.value)}
                                />
                            </Grid>

                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>

                                <InputLabel>Status</InputLabel>
                                <FormControl sx={{ width: "100%" }} size="small">
                                    <Select
                                        value={obj1.status}
                                        onChange={(e) => handleObjChange("status", e.target.value)}
                                    >
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="On Hold">On Hold</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={CloseEdit}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </DefaultLayout>

    )
}

export default ManageTask;