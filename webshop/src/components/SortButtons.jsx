import { useTranslation } from 'react-i18next';

function SortButtons(props) {
  const { t } = useTranslation();

  const sortAZ = () => {
    props.fProducts.sort((a,b) => a.name.localeCompare(b.name));
    props.setFProducts(props.fProducts.slice());
    props.changePage(props.activePage);
  }

  const sortZA = () => {
    props.fProducts.sort((a,b) => b.name.localeCompare(a.name));
    props.setFProducts(props.fProducts.slice());
    props.changePage(props.activePage);
  }

  const sortPriceAsc = () => {
    props.fProducts.sort((a,b) => a.price - b.price);
    props.setFProducts(props.fProducts.slice());
    props.changePage(props.activePage);
  }

  const sortPriceDesc = () => {
    props.fProducts.sort((a,b) => b.price - a.price);
    props.setFProducts(props.fProducts.slice());
    props.changePage(props.activePage);
  }

  return ( 
    <div>
        <button onClick={sortAZ}>{t("sort.az")}</button>
        <button onClick={sortZA}>{t("sort.za")}</button>
        <button onClick={sortPriceAsc}>{t("sort.price-asc")}</button>
        <button onClick={sortPriceDesc}>{t("sort.price-desc")}</button>
    </div>
   );
}

export default SortButtons;