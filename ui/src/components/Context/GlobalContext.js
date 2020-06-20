import React, { createContext, useState, useEffect } from 'react'
import PropTypes from "prop-types";
import uniqid from 'uniqid';
import cloneDeep from 'lodash/cloneDeep';

const localStorageKey = 'twit-tee-com-cart';

export const Context = createContext({})

export const Provider = props => {

    // initial values are obtained from the props
    const {
        twitAccountOptions: initialTwitAccountOptions,
        teeColorOptions: initialTeeColorOptions,
        teeSizeOptions: initialTeeSizeOptions,
        selectedItems: initialSelectedItems,
        children,
    } = props;

    // state
    const [twitAccountOptions, setTwitAccountOptions] = useState(initialTwitAccountOptions);
    const [teeColorOptions, setTeeColorOptions] = useState(initialTeeColorOptions);
    const [teeSizeOptions, setTeeSizeOptions] = useState(initialTeeSizeOptions);
    const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
      }, [selectedItems]);

    // functions
    const addSelected = selected => {
        const { ...twit } = selected.twit;
        const { color, size, type } = selected.teeOptions;
        const modifiedSelected = {
            twit: twit,
            teeOptions: {
                id_str: uniqid(),
                color: color,
                size: size,
                type: type,
            },
        };
        setSelectedItems(selectedItems.concat([modifiedSelected]));
    };

    const removeSelected = selected => {
        let filteredSelectedItems = selectedItems.filter(item => item.teeOptions.id_str != selected.teeOptions.id_str);
        setSelectedItems(filteredSelectedItems);
    };

    const removeAll = () => {
        setSelectedItems([]);
    }

    // text top position management
    const calcTextTop = (twit, plusHeight) => {
        let textTop = "35px";
        try {
            let length = twit.full_text.length;
            let top = 45;
            if (length < 100) {
                top = 60;
            } else if (length < 150) {
                top = 45;
            } else if (length < 250) {
                top = 35;
            } else {
                top = 20;
            }
            textTop = (plusHeight === undefined) ? top + "px" : top + plusHeight + "px";
        } catch (err) {
            // ...
        }
        return textTop;
    }

    // make the context object:
    const globalContext = {
        twitAccountOptions,
        teeColorOptions,
        teeSizeOptions,
        selectedItems,
        addSelected,
        removeSelected,
        removeAll,
        calcTextTop,
    };

    // pass the value in provider and return
    return <Context.Provider value={globalContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;

// proptypes
Provider.propTypes = {
    twitAccountOptions: PropTypes.array,
    teeColorOptions: PropTypes.array,
    teeSizeOptions: PropTypes.array,
    selectedItems: PropTypes.array,
};

// default props
Provider.defaultProps = {
    twitAccountOptions: [],
    teeColorOptions: [],
    teeSizeOptions: [],
    selectedItems: (localStorage.getItem(localStorageKey)) ? JSON.parse(localStorage.getItem(localStorageKey)) : [],
};