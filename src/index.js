import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider} from 'react-redux';
import store from './common/eshop-store';
import Eshop from './components/eshop/eshop';


ReactDOM.render(<React.StrictMode>
  <Provider store={store}>
    <Eshop />
  </Provider>

</React.StrictMode>
  , document.getElementById('root'));

