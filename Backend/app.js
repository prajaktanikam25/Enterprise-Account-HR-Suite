const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const dbConfig = require('./database/database.config');
const Category = require('./routes/category.routes')
const User = require('./routes/user.routes')
const Income = require('./routes/income.route')
const Organization = require('./routes/oraganization.routes')
const Department = require('./routes/department.routes')
const Budget = require('./routes/budget.route')
const Commission = require('./routes/commission.route')
const Deduction = require('./routes/deduction.route')
const Expense = require('./routes/expense.route')
const Auth = require('./routes/auth.route')
const Dashboard = require('./routes/dashboard.route')
const Invoice = require('./routes/invoice.route')
const Employee = require('./routes/employee.route')
const Loan = require('./routes/loan.route')
const Taxation = require('./routes/taxation.route')
const Attendence = require('./routes/attendence.route')
const Salary = require('./routes/salary.route');
const DeductionReport = require('./routes/report.route');
const leave = require('./routes/leave.route');
const Holiday = require('./routes/holiday.route');
const Project = require('./routes/project.route');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

/**API Routes */
app.use("/api",
    Organization,
    Department,
    Deduction,
    Taxation,
    Commission,
    Budget,
    Category,
    Loan,
    User,
    Income,
    Expense,
    Auth,
    Dashboard,
    Invoice,
    Employee,
    Attendence,
    Salary,
    DeductionReport,
    Holiday,
    leave,
    Project
)


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

/**
 * Mongo DB Connection
 */
app.listen(3002, function () {
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Successfully connected to the database at 3002 Port");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

});
