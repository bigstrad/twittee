import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../Context';
import Creatable from 'react-select/creatable';
import { Media, } from 'reactstrap';
import Verified from '../Verified';
import ModalTee from '../MakeTee/ModalTee';

const MakeTee = () => {

  // context
  const global = useContext(GlobalContext);

  // defaults
  const defaultTwitUser = { label: '', value: '' };

  // destructure from global context
  const { twitAccountOptions, } = global;

  // state
  const [data, setData] = useState([]);
  const [twitUser, setTwitUser] = useState(defaultTwitUser);
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = () => {
    fetch(`/api/twit/${twitUser.value}`, {
      credentials: 'include'
    })
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        setData(json);
      }).catch(function (ex) {
        console.log('request failed', ex)
      })
  };

  // lifecycle
  useEffect(() => {
    if (twitUser.value !== '') { // skip fetch on initial value
      fetchData();
    }
  }, [twitUser, selected]);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleDropDown = (e) => {
    if (e.value !== null) {
      setTwitUser({ label: e.value.label, value: e.value.value });
    }
  };

  const handleMouseDown = (e) => {
    // ...
  };

  const handleAddToCart = (e) => {
    let selected = {
      twit: e,
      // teeOptions: teeOptions,
    }
    setSelected(selected);
    toggle();
  }

  // style
  const style = {
    marginBottomSmall: { marginBottom: '10px' },
    cursorPointer: { cursor: 'pointer' },
    dropDown50Pct: {
      paddingBottom: '4px',
    }
  };

  return (
    <>
      <h5>Select from Popular Users</h5>
      ... or enter any <i><a href="https://help.twitter.com/en/managing-your-account/twitter-verified-accounts" target="_blank" rel="noopener noreferrer">VERIFIED</a></i> Twitter Id
      <div style={style.marginBottomSmall}>
        <Creatable
          isClearable={false}
          value={twitUser}
          onChange={value => handleDropDown({ value })}
          onInputChange={value => handleMouseDown({ value })}
          options={twitAccountOptions}
        />
      </div>

      {data.map(item => (
        <Media key={item.id_str} style={style.cursorPointer} onClick={() => handleAddToCart(item)} >
          <Media left>
            <img src={item.profile_img_url} alt={item.name} className="rounded-circle" />
          </Media>
          <Media body>
            <strong>&nbsp;{item.name}</strong>&nbsp;
                      <Verified isVerified={item.verified} />
            <small className="text-muted">{item.created_at}</small>
            <br />
            <small className="text-muted">&nbsp;@{item.screen_name}</small>
            <br />
            <small><span dangerouslySetInnerHTML={{ __html: item.full_text }} /></small>
            <hr />
          </Media>
        </Media>
      ))}
      {selected &&
        <ModalTee
          twit={selected.twit}
          teeOptions={selected.teeOptions}
          isOpen={isOpen}
          toggle={toggle}
        />
      }
    </>
  );
}

export default MakeTee;