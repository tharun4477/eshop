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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';

// This is a functional component that displays a copyright notice
// It receives props which are spread into a Typography component
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

// This creates a custom theme using the createTheme function from Material UI
const theme = createTheme();

// This is a memoized functional component that displays a sign-in form
// It receives props, including a signinInfo object that contains a boolean isError field
const SignIn =React.memo((props)=>{
    // This extracts the isError boolean value from the signinInfo object
    const isError=props.signinInfo.isError;
    return (
        <ThemeProvider theme={theme} > 
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box className="form-container">
                    <Avatar className="form-icon bg-secondary">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                        Sign in
                    </Typography>
                    <Box className="form-fields" component="form" onSubmit={props.handleSubmit} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        { (
                            isError && <FormControl error>
                              <FormHelperText >{"The credentials that you've entered is incorrect"}</FormHelperText>
                            </FormControl>
                          )}
                        <Button
                            className="submit-button bg-primary"
                            type="submit"
                            fullWidth
                            variant="contained"                            
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <MaterialLink className="text-primary" component={RouterLink} to="./signup">
                                    {"Don't have an account? Sign Up"}
                                </MaterialLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright className="copyright"/>
            </Container>
        </ThemeProvider>
    );
} )

export default SignIn;
