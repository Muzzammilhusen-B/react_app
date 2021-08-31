export const products = {
  items: [
    {
      key: 1,
      id: 1,
      Name: "Cheese",
      price: 2.5,
      Location: "Refrigerated foods",
      qty: 2,
    },
    {
      key: 2,
      id: 2,
      Name: "Crisps",
      price: 3,
      Location: "The Snack isle",
      qty: 5,
    },
    {
      key: 3,
      id: 3,
      Name: "pizza",
      price: 4,
      Location: "Refrigerated foods",
      qty: 7,
    },
    {
      key: 4,
      id: 4,
      Name: "Chocolate",
      price: 1.5,
      Location: "The Snack isle",
      qty: 8,
    },
    {
      key: 5,
      id: 5,
      Name: "Self-raising flour",
      price: 1.5,
      Location: "Home baking",
      qty: 0,
    },
    {
      key: 6,
      id: 6,
      Name: "Ground almonds",
      price: 3,
      Location: "Home baking",
      qty: 1,
    },
  ],
  total: 0,
  addedItems: [],
};

export const saveProductsToLocal = (state) => {
  try {
    const serialState = JSON.stringify(products);
    localStorage.setItem("products", serialState);
  } catch (err) {
    console.log(err);
  }
};
export const loadProductsfromLocal = () => {
  try {
    const serialState = localStorage.getItem("products");
    if (serialState === null) return undefined;
    return JSON.parse(serialState);
  } catch (error) {
    return undefined;
  }
};
