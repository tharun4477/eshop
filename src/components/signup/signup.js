import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';

function Copyright(props) {
    return (
        <Typography variant="body2" {...props} >
            {'Copyright © '}
            <MaterialLink className="text-primary" href="https://www.upgrad.com/" target="_blank">
                upGrad
            </MaterialLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignUp = React.memo((props)=> {
    const signupInfo= props.signupInfo;    
    return (
            <Container className="" component="main" maxWidth="xs" >
                <CssBaseline />
                <Box className="form-container">
                    <Avatar className="form-icon bg-secondary">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box className="form-fields" component="form" onSubmit={props.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="first-name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last-name"
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>                            
                            { (
                                signupInfo.isUserExits && <FormControl error>
                                  <FormHelperText >{"A user with this email already exists. Please try signing up with a different email or log in if you already have an account."}</FormHelperText>
                                </FormControl>
                              )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                />
                            </Grid>
                              { (
                                signupInfo.isPasswordMatch  && <FormControl error>
                                  <FormHelperText >{"The password and confirm password fields do not match"}</FormHelperText>
                                </FormControl>
                              )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="contact"
                                    label="Contact Number"
                                    id="contact-number"
                                />
                            </Grid>                            
                        </Grid>
                        <Button
                            className="submit-button bg-primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MaterialLink className="text-primary" component={RouterLink} to="./login">
                                    Already have an account? Sign in
                                </MaterialLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright className="copyright"/>
            </Container>
    );
} )

export default SignUp;
