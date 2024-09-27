import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./layout/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./data/ProtectedRoutes";
import ProductDetail from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import ProductSearch from "./pages/ProductSearch";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderList";
import Dashboard from "./pages/Dashboard";
import UpdateDetails from "./pages/UpdateDetails";
import CreateProduct from "./pages/admin/CreateProduct";
import ProductListAdmin from "./pages/admin/ProductListAdmin";
import EditProductPage from "./pages/admin/EditProduct";
import OrderListAdmin from "./pages/admin/OrderListAdmin";
import UserListAdmin from "./pages/admin/UserListAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    // loader: checkAuthAndFetchUser,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: "about",
        element: <div>About</div>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard/>} />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <ProtectedRoute element={<CartPage />} />
      },
      {
        path: "order",
        element: <ProtectedRoute element={<Order />} />
      },
      {
        path: "order-list",
        element: <ProtectedRoute element={<OrderDetails />} />
      },
      {
        path: "update-details",
        element: <ProtectedRoute element={<UpdateDetails />} />
      },
      {
        path: "search/product",
        element: <ProductSearch />
      },
      {
        path: "admin/create-product",
        element: <ProtectedRoute element={<CreateProduct />} />
      },
      {
        path: "admin/product-list",
        element: <ProtectedRoute element={<ProductListAdmin />} />
      },
      {
        path: "admin/edit-product/:productId",
        element: <ProtectedRoute element={<EditProductPage />} />
      },
      {
        path: "admin/order-list",
        element: <ProtectedRoute element={<OrderListAdmin />} />
      },
      {
        path: "admin/user-list",
        element: <ProtectedRoute element={<UserListAdmin />} />
      },
    ]
  },

]);
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App