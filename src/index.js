// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider} from 'react-redux';
import store from './common/eshop-store';
import Eshop from './components/eshop/eshop';

// Render the Eshop component with the Redux store provided to it via the Provider component
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Eshop />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
