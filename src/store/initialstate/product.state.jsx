const initialState = {
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
  loading: false,
  products: [],
};

export default initialState;
