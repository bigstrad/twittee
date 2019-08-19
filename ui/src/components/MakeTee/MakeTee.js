import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'whatwg-fetch';
import { Alert, Button, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Verified from '../Verified';
import ViewTee from '../MakeTee/ViewTee';

// import { StickyContainer, Sticky } from 'react-sticky';

function MakeTee() {
  // defaults
  const defaultTwitUser = { label: 'Select a Name', value: '' };
  const defaultTwit = {};
  const defaultTeeOptions = { 
    color: {label: 'White', value: 'light-tee-white'}, 
    size: {label: 'Large', value: 'l' },
  };
  const defaultAlert = {isOpen: false, color: 'info', message: ''};

  // state
  const [data, setData] = useState([]);
  const [twitUser, setTwitUser] = useState(defaultTwitUser);
  const [twit, setTwit] = useState(defaultTwit);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(defaultAlert);
  const [teeOptions, setTeeOptions] = useState(defaultTeeOptions);

  // user options
  const userOptions = [ // TODO needs to come from https://www.ranker.com/list/most-powerful-people-on-twitter/michael-gibson
    {
      label: ":: POTUS CANDIDATES",
      options: [
        {label: 'Kamala Harris', value: 'kamalaharris'},
        {label: 'Joe Biden', value: 'joebiden'},
        {label: 'Andrew Yang', value: 'andrewyang'},
        {label: 'Bernie Sanders', value: 'berniesanders'},
        {label: 'Elizabeth Warren', value: 'ewarren'},
      ]
    },
    {
      label: ":: POTUS",
      options: [
        { label: "Donald J. Trump", value: "realdonaldtrump" },
      ]
    },
    {
      label: ":: POWERFUL PEOPLE & ORGS",
      options: [
        { label: "Michelle Obama", value: "michelleobama" },
        { label: "Obama Foundation", value: "obamafoundation" },
        { label: "Bill Gates", value: "billgates" },
        { label: "Oprah Winfrey", value: "oprah" },
        { label: "Queen Rania of Jordan", value: "queenrania" },
        { label: "Arnold Schwarzenegger", value: "schwarzenegger" },
        { label: "Lady Gaga", value: "ladygaga" },
      ]
    },
  ];

  // tee options
  const teeColorOptions = [ // TODO needs to come from data repository
    { label: "White", value: "light-tee-white" },
    { label: "Black", value: "dark-tee-black" },
    { label: "Blue", value: "dark-tee-blue" },
    { label: "Red", value: "dark-tee-red" },
    // { label: "Green", value: "dark-tee-green" },
    { label: "Gold", value: "light-tee-gold" },
    // { label: "Maroon", value: "dark-tee-maroon" },
  ];

  const teeSizeOptions = [ // TODO needs to come from data repository
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
    { label: "2XL", value: "2xl" },
    { label: "3XL", value: "3xl" },
    { label: "4XL", value: "4xl" },
  ];

  // lifecycle
  useEffect(() => {
    if(twitUser.value !== '') { // skip fetch on initial value
      fetchData();
    }
  }, [twitUser, twit]);

  // // methods
  // const fontTeeColor = () => {
  //   let dark = teeOptions.color.value.startsWith('dark');
  //   if(dark) {
  //     return 'white';
  //   } 
  //   return 'black';
  // }

  const toggleModal = () => {
    if(modal) {
      setModal(false);
      resetTwit();
    } else {
      setModal(true);
    }
  };
  
  const resetTwit = () => {
    setTwit(defaultTwit);
  }

  const handleDropDown = (e) => {
    setTwitUser({ label: e.value.label, value: e.value.value });
    resetTwit();
  };

  const handleList = (e) => {
    setTwit(e);
    toggleModal();
  };

  const handleTeeColor = (e) => {
    setTeeOptions({ 
      color: {label: e.value.label, value: e.value.value},
      size: teeOptions.size
    });
  }

  const handleTeeSize = (e) => {
    setTeeOptions({ 
      color: teeOptions.color,
      size: {label: e.value.label, value: e.value.value }
    });
  }

  const handleAddToCart = () => {
    showAlert("Save to cart available soon.");
    // add to cart here...
    resetTwit();
    toggleModal();
  }

  const showAlert = (message, color) => {
    if(color === undefined) {
      color = "info"
    }
    setAlert({isOpen: true, color: color, message: message});
    window.setTimeout(()=>{
      setAlert(defaultAlert);
    },3000)
  };

  const dismissAlert = () => {
    setAlert(defaultAlert);
  }

  const fetchData = () => {
    fetch(`/api/twit/${twitUser.value}/${twit.value}`, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      setData(json);
    }).catch(function(ex) {
      console.log('request failed', ex)
    })
  };

  // style
  const style = {
    marginBottomSmall: {marginBottom: '10px'},
    cursorPointer: {cursor: 'pointer'},
    dropDown50Pct: {
      width: '50%',
      float: 'left',
      paddingRight: '3px'
    }
  };

  return (  
    <>       
      <Alert color={alert.color} isOpen={alert.isOpen} toggle={dismissAlert}>
        {alert.message}
      </Alert>

      <h5>Who Do You Love?</h5>
    
      <div style={style.marginBottomSmall}>
        <Select 
          options={userOptions} 
          value={twitUser}
          onChange={value => handleDropDown({ value })}          
        />
      </div>
 
      {/* <StickyContainer>
        <Sticky>
          {({
            style,
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <div style={{ overflowY: 'auto' }}> */}

              {data.map(item => ( 
                <Media key={item.id_str} style={style.cursorPointer} onClick={() => handleList(item)} >
                  <Media left>
                    <img src={item.profile_img_url} alt={item.name} className="rounded-circle" />
                  </Media>
                  <Media body>
                    <strong>&nbsp;{item.name}</strong>&nbsp;
                    <Verified isVerified={item.verified} />
                    <small className="text-muted">{item.created_at}</small>
                    <br/>
                    <small className="text-muted">&nbsp;@{item.screen_name}</small>
                    <br/>
                    <small><span dangerouslySetInnerHTML={{__html: item.full_text}} /></small>
                    <hr/>
                  </Media>
                </Media>
              ))} 

            {/* </div>
          )}
        </Sticky>
      </StickyContainer> */}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <img src={twit.profile_img_url} alt={twit.name} className="rounded-circle" />
          &nbsp;{twit.name}
        </ModalHeader>
        <ModalBody>
          <small className="text-muted">Generated to give you an idea. The real deal looks great!</small>
          <ViewTee teeOptions={teeOptions} twit={twit} />
          <div>
            <div style={style.dropDown50Pct}>
              <Select 
                options={teeColorOptions} 
                value={teeOptions.color}
                onChange={value => handleTeeColor({ value })}          
              />
            </div>
            <div style={style.dropDown50Pct}>
              <Select 
                options={teeSizeOptions} 
                value={teeOptions.size}
                onChange={value => handleTeeSize({ value })}          
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddToCart} block>Yes, Add Tee To Cart!</Button>{' '}
          <Button color="light" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MakeTee;