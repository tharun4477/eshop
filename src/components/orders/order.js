import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import "./order.css";
import AddressForm from '../address-form/address-form';

const steps = ['Items', 'Select Address', 'Confirm Order'];

// This is a memoized functional component that displays a order page
const Order = React.memo((props) => {

    const { addressInfo } = useSelector(state => state); // Selecting address info from Redux store
    const { state } = useLocation();     // Getting product and quantity information from previous route using useLocation hook
    const history = useHistory();     // Getting history object from react-router-dom
    const [open, setOpen] = React.useState({status: false, message:null});     // Using React.useState to manage open/close state of the alert dialog
    const [orderState, setOrderState] = React.useState(0); // Using React.useState to manage order state
    const [orderAddress, setOrderAddress] = React.useState(null);     // Using React.useState to manage selected order address

    // Extracting product and quantity data from location state
    const product = state.product;
    const quantity = state.quantity;
    const dispatch = useDispatch();     // Getting dispatch function from useDispatch hook to update state

    // Function to handle selecting a new order address
    const onAddressSelect = (event) => {
        const input = {value:event.value, label: event.label};
        setOrderAddress(input);
    }

    // Function to handle form submission of new order address
    const onSaveAddressSubmit = (event) => {
        event.preventDefault();
        // Using FormData to extract form data and converting it into an object
        const formData = new FormData(event.currentTarget);
        const addressData = Object.fromEntries(formData);
         // Creating a new addressInfo object with user-entered data and dispatching it to the store
        const addressInfo={value:addressData, label: addressData.name + "->" + addressData.city+","+ addressData.state}
        dispatch({ type: "POST_ADDRESS_INFO", payload: addressInfo });
    };

    // Function to handle clicking the "next" button
    const onHandleNext = (event) => {
        if (orderState === 1 && orderAddress == null) {
            setOpen({ message: "Please select address!", status: true });
            return;
        }

        if (orderState === 2) {
            product.quantity-=quantity;
            dispatch({
                type: "SET_ORDER_PLACED", payload: {
                    productInfo: {...product},
                    notification: { message: "Order placed successfully", status: true }
                }
            });
            history.push("/home");
            return;
        }
        setOrderState(orderState+1)
    };

    // Function to handle clicking the "back" button
    const onHandleBack = (event) => {
        setOrderState(orderState-1)
    };

    // Function to handle closing the alert dialog
    const onClose = (event) => {
        setOpen({ message: null, status: false });
    };

    // JSX for the close icon button in the alert dialog
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // Render the component's JSX
    return (
        <Box className="order-steps">
            {/* Step progress bar */}
            <Stepper activeStep={orderState}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {/* Notification component */}
            <div className='notification-section' >
                <Snackbar
                    open={open.status}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={2000}
                    onClose={onClose}
                    message={open.message}
                    action={action}
                />
            </div>

            {/* Order details section */}
            {orderState === 0 ?
                (
                    <Box className="order-detail-section">
                        <Box className="order-detail">
                            <CardMedia
                                className="order-image"
                                component="img"
                                image={product.source}
                                alt={product.name}
                            />
                            <Box className="order-description">
                                <div className="order-title">{product.name}</div>
                                <div>Quantity: <b>{quantity}</b></div>
                                <p>Category: <b className="order-category">{product.category}</b></p>
                                <i>{product.description}</i>
                                <div className="order-price" >Total Price : ₹ {quantity *product.price}</div>
                            </Box>
                        </Box>
                    </Box>

                ) : null
            }

            {/* Address selection section */}
            {orderState === 1 ?
                (
                    <React.Fragment>
                        <Box className="order-address" >
                            <Box className="order-address-list">
                               
                                    <InputLabel>Select Address:</InputLabel>
                                    <Select
                                        options={addressInfo}
                                        value={orderAddress}
                                        label="sortby"
                                        onChange={onAddressSelect}
                                    >

                                    </Select>
                            </Box>
                            <b>-OR-</b>
                            <AddressForm handleSaveAddressSubmit={onSaveAddressSubmit}/>
                        </Box>

                    </React.Fragment>


                ) : null
            }

            {/* Order confirmation section */}
            {orderState === 2 ?
                (
                    <Card className="confirm-order">
                        <Box className="order-description">
                            <div className="order-title">{product.name}</div>
                            <div>Quantity: <b>{quantity}</b></div>
                            <p>Category: <b className="order-category">{product.category}</b></p>
                            <i>{product.description}</i>
                            <div className="order-price" >Total Price : ₹ {quantity * product.price}</div>
                        </Box>
                        <hr className='order-address-divider'></hr>
                        <Box className="address-description">
                            <div className="address-title">Address Details</div>
                            <div>{orderAddress.value.street}</div>
                            <div>Contact Number: {orderAddress.vcontact}</div>
                            <div>{orderAddress.value.landmark}</div>
                            <div>{orderAddress.value.state}</div>
                            <div>{orderAddress.value.zipcode}</div>
                        </Box>

                    </Card>

                ) : null
            }

            {orderState === steps.length ? (
                <React.Fragment>

                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box className="order-steps-button">
                        <Box className="space-manage" />
                        <Button
                            color="inherit"
                            disabled={orderState === 0}
                            onClick={onHandleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Button className='bg-primary' variant="contained" onClick={onHandleNext}>
                            {orderState === steps.length - 1 ? 'PLACE ORDER' : 'Next'}
                        </Button>
                        <Box className="space-manage" />
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
})

export default Order;