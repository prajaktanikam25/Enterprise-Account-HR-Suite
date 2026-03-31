import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Select, MenuItem, FormControl, InputLabel, Table,
  TableBody,
  TableCell,
  Button,
  TableHead,
  TableRow,
  Card,
} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { BASE_URL } from '../../utils/constant';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import CardThree from '../../components/CardThree'
import PendingIncome from '../../components/PendingIncome';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Histogram from '../../components/histogram';
import LineChart from '../../components/LineChart';
import WaitingExpense from '../../components/WaitingExpense';
import RecipeReviewCard from './EmpDashboard';
import ManageEmployeeAttendenceLog from '../Employee/attendence/EmployeeAttendenceLog';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Analytics = () => {
  const [APIData, setAPIData] = useState([])
  const [APIData1, setAPIData1] = useState([])
  const [organization, setOrganization] = useState("")

  const [value, setValue] = useState(0);

  const [value1, setValue1] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event, newValue1) => {
    setValue1(newValue1);
  };

  // useEffect(() => {
  //   axios.get(BASE_URL + `/getOrganization`).then((res) => {
  //     console.log(res.data)
  //     var array1 = []
  //     for (var i = 0; i < res.data.length; i++) {
  //       array1.push({ label: res.data[i].name, id: res.data[i]._id })
  //     }
  //     setOrganization(array1);
  //   });
  // }, []);

  const getTotalIncomePurpose = async () => {
    await axios.get(BASE_URL + `/total-income-purpose`)
      .then((response) => {
        setAPIData(response.data);
      }
      );
  }
  const getTotalExpensePurpose = async () => {
    await axios.get(BASE_URL + `/total-expense-purpose`)
      .then((response) => {
        setAPIData1(response.data);
      }
      );
  }

  useEffect(() => {
    getTotalIncomePurpose()
    getTotalExpensePurpose()
  }, []);
  const role = localStorage.getItem('role')
  return (
    <DefaultLayout>
      <br />
      {(function () {
        if (role == "Admin") {
          return <>  <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Button variant="contained" >Last Month</Button>&nbsp;
            <Button variant="contained" >Last Week</Button>&nbsp; */}
              <FormControl sx={{ width: "40%" }} size="small">
                <Select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="BooStock">BooStock</MenuItem>
                  <MenuItem value="I Tech Mentor">I Tech Mentor</MenuItem>
                  <MenuItem value="Unity share">Unity Share</MenuItem>
                  <MenuItem value="My self">My self</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Recieved Income" {...a11yProps(0)} />
                <Tab label="Pending Income" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardOne organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <PendingIncome organization={organization} ></PendingIncome>
              </div>
            </TabPanel>

            <br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example" centered>
                <Tab label="Approve Expense" {...a11yProps(0)} />
                <Tab label="Waiting Expense" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value1} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardTwo organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value1} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <WaitingExpense organization={organization} />
              </div>
            </TabPanel>

            <br />
            <h3>Deduction</h3>
            <br />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
              <CardThree />

            </div>
            <br />

            <br />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>Total Income Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>

                        <TableCell align="left">Department Name</TableCell>
                        <TableCell align="left">Total Amount</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData.map((row, index) => {
                        return (
                          <TableRow
                            key={index}

                          >

                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.totalAmount}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={6}>
                <h3>Total Expense Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Expense Purpose </TableCell>
                        <TableCell align="left">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData1.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                          >
                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.TotalExpense}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>
            <Histogram></Histogram>
            <br />

            <LineChart />
            <br />
          </>
        }
        else if (role == "Manager") {
          return <>  <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Button variant="contained" >Last Month</Button>&nbsp;
            <Button variant="contained" >Last Week</Button>&nbsp; */}
              <FormControl sx={{ width: "40%" }} size="small">
                <Select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="BooStock">BooStock</MenuItem>
                  <MenuItem value="I Tech Mentor">I Tech Mentor</MenuItem>
                  <MenuItem value="Unity share">Unity Share</MenuItem>
                  <MenuItem value="My self">My self</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Recieved Income" {...a11yProps(0)} />
                <Tab label="Pending Income" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardOne organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <PendingIncome organization={organization} ></PendingIncome>
              </div>
            </TabPanel>

            <br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example" centered>
                <Tab label="Approve Expense" {...a11yProps(0)} />
                <Tab label="Waiting Expense" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value1} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardTwo organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value1} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <WaitingExpense organization={organization} />
              </div>
            </TabPanel>

            <br />
            <h3>Deduction</h3>
            <br />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
              <CardThree />

            </div>
            <br />

            <br />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>Total Income Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>

                        <TableCell align="left">Department Name</TableCell>
                        <TableCell align="left">Total Amount</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData.map((row, index) => {
                        return (
                          <TableRow
                            key={index}

                          >

                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.totalAmount}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={6}>
                <h3>Total Expense Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Expense Purpose </TableCell>
                        <TableCell align="left">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData1.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                          >
                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.TotalExpense}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>
            <Histogram></Histogram>
            <br />

            <LineChart />
            <br />
          </>
        }
        else if (role == "Accountant") {
          return <>  <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Button variant="contained" >Last Month</Button>&nbsp;
            <Button variant="contained" >Last Week</Button>&nbsp; */}
              <FormControl sx={{ width: "40%" }} size="small">
                <Select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="BooStock">BooStock</MenuItem>
                  <MenuItem value="I Tech Mentor">I Tech Mentor</MenuItem>
                  <MenuItem value="Unity share">Unity Share</MenuItem>
                  <MenuItem value="My self">My self</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Recieved Income" {...a11yProps(0)} />
                <Tab label="Pending Income" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardOne organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <PendingIncome organization={organization} ></PendingIncome>
              </div>
            </TabPanel>

            <br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example" centered>
                <Tab label="Approve Expense" {...a11yProps(0)} />
                <Tab label="Waiting Expense" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value1} index={0}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardTwo organization={organization} />
              </div>
            </TabPanel>
            <TabPanel value={value1} index={1}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <WaitingExpense organization={organization} />
              </div>
            </TabPanel>

            <br />
            <h3>Deduction</h3>
            <br />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
              <CardThree />

            </div>
            <br />

            <br />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>Total Income Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>

                        <TableCell align="left">Department Name</TableCell>
                        <TableCell align="left">Total Amount</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData.map((row, index) => {
                        return (
                          <TableRow
                            key={index}

                          >

                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.totalAmount}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={6}>
                <h3>Total Expense Department Wise</h3>
                <br></br>
                <TableContainer component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Expense Purpose </TableCell>
                        <TableCell align="left">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {APIData1.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                          >
                            <TableCell align="left">{row._id}</TableCell>
                            <TableCell align="left">{row.TotalExpense}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>
            <Histogram></Histogram>
            <br />

            <LineChart />
            <br />
          </>
        }
        else if (role == "Employee") {
          return <>
            <RecipeReviewCard></RecipeReviewCard>
            <br />
            <h3>Attendence Log</h3>
            <br></br>
            <ManageEmployeeAttendenceLog></ManageEmployeeAttendenceLog>
          </>
        }
        else {
          return <><div style={{ textAlign: 'center' }}>
            <h3>Please Login Properly ! You are not authorize to View Data</h3>
          </div></>
        }
      })()}

    </DefaultLayout>
  )
}

export default Analytics;
