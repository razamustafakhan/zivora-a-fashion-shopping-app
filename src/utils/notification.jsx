
import toast from "react-hot-toast";

const showToastSuccess = (message) => {
  return toast.success(message, {
    duration: 3000,
    style: {
      background: "#ecfdf5",
      color: "#065f46",
      border: "1px solid #a7f3d0",
      borderRadius: "12px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    },
    iconTheme: {
      primary: "#059669",
      secondary: "#ffffff",
    },
  });
};

const showToastError = (message) => {
  return toast.error(message, {
    duration: 4000,
    style: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    },
    iconTheme: {
      primary: "#dc2626",
      secondary: "#ffffff",
    },
  });
};

export { showToastSuccess, showToastError };
