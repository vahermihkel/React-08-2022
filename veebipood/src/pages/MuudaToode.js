import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MuudaToode() {
  const { tooteNimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted.find(element => element.nimi === tooteNimi);
  const index = tooted.indexOf(leitudToode);
  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivsusRef = useRef();
  const navigate = useNavigate();

  const muuda = () => {
    const uuendatudToode = {
      nimi: nimiRef.current.value,
      hind: hindRef.current.value,
      aktiivsus: aktiivsusRef.current.checked
    }
    tooted[index] = uuendatudToode;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda-tooteid");
  }

  return ( 
    <div>
    { leitudToode !== undefined && <div>
      <label>Toote nimi</label> <br />
      <input ref={nimiRef} defaultValue={leitudToode.nimi} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} defaultValue={leitudToode.hind} type="number" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input ref={aktiivsusRef} defaultChecked={leitudToode.aktiivsus} type="checkbox" /> <br />
      <button onClick={muuda}>Muuda</button>
      {/* <div>{leitudToode.nimi}</div>
      <div>{leitudToode.hind}</div>
      <div>{leitudToode.aktiivsus + 0}</div> */}
    </div>} 
    { leitudToode === undefined && <div>Toodet ei leitud!</div> }
  </div>
   );
}

export default MuudaToode;