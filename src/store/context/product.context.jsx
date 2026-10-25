"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import productReducer from "../reducers/product.reducer";
import initialState from "../initialstate/product.state";
import { apiGet } from "@/services/api";

const ProductContext = createContext();

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  // Update product form fields
  const productChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "PRODUCT_CHANGE",
      payload: { name, value },
    });
  };

  // Validate selected images
  const handleImageChange = useCallback(
    (event) => {
      const selectedFiles = Array.from(event.target.files || []);
      const existingImages = state?.productForm.images || [];

      setErrors((previousErrors) => ({
        ...previousErrors,
        images: "",
      }));

      if (selectedFiles.length === 0) return;

      const combinedImages = [...existingImages, ...selectedFiles];

      if (combinedImages.length > MAX_IMAGES) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          images: `You can upload a maximum of ${MAX_IMAGES} images.`,
        }));

        event.target.value = "";
        return;
      }

      const invalidType = selectedFiles.find(
        (file) => !ALLOWED_IMAGE_TYPES.includes(file.type),
      );

      if (invalidType) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          images: "Only JPG, PNG, and WebP images are allowed.",
        }));

        event.target.value = "";
        return;
      }

      const oversizedImage = selectedFiles.find(
        (file) => file.size > MAX_IMAGE_SIZE,
      );

      if (oversizedImage) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          images: "Each image must be 5 MB or smaller.",
        }));

        event.target.value = "";
        return;
      }

      dispatch({
        type: "IMAGE_CHANGE",
        payload: {
          value: combinedImages,
        },
      });

      setMessage("");
      event.target.value = "";
    },
    [state?.productForm.images],
  );

  // Remove a selected image
  const removeImage = useCallback(
    (indexToRemove) => {
      const updatedImages = (state?.productForm.images || []).filter(
        (_, index) => index !== indexToRemove,
      );

      dispatch({
        type: "REMOVE_IMAGE",
        payload: {
          value: updatedImages,
        },
      });

      setErrors((previousErrors) => ({
        ...previousErrors,
        images: "",
      }));
    },
    [state?.productForm.images],
  );

  // Generate and clean up image previews
  useEffect(() => {
    const images = state?.productForm.images || [];

    const previews = images.map((image) => ({
      file: image,
      url: URL.createObjectURL(image),
    }));

    setImagePreviews(previews);

    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [state?.productForm.images]);

  // Calculate discount percentage
  const discount = useMemo(() => {
    const originalPrice = Number(state?.productForm.originalPrice);
    const sellingPrice = Number(state?.productForm.sellingPrice);

    if (
      !Number.isFinite(originalPrice) ||
      !Number.isFinite(sellingPrice) ||
      originalPrice <= 0 ||
      sellingPrice < 0 ||
      sellingPrice >= originalPrice
    ) {
      return 0;
    }

    return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  }, [state?.productForm.originalPrice, state?.productForm.sellingPrice]);

  const addProduct = async (e) => {
    e.preventDefault();

    setMessage("");

    const form = state?.productForm;
    console.log(form);
    const images = form.images || [];
    const formData = new FormData();

    const fields = [
      "name",
      "description",
      "categoryId",
      "brand",
      "sellingPrice",
      "originalPrice",
      "stock",
      "sku",
    ];

    fields.forEach((field) => {
      const value = form[field];

      if (value !== null && value !== undefined) {
        formData.append(field, String(value));
      }
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    // dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to add product.");
      }

      // dispatch({ type: "RESET_PRODUCT_FORM" });
      setErrors({});
      setMessage(data.message || "Product added successfully.");

      // Refresh the product list after successful creation
      // await getAllProducts();

      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage =
        error.message || "Something went wrong while adding the product.";

      setMessage(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const getAllProducts = async () => {
    const data = await apiGet("/api/product");
    console.log(data);
    dispatch({
      type: "SET_PRODUCTS",
      payload: data.products,
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const contextValue = useMemo(
    () => ({
      state,
      addProduct,

      errors,
      message,
      discount,
      imagePreviews,
      productChange,
      handleImageChange,
      removeImage,

      // getAllProducts,
      // addProduct,
      setErrors,
      setMessage,
    }),
    [
      state,

      errors,
      message,
      discount,
      imagePreviews,
      productChange,
      handleImageChange,
      removeImage,
    ],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider.");
  }

  return context;
};

export default ProductContext;
