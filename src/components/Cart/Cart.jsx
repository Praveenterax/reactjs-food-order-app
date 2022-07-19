import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    const curItem = { ...item, amount: 1 };
    cartCtx.addItem(curItem);
  };
  const resetCartHandler = () => {
    cartCtx.resetCart();
    setShowForm(false);
  };

  const placeOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const serverUrl = process.env.REACT_APP_ORDER_MEALS;
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    if (response.ok) {
      setDidSubmit(true);
      cartCtx.resetCart();
    }
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((meal) => (
        <CartItem
          key={meal.id}
          name={meal.name}
          price={meal.price}
          amount={meal.amount}
          onRemove={cartItemRemoveHandler.bind(null, meal.id)}
          onAdd={cartItemAddHandler.bind(null, meal)}
        />
      ))}
    </ul>
  );
  const orderHandler = () => {
    setShowForm(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={resetCartHandler}>Reset</button>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const orderModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={placeOrderHandler} onCancel={props.onClose} />
      )}
      {!showForm && modalActions}
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && orderModalContent}
      {isSubmitting && !didSubmit && (
        <p className={classes.processing}>
          Please wait...while we process your order...!
        </p>
      )}
      {didSubmit && (
        <React.Fragment>
          <p className={classes.success}>Yayy, your food is on your way....!</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
