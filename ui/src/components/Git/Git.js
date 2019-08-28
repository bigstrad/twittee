import React, { useState, useEffect } from 'react';
import 'whatwg-fetch';
import { Card, CardTitle, CardText } from 'reactstrap';

function Git() {
  // state
  const [data, setData] = useState([]);

  // lifecycle
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/api/git', {
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
        <CardTitle>Git Information</CardTitle>
        <CardText><strong>Commit Id</strong>&nbsp;{data.commitId}</CardText>
        <CardText><strong>Commit Date</strong>&nbsp;{data.commitDate}</CardText>
      </Card>
    </>
  )
}
export default Git;