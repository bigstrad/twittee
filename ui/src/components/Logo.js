import React from 'react';
import PropTypes from 'prop-types';
function Logo(props) {
    let cur = (props.onClick === null) ? 'auto' : 'pointer';
    let func = (props.onClick === null) ? function (){} : props.onClick;
    return (
        <span 
            style={{
                fontSize: props.fontSize, 
                cursor: cur, 
                fontFamily: 'DM Serif Text'
            }}
            onClick={() => func()}>
                <span style={{color: '#000'}}>Twit</span>
                <span style={{color: '#000'}}>-</span>
                <span style={{color:"#007bff"}} >Tee</span>
        </span>
    )
}

Logo.propTypes = {
    fontSize: PropTypes.string,
    onClick: PropTypes.func
};

Logo.defaultProps = {
  fontSize: '20px',
  onClick: null
}

export default Logo;