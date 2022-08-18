import { useRef } from "react";
import { useState } from "react";

function Pildid() {
  // picsum.photos/           "https://picsum.photos/id/37/500/300"
  const [pilt, uuendaPilt] = useState(localStorage.getItem("suur-pilt"));
  // [
  //   "https://picsum.photos/id/137/200/50", 
  //   "https://picsum.photos/id/237/200/50", 
  //   "https://picsum.photos/id/337/200/50"
  // ]                                                              "["","",""]"   ---> ["","",""]
  const [v2ikePildid, uuendaV2ikepilte] = useState(JSON.parse(localStorage.getItem("v2iksed-pildid")) || []);
  const piltRef = useRef();
  const v2ikePiltRef = useRef();

  const kustutaPilt = () => {
    uuendaPilt("");
    localStorage.setItem("suur-pilt", "");
  }

  const kustutaV2ikepilt = (index) => {
    v2ikePildid.splice(index,1);
    uuendaV2ikepilte(v2ikePildid.slice());
    localStorage.setItem("v2iksed-pildid", JSON.stringify(v2ikePildid));
  }

  // https://picsum.photos/id/537/500/300
  const asenda = () => {
    uuendaPilt(piltRef.current.value);
    // "https://picsum.photos/id/37/500/300"
        // stringify-d pole vaja, sest ta juba on stringi kujul
    localStorage.setItem("suur-pilt", piltRef.current.value);
  }

  const lisaV2ikepilt = () => {
    v2ikePildid.push(v2ikePiltRef.current.value);
    uuendaV2ikepilte(v2ikePildid.slice());
            // ["","",""] ---> "["","",""]"
    localStorage.setItem("v2iksed-pildid", JSON.stringify(v2ikePildid));
  }

  const kustutaK6ik = () => {
    uuendaV2ikepilte([]);
    localStorage.setItem("v2iksed-pildid", JSON.stringify([]));
  }

  return ( <div>
    <label>Suur pilt</label>
    <input ref={piltRef} type="text" />
    <button onClick={asenda}>Sisesta</button>
    <br />
    <img src={pilt} alt="" />
    { pilt !== "" && <button onClick={kustutaPilt}>X</button>}
    <br />
    <label>Väike pilt</label>
    <input ref={v2ikePiltRef} type="text" />
    <button onClick={lisaV2ikepilt}>Sisesta</button>
    <div>Pilte on {v2ikePildid.length} tk</div>
    { v2ikePildid.length > 0 && <button onClick={kustutaK6ik}>Kustuta kõik pildid</button>}
    { v2ikePildid.map((element, index) => 
      <div key={index}>
        <img src={element} alt="" /> 
        <button onClick={() => kustutaV2ikepilt(index)}>x</button>
        <br />
      </div> ) }
  </div> );
}

export default Pildid;