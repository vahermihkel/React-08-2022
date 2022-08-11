import { useState } from "react";

function Avaleht() { // algus
  const [kogus, uuendaKogus] = useState(30);
  const [tooteNimi, uuendaTootenimi] = useState("Auto mudeliga " + localStorage.getItem("toode"));
  const [tooteKategooria, uuendaTooteKategooria] = useState("Elektriline auto");


  const v2henda = () => { // algus
    uuendaKogus(kogus - 1);
  } // lõpp

  const suurenda = () => {
    uuendaKogus(kogus + 1);
  }

  const ingliseks = () => {
    uuendaTootenimi("Car model " + localStorage.getItem("toodeENG"));
    uuendaTooteKategooria("Electric Car");
  }

  
  return ( 
  <div>
    <div>{tooteNimi}</div>
    <div>{tooteKategooria}</div>
    <button onClick={ingliseks}>Muuda inglise keelseks</button> <br />
    <button onClick={v2henda}>Vähenda</button>
    <div>{kogus}</div>
    <button onClick={suurenda}>Suurenda</button>
  </div> );
} // lõpp

export default Avaleht;