import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {PrivateRoute,IsLogout} from "./components/PrivateRoute"

function App() {
  return ( <BrowserRouter>
    <Routes>
 
  <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/" element={<Home />} />
  </Route>

  
  <Route element={<IsLogout />}>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
  </Route>
</Routes>

  </BrowserRouter>
  )
}

export default App