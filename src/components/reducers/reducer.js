// import { loadProductsfromLocal } from "../../localstorage";
import {
  ADDQTY,
  ADDTOCART,
  FETCHDATA,
  REMOVEITEM,
  SUBQTY,
} from "../actions/type";

const initialState = {
  items: [],
  total: 0,
  addedItems: [],
};

const reducer = (state = initialState, action) => {
  //fetch data
  if (action.type === FETCHDATA) {
    // console.log("data reducer", action.payload);
    return {
      ...state,
      items: action.payload.items,
    };
  }
  if (action.type === ADDTOCART) {
    //add to cart

    // console.log("state item in reducer", items);
    let addedItem = state.items.find((item) => item.id === action.id);
    // console.log("added item", addedItem);

    let existedItem = state.addedItems.find((item) => item.id === action.id);
    if (existedItem) {
      addedItem.quantity += 1;
      let remainQuantity = addedItem.qty - addedItem.quantity;
      console.log("remainQty", remainQuantity);
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  //Add quantity
  if (action.type === ADDQTY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  //SUBtract quantity
  if (action.type === SUBQTY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //if qty=0 then item should remove from cart page
    if (addedItem.quantity === 1) {
      let newItems = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
        addedItems: newItems,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  //remove from cart
  if (action.type === REMOVEITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }

  return state;
};

export default reducer;
