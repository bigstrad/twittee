import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

function Cart() {
  // state
  const [data, setData] = useState([]);

  // lifecycle
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/api/xxx', {
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

  if (data === null) return null;
  return (
    <>
      <Card body>
        <CardTitle>XXX</CardTitle>
        <CardText><strong>XXX</strong>&nbsp;{data.xxx}</CardText>
        <CardText><strong>XXX</strong>&nbsp;{data.xxx}</CardText>
      </Card>
    </>
  )
}
export default Cart;