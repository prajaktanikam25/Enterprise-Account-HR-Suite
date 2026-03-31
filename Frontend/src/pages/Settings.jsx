import React, { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManageCommission from './master/commission/manageCommission';
import ManageDeduction from './master/deduction/manageDeduction';
import ManageBudget from './master/budget/manageBudget';
import ManageCatalogue from './master/category/manageCategory';
import ManageOrganzation from './organization/manageOrganization';
import ManageDepartment from './department/manageDepartment';
import ManageUser from './userMaster/manageUser';


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

const Settings = () => {
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
              <Tab label="COMMISSION" {...a11yProps(0)} />
              <Tab label="DEDUCTION" {...a11yProps(1)} />
              <Tab label="BUDGET" {...a11yProps(2)} />
              <Tab label="Category" {...a11yProps(3)} />
              <Tab label="User Master" {...a11yProps(4)} />
              <Tab label="Department" {...a11yProps(5)} />
              <Tab label="Organization" {...a11yProps(6)} />

            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ManageCommission></ManageCommission>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ManageDeduction></ManageDeduction>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ManageBudget></ManageBudget>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ManageCatalogue></ManageCatalogue>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <ManageUser></ManageUser>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ManageDepartment></ManageDepartment>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ManageOrganzation></ManageOrganzation>
          </TabPanel>

        </Box>
      </>) : (<><div style={{ textAlign: 'center' }}>
        <h3>Please Login Properly ! You are not authorize to View Data</h3>
      </div></>)}
    </DefaultLayout>
  )
}

export default Settings;
