import * as React from 'react';
import { Box } from '@mui/system';
import ProductCategoryTabs from '../../common/product-category-tabs/product-category-tabs';
import { useLocation } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./product-details.css";

const ProductDetails = React.memo(() => {

    const {state} = useLocation();
    const product = state.product;
    const categorySelect = state.categorySelect;
    const [quantity, setQuantity] = React.useState(1);
    const { filters } = useSelector(state => state);

    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        if (newQuantity >= 1 && newQuantity <= product.quantity) {
          setQuantity(newQuantity);
        }
    };

    return (
        <Box className="product-detail-section">
            <ProductCategoryTabs  category={filters} categorySelect={categorySelect} />
            <Box className="product-detail">
                <CardMedia
                    className="product-image"
                    component="img"
                    image={product.source}
                    alt={product.name}
                />
                <Box className="product-description">
                    <div>
                        <span className="product-title">{product.name}</span>
                        <span className='bg-primary product-availabilty'>Available quantity: {product.quantity}</span>
                    </div>

                    <p>Category: <b className="product-category">{product.category}</b></p>
                    <i>{product.description}</i>
                    <div className="product-price" >₹{product.price}</div>
                    <TextField
                        className="product-quantity"
                        required
                        id="outlined-required"
                        label="Enter the quantity"
                        defaultValue="1"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{ min: "0", max: product.quantity, step: "1" }}
                    />
                    <RouterLink className='link-decoration' to={{ pathname:"/orders", state:{product, quantity} }}>
                        <Button className='bg-primary product-order' variant="contained">PLACE ORDER</Button>
                    </RouterLink>
                </Box>
            </Box>
        </Box>
    );

})

export default ProductDetails;