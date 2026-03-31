import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManageExpense from "./Expense/manageExpense";
import ManageIncome from "./Income/manageIncome";
import ManageHistory from "./History/manageHistory";
import ManageDeleted from "./Deleted/manageDeleted";
import ManageExpenseHistory from "./History/manageExpenseHistory";
import ManageExpenseDeleted from "./Deleted/manageExpenseDeleted";
import MAnageReport from "./Report/manageReport";
import ManageRecord from "./Deleted/manageRecord";

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


const ManageTransaction = () => {
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
                            <Tab label="ADD INCOME" {...a11yProps(0)} />
                            <Tab label="ADD Expense" {...a11yProps(1)} />
                            <Tab label="Report" {...a11yProps(2)} />
                            <Tab label="Deleted Records" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ManageIncome />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ManageExpense />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MAnageReport></MAnageReport>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ManageRecord></ManageRecord>
                    </TabPanel>

                </Box>
            </>) : (<><div style={{ textAlign: 'center' }}>
                <h3>Please Login Properly ! You are not authorize to View Data</h3>
            </div></>)}
        </DefaultLayout>
    )
}

export default ManageTransaction