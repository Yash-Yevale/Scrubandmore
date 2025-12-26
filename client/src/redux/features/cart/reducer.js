import {
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
  APPLY_COUPON_SUCCESS,
  REMOVE_COUPON_SUCCESS,
  CLEAR_CART,
} from "./actionTypes";

/* ================= STORAGE ================= */

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

const calculateSummary = (cart, discountPercent = 0) => {
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const quantity = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const discount = (subTotal * discountPercent) / 100;

  return {
    subTotal,
    quantity,
    shipping: 0,
    discount,
    total: subTotal - discount,
  };
};

/* ================= INITIAL STATE ================= */

const initialCart = getCart();

const initialState = {
  cartProducts: initialCart,
  summary: calculateSummary(initialCart),
  coupon: null,
};

/* ================= REDUCER ================= */

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS: {
      saveCart(action.payload.cartProducts);
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
        summary: action.payload.summary,
      };
    }

    case REMOVE_FROM_CART: {
      saveCart(action.payload.cartProducts);
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
        summary: action.payload.summary,
      };
    }

    case UPDATE_CART_DETAILS: {
      saveCart(action.payload.cartProducts);
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
        summary: action.payload.summary,
      };
    }

    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        summary: action.payload,
      };

    case REMOVE_COUPON_SUCCESS:
      return {
        ...state,
        coupon: null,
        summary: calculateSummary(state.cartProducts),
      };

    case CLEAR_CART:
      localStorage.removeItem("cartProducts");
      return {
        cartProducts: [],
        summary: calculateSummary([]),
        coupon: null,
      };

    default:
      return state;
  }
};
