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

const Homepage = () => {
  const { signin, productInfo, filteredInfo, category, sortby, 
    search, countryCurrency, filters, homeNotification } = useSelector(state => state);
  const dispatch = useDispatch();

  const options = [
    { value: "all", label: "Default" },
    { value: "hightolow", label: "Price: High to Low" },
    { value: "lowtohigh", label: "Price: Low to High" },
    { value: "newest", label: "Newest" }
  ];
  

  const onSortbySelect = (event) => {

    let filteredInfo = [...productInfo];

    filteredInfo = filteredInfo.filter(product => product.category === category || category === "all" ? true : false);

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
    filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) ||  search === "" ? true : false);
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
    dispatch({ type: "UPDATE_SORT_BY", payload: event.value });
  }

  const onCategorySelect = (event) => {
    const filterInput = event.target.textContent;
    let filteredInfo = [...productInfo];

    filteredInfo = filteredInfo.filter(product => product.category === filterInput || filterInput === "all" ? true : false);

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
    filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) ||  search === "" ? true : false);
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
    dispatch({ type: "UPDATE_CATEGORY", payload: event.target.value });
  }

  const onDeleteProduct = (targetProduct, event) => {
    const updatedInfo = productInfo.filter(product => targetProduct !== product);
    dispatch({ type: "DELETE_PRODUCT_INFO", payload: updatedInfo });
    dispatch({ type: "SET_HOME_NOTIFICATION", payload: { status: true, message: "Product " + targetProduct.name + " deleted successfully" } });
    dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
  }

  const onClose = (event) => {
    dispatch({ type: "SET_HOME_NOTIFICATION", payload: { status: false } });
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