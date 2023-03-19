import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./homepage.css";
import { Box } from '@mui/system';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ProductCategoryTabs from '../../common/product-category-tabs/product-category-tabs';
import InputLabel from '@mui/material/InputLabel';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Select from "react-select";

// This is a memoized functional component that displays a home page 
const Homepage = () => {
  // Destructuring state and dispatch from Redux store
  const { signin, productInfo, filteredInfo, category, sortby,
    search, countryCurrency, filters, homeNotification } = useSelector(state => state);
  const dispatch = useDispatch();

  // Array of options for sorting products
  const options = [
    { value: "all", label: "Default" },
    { value: "hightolow", label: "Price: High to Low" },
    { value: "lowtohigh", label: "Price: Low to High" },
    { value: "newest", label: "Newest" }
  ];

  // Function to handle sorting products by price or by newest arrival
  const onSortbySelect = (event) => {

    let filteredInfo = [...productInfo]; /// Creating a copy of productInfo to filter it

    filteredInfo = filteredInfo.filter(product =>
      product.category === category || category === "all" ? true : false); // Filtering by category if it is specified

    // Sorting the filtered products based on selected sort option
    switch (event.value) {
      case "hightolow":
        filteredInfo = filteredInfo.sort((product1, product2) => product2.price - product1.price);
        break;
      case "lowtohigh":
        filteredInfo = filteredInfo.sort((product1, product2) => product1.price - product2.price);
        break;
      case "newest":
        filteredInfo = filteredInfo.sort((product1, product2) => product2.id - product1.id);
        break;
      default:
        break;
    }
    // Filtering the products based on search input if it is specified
    filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || search === "" ? true : false);
    // Updating the filtered products and sort option in Redux store
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
    dispatch({ type: "UPDATE_SORT_BY", payload: event.value });
  }

  // Function to handle filtering products by category
  const onCategorySelect = (event) => {
    const filterInput = event.target.textContent; // Creating a copy of productInfo to filter it
    let filteredInfo = [...productInfo];

    // Filtering the products based on selected category
    filteredInfo = filteredInfo.filter(product => product.category === filterInput || filterInput === "all" ? true : false);

    // Sorting the filtered products based on selected sort option
    switch (sortby) {
      case "hightolow":
        filteredInfo = filteredInfo.sort((product1, product2) => product2.price - product1.price);
        break;
      case "lowtohigh":
        filteredInfo = filteredInfo.sort((product1, product2) => product1.price - product2.price);
        break;
      case "newest":
        filteredInfo = filteredInfo.sort((product1, product2) => product2.id - product1.id);
        break;
      default:
        break;
    }
    // Filtering the products based on search input if it is specified
    filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || search === "" ? true : false);
    // Updating the filtered products and selected category in Redux store
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
    dispatch({ type: "UPDATE_CATEGORY", payload: event.target.value });
  }

  // This function is triggered when a user clicks on the delete button for a product.
  // It receives the target product as a parameter and an event object.
  const onDeleteProduct = (targetProduct, event) => {
    const updatedInfo = productInfo.filter(product => targetProduct !== product); // A new array of productInfo is created by filtering out the target product.
    dispatch({ type: "DELETE_PRODUCT_INFO", payload: updatedInfo }); // The updated product info is dispatched to the store, which updates the state of the app.
    dispatch({ type: "SET_HOME_NOTIFICATION", payload: { status: true, message: "Product " + targetProduct.name + " deleted successfully" } }); // A success notification is dispatched to the store, which displays a message to the user.
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo }); // The filteredInfo is dispatched to the store, which updates the state of the app.
  }

  // This function is triggered when the close button is clicked on the success notification.
  // It receives an event object as a parameter.
  const onClose = (event) => {
    // A false status is dispatched to the store, which hides the success notification.
    dispatch({ type: "SET_HOME_NOTIFICATION", payload: { status: false } });
  };

 // Defining the action component for the Snackbar notification
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
  return (
    <Box className="product-page">
      <ProductCategoryTabs category={filters} categorySelect={category} handleCategorySelect={onCategorySelect} />
      <Box className="filter">
        <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
        <Select
          options={options}
          onChange={onSortbySelect}
          value={options.filter(function (option) {
            return option.value === sortby;
          })}
          label="Single select"
        />
        <div className='home-notification-section' >
          <Snackbar
            open={homeNotification.status}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={2000}
            onClose={onClose}
            message={homeNotification.message}
            action={action}
          />
        </div>
      </Box>
      <Box className="product-page-container">
        {
          filteredInfo.map((product) => {
            return (<Card className="card" key={product.id}>
              <CardMedia
                className='card-media'
                image={product.source}
                alt={product.name}
              />
              <CardContent className="card-content">
                <Typography className='card-space-between' gutterBottom variant="h5" component="div" >
                  <div>{product.name}</div>
                  <div>{countryCurrency + " " + product.price}</div>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions className='card-space-between'>
                <RouterLink
                  to={{
                    pathname: "/products/" + product.id,
                    state: { product: product, categorySelect: category }
                  }} className='link-decoration'>
                  <Button className='bg-primary buy-button'>Buy</Button>
                </RouterLink>
                {signin.isAdmin ?
                  <Box>
                    <RouterLink
                      to={{
                        pathname: "/modifyproducts/" + product.id,
                        state: { product: product }
                      }} className='link-decoration'>
                      <IconButton >
                        <CreateIcon />
                      </IconButton>
                    </RouterLink>
                    <IconButton onClick={(event) => onDeleteProduct(product, event)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box> : <Box />
                }
              </CardActions>
            </Card>)
          })
        }
      </Box>

    </Box>
  );
}

export default Homepage;