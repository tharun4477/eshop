import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminNavigationItems from './admin-navigation-items/admin-navigation-items';
import NomralUserNavigationItems from './normal-user-navigation-items/normal-user-navigation-items';
import SignInnNavigationItems from './signin-navigation-items/signin-navigation-items';
import "./navigation-bar.css";
import { useHistory } from 'react-router-dom';

const NavigationBar = React.memo(() => {
    const { signin, productInfo, filteredInfo, category, sortby } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogout = () => {
        dispatch({ type: "SET_LOGOUT" });
        history.push("/login");
    }

    const onSearch= (event) => {

        let filteredInfo = [...productInfo];
    
        filteredInfo = filteredInfo.filter(product => product.category === category || category === "all" ? true : false);
    
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
        filteredInfo = filteredInfo.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()) ||  event.target.value === "" ? true : false);

        dispatch({ type: "UPDATE_FILTERED_INFO", payload: filteredInfo });
        dispatch({ type: "UPDATE_SEARCH", payload: event.target.value });
      }

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
