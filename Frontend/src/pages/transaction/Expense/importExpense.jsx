import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import FileSaver from 'file-saver';
import { EXCEL_FILE_EXPENSE_BASE64 } from '../../../utils/import-expense';

const ImportExpense = ({ handleClose }) => {
    const [selectedFile, setSelectedFile] = useState();

    const closeDialog = () => {
        handleClose()
    }
    const postData = () => {
        const formData = new FormData()
        formData.append("excel-file", selectedFile)
        axios.post(BASE_URL + "/importExpense", formData, { headers: { "Content-Type": "multipart/form-data" } });
        console.log(selectedFile);
        handleClose();
    }
    const handleImport = () => {
        let sliceSize = 1024;
        let byteCharacters = atob(EXCEL_FILE_EXPENSE_BASE64);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            let begin = sliceIndex * sliceSize;
            let end = Math.min(begin + sliceSize, bytesLength);
            let bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        FileSaver.saveAs(new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
            "sample-file-expense.xlsx"
        );
    };
    return (
        <>
            <div className="form">
                <form
                    className="form-group"
                    width="1200px"
                    autoComplete="off"
                >

                    <TextField
                        type="file"
                        className="form-control"                     
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        required
                    ></TextField> &nbsp;

                    <Button style={{marginTop:'1px'}} variant="contained" size='large' onClick={postData}>Submit</Button>

                </form>
                <br />
                    <Button
                        style={{ marginTop: '1px' }} variant="contained" size='large' onClick={handleImport}>
                        Sample File
                    </Button>
            </div>
        </>
    )
}

export default ImportExpense;
