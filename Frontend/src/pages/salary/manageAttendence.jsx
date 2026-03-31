import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManageAttendenceReport from "./attendenceReport";
import ManageAttendenceLog from "../Employee/attendence/manageAttendence";
import ManageSalarySlip from "./salarySlip";
import ManageHolidayList from "../Holiday/manageHolidayList";

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


const ManageAttendenceTab = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const role = localStorage.getItem('role')

    return (
        <DefaultLayout>
            {role != null ? (<>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                            <Tab label="Attendence Log" {...a11yProps(0)} />
                            <Tab label="Attendence Report" {...a11yProps(1)} />
                            <Tab label="Salary Slip" {...a11yProps(2)} />
                            <Tab label="Holiday Record" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ManageAttendenceLog />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ManageAttendenceReport></ManageAttendenceReport>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ManageSalarySlip></ManageSalarySlip>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                       <ManageHolidayList></ManageHolidayList>
                    </TabPanel>
                </Box>
            </>) : (<><div style={{ textAlign: 'center' }}>
                <h3>Please Login Properly ! You are not authorize to View Data</h3>
            </div></>)}
        </DefaultLayout>
    )
}

export default ManageAttendenceTab