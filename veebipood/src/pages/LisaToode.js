import { useRef, useState } from "react";

function LisaToode() {
  // vasakpoolne läheb HTMLi  ----    { s6num }
  // parempoolne - seda kutsun välja nupuvajutusel, et muuta vasakpoolset  uuendaS6num("uue-väärtuse")
                          // esmakordne väärtus lehele minnes
  const [s6num, uuendaS6num] = useState("");  // useState ja useRef mõlemad importima (from react)
  const nimiRef = useRef(); // läheb alati input külge
  const ingliseNimiRef = useRef();

  const sisesta = () => { // nupuvajutusel läheb käima see blokk loogelisest sulust loogelise suluni
    if (nimiRef.current.value === "") { // <--- jaotub kaheks, jaotus toimub sulgude sees 
      uuendaS6num("Pead sisestama toote nime!"); // kui sulgude sees on tõene võrdus, siis minnakse seda rida tegema
    } else {
      uuendaS6num("Sisestasid toote: " + nimiRef.current.value); // kui sulgude sees on võrdus väär
      localStorage.setItem("toode", nimiRef.current.value);
      // lehele minnes -> parem klõps -> inspect -> application/Storage -> Local Storage -> localhost:3000
      localStorage.setItem("toodeENG", ingliseNimiRef.current.value);
    }
  }

  return ( 
    <div>
      <div>{s6num}</div>
      <label>Toote nimi</label>
      <input ref={nimiRef} type="text" />
      <label>Toote inglise nimi</label>
      <input ref={ingliseNimiRef} type="text" />
      <button onClick={sisesta}>Sisesta</button>
    </div> );
}

export default LisaToode;

// SALVESTUS TOIMIB KOLMEL VIISIL:
// 1) Andmebaas - kasutajad, tooted, tellimused jne
// 2) Brauserisse vahemällu: localStorage kui ka sessionStorage - ostukorv
// 3) Faili - logid, 7 päeva kirjed, sajad miljonid - kui juhtub mingi error, siis ctrl+f

// console.log() <- arenduse käigus vigade leidmiseks
// logid <- live portaali vigade leidmiseks