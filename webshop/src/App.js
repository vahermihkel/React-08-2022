import { Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./pages/Homepage";
import AdminHome from "./pages/admin/AdminHome";
import AboutUs from "./pages/AboutUs";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import MaintainProducts from "./pages/admin/MaintainProducts";
import MaintainShops from "./pages/admin/MaintainShops";
import MaintainCategories from "./pages/admin/MaintainCategories";
import NavigationBar from "./components/NavigationBar";
import { useTranslation } from 'react-i18next';
import Login from "./pages/Login";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import Signup from "./pages/admin/Signup";

function App() {
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext);

  return (
    <div >
      <NavigationBar />
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path={t("url.about")} element={ <AboutUs /> } />
        <Route path={t("url.shops")} element={ <Shops /> } />
        <Route path={t("url.cart")} element={ <Cart /> } />
        <Route path="logi-sisse" element={ <Login /> } />
        { authCtx.loggedIn === true && <>
          <Route path={t("url.admin")} element={ <AdminHome /> } />
          <Route path="admin/lisa-toode" element={ <AddProduct /> } />
          <Route path="admin/lisa-kasutaja" element={ <Signup /> } />
          <Route path="admin/muuda-toode/:id" element={ <EditProduct /> } />
          <Route path="admin/halda-tooteid" element={ <MaintainProducts /> } />
          <Route path="admin/halda-poode" element={ <MaintainShops /> } />
          <Route path="admin/halda-kategooriaid" element={ <MaintainCategories /> } />
        </>}
      </Routes>
    </div>
  );
}

export default App;
