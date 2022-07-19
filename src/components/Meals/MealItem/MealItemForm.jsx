import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const FormInput = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const amountOfItems = amountInputRef.current.value;
    const amountofItemsNumber = +amountOfItems;
    if (
      amountOfItems.trim().length === 0 ||
      amountofItemsNumber < 1 ||
      amountofItemsNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.onAddToCart(amountofItemsNumber);
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ADD</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)!</p>}
    </form>
  );
};

export default FormInput;
