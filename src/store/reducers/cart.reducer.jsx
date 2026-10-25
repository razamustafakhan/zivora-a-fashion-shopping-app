const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARTS":
      return {
        ...state,
        carts: action.payload,
      };

    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.carts.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return {
          ...state,
          carts: state.carts.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            _id: product._id,
            product,
            quantity: 1,
          },
        ],
      };
    }

    case "INCREASE_QTY":
      return {
        ...state,
        carts: state.carts.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        carts: state.carts
          .map((item) =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        carts: state.carts.filter((item) => item._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        carts: [],
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
