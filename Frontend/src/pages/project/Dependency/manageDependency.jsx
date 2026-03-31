import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Divider, Grid, Popover } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
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
import AddDependency from './addDependency';



const ManageDependency = () => {

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

    const getDependencyData = async () => {
        if (role == 'Employee') {
            await axios.get(BASE_URL + `/getProject?search=${searchValue}&name=` + user)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
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

    const [obj1, setObj1] = useState(null);
    const [show, setShow] = useState(false);
    //Dialog Form
    const CloseEdit = () => setShow(false);
    const handleShow = (row) => {
        setObj1(row);
        setShow(true);
    };

    useEffect(() => {
        getDependencyData()
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
                                <TableCell align="center">Project Name</TableCell>
                                <TableCell align="center">Employee Name</TableCell>
                                <TableCell align="center">Dependency Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData.map((row, index) => {
                                return (
                                    row.dependency.map((mile, index1) => {
                                        const key = `${index}-${index1}`;
                                        return (
                                            <TableRow
                                                key={key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.projectTitle}</TableCell>
                                                <TableCell align="center">{mile.dependencyEmp}</TableCell>
                                                <TableCell align="center">{mile.dependencyTitle}</TableCell>
                                                <TableCell align="center">{mile.description}</TableCell>

                                            </TableRow>
                                        )
                                    })
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Dialog open={open1} fullWidth>
                    <DialogTitle>Raise Dependency for Project
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

                        <AddDependency handleClose={handleClose1}></AddDependency>
                    </DialogContent>

                </Dialog>

            </div>

        </DefaultLayout>

    )
}

export default ManageDependency;