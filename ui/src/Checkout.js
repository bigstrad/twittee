import React from 'react';
import CheckoutQuickForm from './CheckoutQuickForm';

const order = {
    items: [
        {
            tweet: {
                name: "Michelle Obama",
                screen_name: "MichelleObama",
                verified: true,
                profile_img_url: "https://pbs.twimg.com/profile_images/967808988879482880/tCuE8jn9_normal.jpg",
                created_at: "Mon Aug 12 16:46:58 +0000 2019",
                id_str: "1160955846903439360",
                full_text: "One of the best experiences of my life has been meeting young people all over the world. They’re proof that our best days are still ahead. \n\nOn #InternationalYouthDay, check out the @GirlsAlliance to help girls lead us into the years ahead: https://t.co/uAJh9LbSW0 https://t.co/Y1GLtBDQOg"
            },
            tees: [
                {
                    type: { label: "100% Cotton Short Sleeve", value: "100-pct-cotton-short-sleeve", cost: 29.95 },
                    color: { label: "White", value: "light-tee-white" },
                    size: { label: "Large", value: "l" }                    
                },
                {
                    type: { label: "100% Cotton Short Sleeve", value: "100-pct-cotton-short-sleeve", cost: 29.95 },
                    color: { label: "Black", value: "dark-tee-white" },
                    size: { label: "Large", value: "l" }
                },
            ]
        }
    ]
};

// CheckoutQuickForm
const Checkout = () => {
    const apiKey = process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE;
    if (apiKey === undefined) return <h4>Uh oh, IT error; apiKey missing</h4>;

    return (
        <div>
            <h6>Checkout</h6>
                {/* <CheckoutQuickForm apiKey={apiKey} order={order} /> */}
        </div>
    );
}

export default Checkout;