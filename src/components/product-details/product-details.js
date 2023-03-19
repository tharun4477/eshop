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

// Define a functional component called ProductDetails using React.memo() to optimize rendering performance
const ProductDetails = React.memo(() => {

    const {state} = useLocation();     // Use the useLocation hook from react-router-dom to get the product and categorySelect from the location state
    const product = state.product;
    const categorySelect = state.categorySelect;
    const [quantity, setQuantity] = React.useState(1);     // Define quantity as a state variable using the useState hook from React and initialize it to 1
    const { filters } = useSelector(state => state);     // Use the useSelector hook from react-redux to get the filters state from the Redux store

    // Define a function to handle changes to the quantity input field
    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        if (newQuantity >= 1 && newQuantity <= product.quantity) {         // Make sure the new quantity is a valid value within the available quantity of the product
          setQuantity(newQuantity);
        }
    };

    // Render the ProductDetails component
    return (
        // Use the Box component from Material-UI to create a container for the product detail section
        <Box className="product-detail-section">
            {/* Render the ProductCategoryTabs component to display the product category */}
            <ProductCategoryTabs  category={filters} categorySelect={categorySelect} />
            {/* Use the Box component to create a container for the product details */}
            <Box className="product-detail">
                {/* Use the CardMedia component from Material-UI to display the product image */}
                <CardMedia
                    className="product-image"
                    component="img"
                    image={product.source}
                    alt={product.name}
                />
                 {/* Use the Box component to create a container for the product description */}
                <Box className="product-description">
                    {/* Render the product name and availability */}
                    <div>
                        <span className="product-title">{product.name}</span>
                        <span className='bg-primary product-availabilty'>Available quantity: {product.quantity}</span>
                    </div>
                    {/* Render the product category and description */}
                    <p>Category: <b className="product-category">{product.category}</b></p>
                    <i>{product.description}</i>
                    {/* Render the product price */}
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
                    {/* Use the RouterLink component from react-router-dom to create a link to the orders page with the selected product and quantity */}
                    <RouterLink className='link-decoration' to={{ pathname:"/orders", state:{product, quantity} }}>
                        <Button className='bg-primary product-order' variant="contained">PLACE ORDER</Button>
                    </RouterLink>
                </Box>
            </Box>
        </Box>
    );

})

export default ProductDetails;