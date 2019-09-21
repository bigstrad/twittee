import React from 'react';
import PropTypes from 'prop-types';
import Verified from '../Verified';

function ViewTee(props) {
    let { teeOptions, twit } = props;

    // methods
    const fontTeeColor = () => { // hardcoded - bad smell
        let dark = teeOptions.color.value.startsWith('dark');
        if(dark) {
        return 'white';
        } 
        return 'black';
    }

    // style
    const style = {
        imageContainer: {
            position: 'relative',
            color: fontTeeColor(),
            // left: '30px',
        },
        imageCentered: {
            position: 'absolute',
            width: '200px',
            top: '-40px',
            // top: '-20px',
            height: '400px',
            left: '7%',
            transform: 'scale(0.45)',
            // transform: 'scale(0.5)',
            color: fontTeeColor(),
            // textAlign: 'justify'
        },
    };

    return (
        <div style={style.imageContainer}>
            <img width="250px" src={`${teeOptions.color.value}.jpg`} alt={twit.name} />
            <div style={style.imageCentered}>
                <img width="30px" src={twit.profile_img_url} alt={twit.name} className="rounded-circle" />
                <strong>&nbsp;{twit.name}</strong>
                <Verified isVerified={twit.verified} />
                <br/>
                <small>@{twit.screen_name}</small>
                <br/>
                <span dangerouslySetInnerHTML={{__html: twit.full_text}} />
            </div>
        </div>
    )
}

ViewTee.propTypes = {
    teeOptions: PropTypes.object,
    twit: PropTypes.object
};

ViewTee.defaultProps = {
    teeOptions: '',
    twit: {}
}

export default ViewTee;