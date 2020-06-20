import React from 'react';
import PropTypes from 'prop-types';
import Verified from '../Verified';
import QRCode from 'qrcode.react';

function ViewTee(props) {
    let {
        teeOptions,
        twit,
        containerZindex,
        containerPosition,
        containerTop,
        containerLeft,
        imageWidthTee,
        imageWidthProfile,
        textTop,
        textLeft,
        textWidth,
        textTransformScale,
        textAlign,
    } = props;
    const textTransformScaleString = 'scale(' + textTransformScale + ')';
    // methods
    const fontTeeColor = () => { // hardcoded - bad smell
        let dark = teeOptions.color.value.startsWith('dark');
        if (dark) {
            return 'white';
        }
        return 'black';
    }
    const style = {
        container: {
            position: containerPosition,
            color: fontTeeColor(),
            top: containerTop,
            left: containerLeft,
            zIndex: containerZindex,
        },
        teeImage: {
            position: 'relative',
            width: imageWidthTee,
        },
        profileImage: {
            width: imageWidthProfile,
        },
        text: {
            position: 'absolute',
            lineHeight: 1.2,
            top: textTop,
            left: textLeft,
            width: textWidth,
            transform: textTransformScaleString,
        },
        textBody: {
            textAlign: textAlign,
        }
    };

    return (
        <div style={style.container}>
            <img
                style={style.teeImage}
                src={`${teeOptions.color.value}.jpg`}
                alt={twit.name} />
            <div style={style.text}>
                <div style={{ whiteSpace: 'nowrap' }}>
                    <img
                        style={style.profileImage}
                        src={twit.profile_img_url}
                        alt={twit.name}
                        className="rounded-circle" />
                    <strong>&nbsp;{twit.name}</strong>
                    <Verified isVerified={twit.verified} />
                </div>
                <div>
                    <small>{`@${twit.screen_name}`}</small>
                </div>
                <div style={style.textBody}>
                    <span dangerouslySetInnerHTML={{ __html: twit.full_text }} />
                    <p/>
                    <p>
                        {twit.qr_codes && twit.qr_codes.map((qrCode, i) => {
                            return (
                                <span key={i}>                                    
                                <QRCode
                                        value={qrCode}
                                        size={30}
                                    />
                                    &nbsp;&nbsp;&nbsp;
                                </span>
                            )
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}

ViewTee.propTypes = {
    teeOptions: PropTypes.object,
    twit: PropTypes.object,
    containerZindex: PropTypes.number,
    containerPosition: PropTypes.string,
    containerTop: PropTypes.string,
    containerLeft: PropTypes.string,
    imageWidthTee: PropTypes.string,
    imageWidthProfile: PropTypes.string,
    textTop: PropTypes.string,
    textLeft: PropTypes.string,
    textWidth: PropTypes.string,
    textTransformScale: PropTypes.number,
    textAlign: PropTypes.string,
};

ViewTee.defaultProps = {
    teeOptions: {},
    twit: {},
    containerZindex: 0, // number
    containerPosition: 'relative', // relative or absolute
    containerTop: '0px', // pct or px
    containerLeft: '0px', // pct or px
    imageWidthTee: '480px', // pct or px
    imageWidthProfile: '10%', // pct or px
    textTop: '19%', // pct or px
    textLeft: '18%', // pct or px
    textWidth: '60%', // pct or px
    textTransformScale: 0.65, // number
    textAlign: 'left', // center, left, right, justify
}

export default ViewTee;