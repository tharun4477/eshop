import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import "./add-product.css"
import CreatableSelect from "react-select/creatable";
import { useSelector, useDispatch } from 'react-redux';

const AddProduct = React.memo((props) => {

    const { filters } = useSelector(state => state);
    const [value, setValue] = React.useState({});
    const [options, setOptions] = React.useState([...filters]);
    const [open, setOpen] = React.useState({status: false, message:null});
    const dispatch = useDispatch();

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, "")
    });

    const handleCreate = (inputValue) => {
        const newOption = createOption(inputValue);
        setOptions((prev) => [...prev, newOption]);
        setValue(newOption);
    };

    const onClose = (event) => {
        setOpen({status: false, message:null});
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSaveProductSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const productData = Object.fromEntries(formData);
        dispatch({ type: "POST_PRODUCT_INFO", payload: productData });
        if (!filters.some(filter => filter.label.toLowerCase() === productData.category.toLowerCase())) {
            dispatch({ type: "POST_FILTERS", payload: createOption(productData.category) });
        }
        setOpen({status: true, message:"Product "+productData.name +" added successfully"});
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className='add-product-notification' >
                <Snackbar
                    open={open.status}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={2000}
                    onClose={onClose}
                    message={open.message}
                    action={action}
                />
            </div>
            <Box className="form-container">
                <Typography component="h1" variant="h5">
                    Add Product
                </Typography>
                <Box className="form-fields" component="form" onSubmit={onSaveProductSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CreatableSelect
                                className='add-product-select'
                                options={options.filter(filter => filter.label != "all")}
                                onChange={(newValue) => setValue(newValue)}
                                value={value}
                                name="category"
                                onCreateOption={handleCreate}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className='add-product-item'
                                required
                                fullWidth
                                name="manufacturer"
                                id="Manufacturer"
                                label="manufacturer"
                                style={{ zIndex: 0 }} // set the TextField's z-index to 0
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className='add-product-item'
                                required
                                fullWidth
                                name="quantity"
                                label="Available Items"
                                id="available-items"
                                style={{ zIndex: 0 }} // set the TextField's z-index to 0
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className='add-product-item'
                                required
                                fullWidth
                                name="price"
                                label="Price"
                                id="price"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className='add-product-item'
                                required
                                fullWidth
                                name="source"
                                label="Image URL"
                                id="image-url"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className='add-product-item'
                                required
                                fullWidth
                                name="description"
                                label="Product Description"
                                id="product-description"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className="submit-button bg-primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        SAVE PRODUCT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
})

export default AddProduct;



