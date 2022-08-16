import { useState } from "react";


function Ostukorv() {
  const [ostukorv, uuendaOstukorvi] = useState(JSON.parse(localStorage.getItem("ostukorv")) || []);

  const eemalda = (j2rjekorraNumber) => {
    ostukorv.splice(j2rjekorraNumber,1);
    uuendaOstukorvi(ostukorv.slice()); // UUENDAB HTMLI
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // SALVESTAB
  }

  return ( 
  <div>
    { ostukorv.length === 0 && <div>Ostukorv on tühi!</div> }
    { ostukorv.map( (element, index) => 
    <div key={index}>
      <div>Ostukorvis on {element}</div>
      <button onClick={() => eemalda(index)}>Eemalda ostukorvist {element}</button>
    </div>) }
  </div>
  );
}

export default Ostukorv;