import { Link, Route, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  // const changeLanguageEN = () => {
  //   i18n.changeLanguage('en'); // <- ' '
  //   localStorage.setItem("language", "en"); // <- " "
  // }

  // const changeLanguageEE = () => {
  //   i18n.changeLanguage('ee');
  //   localStorage.setItem("language", "ee");
  // }

  // const changeLanguageRU = () => {
  //   i18n.changeLanguage('ru');
  //   localStorage.setItem("language", "ru");
  // }

  const updateLanguage = (languageClicked) => {
    i18n.changeLanguage(languageClicked);
    localStorage.setItem("language", languageClicked);
  }
  
  return (
    <div >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
            <Nav.Link as={Link} to="/meist">{t('navbar.about-button')}</Nav.Link>
            <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
            <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
          </Nav>
        </Container>
        <button onClick={() => updateLanguage('en')}>EN</button>
        <button onClick={() => updateLanguage('ee')}>EE</button>
        <button onClick={() => updateLanguage('ru')}>RU</button>
      </Navbar>
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="admin" element={ <AdminHome /> } />
        <Route path="meist" element={ <AboutUs /> } />
        <Route path="poed" element={ <Shops /> } />
        <Route path="ostukorv" element={ <Cart /> } />
        <Route path="admin/lisa-toode" element={ <AddProduct /> } />
        <Route path="admin/muuda-toode" element={ <EditProduct /> } />
        <Route path="admin/halda-tooteid" element={ <MaintainProducts /> } />
        <Route path="admin/halda-poode" element={ <MaintainShops /> } />
        <Route path="admin/halda-kategooriaid" element={ <MaintainCategories /> } />
      </Routes>
    </div>
  );
}

export default App;
