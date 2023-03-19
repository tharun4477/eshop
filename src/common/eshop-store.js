import { createStore } from "redux";
import shoesImage from '../assets/images/shoes.png';
import iphoneImage from '../assets/images/iphone.png';
import runningShoeImage from '../assets/images/runner.png';
import airpodsImage from '../assets/images/airpods.png';
import sanitizerImage from '../assets/images/sanitizer.png';
import jeansImage from '../assets/images/jeans.png';

let initialState = {
    signin: {
        isError: false,
        isAdmin: false,
        isNormalUser: false,
    },
    signup: {
        isUserExits: false,
        isPasswordMatch: false,
    },
    productInfo: [{
        id: 1,
        name: "Shoes",
        price: 1000,
        category: "footwear",
        manufacturer: "reebook",
        quantity: 150,
        source: shoesImage,
        description: "wndr-13 sports shoes for men | Latest Stylish Casual sport shoes for men running shoes for boys | Lace up Lightweight grey shoes for running, walking, gym, trekking, hiking & party",
    },
    {
        id: 2,
        name: "iPhone 12",
        price: 100000,
        category: "electronics",
        manufacturer: "Apple",
        quantity: 150,
        source: iphoneImage,
        description: "A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display",
    },
    {
        id: 3,
        name: "EMERGO RUNNER Running Shoes",
        price: 1679,
        category: "apparel",
        manufacturer: "reebook",
        quantity: 150,
        source: runningShoeImage,
        description: "Unique new design with an amalgamation of PU and textile mesh PU at the rearfoot for motion and protection Full EVA outsole responsible for traction and responsiveness."
    },
    {
        id: 4,
        name: "boAt Airdopes 131",
        price: 1299,
        category: "electronics",
        manufacturer: "Boat",
        quantity: 150,
        source: airpodsImage,
        description: "Bring home the boAt Airdopes 131 that comes with a carrying case.",
    },
    {
        id: 5,
        name: "Lifebuy Hand Sanitizer",
        price: 120,
        category: "personal care",
        manufacturer: "Lifebuy",
        quantity: 150,
        source: sanitizerImage,
        description: "It instantly kills 99.9% bacteria and viruses. Can be used as often as required and works without any water"
    },
    {
        id: 6,
        name: "Levi Strauss Jeans",
        price: 1000,
        category: "apparel",
        manufacturer: "Levis",
        quantity: 150,
        source: jeansImage,
        description: "slim fit stretch jeans offers comfort with style Made with high-quality material of cotton lycra and superior stitching for excellent fit, comfort and a stylish look"
    }],
    countryCurrency: "₹",
    userInfo: {
        "admin@gmail.com": {
            firstName: "admin",
            lastName: "",
            email: "admin@gmail.com",
            password: "admin",
            contactNumber: ""
        }
    },
    filters: [
        { value: "all", label: "all" },
        { value: "apparel", label: "apparel" },
        { value: "footwear", label: "footwear" },
        { value: "electronics", label: "electronics" },
        { value: "personal care", label: "personal care" }]
    ,
    filteredInfo: [{
        id: 1,
        name: "Shoes",
        price: 1000,
        category: "footwear",
        manufacturer: "reebook",
        quantity: 150,
        source: shoesImage,
        description: "wndr-13 sports shoes for men | Latest Stylish Casual sport shoes for men running shoes for boys | Lace up Lightweight grey shoes for running, walking, gym, trekking, hiking & party",
    },
    {
        id: 2,
        name: "iPhone 12",
        price: 100000,
        category: "electronics",
        manufacturer: "Apple",
        quantity: 150,
        source: iphoneImage,
        description: "A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display",
    },
    {
        id: 3,
        name: "EMERGO RUNNER Running Shoes",
        price: 1679,
        category: "apparel",
        manufacturer: "reebook",
        quantity: 150,
        source: runningShoeImage,
        description: "Unique new design with an amalgamation of PU and textile mesh PU at the rearfoot for motion and protection Full EVA outsole responsible for traction and responsiveness."
    },
    {
        id: 4,
        name: "boAt Airdopes 131",
        price: 1299,
        category: "electronics",
        manufacturer: "Boat",
        quantity: 150,
        source: airpodsImage,
        description: "Bring home the boAt Airdopes 131 that comes with a carrying case.",
    },
    {
        id: 5,
        name: "Lifebuy Hand Sanitizer",
        price: 120,
        category: "personal care",
        manufacturer: "Lifebuy",
        quantity: 150,
        source: sanitizerImage,
        description: "It instantly kills 99.9% bacteria and viruses. Can be used as often as required and works without any water"
    },
    {
        id: 6,
        name: "Levi Strauss Jeans",
        price: 1000,
        category: "apparel",
        manufacturer: "Levis",
        quantity: 150,
        source: jeansImage,
        description: "slim fit stretch jeans offers comfort with style Made with high-quality material of cotton lycra and superior stitching for excellent fit, comfort and a stylish look"
    }],
    category: "all",
    sortby: "default",
    search:"",
    addressInfo: [{
        value: {
            "name": "Tharun",
            "street": "VGP Colony 4th Street",
            "city": "Guntur",
            "state": "Andhra",
            "landmark": "Near dairy farm",
            "zipcode": "560521",
            "contact": "6303225927"
        },
        label: "Tharun -> VGP Colony 4th Street, Guntur"

    },
    {
        value: {
            "name": "Charan",
            "street": "TPP Colony 5th Street",
            "city": "mysore",
            "state": "karanataka",
            "landmark": "Near circle",
            "zipcode": "560051",
            "contact": "6523569853"
        },
        label: "Charan-> TPP Colony 5th Street, Guntur"
    }
    ],
    homeNotification: {
        status: false,
        message: null,
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER_ROLE":
            return { ...state, signin: { ...state.signin, ...action.payload } }
        case "POST_PRODUCT_INFO":
            return { ...state, productInfo: [...state.productInfo, { id: state.productInfo.length + 1, ...action.payload }] }
        case "DELETE_PRODUCT_INFO":
            return { ...state, productInfo: [...action.payload], homeNotification: action.payload.notification }
        case "UPDATE_PRODUCT_INFO":
            return { ...state, productInfo: [...action.payload] }
        case "UPDATE_FILTERED_INFO":
            return { ...state, filteredInfo: [...action.payload] }
        case "UPDATE_SORT_BY":
            return { ...state, sortby: action.payload }
        case "UPDATE_CATEGORY":
            return { ...state, category: action.payload }
        case "UPDATE_SEARCH":
            return { ...state, search: action.payload }
        case "POST_FILTERS":
            return { ...state, filters: [...state.filters, action.payload] }
        case "POST_SIGN_UP_INFO":
            return { ...state, signup: { ...state.signup, ...action.payload } }
        case "POST_USER_INFO":
            return { ...state, userInfo: { ...state.userInfo, ...action.payload } }
        case "POST_ADDRESS_INFO":
            return { ...state, addressInfo: [...state.addressInfo, action.payload] }
        case "SET_HOME_NOTIFICATION":
            return {
                ...state,
                homeNotification: action.payload
            }
        case "SET_ORDER_PLACED":
            return {
                ...state,
                homeNotification: action.payload.notification,
                productInfo: [...state.productInfo, ...action.payload.productInfo]
            }
        case "SET_LOGOUT":
            return {
                ...state,
                signin: {
                    ...state.signin,
                    isAdmin: false,
                    isNormalUser: false,
                }
            }
        default:
            return state;
    }
}

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());