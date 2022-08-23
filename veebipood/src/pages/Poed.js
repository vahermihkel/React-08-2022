import { useRef } from "react";
import { useState } from "react";

function Poed() {
                                    //     0            1           2          3
  const [poed, uuendaPoed] = useState([
    {nimi:"Kristiine", aeg:"9-22"}, 
    {nimi:"Mustamäe", aeg:"9-22"},
    {nimi:"Lasnamäe", aeg:"9-22"},
    {nimi:"Õismäe", aeg:"9-22"},
    {nimi:"Põhja-Tallinn", aeg:"9-22"},
    {nimi:"Telliskivi", aeg:"9-22"},
    {nimi:"Kesklinn", aeg:"9-22"}
  ]);
  const nimiRef = useRef(); // <- selle jaoks, et teda input külge panna, muutuja väärtus koguaeg vahetub
  const aegRef = useRef();

  const eemalda = (j2rjekorraNumber) => {
    poed.splice(j2rjekorraNumber,1);
    // splice on kustutamiseks, splice nõuab mitmendat ta kustutab ja mitu tk alates sellest
    uuendaPoed(poed.slice());
    // slice on koopia tegemiseks
  }

  const sorteeri = () => {
    poed.sort((a,b) => a.nimi.localeCompare(b.nimi) );  // sort mutates   muteerib
    uuendaPoed(poed.slice()); // uuenda HTMLi
  }

  const lisa = () => {
    const uusPood = {nimi: nimiRef.current.value, aeg: aegRef.current.value};
    poed.push(uusPood);
    // poed.push({nimi: nimiRef.current.value, aeg: aegRef.current.value});
    uuendaPoed(poed.slice());
  }

  const filtreeri = () => {
    const result = poed.filter(element => element.nimi.length > 8);
    uuendaPoed(result);
  }

  const filtreeri2 = () => {
    const result = poed.filter(element => element.nimi.includes("mäe")); // filter returns    tagastab
    uuendaPoed(result);
  }

  return ( 
    <div>
      <label>Uue poe nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
      <button onClick={sorteeri}>Sorteeri tähestiku järjekorras</button>
      <button onClick={filtreeri}>Jäta alles kõik üle 8 tähelised</button>
      <button onClick={filtreeri2}>Jäta alles kõik "mäe"-d</button>
      { poed.map( (element, index) => 
        <div key={index}>
          {/* Objects are not valid as a React child (found: object with keys {nimi, aeg}). If you meant to render a collection of children, use an array instead. */}
          {/* <span>{element}</span> */}
          <span>{element.nimi} </span>
          <span>({element.aeg})</span>
          <button onClick={() => eemalda(index)}>Eemalda</button>
        </div>) }
    </div> );
}

export default Poed;