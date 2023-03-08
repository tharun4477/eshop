import React from "react";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import Button from '@mui/material/Button';
import SearchBar from "../search-bar/search-bar";

const AdminNavigationItems =React.memo(()=> {
    return (
        <Box className="navbar">
            <SearchBar />
            <Box className="box-container" ></Box>
            <Box className="navbar-nav" >
                <MaterialLink
                    component={RouterLink}
                    className="navbar-nav-items"
                    to="/home"
                >
                    Home
                </MaterialLink>
                <MaterialLink
                    component={RouterLink}
                    className="navbar-nav-items"
                >
                    AddProduct
                </MaterialLink>
                <Button
                    variant="contained"
                    className="navbar-nav-items bg-secondary"
                    to="/login"
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
})

export default AdminNavigationItems;