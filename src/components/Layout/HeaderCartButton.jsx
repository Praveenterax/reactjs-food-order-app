import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnisHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItemsInCart = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnisHighlighted(true);
    const timer = setTimeout(() => {
      setBtnisHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
