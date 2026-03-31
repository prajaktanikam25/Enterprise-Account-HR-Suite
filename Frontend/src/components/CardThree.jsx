import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const CardThree = () => {
  const [APIData, setAPIData] = useState([])

  const getTotalIncome = async () => {
    await axios.get(BASE_URL + `/totalBudget`)
      .then((response) => {
        setAPIData(response.data);
        console.log(APIData)
      }
      );
  }

  useEffect(() => {
    getTotalIncome()
  }, []);

  return (
    <>
      {APIData.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark' style={{ borderRadius: '20px' }}>

            <Grid container spacing={3}>
              <Grid item xs={4}>
                <CalendarMonthIcon style={{ fontSize: "65px" }} />
              </Grid>
              <Grid item xs={8}>
                <h4 className='text-title-md font-bold text-black dark:text-white'>
                  ₹ {item._id.totalAmount}
                </h4>
                <span className='text-sm font-medium'>Total Expense <b>({item._id.organization})</b></span>
              </Grid>
            </Grid>

          </div>
        </Grid>
      ))}
    </>
  )
}

export default CardThree;
