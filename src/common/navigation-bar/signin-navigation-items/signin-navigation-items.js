import React from "react";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

//This is a functional component that exports a navigation item for the sign-in page. 
//It renders a fragment of navigation items specific to the sign-in page.
export default function SignInnNavigationItems() {
    return (
        <Box className="navbar">
        <Box className="box-container" ></Box>
        <Box className="navbar-nav">
            <MaterialLink
                component={RouterLink}
                to="./login"
                className="navbar-nav-items"
            >
                Login
            </MaterialLink>
            <MaterialLink
                component={RouterLink}
                to="./signup"
                className="navbar-nav-items"
            >
                Signup
            </MaterialLink>
        </Box>
        </Box>
    );
}