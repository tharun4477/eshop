import * as React from 'react';
import { useSelector } from 'react-redux';
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

const NavigationBar = React.memo((props)=>{

  const { signin} = useSelector(state => state);

    return (
        <Box className='box-container'>
            <AppBar className='appbar bg-primary' >
                <Toolbar>
                    <Box className="navbar">
                        <IconButton className='icon-container'  >
                            <ShoppingCartIcon  />
                        </IconButton>
                        <Typography>
                            upGrad E-Shop
                        </Typography>
                    </Box>
                    {signin.isAdmin?<AdminNavigationItems/> : signin.isNormalUser?<NomralUserNavigationItems/>:<SignInnNavigationItems/>}
                </Toolbar>
            </AppBar>
        </Box>
    );
} )

export default NavigationBar;
