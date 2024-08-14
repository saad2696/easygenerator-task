import { useState } from "react";
import apiService from "../services/apiService";
import toastService from "../toast/toast";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiService.post("/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toastService.success(
        "Account created Sucessfully! Please Login to continue",
      );
      // Handle success, e.g., redirect to login page or show success message
      console.log("Signup successful:", response);
      toastService.success(
        "Account created Sucessfully! Please Login to continue",
      );
      navigate("/signin");
    } catch (error) {
      // Handle error, e.g., show error message
      toastService.error("Error creating account");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
  };
};
