import React from "react";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import Button from '@mui/material/Button';
import SearchBar from "../search-bar/search-bar";

//This is a functional component that exports a Nomral User Navigation Items for the pages. 
//It renders a fragment of navigation items specific to the normal user signed in page.
const NomralUserNavigationItems = React.memo((props)=> {
    return (
        <Box className="navbar">
            <SearchBar handleSearch={props.handleSearch}/>
            <Box className="box-container" ></Box>
            <Box className="navbar-nav" >
                <MaterialLink
                    component={RouterLink}
                    className="navbar-nav-items"
                    to="/home"
                >
                    Home
                </MaterialLink>
                <Button
                    variant="contained"
                    className="navbar-nav-items bg-secondary"
                    onClick={props.handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
})

export default NomralUserNavigationItems;