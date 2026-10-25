"use client";

import { createContext, useContext, useReducer } from "react";
import initialState from "@/initialstate/cart.state";
import cartReducer from "@/reducers/cart.reducer";
import { showToastError, showToastSuccess } from "@/utils/notification";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch all cart items
  const getAllCartItems = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/cart", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      dispatch({
        type: "SET_CARTS",
        payload: data.carts || [],
      });
    } catch (error) {
      showToastError(error.message || "Unable to load cart");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      showToastSuccess(data.message || "Product added to cart");

      await getAllCartItems();
    } catch (error) {
      showToastError(error.message || "Unable to add product");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Increase quantity
  const increaseQty = async (cartItemId) => {
    await updateQuantity(cartItemId, "increase");
  };

  // Decrease quantity
  const decreaseQty = async (cartItemId) => {
    await updateQuantity(cartItemId, "decrease");
  };

  const updateQuantity = async (cartItemId, operation) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ operation }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }

      await getAllCartItems();
    } catch (error) {
      showToastError(error.message || "Unable to update quantity");
    }
  };

  // Remove cart item
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item");
      }

      showToastSuccess(data.message || "Item removed from cart");

      await getAllCartItems();
    } catch (error) {
      showToastError(error.message || "Unable to remove item");
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear cart");
      }

      dispatch({ type: "CLEAR_CART" });

      showToastSuccess(data.message || "Cart cleared");
    } catch (error) {
      showToastError(error.message || "Unable to clear cart");
    }
  };

  // Calculate subtotal
  const subtotal = state.carts.reduce((total, item) => {
    const price = Number(item.product?.sellingPrice ?? item.product?.sp ?? 0);

    return total + price * item.quantity;
  }, 0);

  // Calculate total quantity
  const totalItems = state.carts.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        state,
        carts: state.carts,
        loading: state.loading,
        subtotal,
        totalItems,
        addToCart,
        getAllCartItems,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export default useCart;
export { CartContext, CartProvider };
