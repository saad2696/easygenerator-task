import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpPage: React.FC = () => {
  const { handleSubmit, loading } = useSignUp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() === "" ? "Name is required" : "";
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        error =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value,
          )
            ? ""
            : "Password must be at least 8 characters long, with at least one letter, one number, and one special character";
        break;
      case "passwordConfirm":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordConfirmVisibility = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("password", formData.password);
    validateField("passwordConfirm", formData.passwordConfirm);

    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    handleSubmit(formData);
  };

  return (
    <>
      <div className="h-screen">
        <div className="grid grid-cols-4 h-screen bg-[#2E3B4E]">
          {/* div for the left side menu */}
          <div className="hidden lg:block">
            <div className="p-2 pl-10">
              <img
                className="max-h-[8rem]"
                src="assets/logo.png"
                alt="Your Company"
              />
              <div className="text-white font-bold text-2xl pt-5">
                Signing Up
              </div>
              <div className="text-white">You are on the path to greatness</div>
            </div>

            <div className="p-2 pl-10">
              <a href="/signin">
                <div className="text-white cursor-pointer pt-16 gap-x-2 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  <a href="/signin">Back to Login</a>
                </div>
              </a>
            </div>

            <img
              className="absolute bottom-0 left-0 w-[20%] "
              src="assets/signUp.png"
              alt="Your Company"
            />
          </div>
          {/* Div for the menu */}
          <div className="flex items-center justify-center min-h-screen col-span-4 lg:col-span-3 bg-white">
            <div className="bg-white rounded-l-3xl p-4 max-w-[60rem] w-full">
              <h1 className="text-xl font-bold mb-4 text-[#222326]">
                Create Account
              </h1>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => validateField("name", formData.name)}
                    required
                    className="mt-1 w-full h-[35px] border border-gray rounded-md shadow-sm px-4 py-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => validateField("email", formData.email)}
                    required
                    className="mt-1 w-full h-[35px] border border-gray rounded-md shadow-sm px-4 py-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-label">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() =>
                        validateField("password", formData.password)
                      }
                      required
                      className="mt-1 w-full h-[35px] border border-gray rounded-md shadow-sm px-4 py-2 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-label">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      onBlur={() =>
                        validateField(
                          "passwordConfirm",
                          formData.passwordConfirm,
                        )
                      }
                      required
                      className="mt-1 w-full h-[35px] border border-gray rounded-md shadow-sm px-4 py-2 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordConfirmVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPasswordConfirm ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordConfirm}
                    </p>
                  )}
                </div>

                <div className="flex justify-start max-w-full">
                  <button
                    type="submit"
                    className={`mt-4 max-w-24 h-[35px] text-white rounded-md shadow-sm px-4 py-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-secondary hover:bg-orange-500"
                    }`}
                    disabled={loading}
                  >
                    <p className="pb-4">
                      {loading ? "Signing Up..." : "Sign Up"}
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
