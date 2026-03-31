import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constant";

const ManageDeduct = ({ theDedcutData, handleClose }) => {
    console.log(theDedcutData)

    const [deduction, setDeduction] = useState([])
    const [organization, setOrganization] = useState(theDedcutData.report._id.organization)
    const [year, setYear] = useState(theDedcutData.report._id.year)
    const [month, setMonth] = useState(theDedcutData.report._id.month)
    const [deductionPurpose, setDeductionPurpose] = useState(theDedcutData.label)
    const [deductionPer, setDeductionPer] = useState(theDedcutData.per)
    const [deductionAmount, setDeductionAmount] = useState()
    const [totalExpense, setTotalExpense] = useState(theDedcutData.report.expense)


    const [totalIncome, setTotalIncome] = useState(theDedcutData.report.income.length != 0 ? theDedcutData.report.income[0].total_income : 0);
    const [deductAmt, setDeductAmt] = useState(0);

    const getDeductionData = async () => {
        axios.get(BASE_URL + `/getDeduction`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                // console.log(theDedcutData.organization)
                // if (res.data[i].organization == theDedcutData._id.organization) {
                array1.push({ label: res.data[i].purpose, per: res.data[i].percentage, id: res.data[i]._id })
                // }
            }
            setDeduction(array1);
        });
    }
    const getPercentage = () => {
        var calculation = (totalIncome / 100) * theDedcutData.per
        setDeductAmt(calculation)
    }
    const changePage = () => {
        handleClose()
    }
    const totalGST = (18 * totalIncome) / 100


    const postDeductionReport = () => {
        const deductReport = {
            organization: organization,
            month: month,
            year: year,
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            totalGSTAmount: totalGST,
            deductionLabel: deductionPurpose,
            deductionPer: deductionPer,
            deductionAmount: deductAmt
        }
        console.log(deductReport)
        axios.post(BASE_URL + "/saveDeductReport", deductReport);
        handleClose();
    }

    useEffect(() => {
        getDeductionData()
        getPercentage()
    }, [theDedcutData]);


    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <h3>Percentage</h3>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        value={theDedcutData.per}
                        fullWidth
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Total Income</h3>
                    <TextField
                        disabled
                        autoFocus
                        margin="dense"
                        type="text"
                        value={totalIncome}
                        fullWidth
                        variant="outlined"
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Deduction Applied</h3>
                    <TextField

                        autoFocus
                        margin="dense"
                        type="text"
                        value={deductAmt}
                        fullWidth
                        variant="outlined"
                        size='small'
                    />
                </Grid>
            </Grid >
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button variant="contained" color="success" onClick={postDeductionReport}>Apply</Button>
            </div>
        </>
    )
}
export default ManageDeduct