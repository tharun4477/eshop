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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Homepage = React.memo(() => {
  const { signin, productInfo, countryCurrency, filter } = useSelector(state => state);
  const dispatch = useDispatch();
  let filteredInfo = filter.filteredProductInfo;

  const onSortbySelect = (event) => {
    const filterInput = event.target.value;
    let filteredInfo = productInfo;

    filteredInfo = filteredInfo.filter(product => product.category === filter.category || filter.category === "all" ? true : false);

    switch (event.target.value) {
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
        return;
    }

    dispatch({ type: "SET_FILTER", payload: { sortby: filterInput, filteredProductInfo: filteredInfo } });
  }

  const onCategorySelect = (event) => {
    const filterInput = event.target.value;
    let filteredInfo = productInfo;

    filteredInfo = filteredInfo.filter(product => product.category === filterInput || filterInput === "all" ? true : false);

    switch (filter.sortby) {
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
    dispatch({ type: "SET_FILTER", payload: { category: filterInput, filteredProductInfo: filteredInfo } });
  }

  return (
    <Box className="product-page">
      <ProductCategoryTabs categorySelect={filter.category} handleCategorySelect={onCategorySelect} />
      <Box className="filter">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filter.sortby}
            label="sortby"
            onChange={onSortbySelect}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="hightolow">Price: High to Low</MenuItem>
            <MenuItem value="lowtohigh">Price: Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="product-page-container">
        {
          filteredInfo.map((product) => {
            return (<Card className="card" key={product.id}>
              <CardMedia
                className='card-media'
                image={product.source}
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
                    state: { product: product, categorySelect: filter.category }
                  }} className='link-decoration'>
                  <Button className='bg-primary buy-button'>Buy</Button>
                </RouterLink>
                {signin.isAdmin ?
                  <Box>
                    <IconButton>
                      <CreateIcon />
                    </IconButton>
                    <IconButton>
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
})

export default Homepage;