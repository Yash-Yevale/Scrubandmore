import {
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
} from "./actionTypes";

/* ================= LOCAL STORAGE ================= */

const getCart = () => {
  try {
    const data = localStorage.getItem("cartProducts");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem("cartProducts", JSON.stringify(cart));
};

/* ================= SUMMARY ================= */

const calculateSummary = (cart) => {
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  const quantity = cart.reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );

  return {
    subTotal,
    quantity,
    shipping: 0,
    discount: 0,
    total: subTotal,
  };
};

/* ================= ACTION CREATORS ================= */

export const addToCartSuccess = (payload) => ({
  type: ADD_TO_CART_SUCCESS,
  payload,
});

export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

/* ================= ADD / UPDATE CART ================= */

export const addToCartRequest =
  (product, toast = null, operation = "add") =>
  (dispatch) => {
    let cart = getCart();

    const index = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color &&
        item.fragrance === product.fragrance
    );

    if (index !== -1) {
      if (operation === "add") {
        cart[index].qty += 1;
      }

      if (operation === "update") {
        cart[index] = { ...cart[index], ...product };
      }
    } else {
      cart.push({
        ...product,
        qty: product.qty || 1,
        note: product.note || "",
      });
    }

    saveCart(cart);

    dispatch(
      addToCartSuccess({
        cartProducts: cart,
        summary: calculateSummary(cart),
      })
    );
  };

/* ================= REMOVE ITEM ================= */

export const removeFromCartRequest =
  (payload) =>
  (dispatch) => {
    let cart = getCart();

    cart = cart.filter(
      (item) =>
        !(
          item.id === payload.id &&
          item.size === payload.size &&
          item.color === payload.color &&
          item.fragrance === payload.fragrance
        )
    );

    saveCart(cart);

    dispatch(
      removeFromCart({
        cartProducts: cart,
        summary: calculateSummary(cart),
      })
    );
  };

/* ================= UPDATE FROM STORAGE ================= */

export const updateCartDetails = () => (dispatch) => {
  const cart = getCart();

  dispatch({
    type: UPDATE_CART_DETAILS,
    payload: {
      cartProducts: cart,
      summary: calculateSummary(cart),
    },
  });
};

/* ================= CLEAR CART ================= */

export const clearCart = () => (dispatch) => {
  localStorage.removeItem("cartProducts");

  dispatch({
    type: UPDATE_CART_DETAILS,
    payload: {
      cartProducts: [],
      summary: {
        subTotal: 0,
        quantity: 0,
        shipping: 0,
        discount: 0,
        total: 0,
      },
    },
  });
};
