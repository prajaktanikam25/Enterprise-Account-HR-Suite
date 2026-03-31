import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const PendingIncome = ({organization}) => {
    const [APIData, setAPIData] = useState([])
    const [APIData1, setAPIData1] = useState([])
    const role = localStorage.getItem('role')
    const org = localStorage.getItem('org')

    const getTotalIncome = async () => {

        if (!organization) {
            await axios.get(BASE_URL + `/total-pending-amt`)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }
        else {
            await axios.get(BASE_URL + `/total-pending-amt?name=` + organization)
                .then((response) => {
                    setAPIData(response.data);
                }
                );
        }

    }
    const getTotalIncomeRole = async () => {
        await axios.get(BASE_URL + `/total-pending-amt?name=` + org)
            .then((response) => {
                setAPIData1(response.data);
            }
            );
    }

    useEffect(() => {
        getTotalIncome()
        getTotalIncomeRole()
    }, [APIData]);

    return (
        <>
            {(function () {
                if (role == "Admin" || role == "Accountant") {
                    return <>
                        {APIData.map((item, index) => (
                            <Grid item xs={12} md={8} key={index}>
                                <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <AccountBalanceWalletIcon style={{ fontSize: "65px" }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <h4 className='text-title-md font-bold text-black dark:text-white'>
                                                ₹ {item.PendingAmount}
                                            </h4>
                                            <span className='text-sm font-medium'><b>({item.organization})</b></span>
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
                            <Grid item xs={12} md={8} key={index}>
                                <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <AccountBalanceWalletIcon style={{ fontSize: "65px" }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <h4 className='text-title-md font-bold text-black dark:text-white'>
                                                ₹ {item.PendingAmount}
                                            </h4>
                                            <span className='text-sm font-medium'><b>({item.organization})</b></span>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        ))}
                    </>
                }
            })()}
        </>
    )
}

export default PendingIncome;
