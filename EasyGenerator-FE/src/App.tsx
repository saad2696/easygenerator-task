import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import SignInPage from "./views/SignIn/SignInPage";
import AppRoutes from "./Routes";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { placeUser } from "./redux/user/actions";
import { ToastContainer } from "react-toastify";
import Loading from "./loader/loading";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("i am fired", user);
      if (user) {
        const idTokenResult = await user?.getIdTokenResult();
        const userRole = idTokenResult?.claims.role || null;
        const serializableUser = {
          firebase_uid: user?.uid,
          role: userRole,
          data: {
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
            loginRedirectUrl: null,
          },
          fetched: true,
        };
        console.log("serialized user", serializableUser);
        await dispatch(placeUser(serializableUser));
        setLoading(false);
      }else{
        dispatch(placeUser(null))
        setLoading(false)
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <><Loading/></> // or any loading spinner component
  }
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
