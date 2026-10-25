const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "CATEGORY_CHANGE":
      return {
        ...state,
        categoryForm: {
          ...state.categoryForm,
          [action.payload.name]: action.payload.value,
        },
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "RESET_CATEGORY_FORM":
      return {
        ...state,
        categoryForm: {
          categoryName: "",
          subCategoryName: "",
          description: "",
        },
      };

    default:
      return state;
  }
};

export default categoryReducer;
