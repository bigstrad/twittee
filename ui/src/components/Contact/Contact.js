import React, { useState, useEffect } from 'react';
function Contact() {
  // state
  const [data, setData] = useState([]);

  // fetch
  const fetchData = () => {
    fetch('/api/twit/account', {
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
    fetchData();
  }, []); // fire once

  // return <h4>How Can We Help?</h4>;
  return (
    <>
      {JSON.stringify(data)}
    </>
  )
}
export default Contact;