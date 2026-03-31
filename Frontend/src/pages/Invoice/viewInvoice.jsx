import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Form, Row, Col, } from 'react-bootstrap';
import { Tooltip, TextField, InputLabel, MenuItem, Table, Grid } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Invoice from '../../images/logo/invoice.jpg'
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } },
    },
}));
const ViewInvoice = ({ theViewInvoice, handleClose }) => {

    const SaveAsPDFHandler = () => {
        const dom = document.getElementById('print');
        toPng(dom)
            .then((dataUrl) => {
                const img = new Image();
                img.crossOrigin = 'annoymous';
                img.src = dataUrl;
                img.onload = () => {
                    // Initialize the PDF.
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'in',
                        format: [5.5, 7.5],
                    });

                    // Define reused data
                    const imgProps = pdf.getImageProperties(img);
                    const imageType = imgProps.fileType;
                    const pdfWidth = pdf.internal.pageSize.getWidth();

                    // Calculate the number of pages.
                    const pxFullHeight = imgProps.height;
                    const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
                    const nPages = Math.ceil(pxFullHeight / pxPageHeight);

                    // Define pageHeight separately so it can be trimmed on the final page.
                    let pageHeight = pdf.internal.pageSize.getHeight();

                    // Create a one-page canvas to split up the full image.
                    const pageCanvas = document.createElement('canvas');
                    const pageCtx = pageCanvas.getContext('2d');
                    pageCanvas.width = imgProps.width;
                    pageCanvas.height = pxPageHeight;

                    for (let page = 0; page < nPages; page++) {
                        // Trim the final page to reduce file size.
                        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                            pageCanvas.height = pxFullHeight % pxPageHeight;
                            pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
                        }
                        // Display the page.
                        const w = pageCanvas.width;
                        const h = pageCanvas.height;
                        pageCtx.fillStyle = 'white';
                        pageCtx.fillRect(0, 0, w, h);
                        pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                        // Add the page to the PDF.
                        if (page) pdf.addPage();

                        const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                        //console.log(imgData)
                        pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                        // console.log(pdf)
                    }
                    // Output / Save
                    pdf.save(`invoice-${theViewInvoice.billerName}.pdf`);
                    localStorage.setItem('invoiceDocument', pdf.output('blob'))
                };
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    };
    const changePage = () => {
        handleClose()
    }


    return (
        <>
            <div style={{ float: "right" }}>
                <Tooltip title="Download File in PDF" placement="top">
                    <CloudDownloadIcon onClick={SaveAsPDFHandler}>
                    </CloudDownloadIcon>
                </Tooltip>
            </div>
            <div id="print">
                <StyledTable
                    style={{
                        paddingLeft: '2px',
                        borderWidth: '2px',
                        borderColor: '#aaaaaa',
                        borderStyle: 'solid',
                    }}
                >
                    <div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <h1 style={{ textAlign: 'center', fontSize: '32px' }}>Invoice</h1>

                        <Grid container spacing={4}>
                            <Grid item xs={8}>
                                <img src={Invoice} alt="" width={'250px'} />
                            </Grid>
                            <Grid item xs={4}>
                                <b><label> ITech Mentor </label></b><br />
                                <b><label> Address :- Seawoods Darave,, </label></b><br />
                                <b><label> City :- Nerul, Navi Mumbai </label></b><br />
                                <b><label> Contact :- 7896541230 </label></b><br />
                                <b><label> Email :- itechmentor@gmail.com </label></b><br />
                            </Grid>
                        </Grid>
                        <br />
                        <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                            <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-left'>
                                <tr>
                                    <th> Billing Information </th>
                                    <th> Invoice Details </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td width="60%" className='text-left'>
                                        <span className="font-bold"> Name   &nbsp;&nbsp;&nbsp;:   {theViewInvoice.billerName}</span>
                                        <br />
                                        <span className="font-bold"> Address  &nbsp;:   {theViewInvoice.clientAddress}</span>
                                        <br />
                                        <span className="font-bold"> Contact :   {theViewInvoice.clientContact}</span>
                                        <br />
                                        <span className="font-bold"> Email  &nbsp;&nbsp;&nbsp;  :   {theViewInvoice.clientEmail}</span></td>
                                    <td className='text-left'>
                                        <span className="font-bold"> Invoice No  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:    </span>
                                        <b style={{ "color": "MidnightBlue" }}>{theViewInvoice.invoiceNumber}</b>
                                        <br />
                                        <span className="font-bold"> Date    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:   {new Date(theViewInvoice.date).toLocaleDateString('en-GB')}</span>
                                        <br />
                                        <span className="font-bold"> Generated By    : {theViewInvoice.cashierName}</span>
                                        <br />
                                        <span className="font-bold"> Refrence No. & Date :</span>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                        <h5 className='text-center'> PRODUCT INFORMATION </h5><br />
                        <table className="table table-striped table-bordered" style={{ 'borderRadius': '2px' }}>
                            <thead style={{ borderLeft: '1px solid red', "color": "MidnightBlue", borderRight: '1px solid red' }} className='text-center'>
                                <tr>
                                    <th> Product Name </th>
                                    <th> Quantity </th>
                                    <th> Sub Total </th>
                                </tr>
                            </thead>

                            <tbody className='text-center'>
                                <tr>

                                    <td> {theViewInvoice.productName} </td>
                                    <td>{theViewInvoice.quantity}</td>
                                    <td>{theViewInvoice.subAmount}</td>

                                </tr>
                            </tbody>

                        </table>
                        <Row>
                            <Col md="8">
                                {/* <b><Form.Label> Inital Payment :</Form.Label></b>
                                    <Form.Label style={{ color: 'green' }} className="ml-2">
                                        ₹ 45,000
                                    </Form.Label> */}
                            </Col>
                            <Col>
                                <b><Form.Label> Subtotal :</Form.Label></b>
                                <Form.Label style={{ color: 'green' }} className="ml-2">
                                    ₹ {theViewInvoice.subAmount}
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8">
                            </Col>
                            <Col>
                                <b><Form.Label> GST ({0}%) :</Form.Label></b>
                                <Form.Label style={{ color: 'green' }} className="ml-2">
                                    ₹ {0}
                                </Form.Label>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="8">
                            </Col>
                            <Col>
                                <hr />
                                <b><Form.Label> Grand Total :</Form.Label></b>
                                <Form.Label style={{ color: 'green' }} className="ml-2">
                                    ₹ {theViewInvoice.totalAmount}
                                </Form.Label>
                            </Col>
                        </Row>
                        {theViewInvoice.remarks != '' ? (
                            <div>
                                <b><h5 style={{ "color": "MidnightBlue" }}>Remarks</h5></b>
                                <Row>
                                    <Col md={12}>
                                        <p>{theViewInvoice.remarks}</p>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <br></br>
                    </div>
                </StyledTable>
                <h6 className='text-center'>This is the Computer Generated Invoice</h6>
            </div>
        </>

    )
}

export default ViewInvoice;
