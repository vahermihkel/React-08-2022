import { useRef, useState } from "react";

function LisaToode() {
  const [s6num, uuendaS6num] = useState("");
  const nimiRef = useRef();

  const sisesta = () => {
    if (nimiRef.current.value === "") {
      uuendaS6num("Pead sisestama toote nime!");
    } else {
      uuendaS6num("Sisestasid toote: " + nimiRef.current.value);
    }
  }

  return ( 
    <div>
      <div>{s6num}</div>
      <label>Toote nimi</label>
      <input ref={nimiRef} type="text" />
      <button onClick={sisesta}>Sisesta</button>
    </div> );
}

export default LisaToode;