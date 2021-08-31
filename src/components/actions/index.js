import { ADDQTY, ADDTOCART, FETCHDATA, REMOVEITEM, SUBQTY } from "./type";

//add to cart
export const addToCart = (id) => {
  return { type: ADDTOCART, id };
};
//fetch data
export const fetchData = (data) => {
  return { type: FETCHDATA, payload: data };
};
//ADD QUANTITY
export const addQty = (id) => {
  return { type: ADDQTY, id };
};
//SUb QUANTITY
export const subQty = (id) => {
  return { type: SUBQTY, id };
};
//REMOVE ITEM
export const remove = (id) => {
  return { type: REMOVEITEM, id };
};
