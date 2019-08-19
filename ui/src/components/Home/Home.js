import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo.js';
import ViewTee from '../MakeTee/ViewTee';

function Home() {
  // TODO do hourly pull and cache and remove hard-coding
  // TODO move duplication between this component and MakeTee.js

  // defaults
  const defaultTwitUser = { label: '', value: 'michelleobama' };
  const defaultTwit = {
    "name": "Michelle Obama",
    "screen_name": "MichelleObama",
    "verified": true,
    "profile_img_url": "http://pbs.twimg.com/profile_images/967808988879482880/tCuE8jn9_normal.jpg",
    "created_at": "Mon Aug 12 16:46:58 +0000 2019",
    "id_str": "1160955846903439360",
    "full_text": "One of the best experiences of my life has been meeting young people all over the world. They’re proof that our best days are still ahead. \n\nOn #InternationalYouthDay, check out the @GirlsAlliance to help girls lead us into the years ahead: https://t.co/uAJh9LbSW0 https://t.co/Y1GLtBDQOg"
  };
  const defaultTeeOptions = { 
    color: {label: 'White', value: 'light-tee-white'}, 
    size: {label: 'Large', value: 'l' },
  };

  // state
  const [twitUser, setTwitUser] = useState(defaultTwitUser);
  const [twit, setTwit] = useState(defaultTwit);
  const [teeOptions, setTeeOptions] = useState(defaultTeeOptions);

  // lifecycle
  // useEffect(() => {
  //   if(twitUser.value !== '') { // skip fetch on initial value
  //     fetchData();
  //   }
  // }, []);

  // const fetchData = () => {
  //   fetch(`/api/twit/${twitUser.value}/${twit.value}`, {
  //     credentials: 'include'
  //   })
  //   .then(function(response) {
  //     return response.json()
  //   }).then(function(json) {
  //     setData(json);
  //   }).catch(function(ex) {
  //     console.log('request failed', ex)
  //   })
  // };

  return (
    <>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div>
            <Logo fontSize="90px" onClick={function (){}} />
            <p className="text-dark" style={{fontSize: '15px', marginLeft: '35px', marginTop: '-35px', letterSpacing: '1.25px'}}>
              Rock your favorite Tweet<small>&copy;</small> on a tee!
            </p>
          </div>   
          <div>
            <ViewTee teeOptions={teeOptions} twit={twit} />
            <NavLink exact to="/maketee" className="btn btn-outline-primary btn-lg" style={{marginLeft: '17px'}}>Design My Twit-Tee!</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;