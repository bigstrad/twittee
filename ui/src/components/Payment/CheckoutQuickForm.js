import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import base64url from 'base64-url';

// https://blog.logrocket.com/building-payments-system-react-stripe/
// https://github.com/azmenak/react-stripe-checkout
// https://alligator.io/react/payments-stripe-checkout-react/
// https://codesandbox.io/s/pml21xqj87
// https://codesandbox.io/s/311ppyl0m1

const CheckoutQuickForm = () => {

    const apiKey = process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE;
    let history = useHistory();

    // context
    const global = useContext(GlobalContext);

    // destructure from global context
    const { selectedItems } = global;

    const [receiptUrl, setReceiptUrl] = useState('')
    const [submitted, setSubmitted] = useState('')
    const [finalizing, setFinalizing] = useState('')

    // pricing
    const sumPrice = () => {
        return selectedItems.reduce(function (total, item) {
            return total + item.teeOptions.type.cost;
        }, 0).toFixed(2);
    }

    const onOpen = () => {
    }

    const onClose = () => {
        if (submitted) {
            // global.removeAll(); // TODO remove
            setFinalizing('1');
        }
    }

    let amount = sumPrice();
    let amountStr = amount;
    let locale = "auto";
    let name = "Twit-Tee.com";
    let description = "Rock your favorite Tweet© on a tee!";
    let currency = "USD";
    let zipcode = true;
    let image = "https://twit-tee.com/favicon-96x96.png";
    
    const onToken = (amount, selectedItems) => token => {
        let data = {
            source: token.id,
            amount: amount.toString().replace('.', ''),
            order: selectedItems
        }

        // console.log("token", token); // TODO remove
        // console.log("data", data); // TODO remove
        setSubmitted('1');

        return fetch('/api/order', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(response => {
                console.log("response", response); // TODO remove
                // console.log("receipt_url", response.receipt_url); // TODO remove
                // setFinalizing('') // TODO remove
                // setReceiptUrl(response.receipt_url);
                let receiptUrl = base64url.encode(response.receipt_url);
                // console.log('receiptUrl', receiptUrl); // TODO remove
                let thanksPath = `thanks/${receiptUrl}`;
                // console.log('thanksPath', thanksPath); // TODO remove
                global.removeAll();
                history.push(thanksPath);
            })
            .catch(function (ex) {
                console.log('charge failed', ex)
                setSubmitted('')
                setFinalizing('')
            });
    }

    // renders
    if (apiKey === undefined) return <h5>Uh oh, IT error; apiKey missing</h5>;
    if (receiptUrl) {
        return (
            <>
                <h4>Success!</h4>
                <a href={receiptUrl} target="_blank" rel="noopener noreferrer">View Receipt</a>
                <p>TODO Collect information to provide tracking information later</p>
            </>
        )
    }

    // Finalizing
    if (finalizing) {
        return (
            <>
                <h4>Finalizing...</h4>
            </>
        )
    }

    // Initial
    return (
        <StripeCheckout
            name={name} // the pop-in header title
            description={description} // the pop-in header subtitle
            image={image} // the pop-in header image (default none)
            ComponentClass="div"
            // panelLabel="Get it now" // prepended to the amount in the bottom pay button
            amount={amount * 100} // cents
            currency={currency}
            stripeKey={apiKey}
            locale={locale}
            // email="test@test.com"
            // Note: Enabling either address option will give the user the ability to
            // fill out both. Addresses are sent as a second parameter in the token callback.
            shippingAddress
            billingAddress
            // Note: enabling both zipCode checks and billing or shipping address will
            // cause zipCheck to be pulled from billing address (set to shipping if none provided).
            zipCode={zipcode}
            // alipay // accept Alipay (default false)
            // bitcoin // accept Bitcoins (default false)
            allowRememberMe={false} // "Remember Me" option (default true)
            token={onToken(amount, selectedItems)} // submit callback
            opened={onOpen} // called when the checkout popin is opened (no IE6/7)
            closed={onClose} // called when the checkout popin is closed (no IE6/7)
        // Note: `reconfigureOnUpdate` should be set to true IF, for some reason
        // you are using multiple stripe keys
        // reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        // triggerEvent="onTouchTap"
        >
        <button className="btn btn-success btn-large btn-block">
            Checkout - Pay ${amountStr}
        </button>
        </StripeCheckout>
    )
}
export default CheckoutQuickForm;