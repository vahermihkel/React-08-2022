import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'; // <--- impordib bootstrapist ilusa nupu
// {} <- kui võtab tüki sellest moodulist
// Button <- siis võtab terve selle mooduli
// import { Button } from 'react-bootstrap';

function AdminHome() {
  return ( 
  <div>
    <Link to="/admin/lisa-toode">
      {/* kui midagi ei pane, on sinine
      variant=""     danger -- punane   success -- roheline    warning -- kollane
      secondary -- hall      primary -- sinine */}
      <Button variant="success">Lisa uus toode</Button>
    </Link> 
    <Link to="/admin/halda-tooteid">
      <Button>Muuda/kustuta tooteid</Button>
    </Link>  
    <Link to="/admin/halda-poode">
      <Button>Halda poode</Button>
    </Link>
    <Link to="/admin/halda-kategooriaid">
      <Button>Halda kategooriaid</Button>
    </Link>  
    <Link to="/admin/lisa-kasutaja">
      <Button>Lisa kasutaja</Button>
    </Link>  
  </div> );
}

export default AdminHome;