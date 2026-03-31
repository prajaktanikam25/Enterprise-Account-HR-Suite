import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Deduction = () => {
    const [APIData, setAPIData] = useState([])

    const getTotalExpense = async () => {
        await axios.get(BASE_URL + `/total-expense`)
            .then((response) => {
                setAPIData(response.data);
            }
            );
    }

    useEffect(() => {
        getTotalExpense()
    }, []);
    return (
        <>
            {APIData.map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <CurrencyRupeeIcon style={{ fontSize: "55px" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <h5 className='text-title-md font-bold text-black dark:text-white'>
                                    GST 18%
                                </h5>
                                <span className='text-sm font-medium'> ₹  <b>4200</b></span>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
            ))}
            {APIData.map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <CurrencyRupeeIcon style={{ fontSize: "65px" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <h5 className='text-title-md font-bold text-black dark:text-white'>
                                    Backup Fund
                                </h5>
                                <span className='text-sm font-medium'>₹ <b>{item.organization}</b></span>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
            ))}
            {APIData.map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <CurrencyRupeeIcon style={{ fontSize: "65px" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <h4 className='text-title-md font-bold text-black dark:text-white'>
                                   Employee
                                </h4>
                                <span className='text-sm font-medium'>Total Expense <b>({item.organization})</b></span>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
            ))}
        </>
    )
}
export default Deduction;
