import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

function Git() {
  return (
    <>
      <Card body>
        <CardTitle>Git Information</CardTitle>
        <CardText><strong>Commit Id</strong>&nbsp;{process.env.REACT_APP_GIT_COMMITID}</CardText>
        <CardText><strong>Commit Date</strong>&nbsp;{process.env.REACT_APP_GIT_COMMITDATE}</CardText>
      </Card>
    </>
  )
}
export default Git;