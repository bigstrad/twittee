import React, { useState } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe,
} from 'react-stripe-elements'; // https://stripe.com/payments/elements
import './payment.css';

// https://blog.logrocket.com/building-payments-system-react-stripe/

// { selectedProduct, stripe, history }
const CheckoutFormDNU = ({ stripe, order }) => {
    // if (selectedProduct === null) history.push('/')

    const [receiptUrl, setReceiptUrl] = useState('')

    const calcAmount = (order) => {
        let amount = order.items.map(item => {
            return item.tees.reduce(function (accumulator, tee) {
                // return the sum with previous value
                return accumulator + tee.type.cost;
                // set initial value as 0
            }, 0)
        });
        return parseFloat(amount);
    }

    const handleSubmit = async event => {
        event.preventDefault()

        // Get token
        const { token } = await stripe.createToken()
        // let { token } = await this.props.stripe.createToken({ name: data.name });

        // Place order
        // const order = await axios.post('http://localhost:7000/api/stripe/charge', {
        //   amount: selectedProduct.price.toString().replace('.', ''),
        //   source: token.id,
        //   receipt_email: 'customer@example.com'
        // })

        // let data = {
        //     token: token,
        //     amount: amount * 100,
        //     order: order,
        //     description: description,
        //     currency: currency,
        // }

        let data = {
            amount: calcAmount(order).toString().replace('.', ''),
            source: token.id,
            receipt_email: 'customer@example.com'
        }

        console.log("token", token); // TODO remove
        console.log("data", data); // TODO remove

        return fetch('/api/charge', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                response.json()
            })
            .then(response => {
                // setReceiptUrl(order.data.charge.receipt_url)
                console.log("response", response); // TODO remove
            })
            .catch(function (ex) {
                console.log('charge failed', ex)
            });
    }

    // Receipt
    if (receiptUrl) {
        return (
            <>
            <h1>Success!</h1>
            </>
        )
    }

    // Initial
    return (
        <div className="checkout-form">
          {/* <p>Amount: ${selectedProduct.price}</p> */}
          <form onSubmit={handleSubmit}>
            <label>
              Card details
              <CardNumberElement />
            </label>
            <label>
              Expiration date
              <CardExpiryElement />
            </label>
            <label>
              CVC
              <CardCVCElement />
            </label>
            <button type="submit" className="order-button">
              Pay
            </button>
          </form>
        </div>
      )
};

 

// class CheckoutForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             complete: false,
//             errorMessage: '',
//             showErrors: false,
//         };
//         this.submit = this.submit.bind(this);
//     }

//     // handleChange = ({ error }) => {
//     //     if (error) {
//     //         this.setState({ errorMessage: error.message });
//     //     }
//     // };

//     handleChange = ({ error }) => {
//         if (error) {
//             this.setState({ errorMessage: error.message });
//         } else {
//             this.setState({ errorMessage: '' });
//             this.setState({ showErrors: false });
//         }
//     };

//     // handleSubmit = (evt) => {
//     async submit(ev) {
//         // ev.preventDefault();
//         // if (this.props.stripe) {
//         //   this.props.stripe.createToken().then(this.props.handleResult);
//         // } else {
//         //   console.log("Stripe.js hasn't loaded yet.");
//         // }
//         if (this.state.errorMessage.length > 0) {
//             this.setState({ showErrors: true });
//         } else {
//             let data = {
//                 name: "Joe",
//                 amount: 24.95 * 100,
//                 currency: "usd",
//                 description: "Test Tee",
//                 source: null
//             }

//             let { token } = await this.props.stripe.createToken({ name: data.name });
//             data.source = token;

//             console.log("data", data); // TODO remove

//             // let response = await fetch("/api/charge", {
//             //     method: "POST",
//             //     headers: { "Content-Type": "application/json" },
//             //     body: JSON.stringify(data)
//             // });
//             // if (response.ok) this.setState({ complete: true });
//             // console.log("response", response); // TODO remove
//         }
//     };

//     render() {
//         return (
//             <>
//                 {/* <div className="panel panel-default credit-card-box">
//                     <div className="panel-heading display-table" >
//                         <div className="row display-tr" >
//                             <h3 className="panel-title display-td" >Payment Details</h3>
//                             <div className="display-td" >
//                                 <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="panel-body">
//                         <form onSubmit={this.handleSubmit}>
//                             <div className="row">
//                                 <div className="col-xs-12 col-md-12">
//                                     <div className="form-group">
//                                         <label htmlFor="cardNumber">CARD NUMBER</label>
//                                         <div className="input-group">
//                                             <input
//                                                 type="tel"
//                                                 className="form-control"
//                                                 name="cardNumber"
//                                                 placeholder="Valid Card Number"
//                                                 autoComplete="cc-number"
//                                                 required autoFocus
//                                             />
//                                             <span className="input-group-addon"><i className="fa fa-credit-card"></i></span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-7 col-md-7">
//                                     <div className="form-group">
//                                         <label htmlFor="cardExpiry">EXPIRATION DATE</label>
//                                         <input
//                                             type="tel"
//                                             className="form-control"
//                                             name="cardExpiry"
//                                             placeholder="MM / YY"
//                                             autoComplete="cc-exp"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-xs-5 col-md-5 pull-right">
//                                     <div className="form-group">
//                                         <label htmlFor="cardCVC">CVC CODE</label>
//                                         <input
//                                             type="tel"
//                                             className="form-control"
//                                             name="cardCVC"
//                                             placeholder="CVC"
//                                             autoComplete="cc-csc"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-12 col-md-12">
//                                     <div className="form-group">
//                                         <label htmlFor="couponCode">COUPON CODE</label>
//                                         <input type="text" className="form-control" name="couponCode" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-12 col-md-12">
//                                     <button className="subscribe btn btn-success btn-lg btn-block" type="button">Pay</button>
//                                 </div>
//                             </div>
//                             <div className="row" style={{ display: "none" }}>
//                                 <div className="col-xs-12 col-md-12">
//                                     <p className="payment-errors"></p>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div> */}

//                 {this.state.showErrors === true && <div className="alert alert-danger">
//                     {this.state.errorMessage}
//                 </div>}

//                 <form onSubmit={this.handleSubmit}>
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="form-group">
//                                 <label>
//                                     Card number
//                         <CardNumberElement
//                                         // {...createOptions()}
//                                         className="form-control"
//                                         onChange={this.handleChange}
//                                     />
//                                 </label>
//                             </div></div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="form-group">
//                                 <label>
//                                     Expiration date
//                             <CardExpiryElement
//                                         // {...createOptions()}
//                                         className="form-control"
//                                         onChange={this.handleChange}
//                                     />
//                                 </label>
//                             </div></div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="form-group">
//                                 <label>
//                                     CVC
//                             <CardCVCElement
//                                         // {...createOptions()} 
//                                         className="form-control"
//                                         onChange={this.handleChange}
//                                     />
//                                 </label>
//                             </div></div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="form-group">
//                                 <label>
//                                     Postal code
//                         <input
//                                         name="name"
//                                         type="text"
//                                         required
//                                         className="form-control"
//                                     />
//                                 </label>
//                             </div></div>
//                     </div>
//                     <button onClick={this.submit} className="btn btn-success btn-large">Pay Now</button>
//                 </form>
//             </>
//         );
//     }
// }

export default injectStripe(CheckoutFormDNU);