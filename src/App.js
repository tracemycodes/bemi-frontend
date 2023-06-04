import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Layouts from "./components/layouts/Layouts";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import ViewProduct from "./pages/viewProductPage/ViewProduct";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductCart from "./components/layouts/ProductCart/productCart";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import SideNavMenu from "./components/layouts/SideNavMenu/SideNavMenu";
import BemiIvoryState from "./context/BemiIvory/BemiIvoryState";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Account from "./pages/Account/Account";
import AccountForm from "./components/accountSection/AccountForm";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import Checkout from "./pages/checkout/Checkout";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderLayout from "./pages/OrderLayout/OrderLayout";
import AdminProduct from "./pages/AdminProduct/AdminProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const httpLink = new HttpLink({ uri: "https://good-rose-coral-fez.cyclic.app/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("token")}` || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BemiIvoryState>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layouts />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgetPassword />} />
              <Route path="change-password/:passId" element={<ChangePassword />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="product/:cloth" element={<ViewProduct />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="nav" element={<SideNavMenu />} />
              <Route path="account" element={<Account />} />
              <Route path="account/address" element={<AccountForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/checkout/:orderID" element={<Checkout />} />
            <Route path="/cart" element={<ProductCart />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="product" element={<AdminDashboard />} />
              <Route
                path="product/view/:productId"
                element={<AdminProduct />}
              />
              <Route path="product/:formOption" element={<ProductPage />} />
              <Route path="order/:orderID" element={<OrderPage />} />
              <Route path="order/" element={<OrderLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BemiIvoryState>
    </ApolloProvider>
  );
};

export default App;
