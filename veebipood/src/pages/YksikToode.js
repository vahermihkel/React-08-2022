import { useParams } from "react-router-dom";

function YksikToode() {
  const { nimi } = useParams();              // localhost:3000/toode/:nimi
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const otsitudToode = tooted.find(element => element.nimi === nimi);

  // Objects are not valid as a React child (found: object with keys {nimi, hind, aktiivsus})
  return ( 
  <div>
    { otsitudToode !== undefined && <div>
      <div>{otsitudToode.nimi}</div>
      <div>{otsitudToode.hind}</div>
      <div>{otsitudToode.aktiivsus + 0}</div>
    </div>} 
    { otsitudToode === undefined && <div>Toodet ei leitud!</div> }
  </div>);
}

export default YksikToode;