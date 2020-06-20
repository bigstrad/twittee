import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from './Context';
import Layout from './Dashboard/Dashboard.js';

function App() {
    // state - only used to load the initial context
    const [global, setGlobal] = useState({
        twitAccountOptions: [],
        teeColorOptions: [],
        teeSizeOptions: [],
        ready: false,
    });

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
     * global options and set the state only after
     * all fetches are complete.
     */

    // get global data
    const getGlobalData = () => {
        const promises = [ // awareness of array order is critical below!
            fetchTwitAccountOptions(), // 0
            fetchTeeColorOptions(), // 1
            fetchTeeSizeOptions() // 2
        ]
        Promise.all(promises)
            .then(data => {
                setGlobal({
                    twitAccountOptions: data[0], // 0
                    teeColorOptions: data[1], // 1
                    teeSizeOptions: data[2], // 2
                    ready: true,
                });
            });
    }

    // lifecycle
    useEffect(() => {
        getGlobalData();
    }, []); // fire once

    const { ready, twitAccountOptions, teeColorOptions, teeSizeOptions } = global;
    // Do not render until initial data is loaded
    if (!ready) return null;
    return (
        <GlobalContextProvider
            twitAccountOptions={twitAccountOptions}
            teeColorOptions={teeColorOptions}
            teeSizeOptions={teeSizeOptions}
        >
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </GlobalContextProvider>
    )
}

export default App;