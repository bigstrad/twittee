import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../GlobalContext';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo.js';
import ViewTee from '../MakeTee/ViewTee';

function Home() {
  // context
  const global = useContext(GlobalContext);

  // defaults
  // const defaultTwitUser = { label: '', value: 'michelleobama' };
  const backupTwit = {
    "name": "Michelle Obama",
    "screen_name": "MichelleObama",
    "verified": true,
    "profile_img_url": "http://pbs.twimg.com/profile_images/967808988879482880/tCuE8jn9_normal.jpg",
    "created_at": "Mon Aug 12 16:46:58 +0000 2019",
    "id_str": "1160955846903439360",
    "full_text": "One of the best experiences of my life has been meeting young people all over the world. They’re proof that our best days are still ahead. \n\nOn #InternationalYouthDay, check out the @GirlsAlliance to help girls lead us into the years ahead: https://t.co/uAJh9LbSW0 https://t.co/Y1GLtBDQOg"
  };

  const defaultTwit = {
    "name": "",
    "screen_name": "",
    "verified": false,
    "profile_img_url": "",
    "created_at": "",
    "id_str": "",
    "full_text": ""
  };
  const defaultTeeOptions = { // hard-coded. smell?
    color: { label: 'White', value: 'light-tee-white' },
    size: { label: 'Large', value: 'l' },
  };

  // twit account options from global context
  const { twitAccountOptions } = global;

  // state
  // const [twitUser, setTwitUser] = useState(defaultTwitUser);
  const [twit, setTwit] = useState(defaultTwit);
  const [teeOptions, setTeeOptions] = useState(defaultTeeOptions);

  // lifecycle
  useEffect(() => {
    if (twitAccountOptions !== undefined) { // skip fetch on initial value
      fetchData();
    }
  }, [twitAccountOptions]);

  const fetchData = () => {
    // let's randomly pick a group
    let group = twitAccountOptions[Math.floor(Math.random() * twitAccountOptions.length)];
    // let's randomly pick a user
    let user = group.options[Math.floor(Math.random() * group.options.length)];
    // let's get the user's tweets
    fetch(`/api/twit/${user.value}`, {
      credentials: 'include'
    })
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        // let's randomly pick a tweet
        let tweet = json[Math.floor(Math.random() * json.length)];
        if(tweet === undefined) {
          // user has no tweets - use backup
          tweet = backupTwit;
        }
        setTwit(tweet);
      }).catch(function (ex) {
        console.log('request failed', ex)
        setTwit(backupTwit);
      })
  };

  return (
    <>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div>
            <Logo fontSize="90px" onClick={function () { }} />
            <p className="text-dark" style={{ fontSize: '15px', marginLeft: '35px', marginTop: '-35px', letterSpacing: '1.25px' }}>
              Rock your favorite Tweet<small>&copy;</small> on a tee!
            </p>
          </div>
          <div>
            <ViewTee teeOptions={teeOptions} twit={twit} />
            <NavLink exact to="/maketee" className="btn btn-outline-primary btn-lg" style={{ marginLeft: '17px' }}>Design My Twit-Tee!</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;