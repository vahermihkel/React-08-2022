import { useState } from "react";
import { Link } from 'react-router-dom';

function Koduleht() {
  // tooted = ["Nobe","Tesla","BMW"]
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const sortAZ = () => {
    tooted.sort((a,b) => a.nimi.localeCompare(b.nimi));
    uuendaTooted(tooted.slice());
  }

  const sortZA = () => {
    // tooted.sort((a,b) => -1 * a.nimi.localeCompare(b.nimi));
    tooted.sort((a,b) => b.nimi.localeCompare(a.nimi));
    uuendaTooted(tooted.slice());
  }

  const sortHindKasvavalt = () => {
    tooted.sort((a,b) => a.hind - b.hind);
    uuendaTooted(tooted.slice());
  }

  const sortHindKahanevalt = () => {
    tooted.sort((a,b) => b.hind - a.hind);
    uuendaTooted(tooted.slice());
  }

                        // Tesla
  const lisaOstukorvi = (klikitudToode) => {
    console.log(klikitudToode); // logitakse konsooli välja selle muutuja väärtus: "Tesla"
    let ostukorv = localStorage.getItem("ostukorv");
    console.log(ostukorv); // null
    ostukorv = JSON.parse(ostukorv) || []; // ["asdadas"] || []
    console.log(ostukorv); // []
    ostukorv.push(klikitudToode);   // [].push("Tesla")  --> ["Tesla"]
    console.log(ostukorv); // ["Tesla"]
    ostukorv = JSON.stringify(ostukorv);
    console.log(ostukorv); // "["Tesla"]"
    localStorage.setItem("ostukorv", ostukorv);
  }

  return ( <div>
    {/* ["Nobe","Tesla","BMW"] */}
    <button onClick={sortAZ}>Sorteeri tähestiku järgi kasvavalt</button>
    <button onClick={sortZA}>Sorteeri tähestiku järgi kahanevalt</button>
    <button onClick={sortHindKasvavalt}>Sorteeri hinna järgi kasvavalt</button>
    <button onClick={sortHindKahanevalt}>Sorteeri hinna järgi kahanevalt</button>

    {tooted.filter(element => element.aktiivsus === true).map( (element, index) => 
      <div key={index}>
        {/* Tesla */}
        {/* {nimi: "Tesla", hind: "3123123", aktiivsus: true} */}
        {/* Objects are not valid as a React child (found: object with keys {nimi, hind, aktiivsus}) */}
        {/* <span>{element}</span>  */}

        <Link to={"/toode/" + element.nimi}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
          <div>{element.aktiivsus}</div>
        </Link>
        <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
      </div>)}
  </div> );
}

export default Koduleht;