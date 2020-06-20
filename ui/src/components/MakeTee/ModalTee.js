import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../Context';
import PropTypes from "prop-types";
import Select from 'react-select';
import { Alert, Button, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import ViewTee from '../MakeTee/ViewTee';

const ModalTee = props => {

    // context
    const global = useContext(GlobalContext);

    // destructure from global context
    const { teeColorOptions, teeSizeOptions, addSelected, } = global;

    // destructure from props
    const { isOpen, toggle, twit, teeOptions, } = props;

    // state
    const [selectedTeeOptions, setSelectedTeeOptions] = useState({});
    const [ready, setReady] = useState(false);
    const [changed, setChanged] = useState(false);
    const [display, setDisplay] = useState(false);

    // effect
    useEffect(() => {
        let mounted = true;
        if (isOpen) {
            if (mounted) {
                // if changing to open, initialize
                setSelectedTeeOptions(teeOptions);
                setChanged(false)
                setDisplay(false);
                // then set ready value
                setReady(true);
            }
        } else {
            setReady(false);
        }
        return () => mounted = false; // cleanup
    }, [isOpen]);

    // functions
    const handleTeeColor = (e) => {
        setSelectedTeeOptions({
            color: { label: e.value.label, value: e.value.value },
            size: selectedTeeOptions.size,
            type: selectedTeeOptions.type,
        });
    }

    const handleTeeSize = (e) => {
        setSelectedTeeOptions({
            color: selectedTeeOptions.color,
            size: { label: e.value.label, value: e.value.value },
            type: selectedTeeOptions.type,
        });
    }

    const handleAddToCart = () => {
        let selected = {
            twit: twit,
            teeOptions: selectedTeeOptions,
        }
        addSelected(selected);
        setChanged(true)
        setDisplay(true);
        window.setTimeout(() => {
            setDisplay(false);
        }, 3000)
    }

    // style
    const style = {
        marginBottomSmall: { marginBottom: '10px' },
        cursorPointer: { cursor: 'pointer' },
        dropDown50Pct: {
            paddingBottom: '4px',
        }
    };

    // renders
    if (!ready) return null;
    return (
        <>
            {isOpen &&
                <Modal isOpen={isOpen} toggle={() => toggle(changed)}>
                    <ModalHeader toggle={() => toggle(changed)}>
                        <img src={twit.profile_img_url} alt={twit.name} className="rounded-circle" />
                        &nbsp;{twit.name}&nbsp;
                    {display === true &&
                            <>
                                <FontAwesomeIcon icon={faThumbsUp} color="#28a745" size="xs" />&nbsp;
                            Added <span className="text-success"><small></small></span>
                            </>
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ height: '310px' }}>
                            <ViewTee
                                teeOptions={selectedTeeOptions}
                                twit={twit}
                                // containerZindex={10} // number
                                containerPosition={'absolute'} // relative or absolute
                                containerTop={'0px'} // pct or px
                                containerLeft={'20px'} // pct or px
                                imageWidthTee={'80%'} // pct or px
                                imageWidthProfile={'30px'} // pct or px
                                // textTop={'40px'} // pct or px
                                textTop={global.calcTextTop(twit)} // pct or px
                                textLeft={'11px'} // pct or px
                                textWidth={'245px'} // pct or px
                                textTransformScale={0.5} // decimal
                                textAlign={'left'} // center, left, right, justify 
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-15px',
                            width: '90%',
                        }}>
                            <div style={{
                                lineHeight: 0.8,
                                position: 'absolute',
                                bottom: '150px',
                                left: '250px',
                                width: '70px',
                                textAlign: 'right',
                            }}>
                                <small className="text-muted"><small>Just a computer generated sneak-peek to give you an idea of what it will look like. The real tee is laid out by hand <span className="text-primary">with ❤</span> and will always look GREAT!</small></small>
                            </div>
                            <div className="clearfix" />
                            <div style={style.dropDown50Pct}>
                                <Select
                                    options={teeColorOptions}
                                    value={selectedTeeOptions.color}
                                    onChange={value => handleTeeColor({ value })}
                                />
                            </div>
                            <div style={style.dropDown50Pct}>
                                <Select
                                    options={teeSizeOptions}
                                    value={selectedTeeOptions.size}
                                    onChange={value => handleTeeSize({ value })}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={handleAddToCart} block>${selectedTeeOptions.type.cost} YES, Add to Cart!</Button>{' '}
                        <Button color="light" onClick={() => toggle(changed)}>Close</Button>
                    </ModalFooter>
                </Modal>
            }
        </>
    )
}

// proptypes
ModalTee.propTypes = {
    twit: PropTypes.object,
    teeOptions: PropTypes.object,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
};

// default props
ModalTee.defaultProps = { // hardcoded - bad smell
    twit: {},
    teeOptions: {
        color: { label: 'White', value: 'light-tee-white' },
        size: { label: 'Large', value: 'l' },
        type: { label: '100% Cotton Short Sleeve', value: '100-pct-cotton-short-sleeve', cost: 29.95 },
    },
    isOpen: false,
    toggle: function () { },
};

export default ModalTee;