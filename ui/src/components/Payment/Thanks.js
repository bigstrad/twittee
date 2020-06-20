import React from 'react';
import { useParams } from 'react-router-dom'
import base64url from 'base64-url';

const Thanks = () => {
    let { receiptUrl } = useParams();
    let decodedReceiptUrl = base64url.decode(receiptUrl);
    return (
        <>
            <h5>A <span className="text-success display-3">HUGE</span> Thanks!</h5>
            <p>Relax as your tee is laid out by hand <span className="text-success">with ❤</span>. Below is a link to your receipt, please save it for your records.</p>
            <p style={{wordBreak:"break-word"}}><a href={decodedReceiptUrl} target="_blank" rel="noopener noreferrer">{decodedReceiptUrl}</a></p>
            <hr/>
            <p>Sincerely,<br/>
            The twit-tee team</p>
        </>
    );
}

export default Thanks;