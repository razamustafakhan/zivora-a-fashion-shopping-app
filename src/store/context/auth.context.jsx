"use client";

// * Import React Context API and hooks for authentication state management.
import { createContext, useContext, useReducer } from "react";

// * Import the initial authentication state and reducer.
import initialState from "../initialstate/auth.state";
import authReducer from "../reducers/auth.reducer";
import { apiPost } from "@/services/api";
import { showToastError, showToastSuccess } from "@/utils/notification";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// * Create a context to share authentication data across components.
const AuthContext = createContext();

// * Provide authentication state and handlers to child components.
const AuthProvider = ({ children }) => {
  // * Initialize and manage authentication state using useReducer.
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // * Set the authentication loading state.
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  // * Set the authentication success state.
  const setSuccess = () => {
    dispatch({
      type: "SET_SUCCESS",
    });
  };

  // * Handle changes in the sign-up form inputs.
  const signUpChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "SIGN_UP",
      payload: { name, value },
    });
  };

  // * Handle changes in the sign-in form inputs.
  const signInChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    dispatch({
      type: "SIGN_IN",
      payload: { name, value },
    });
  };

  // TODO: Implement the sign-up form submission logic.
  const signUpSubmit = async (e) => {
    e.preventDefault();
    setLoading();
    try {
      const data = await apiPost("/api/auth/sign-up", state.registerForm);
      // console.log(data)
      if (data.success) {
        showToastSuccess(data.message);
        setSuccess();
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  };

  // TODO: Implement the sign-in form submission logic.
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email: state.loginForm.email,
        password: state.loginForm.password,
        redirect: false,
      });
      console.log(result, "result");

      if (result?.error) {
        showToastError("Invalid email or password");
        return;
      }

      showToastSuccess("Login successful");
      setSuccess();

      // router.push("/dashboard");
      // router.refresh();
    } catch (error) {
      showToastError(error.message || "Login failed");
    }
  };

  // * Share authentication state and form handlers with child components.
  return (
    <AuthContext.Provider
      value={{ state, signInChange, signUpChange, signUpSubmit, signInSubmit }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// * Create a custom hook to access the authentication context.
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

// * Export the custom hook for use in components.
export default useAuth;

// * Export the provider to wrap the application.
export { AuthProvider };
