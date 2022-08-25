import React from 'react'; // nodu_modules kaustast import kuna kirjutatakse ilma ./
import ReactDOM from 'react-dom/client'; // nodu_modules
import 'bootstrap/dist/css/bootstrap.min.css'; // nodu_modules
import './index.css'; // src sees
import './i18n'; // src sees
import App from './App'; // src sees
import { BrowserRouter } from 'react-router-dom'; // nodu_modules
// kui midagi lõppu ei pane, on by defauly .js või .jsx
// ülejäänutele pean lõpu lisama: .css / .json jne

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// .container {         <- bootstrapi sees
//    color: yellow;
//} 

// .container     <- enda .css failis selle üle kirjutada

// let muutuja = 0;
// muutuja = 1;
