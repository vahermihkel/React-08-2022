
function Koduleht() {
  // tooted = ["Nobe","Tesla","BMW"]
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

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
    {tooted.map( (element, index) => 
      <div key={index}>
        {/* Tesla */}
        <span>{element}</span> 
                                            {/* Tesla */}
        <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
      </div>)}
  </div> );
}

export default Koduleht;