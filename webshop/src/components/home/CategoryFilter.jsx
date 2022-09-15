import { useTranslation } from 'react-i18next';

function CategoryFilter(props) {
  const { t } = useTranslation();
  
  return ( 
    <div>
      <div className={props.activeCategory === "all" ? "active-category": undefined} 
        onClick={() => props.filterByCategory('all')}>
          {t("filter.all-categories")}
      </div>
      <div>{props.categories.map(element => 
        <div key={element} 
          className={props.activeCategory === element ? "active-category": undefined} 
          onClick={() => props.filterByCategory(element)}>
            {element}
        </div>)}
      </div>
    </div> );
}

export default CategoryFilter;