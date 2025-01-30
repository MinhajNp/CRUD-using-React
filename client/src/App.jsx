import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { PrivateRoute, IsLogout } from "./components/PrivateRoute";
import PageNotFound from './pages/PageNotFound'

import AdminSignIn from "./pages/AdminSignIn"
import AdminDashboard from "./pages/AdminDashboard"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AdminPrivateRoute, IsAdminLogout } from './components/AdminPrivateRoute'


function App() {
  return (

    <BrowserRouter>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Route>


        <Route element={<IsLogout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<IsAdminLogout />}>
          <Route path="/adminSignIn" element={<AdminSignIn />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App