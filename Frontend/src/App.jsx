import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import FormElements from './pages/Form/FormElements'
import FormLayout from './pages/Form/FormLayout'
import Settings from './pages/Settings'
import Chart from './pages/Chart'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import ManageUser from './pages/userMaster/manageUser'
import AddUser from './pages/userMaster/addUser'
import ManageTransaction from './pages/transaction/manageTransaction'
import AddExpense from './pages/transaction/Expense/addExpense'
import ManageOrganzation from './pages/organization/manageOrganization'
import ManageDepartment from './pages/Department/manageDepartment'
import ManageGst from './pages/gst/manageGST'
import ManageLoan from './pages/Loan/manageLoan'
import ManageInvoice from './pages/Invoice/manageInvoice'
import AddInvoice from './pages/Invoice/addInvoice'
import ManageOnboarding from './pages/Employee/onboarding/manageOnboarding'
import ManageAttendence from './pages/Employee/attendence/manageAttendence'
import AddOnboarding from './pages/Employee/onboarding/addOnboarding'
import EmpAttendence from './pages/Employee/attendence/employeeAttendence'
import ManageAttendenceReport from './pages/salary/attendenceReport'
import ManageAttendenceTab from './pages/salary/manageAttendence'
import ManageLeave from './pages/Leave/manageLeave'
import ManageProjectOnboarding from './pages/project/projectOnboarding/manageprojectOnboarding'
import ManageTask from './pages/project/Task/manageTask'
import ManageMilestone from './pages/project/Milestone/manageMilestone'
import ManageIssue from './pages/project/Issue/manageIssue'
import ManageDependency from './pages/project/Dependency/manageDependency'
import EmpSalarySlip from './pages/salary/EmpSlip'

const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 100);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 100)
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/forms/form-layout' element={<FormLayout />} />


          <Route path='/settings' element={<Settings />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
          <Route path='/dashboard' element={<Analytics />} />
          <Route path='/auth/signup' element={<SignUp />} />



          <Route path='/manageUser' element={<ManageUser />} />
          <Route path='/addUser' element={<AddUser />} />

          <Route path='/manageTransaction' element={<ManageTransaction />} />
          <Route path='/addExpense' element={<AddExpense />} />

          <Route path='/organization' element={<ManageOrganzation />} />
          <Route path='/department' element={<ManageDepartment />} />

          <Route path='/gst' element={<ManageGst />} />
          <Route path='/loan' element={<ManageLoan />} />

          <Route path='/invoice' element={<ManageInvoice />} />
          <Route path='/addInvoice' element={<AddInvoice />} />

          <Route path='/manage-onboarding' element={<ManageOnboarding />} />

          <Route path='/manage-attendence' element={<ManageAttendenceTab />} />
          <Route path='/emp-onboard' element={<AddOnboarding />} />


          <Route path='/emp-attendence' element={<EmpAttendence />} />

          <Route path='/manage-leave' element={<ManageLeave />} />

          <Route path='/manage-project' element={<ManageProjectOnboarding />} />
          <Route path='/manage-task' element={<ManageTask />} />
          <Route path='/manage-milestone' element={<ManageMilestone />} />

          <Route path='/manage-issue' element={<ManageIssue />} />
          <Route path='/manage-dependency' element={<ManageDependency />} />

          <Route path='/emp-salary-slip' element={<EmpSalarySlip />} />
          
        </Routes>

      </>
    )
  )
}

export default App
