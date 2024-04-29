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
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import CreateGenre from "./components/Pages/Admin/CreateGenre";
import CreateBook from "./components/Pages/Admin/CreateBook";
import StarsHollowUsers from "./components/Pages/Admin/StarsHollowUsers";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-genre" element={<CreateGenre />} />
          <Route path="admin/create-book" element={<CreateBook />} />
          {/* <Route
            path="admin/book/:slug"
            element={<UpdateProduct/>}
          /> */}
          {/* <Route path="admin/books" element={<Books/>} /> */}
          <Route path="admin/users" element={<StarsHollowUsers />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
