import React, { useState, useContext } from 'react';
// import Select from 'react-select';
import { Button, Card, CardTitle, CardText } from 'reactstrap';
import ViewTee from '../MakeTee/ViewTee';
import ModalTee from '../MakeTee/ModalTee';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { GlobalContext } from '../Context';
import CheckoutQuickForm from './CheckoutQuickForm';
const Cart = () => {

  // context
  const global = useContext(GlobalContext);

  // destructure from global context
  const { selectedItems } = global;

  // state
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // some affirmaing words
  const affirm = () => {
    const affirmList = ['amazing', 'awesome', 'brilliant', 'cool', 'excellent', 'fabulous', 'fantastic', 'incredible', 'magnificent', 'marvelous', 'outstanding', 'phenomenal', 'remarkable', 'sensational', 'superb', 'terrific', 'tremendous', 'wondrous', 'astounding', 'dynamite', 'groovy', 'peachy', 'righteous', 'staggering',];
    return _.capitalize(_.sample(affirmList));
  }

  // pricing
  const sumPrice = () => {
    return selectedItems.reduce(function (total, item) {
      return total + item.teeOptions.type.cost;
    }, 0).toFixed(2);
  }

  // prep & toggle modalTee
  const handleAddToCart = (e) => {
    setSelected(e);
    toggle();
  }

  const scrollToElement = (elementStr) => {
    let element = document.getElementById(elementStr);
    try {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", });
      }, 100);
    } catch (err) {
      setTimeout(() => {
        window.scrollTo({
          behavior: element ? "smooth" : "auto",
          top: element ? element.offsetTop : 0
        });
      }, 100);
    }
  }

  const toggle = (didChange) => {
    let changed = (didChange !== undefined && _.isBoolean(didChange)) ? didChange : false;
    if (isOpen) {
      setIsOpen(false);
      if (changed) {
        scrollToElement('cart-bottom')
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleRemoveFromCart = (item) => {
    if (window.confirm("Are you sure?")) {
      global.removeSelected(item);
    }
  }

  // renders
  if (selectedItems.length === 0) return (
    <>
      <h5>Uh oh. You cart is empty.
      <NavLink exact to="/maketee" 
      >&nbsp;Design My Twit-Tee!</NavLink></h5>
    </>
  );

  return (
    <>
      {/* <h5>{`Cart Total $${sumPrice()}`}</h5> */}
      <CheckoutQuickForm />
      <small className="text-muted">Tax + Shipping added during checkout</small>
      {selectedItems.map((item, i) => {
        return (
          <Card key={i} body style={{ marginBottom: "10px" }}>
            <CardTitle>{`${item.twit.name} - ${affirm()}!`}</CardTitle>
            <div className="container">
              <div className="row">
                <div className="col col-sm-12 col-md-5 col-lg-4">
                  <ViewTee
                    teeOptions={item.teeOptions}
                    twit={item.twit}
                    // containerZindex={10} // number
                    containerPosition={'relative'} // relative or absolute
                    containerTop={'-15px'} // pct or px
                    containerLeft={'0px'} // pct or px
                    imageWidthTee={'300px'} // pct or px
                    // imageWidthProfile={'30px'} // pct or px
                    textTop={global.calcTextTop(item.twit)} // pct or px
                    textLeft={'25px'} // pct or px
                    textWidth={'230px'} // pct or px
                    textTransformScale={0.5} // decimal
                  // textAlign={'left'} // center, left, right, justify 
                  />
                </div>
                <div className="col col-sm-12 col-md-7 col-lg-8">
                  <CardText><strong>Price:</strong>&nbsp;{`$${item.teeOptions.type.cost}`}</CardText>
                  <CardText><strong>Type:</strong>&nbsp;{item.teeOptions.type.label}</CardText>
                  <CardText><strong>Color:</strong>&nbsp;{item.teeOptions.color.label}</CardText>
                  <CardText><strong>Size:</strong>&nbsp;{item.teeOptions.size.label}</CardText>
                  {/* <CardText><strong>Id:</strong>&nbsp;{item.teeOptions.id_str}</CardText> */}
                  <Button color="success" onClick={() => handleAddToCart(item)}>YES, Add another one!</Button>{' '}
                  <Button color="light" onClick={() => handleRemoveFromCart(item)}>Remove</Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
      <div id="cart-bottom" />
      {selected &&
        <ModalTee
          twit={selected.twit}
          teeOptions={selected.teeOptions}
          isOpen={isOpen}
          toggle={toggle}
        />
      }
    </>
  )
}

export default Cart;