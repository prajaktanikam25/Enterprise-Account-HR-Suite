import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';

const EditCatalogue = ({ handleClose, theEditData }) => {
    const [name, setName] = useState(theEditData.name)

    /**Add Department */
    const postData = () => {

        const Category = {
            name: name,
        }
        console.log(Category)
        axios.put(BASE_URL + '/updateCategory/' + theEditData._id, Category)
        handleClose()
    }
    const changePage = () => {
        handleClose()
    }
    return (
        <>
            <form>
                <h3>Category Name</h3>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    size='small'
                />
            </form>
            <br />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={changePage} variant="contained" >Cancel</Button>&nbsp;
                <Button onClick={postData} variant="contained" color="primary">Update</Button>
            </div>
        </>

    )
}

export default EditCatalogue;
