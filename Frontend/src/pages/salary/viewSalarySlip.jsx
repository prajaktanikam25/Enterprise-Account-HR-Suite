import React from "react";
import { ToWords } from 'to-words';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Tooltip } from "react-bootstrap";
import { IconButton } from "@mui/material";
import Logo from '../../images/logo/invoice.jpg'
import Unity from '../../images/logo/unity.png'
import BooStock from '../../images/logo/boostock.png'

const ViewSalarySlip = ({ theSalaryData }) => {
    console.log(theSalaryData)

    const toWords = new ToWords();
    let word = toWords.convert((theSalaryData.net_amount + theSalaryData.incentive), { currency: true });

    const SaveAsPDFHandler = () => {
        const dom = document.getElementById('print');
        console.log(dom)
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
                        format: [5.5, 8.5],
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
                        pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                    }
                    // Output / Save
                    pdf.save(`SalarySlip-${theSalaryData.empName}.pdf`);
                };
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    };
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(theSalaryData.date);
    const name = month[d.getMonth()];
    const year = d.getFullYear();
    
    return (
        <>
            <div style={{ float: "right" }}>
                <Tooltip title="Download File in PDF" placement="top">
                    <IconButton onClick={SaveAsPDFHandler}>
                        <CloudDownloadIcon style={{ color: 'green' }} />
                    </IconButton>
                </Tooltip>
            </div>
            <div id="print">
                <table align="center" cellPadding={2} cellSpacing={4} style={{ width: '841px', border: "2px solid" }}>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td style={{ width: '827px' }}>
                                <table>
                                    <tbody>
                                        <tr>

                                            {(function () {
                                                if (theSalaryData.organization == "BooStock") {
                                                    return (
                                                        <>
                                                            <td colSpan="2" rowSpan="1" style={{ width: '110.5px', border: "2px solid" }}><img src={BooStock} width={'150px'} /></td>

                                                            <td colSpan="3" rowSpan="1" style={{ width: '407.5px', border: "2px solid", textAlign: 'end' }}><b>{theSalaryData.organization}-Info  <br />
                                                                F-26 A, Haware Centurion Mall, Nerul East <br /> Sector 19A, Nerul,Navi Mumbai, Maharashtra </b></td>
                                                        </>
                                                    )
                                                }
                                                else if (theSalaryData.organization == "I Tech Mentor") {
                                                    return (
                                                        <>
                                                            <td colSpan="2" rowSpan="1" style={{ width: '180.5px', border: "2px solid", alignItems: 'center' }}><img src={Logo} width={'230px'} /></td>
                                                            <td colSpan="3" rowSpan="1" style={{ width: '407.5px', border: "2px solid", textAlign: 'end' }}><b>{theSalaryData.organization} <br />
                                                                T-24 B, Haware Centurion Mall, Nerul East<br /> Sector 19A, Nerul,Navi Mumbai, Maharashtra</b></td>
                                                        </>
                                                    )
                                                }
                                                else if (theSalaryData.organization == "Unity share") {
                                                    return (
                                                        <> <td colSpan="2" rowSpan="1" style={{ width: '180.5px', border: "2px solid" }}><img src={Unity} width={'230px'} /></td>
                                                            <td colSpan="3" rowSpan="1" style={{ width: '407.5px', border: "2px solid", textAlign: 'end' }}><b>{theSalaryData.organization} Info <br />
                                                                T-24 B, Haware Centurion Mall, Nerul East<br /> Sector 19A, Nerul,Navi Mumbai, Maharashtra</b></td>
                                                        </>
                                                    )
                                                }
                                                else if (theSalaryData.organization == "Unity-Share-B") {
                                                    return (
                                                        <> <td colSpan="2" rowSpan="1" style={{ width: '180.5px', border: "2px solid" }}><img src={Unity} width={'230px'} /></td>
                                                            <td colSpan="3" rowSpan="1" style={{ width: '407.5px', border: "2px solid", textAlign: 'end' }}><b>Unity Share Info <br />
                                                                Office -113, Plot No 95-98, Panchvati Plaza, <br />Sector 5, Ghansoli, Navi Mumbai-400701</b></td>
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return <></>
                                                }
                                            })()}

                                        </tr>
                                        <tr>
                                            <td colSpan="5" style={{ border: "2px solid" }}>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">
                                                <p style={{ textAlign: 'center', border: "2px solid" }}><b>Salary Slip - {name}-{year} </b></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '205px', border: "2px solid" }}><b>Employee Name&nbsp;</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '283px', border: "2px solid" }}>&nbsp;  {theSalaryData.empName}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}>&nbsp;<b>Date of joining</b>  </td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {new Date(theSalaryData.date_of_joining).toLocaleDateString('en-GB')}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Department</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp; {theSalaryData.department}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Working Days</b> </td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {theSalaryData.working_day}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Designation</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp; {theSalaryData.designation}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Half Day</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp; {theSalaryData.half_day}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>A/C No.</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;{theSalaryData.accountNo.toString()}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Present Days</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;{theSalaryData.present_day + theSalaryData.late_day}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Bank Name</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;{theSalaryData.bankName}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Absent Days</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;{theSalaryData.absent_day}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" style={{ width: '94px', border: "2px solid" }}>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" rowSpan="1" style={{ textAlign: 'center', width: '94px', border: "2px solid" }}><b>Income</b></td>
                                            <td colSpan="3" rowSpan="1" style={{ textAlign: 'center', width: '104px', border: "2px solid" }}><b>Deductions</b></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Particulars</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}><b>Amount</b></td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Particulars</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}><b>Amount</b></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Basic</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp; ₹ {theSalaryData.salary}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>PT</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;₹ {theSalaryData.PT}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Incentive</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp; ₹ {theSalaryData.incentive}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>PF</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;₹ {theSalaryData.PF}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Other Allowance</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;₹ 0</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>LIC</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;₹ {theSalaryData.LIC}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" style={{ width: '94px', border: "2px solid" }}>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Gross Amount [A]</b></td>
                                            <td colSpan="2" rowSpan="1" style={{ width: '53px', border: "2px solid" }}>&nbsp;  ₹ {theSalaryData.gross_amount + theSalaryData.incentive}</td>
                                            <td style={{ width: '119px', border: "2px solid" }}><b>Deducted Amount [B]</b></td>
                                            <td style={{ width: '300px', border: "2px solid" }}>&nbsp;₹ {theSalaryData.total_deduction}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" style={{ width: '94px', border: "2px solid" }}>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Net Amount [A-B]</b></td>
                                            <td colSpan="4" rowSpan="1" style={{ width: '714px', border: "2px solid" }}>&nbsp;<b>₹ {theSalaryData.net_amount + theSalaryData.incentive}</b> </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Amount in words</b></td>
                                            <td colSpan="4" style={{ width: '714px', border: "2px solid" }}>&nbsp;<b>{word}</b></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '105px', border: "2px solid" }}><b>Mode of Payment</b></td>
                                            <td colSpan="4" style={{ width: '714px', border: "2px solid" }}>&nbsp; {theSalaryData.mode_of_payment}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', width: '105px', border: "2px solid" }}>
                                                <strong>Note: This payslip is computer generated, hence no signature is required.</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p>&nbsp;</p>
            </div>
        </>
    )
}

export default ViewSalarySlip