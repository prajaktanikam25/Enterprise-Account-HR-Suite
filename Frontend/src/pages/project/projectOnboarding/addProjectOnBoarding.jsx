import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stepper, Step, StepLabel, Grid, InputLabel, FormControl, Select, MenuItem, Chip } from '@mui/material';
import { Table, Paper, TableHead, TableBody, TableRow, TableCell, TableContainer, IconButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import { uid } from 'uid';

const AddProject = ({ handleClose }) => {
    const [activeStep, setActiveStep] = useState(0);

    const [projectTitle, setProjectTitle] = useState('')
    const [projectManager, setProjectManager] = useState('')
    const [projectHandleBy, setProjectHandleBy] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('In Progress')

    const [products, setProducts] = useState([]);
    const [task, setTask] = useState([]);


    const steps = ['Project', 'Milestone', 'Task'];

    const handleNext = (e) => {
        e.preventDefault()
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const navigate = useNavigate()


    const [newProduct, setNewProduct] = useState({
        id: uid(),
        name: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    const handleInputChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddProduct = () => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setNewProduct({
            id: uid(),
            name: '',
            startDate: '',
            endDate: '',
            status: ''
        });
    };
    // const handleDeleteProduct = (index) => {
    //     const updatedProducts = [...products];
    //     updatedProducts.splice(index, 1);
    //     setProducts(updatedProducts);
    // };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const [newTask, setNewTask] = useState({
        id: uid(),
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        status: ''
    });

    const handleTaskInputChange = (event) => {
        setNewTask({
            ...newTask,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddTask = () => {
        const updatedTasks = [...task, newTask];
        setTask(updatedTasks);
        setNewTask({
            id: uid(),
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            description: '',
            status: ''
        });
    };
    // const handleDeleteTask = (index) => {
    //     const updatedTasks = [...task];
    //     updatedTasks.splice(index, 1);
    //     setTask(updatedTasks);
    // };
    const handleDeleteTask = (id) => {
        const updatedTasks = task.filter((task) => task.id !== id);
        setTask(updatedTasks);
    };

    useEffect(() => {
        const updatedProducts = products.map((product) => ({
            ...product,
        }));
        setProducts(updatedProducts);
        const updatedTasks = task.map((task) => ({
            ...task,
        }));
        setTask(updatedTasks);
    }, [products, task]);

    const addProject = () => {
        const Data = {
            projectTitle: projectTitle,
            projectManager: projectManager,
            projectHandleBy: projectHandleBy,
            startDate: startDate,
            endDate: endDate,
            description: description,
            milestone: products,
            task: task,
            status: 'In Progress',
            createdBy: 1
        }
        console.log(Data)
        axios.post(BASE_URL + "/saveProject", Data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject()
        handleClose()
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

            <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                {activeStep === 0 && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel>Project Title</InputLabel>
                                <TextField
                                    placeholder='Enter Project Name'
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel>Project PM/PMO</InputLabel>
                                <TextField
                                    placeholder='Enter Project Manager Name'
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={projectManager}
                                    onChange={(e) => setProjectManager(e.target.value)}
                                    margin="normal"
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Project Handle By</InputLabel>
                                <TextField
                                    placeholder='Employee Name'
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={projectHandleBy}
                                    onChange={(e) => setProjectHandleBy(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel>Start Date</InputLabel>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    fullWidth
                                    value={startDate}
                                    type='date'
                                    onChange={(e) => setStartDate(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>End Date</InputLabel>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    fullWidth
                                    value={endDate}
                                    type='date'
                                    onChange={(e) => setEndDate(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Description</InputLabel>
                                <TextField
                                    placeholder='Enter Description for  Project'
                                    size='small'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                    </>


                )}

                {activeStep === 1 && (
                    <div style={{ marginTop: '5px' }}>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <InputLabel>Milestone Name</InputLabel>
                                <TextField
                                    placeholder='Enter Milestone Name'
                                    name="name"
                                    size='small'
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Start Date</InputLabel>
                                <TextField
                                    fullWidth
                                    name="startDate"
                                    type="date"
                                    size='small'
                                    value={newProduct.startDate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>End Date</InputLabel>
                                <TextField
                                    fullWidth
                                    name="endDate"
                                    type="date"
                                    size='small'
                                    value={newProduct.endDate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>

                                <InputLabel>Status</InputLabel>
                                <FormControl sx={{ width: "100%" }} size="small">
                                    <Select
                                        name="status"
                                        value={newProduct.status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Red">Red</MenuItem>
                                        <MenuItem value="Amber">Amber</MenuItem>
                                        <MenuItem value="Green">Green</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <Button variant="contained" color="primary" onClick={handleAddProduct}>Milestone</Button>
                        </div>

                        <br />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Milestone</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
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
                                            <TableCell>
                                                <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <br />
                    </div>
                )}

                {activeStep === 2 && (
                    <div style={{ marginTop: '5px' }}>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <InputLabel>Task Name</InputLabel>
                                <TextField
                                    placeholder='Enter Task Name'
                                    name="name"
                                    size='small'
                                    value={newTask.name}
                                    onChange={handleTaskInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Date</InputLabel>
                                <TextField
                                    placeholder='Description'
                                    name="description"
                                    type='date'
                                    size='small'
                                    value={newTask.date}
                                    onChange={handleTaskInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Start Time</InputLabel>
                                <TextField
                                    placeholder='Enter Start Time'
                                    name="startTime"
                                    fullWidth
                                    type="time"
                                    size='small'
                                    value={newTask.startTime}
                                    onChange={handleTaskInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>End Time</InputLabel>
                                <TextField
                                    placeholder='Enter End Time'
                                    name="endTime"
                                    type="time"
                                    fullWidth
                                    size='small'
                                    value={newTask.endTime}
                                    onChange={handleTaskInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Status</InputLabel>
                                <FormControl sx={{ width: "100%" }} size="small">
                                    <Select
                                        name="status"
                                        value={newProduct.status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="In Progrees">In Progrees</MenuItem>
                                        <MenuItem value="On Hold">On Hold</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Description</InputLabel>
                                <TextField
                                    placeholder='Description'
                                    name="description"
                                    size='small'
                                    fullWidth
                                    value={newTask.description}
                                    onChange={handleTaskInputChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <br />
                                <div style={{ textAlign: "right" }}>
                                    <Button variant="contained" color="primary" onClick={handleAddTask}>Task</Button>
                                </div>
                            </Grid>

                        </Grid>
                        <br />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* Render product rows */}
                                <TableBody>
                                    {task.map((task, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.date}</TableCell>
                                            <TableCell>{task.startTime}</TableCell>
                                            <TableCell>{task.endTime}</TableCell>
                                            <TableCell>{(function () {
                                                if (task.status == 'Completed') {
                                                    return <> <Chip label="Completed" color="success" /></>
                                                }
                                                else if (task.status == 'In Progress') {
                                                    return <> <Chip label="In Progress" color="warning" /></>
                                                }
                                                else {
                                                    return <><Chip label="On Hold" color="error" /></>
                                                }
                                            })()}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleDeleteTask(task.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <br />
                    </div>
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
        </Container >
    );
};

export default AddProject;