import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    // console.log("existing item", existingItem);
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      // console.log("updated item", updatedItem);
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      // console.log("updated items list", updatedItems);
    } else {
      updatedItems = state.items.concat(action.item);
      // console.log("updated items list", updatedItems);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingItem.amount > 1) {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // console.log("mapp");
    }
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    // console.log(updatedItems);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "RESET") {
    return defaultCartState;
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const resetItemCartHandler = () => {
    dispatchCart({ type: "RESET" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart: resetItemCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
