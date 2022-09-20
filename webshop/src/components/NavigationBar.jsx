import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import CartSumContext from "../store/CartSumContext";
import AuthContext from "../store/AuthContext";

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const cartSumCtx = useContext(CartSumContext);
  const authCtx = useContext(AuthContext);
  

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
    navigate("/");
  }


  return ( 
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
      <Nav className="me-auto">
        { authCtx.loggedIn === true && <Nav.Link as={Link} to={"/" + t("url.admin")}>{t('navbar.admin-button')}</Nav.Link>}
        <Nav.Link as={Link} to={"/" + t("url.about")}>{t('navbar.about-button')}</Nav.Link>
        <Nav.Link as={Link} to={"/" + t("url.shops")}>{t('navbar.shops-button')}</Nav.Link>
        <Nav.Link as={Link} to={"/" + t("url.cart")}>{t('navbar.cart-button')}</Nav.Link>
      </Nav>
    </Container>
    { authCtx.loggedIn === false && 
      <Link to="logi-sisse">
        <button>Logi sisse</button>
      </Link>
      }
    { authCtx.loggedIn === true && <button onClick={() => authCtx.updateLoggedIn(false)}>Logi välja</button>}
    <span style={{"color": "white"}}>{cartSumCtx.cartSum}€</span>
    <img className="lang" onClick={() => updateLanguage('en')} src={require("../images/uk.png")} alt="" />
    <img className="lang" onClick={() => updateLanguage('ee')} src={require("../images/estonia.png")} alt="" />
    <img className="lang" onClick={() => updateLanguage('ru')} src={require("../images/russia.png")} alt=""/>
  </Navbar> );
}

export default NavigationBar;