import React from "react";
import { AuthProvider } from "./context/auth.context";
import { CategoryProvider } from "./context/category.context";
import { ProductProvider } from "./context/product.context";

const StoreProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>{children}</ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default StoreProvider;
