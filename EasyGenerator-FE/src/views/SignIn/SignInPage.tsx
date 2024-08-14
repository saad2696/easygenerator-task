import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithFirebase } from "../../redux/user/actions";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userData } = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }

    if (name === "password" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateEmail(formState.email) || formState.password.trim() === "") {
      return;
    }

    setIsSubmitting(true);
    await dispatch(loginWithFirebase(formState.email, formState.password));
    setIsSubmitting(false);
   
  }

  return (
    <>
      <div className="h-screen">
        <div className="flex min-h-full flex-1 bg-[#2E3B4E]">
          <div className="relative hidden w-0 flex-1 lg:block ">
            <div className="p-4">
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid justify-center items-center">
                <img className="" src="assets/logo.png" alt="Your Company" />
                <div className="text-white font-bold text-4xl">
                  Learning starts here.
                </div>
                <div className="text-white">Create, Learn and grow!</div>
              </div>
              <img
                className="absolute bottom-0 left-0 w-[70%]"
                src="assets/signInImage.png"
                alt="Your Company"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col rounded-l-3xl bg-white justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto rounded-xl w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Hi, Welcome Back!
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Login with valid credentials.{" "}
                  <a href="/signup" className="font-semibold text-secondary">
                    Sign up
                  </a>
                </p>
              </div>

              <div className="mt-10">
                <div>
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formState?.email}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="password"
                          name="password"
                          type={isPasswordVisible ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          value={formState?.password}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                          {isPasswordVisible ? (
                            <AiOutlineEyeInvisible size={20} />
                          ) : (
                            <AiOutlineEye size={20} />
                          )}
                        </button>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>


                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
                            ></path>
                          </svg>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
