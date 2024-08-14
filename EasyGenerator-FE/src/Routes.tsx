import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './views/SignIn/SignInPage';
import Dashboard from './views/Dashboard/Dashboard';
import RouterGuard from './route-guard/routerGuard';
import SignUpPage from './views/SignUp/SignUpPage';


// Import other page components here

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={ <RouterGuard><SignInPage /></RouterGuard> }/>
      <Route path="/dashboard" element={<RouterGuard><Dashboard /></RouterGuard>} />
      <Route path="/signin" element={<RouterGuard><SignInPage /></RouterGuard>} />
      <Route path="/signup" element={<RouterGuard><SignUpPage /></RouterGuard>} />
      
      {/* Define other routes here */}
    </Routes>
  );
};

export default AppRoutes;
