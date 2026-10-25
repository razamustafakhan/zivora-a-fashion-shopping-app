const productReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_CHANGE":
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [action.payload.name]: action.payload.value,
        },
      };
    case "IMAGE_CHANGE":
      return {
        ...state,
        productForm: {
          ...state.productForm,
          images: action.payload.value,
        },
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        productForm: {
          ...state.productForm,
          images: action.payload.value,
        },
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "RESET_PRODUCT_FORM":
      return {
        ...state,
        productForm: {
          name: "",
          description: "",
          categoryId: "",
          brand: "",
          sellingPrice: null,
          originalPrice: null,
          stock: null,
          sku: "",
          images: [],
        },
      };

    default:
      return state;
  }
};

export default productReducer;
