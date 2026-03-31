import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const WaitingExpense = ({ organization }) => {
    const [APIData, setAPIData] = useState([])
    const [APIData1, setAPIData1] = useState([])
    const role = localStorage.getItem('role')
    const org = localStorage.getItem('org')

    const getTotalExpense = async () => {
        if (!organization) {
            await axios.get(BASE_URL + `/total-expense-waiting`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/total-expense-waiting?name=` + organization)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }

    }
    const getTotalExpenseRole = async () => {
        await axios.get(BASE_URL + `/total-expense-waiting?name=` + org)
            .then((response) => {
                setAPIData1(response.data);
            }
            );
    }

    useEffect(() => {
        getTotalExpense()
        getTotalExpenseRole()
    }, [APIData]);
    return (
        <>

            {(function () {
                if (role == "Admin" || role == "Accountant") {
                    return <>
                        {APIData.map((item, index) => (
                            <Grid item xs={12} md={3} key={index}>
                                <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <CurrencyRupeeIcon style={{ fontSize: "65px" }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <h4 className='text-title-md font-bold text-black dark:text-white'>
                                                ₹ {item.expenseAmount}
                                            </h4>
                                            <span className='text-sm font-medium'>Total Expense <b>({item.organization})</b></span>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>
                        ))}
                    </>;
                }
                else {
                    return <>
                        {APIData1.map((item, index) => (
                            <Grid item xs={12} md={3} key={index}>
                                <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <CurrencyRupeeIcon style={{ fontSize: "65px" }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <h4 className='text-title-md font-bold text-black dark:text-white'>
                                                ₹ {item.expenseAmount}
                                            </h4>
                                            <span className='text-sm font-medium'>Total Expense <b>({item.organization})</b></span>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>
                        ))}</>
                }
            })()}
        </>
    )
}
export default WaitingExpense;
