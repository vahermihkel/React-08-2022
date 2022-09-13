import Pagination from 'react-bootstrap/Pagination';

function PageButtons(props) {
  let pages = [];
  for (let number = 0; number < props.fProducts.length/20; number++) {
    pages.push(number+1);
  }

  return ( 
    <Pagination>{pages.map(number => 
      <Pagination.Item onClick={() => props.changePage(number)} key={number} active={number === props.activePage}>
         {number}
      </Pagination.Item>)}
    </Pagination>
   );
}

export default PageButtons;