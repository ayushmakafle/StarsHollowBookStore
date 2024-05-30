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
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import CreateGenre from "./components/Pages/Admin/CreateGenre";
import CreateBook from "./components/Pages/Admin/CreateBook";
import StarsHollowUsers from "./components/Pages/Admin/StarsHollowUsers";
import Profile from "./components/Pages/User/Profile";
import MyOrders from "./components/Pages/User/MyOrders";
import UserDashboard from "./components/Pages/User/UserDashboard";
import Books from "./components/Pages/Admin/Books";
import UpdateBook from "./components/Pages/Admin/UpdateBook";
import AllBooksPage from "./components/Pages/AllBooksPage";
import Search from "./components/Pages/Search";
import BookDetails from "./components/Pages/BookDetails";
import GenreBook from "./components/Pages/GenreBook";
import CreateAuthor from "./components/Pages/Admin/CreateAuthor";
import AllAuthors from "./components/Pages/AllAuthors";
import AuthorBook from "./components/Pages/AuthorBook";
import CartPage from "./components/Pages/CartPage";
import Header from "./components/Layout/Header";
import AdminOrders from "./components/Pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/AllBooks" element={<AllBooksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-authors" element={<AllAuthors />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:slug" element={<BookDetails />} />
        <Route path="/genre/:slug" element={<GenreBook />} />
        <Route path="/author/:slug" element={<AuthorBook />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<MyOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-genre" element={<CreateGenre />} />
          <Route path="admin/add-author" element={<CreateAuthor />} />

          <Route path="admin/create-book" element={<CreateBook />} />
          <Route path="admin/book/:slug" element={<UpdateBook />} />
          <Route path="admin/books" element={<Books />} />
          <Route path="admin/users" element={<StarsHollowUsers />} />
          <Route path="admin/order" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
