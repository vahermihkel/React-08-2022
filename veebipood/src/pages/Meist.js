import { useState } from "react";

function Meist() {
  // const aadress = localStorage.getItem("aadress");
  // const telefon = localStorage.getItem("telefon");

                                  // lehele tulles, nähakse useState algväärtust
  const [aadress, uuendaAadressi] = useState("Mine hiirega üle, et näha aadressi");
  const [telefon, uuendaTelefoni] = useState("Mine hiirega üle, et näha telefoni");

  const n2itaAadress = () => {
    uuendaAadressi(localStorage.getItem("aadress"));
  }

  const n2itaTelefon = () => {
    uuendaTelefoni(localStorage.getItem("telefon"));
  }

  return ( <div>
    {/* funktsioon käivitub kui hiirega minnakse üle selle <div> */}
    <span onMouseOver={n2itaAadress}>Meie aadress: {aadress}</span> <br />
    <span onMouseOver={n2itaTelefon}>Meie telefon: {telefon}</span> <br />
  </div> );
}

export default Meist;