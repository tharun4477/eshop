import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./address-form.css"


const AddressForm=React.memo((props)=>{
    return(
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box className="form-container address-form ">
            <Typography component="h1" variant="h5">
                Add Address
            </Typography>
            <Box className="form-fields" component="form" onSubmit={props.handleSaveAddressSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="name"
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="contact"
                            id="contact-number"
                            label="Contact Number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="street"
                            id="street"
                            label="Street"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="city"
                            label="City"
                            id="city"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="state"
                            label="State"
                            id="state"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="landmark"
                            label="Landmark"
                            id="landmark"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="zip-code"
                            label="Zip Code"
                            id="zip-code"
                        />
                    </Grid>
                </Grid>
                <Button
                    className="submit-button bg-primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    SAVE ADDRESS
                </Button>
            </Box>
        </Box>
    </Container>
    );
})

export default AddressForm;



