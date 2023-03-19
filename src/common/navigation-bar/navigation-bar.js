// Importing required modules from React and Material UI libraries
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// Importing different navigation items for different users
import AdminNavigationItems from './admin-navigation-items/admin-navigation-items';
import NomralUserNavigationItems from './normal-user-navigation-items/normal-user-navigation-items';
import SignInnNavigationItems from './signin-navigation-items/signin-navigation-items';
// Importing the CSS file for styling the navigation bar
import "./navigation-bar.css";
// Importing useHistory hook from react-router-dom
import { useHistory } from 'react-router-dom';

// A functional component for the Navigation Bar
const NavigationBar = React.memo(() => {
    // Accessing the signin, productInfo, filteredInfo, category, and sortby from the redux store using useSelector hook
    const { signin, productInfo, category, sortby } = useSelector(state => state);
    const dispatch = useDispatch();    // Accessing the dispatch function from the redux store using useDispatch hook
   
    const history = useHistory();  // Accessing the history object from react-router-dom to navigate to different routes
    // A function to handle the logout functionality
    const onLogout = () => {
        dispatch({ type: "SET_LOGOUT" });  // Dispatching the SET_LOGOUT action to the redux store to update the signin state

        history.push("/login"); // Redirecting the user to the login page after successful logout
    }

    // A function to handle the search functionality
    const onSearch= (event) => {
        let filteredInfo = [...productInfo]; // Creating a copy of the productInfo array
    
        filteredInfo = filteredInfo.filter(product => 
            product.category === category || category === "all" ? true : false);  // Filtering the products based on the selected category
        
        // Sorting the filtered products based on the selected sorting option
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
        
        // Filtering the products based on the search keyword entered by the user
        filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()) ||  event.target.value === "" ? true : false);

        // Dispatching the UPDATE_FILTERED_INFO and UPDATE_SEARCH actions to the redux store to update the filteredInfo and search state
        dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
        dispatch({ type: "UPDATE_SEARCH", payload: event.target.value });
      }

    // Rendering the Navigation Bar component
    return (
        <Box className='box-container'>
            <AppBar className='appbar bg-primary' >
                <Toolbar>
                    <Box className="navbar">
                        <IconButton className='icon-container'  >
                            <ShoppingCartIcon />
                        </IconButton>
                        <Typography>
                            upGrad E-Shop
                        </Typography>
                    </Box>
                    {signin.isAdmin ? <AdminNavigationItems handleSearch={onSearch} handleLogout={onLogout} /> 
                    : signin.isNormalUser ? <NomralUserNavigationItems handleSearch={onSearch} handleLogout={onLogout} /> : <SignInnNavigationItems />}
                </Toolbar>
            </AppBar>
        </Box>
    );
})

export default NavigationBar;
