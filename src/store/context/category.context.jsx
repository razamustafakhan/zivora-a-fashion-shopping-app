"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { showToastError, showToastSuccess } from "@/utils/notification";
import initialState from "../initialstate/category.state";
import { apiGet, apiPost } from "@/services/api";
import categoryReducer from "../reducers/category.reducer";

const CategoryContext = createContext(null);

const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };
  const setSuccess = () => {
    dispatch({
      type: "SET_SUCCESS",
    });
  };
  const setError = () => {
    dispatch({
      type: "SET_ERROR",
    });
  };

  // Handle category form changes
  const categoryChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "CATEGORY_CHANGE",
      payload: {
        name,
        value,
      },
    });
  };

  // Get all categories
  const getAllCategories = async () => {
    setLoading();

    try {
      const data = await apiGet("/api/category");
      if (data.success) {
        dispatch({
          type: "SET_CATEGORIES",
          payload: data.data || [],
        });
        setSuccess();
      }
    } catch (error) {
      showToastError(error.message || "Something went wrong");
    }
    setError();
  };

  // Add a new category
  const addCategory = async (e) => {
    e.preventDefault();
    setLoading();

    try {
      const data = await apiPost("/api/category", state.categoryForm);
      if (data.success) {
        showToastSuccess(data.message || "Category added successfully");
        setSuccess();
        dispatch({
          type: "RESET_CATEGORY_FORM",
        });
        await getAllCategories();
      }
    } catch (error) {
      setError();
      showToastError(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        state,
        dispatch,
        categoryChange,
        addCategory,
        getAllCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};

export default useCategory;

export { CategoryProvider, CategoryContext };
