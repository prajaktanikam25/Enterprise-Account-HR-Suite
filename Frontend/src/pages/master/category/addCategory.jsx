import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Autocomplete, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BASE_URL } from '../../../utils/constant';

const AddCatalogue = ({ handleClose }) => {
    const [name, setName] = useState('')

    /**Add Department */
    const postData = () => {
        
        const Category = {
            name: name,
        }
        console.log(Category)
        axios.post(BASE_URL + '/saveCategory', Category)
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
                <Button onClick={postData} variant="contained" color="primary">Submit</Button>
            </div>
        </>

    )
}

export default AddCatalogue;
