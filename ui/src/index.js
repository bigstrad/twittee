import React from 'react';
import ReactDOM from 'react-dom';
import "whatwg-fetch";
import "promise-polyfill/src/polyfill";
import Layout from './components/Dashboard/Dashboard.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/DMSerif_Text/DMSerifText-Regular.ttf';
import './fonts/Markazi_Text/MarkaziText-Regular.ttf';
import './fonts/Poppins/Poppins-Regular.otf';
import './fonts/Prata/Prata-Regular.ttf';
import './fonts/Raleway/Raleway-Regular.ttf';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
