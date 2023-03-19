import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./modify-product.css"
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const ModifyProduct = React.memo(() => {

    const { filters, productInfo } = useSelector(state => state);
    const { state } = useLocation();
    const history = useHistory();
    const targetProduct = state.product;
    const dispatch = useDispatch();

    const [name, setName] = React.useState(targetProduct.name);
    const [category, setCategory] = React.useState(targetProduct.category);
    const [manufacturer, setManufacturer] = React.useState(targetProduct.manufacturer);
    const [availableCount, setAvailableCount] = React.useState(targetProduct.quantity);
    const [price, setPrice] = React.useState(targetProduct.price);
    const [imageUrl, setImageUrl] = React.useState(targetProduct.source);
    const [description, setDescription] = React.useState(targetProduct.description);

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, "")
    });

    const OnNameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const OnCategoryChangeHandler = (e) => {
        setCategory(e.target.value);
    }

    const OnManufacturerChangeHandler = (e) => {
        setManufacturer(e.target.value);
    }

    const OnAvailableCountChangeHandler = (e) => {
        setAvailableCount(e.target.value);
    }

    const OnImageUrlChangeHandler = (e) => {
        setImageUrl(e.target.value);
    }

    const OnPriceChangeHandler = (e) => {
        setPrice(e.target.value);
    }

    const OnDescriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const onModifyProductSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const modifiedProduct = Object.fromEntries(formData);
        const updatedProductInfo= productInfo.map((product)=>{
            if(product.name === targetProduct.name){
                return {id: product.id, ...modifiedProduct};
            }else{
                return product;
            }
        });

        dispatch({ type: "UPDATE_PRODUCT_INFO", payload: updatedProductInfo });
        if (!filters.some(filter => filter.label.toLowerCase() === modifiedProduct.category.toLowerCase())) {
            dispatch({ type: "POST_FILTERS", payload: createOption(modifiedProduct.category) });
        }
        dispatch({ type: "SET_HOME_NOTIFICATION", payload: { status: true, message:"Product "+ targetProduct.name+ " modified successfully" } });
        history.push("/home");
     };
    

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box className="form-container">
                <Typography component="h1" variant="h5">
                    Modify Product
                </Typography>
                <Box className="form-fields" component="form" onSubmit={onModifyProductSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                id="name"
                                label="Name"
                                value={name}
                                onChange={OnNameChangeHandler}
                                autoFocus
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="category"
                            id="category"
                            label="Category"
                            value={category}
                            onChange={OnCategoryChangeHandler}
                            autoFocus
                        />
                    </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="manufacturer"
                                id="Manufacturer"
                                label="manufacturer"
                                value={manufacturer}
                                onChange={OnManufacturerChangeHandler}
                                style={{zIndex: 0}} // set the TextField's z-index to 0
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="quantity"
                                label="Available Items"
                                value={availableCount}
                                onChange={OnAvailableCountChangeHandler}
                                id="available-items"
                                style={{zIndex: 0}} // set the TextField's z-index to 0
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="price"
                                value={price}
                                label="Price"
                                onChange={OnPriceChangeHandler}
                                id="price"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="source"
                                value={imageUrl}
                                label="Image URL"
                                onChange={OnImageUrlChangeHandler}
                                id="image-url"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="description"
                                value={description}
                                label="Product Description"
                                id="product-description"
                                onChange={OnDescriptionChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className="submit-button bg-primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        MODIFY PRODUCT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
})

export default ModifyProduct;



