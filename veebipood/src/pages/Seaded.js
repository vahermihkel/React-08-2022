import { useRef, useState } from "react";

function Seaded() {
  const aadressRef = useRef();
  const telefonRef = useRef();   // <>|    kui kunagi setItem pole tehtud võtmele "veebilehekeel", siis võtab "est"
  const [keel, uuendaKeel] = useState(localStorage.getItem("veebilehekeel") || "est");

  const uuenda = () => {
    localStorage.setItem("aadress", aadressRef.current.value);
    localStorage.setItem("telefon", telefonRef.current.value);
  }

  // const muudaKeelEST = () => {
  //   uuendaKeel("est");
  //   localStorage.setItem("veebilehekeel", "est");
  // }

  // const muudaKeelENG = () => {
  //   uuendaKeel("eng");
  //   localStorage.setItem("veebilehekeel", "eng");
  // }

  // const muudaKeelRUS = () => {
  //   uuendaKeel("rus");
  //   localStorage.setItem("veebilehekeel", "rus");
  // }

  const muudaKeel = (uusKeel) => {
    uuendaKeel(uusKeel);
    localStorage.setItem("veebilehekeel", uusKeel);
  }

  return ( 
    <div>
      <label>Kontaktaadress</label> <br />
      <input ref={aadressRef} type="text" /> <br />
      <label>Kontakttelefon</label> <br />
      <input ref={telefonRef} type="text" /> <br />
      <button onClick={uuenda}>Uuenda lehe kontaktandmeid</button>
      <br /><br />
      <button onClick={() => muudaKeel("est")}>Muuda leht eesti keelseks</button>
      <button onClick={() => muudaKeel("eng")}>Muuda leht inglise keelseks</button>
      <button onClick={() => muudaKeel("rus")}>Muuda leht vene keelseks</button>
      { keel === "est" && <div>Leht on eesti keelne</div>}
      { keel === "eng" && <div>Leht on inglise keelne</div>}
      { keel === "rus" && <div>Leht on vene keelne</div>}
    </div> );
}

export default Seaded;

// tumesinine - JS  muutujate/funktsioonide loomisel const/function     HTML    tag
// tavaline sinine - JS muutuja mida saab panna HTMLi, HTML võetakse mutuuja vastu     custom muutuja
// helesinine - JS - muutuja, mis on juba olemas või sulgude seest tulev muutuja   HTML - atribuudid className="", src=""
// kollane - JS - funktsioonid     HTML - funktsioonid
// punane - "" jutumärkides väärtused
// valge - HTMLs väljanäidatav kasutajale

// {} - funktsioonide algust ja lõppu   const funktsioon = () => { ...  }
//      function Seaded () {  useState()    return (<div></div>) }
//     HTMLs - pannakse mingi JavaScripti viide:
// et saavutada dünaamilisust, funktsioonid, ref ---> muutuja JavaScriptist mis võetakse HTMLi

// [] - massiivi tunnus   ["asdasd", "adasdas", "dasdasdas"]
// useState [muutuja, funktsioon]

// || - VÕI märk ehk kui esimene on tühi või väär, siis kuvab paremat    kontrollib if (false || booleani-muutuja)
// && - AND märk ehk kui esimene on tõsi, siis kuvab paremat             kontrollib if (true && booleani-muutuja)