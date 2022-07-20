import classes from "./Checkout.module.css";
import { useState, useRef } from "react";

// const emptyFields = (fieldRef) => (fieldRef.current.value = "");
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isFiveChar(enteredPostal);

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;
    if (!formIsValid) {
      setFormInputsValidity({
        name: nameIsValid,
        street: streetIsValid,
        postal: postalIsValid,
        city: cityIsValid,
      });
      return;
    } else {
      setFormInputsValidity({
        name: nameIsValid,
        street: streetIsValid,
        postal: postalIsValid,
        city: cityIsValid,
      });
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    }
  };

  const nameInputClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid Name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a valid Street!</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please Enter a valid Postal!(exact 5 characters)</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
