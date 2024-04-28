import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import LandingPage from "./components/Pages/LandingPage";
import AboutUs from "./components/Pages/AboutUs";
import PageNotFound from "./components/Pages/PageNotFound";
import UserRegistration from "./components/Pages/Auth/Register";
import UserLogin from "./components/Pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Pages/User/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<PrivateRoute />}>
          <Route path="/user-dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
