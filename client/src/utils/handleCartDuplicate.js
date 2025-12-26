export const handleCartDuplicate = (cartData, product, operation) => {
  let updatedCart = [...cartData];

  const index = updatedCart.findIndex(
    (item) =>
      item.id === product.id && item.size === product.size
  );

  if (index !== -1) {
    if (operation === "add") {
      updatedCart[index].qty += 1;
    } else {
      updatedCart[index].qty -= 1;
    }
  } else {
    updatedCart.push({ ...product, qty: 1 });
  }

  return updatedCart.filter((item) => item.qty > 0);
};
