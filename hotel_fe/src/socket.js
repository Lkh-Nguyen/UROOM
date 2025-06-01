import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_ENVIRONMENT === 'development' ? process.env.REACT_APP_BACKEND_CUSTOMER_URL_DEVELOPMENT : process.env.REACT_APP_BACKEND_CUSTOMER_URL_PRODUCT;

export const socket = io(URL);