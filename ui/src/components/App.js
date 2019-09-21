import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './GlobalContext';
import Layout from './Dashboard/Dashboard.js';

function App() {

    // state
    const [global, setGlobal] = useState({});

    // fetches
    const fetchTwitAccountOptions = () => {
        let url = '/api/twit/account';
        return fetch(url, { credentials: 'include' })
            .then(response => response.json())
            .catch(function (ex) { console.log('fetchTwitAccountOptions failed', ex) });
    };

    const fetchTeeColorOptions = () => {
        let url = '/api/product/color';
        return fetch(url, { credentials: 'include' })
            .then(response => response.json())
            .catch(function (ex) { console.log('fetchTeeColorOptions failed', ex) });
    };

    const fetchTeeSizeOptions = () => {
        let url = '/api/product/size';
        return fetch(url, { credentials: 'include' })
            .then(response => response.json())
            .catch(function (ex) { console.log('fetchTeeSizeOptions failed', ex) });
    };

    /***
     * The gist here is to retrieve & combine all 
     * global options and set the state once
     */

    // get global data
    const getGlobalData = () => {
        const promises = [ // awareness of array order is critical below
            fetchTwitAccountOptions(),
            fetchTeeColorOptions(),
            fetchTeeSizeOptions()
        ]
        Promise.all(promises)
            .then(data => {
                setGlobal({
                    twitAccountOptions: data[0],
                    teeColorOptions: data[1],
                    teeSizeOptions: data[2]
                });
            });
    }

    // lifecycle
    useEffect(() => {
        getGlobalData();
    }, []); // fire once

    return (
        <GlobalProvider value={global}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default App;