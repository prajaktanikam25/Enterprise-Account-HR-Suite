import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RecipeReviewCard = () => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const user = localStorage.getItem('name')
    const email = localStorage.getItem('user')

    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd

    const [APIData, setAPIData] = useState([])

    const getDepartmentData = async () => {
        axios.get(BASE_URL + `/getEmployee`).then((res) => {
            var array1 = []
            for (var i = 0; i < res.data.length; i++) {
                console.log(res.data)
                if (res.data[i].email == email) {
                    array1.push({
                        label: res.data[i].firstName,
                        lastName: res.data[i].lastName,
                        department: res.data[i].department,
                        id: res.data[i]._id,
                        organization: res.data[i].organization,
                        joining: res.data[i].date_of_joining,
                        manager: res.data[i].reporting_Manager,
                        mobile: res.data[i].mobileNo,
                        email: res.data[i].email,
                        bankName: res.data[i].bank.bankName,
                        ifsc: res.data[i].bank.ifsc,
                        accountNo: res.data[i].bank.accountNo,
                        branch: res.data[i].bank.branch,

                    })
                }
            }
            setAPIData(array1);
        });
    }

    useEffect(() => {
        getDepartmentData()
    }, [APIData]);
    return (
        <>
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                        </Avatar>
                    }

                    title={user}
                    subheader={defaultValue}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Welcome back ! We're delighted to have you here.
                        Your dedication and hard work are invaluable to our team, and we're excited to see what great things you'll accomplish today.
                        Let's make it a productive and fulfilling day together!
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph><b>Profile Information</b> </Typography>
                        {APIData.map((row, index) => {
                            return (
                                <div key={index}>
                                    <table align="center" cellPadding={2} cellSpacing={4} style={{ width: '841px', border: "2px solid" }}>
                                        <tbody style={{ textAlign: 'center' }}>
                                            <tr>
                                                <td style={{ width: '100%' }}>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: '205px', border: "2px solid" }}><b>Employee Name&nbsp;</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '283px', border: "2px solid" }}>&nbsp;  {row.label + " " + row.lastName}</td>
                                                                <td style={{ width: '119px', border: "2px solid" }}>&nbsp;<b>Mobile No</b>  </td>
                                                                <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {row.mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '205px', border: "2px solid" }}><b>Organization&nbsp;</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '283px', border: "2px solid" }}>&nbsp;  {row.organization}</td>
                                                                <td style={{ width: '119px', border: "2px solid" }}>&nbsp;<b>Department</b>  </td>
                                                                <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {row.department}</td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{ width: '105px', border: "2px solid" }}><b>Mobile</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;{row.mobile}</td>
                                                                <td style={{ width: '119px', border: "2px solid" }}><b>Email</b></td>
                                                                <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {row.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '105px', border: "2px solid" }}><b>Joining Date</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;{new Date(row.joining).toLocaleDateString('en-GB')}</td>
                                                                <td style={{ width: '119px', border: "2px solid" }}><b>Reporting Manager</b></td>
                                                                <td style={{ width: '300px', border: "2px solid" }}>&nbsp;{row.manager}</td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{ width: '105px', border: "2px solid" }}><b>Bank Name</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;<b>{row.bankName}</b></td>
                                                                <td style={{ width: '119px', border: "2px solid" }}><b>IFSC</b></td>
                                                                <td style={{ width: '300px', border: "2px solid" }}>&nbsp; <b>{row.ifsc}</b></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '105px', border: "2px solid" }}><b>Account No</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;<b>{row.accountNo}</b></td>
                                                                <td style={{ width: '105px', border: "2px solid" }}><b>Branch</b></td>
                                                                <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;<b>{row.branch}</b></td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })}
                    </CardContent>
                </Collapse>
            </Card>

            <br />


        </>

    );
}
export default RecipeReviewCard