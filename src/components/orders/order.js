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

const Order = React.memo((props) => {

    const { addressInfo } = useSelector(state => state);
    const { state } = useLocation();
    const history = useHistory();
    const [open, setOpen] = React.useState({status: false, message:null});
    const [orderState, setOrderState] = React.useState(0);
    const [orderAddress, setOrderAddress] = React.useState(null);

    const product = state.product;
    const quantity = state.quantity;
    const dispatch = useDispatch();

    const onAddressSelect = (event) => {
        const input = {value:event.value, label: event.label};
        setOrderAddress(input);
    }

    const onSaveAddressSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const addressData = Object.fromEntries(formData);
        const addressInfo={value:addressData, label: addressData.name + "->" + addressData.city+","+ addressData.state}
        dispatch({ type: "POST_ADDRESS_INFO", payload: addressInfo });
    };

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

    const onHandleBack = (event) => {
        setOrderState(orderState-1)
    };

    const onClose = (event) => {
        setOpen({ message: null, status: false });
    };

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

    return (
        <Box className="order-steps">
            <Stepper activeStep={orderState}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
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