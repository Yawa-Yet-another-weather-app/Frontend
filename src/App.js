import './index.css';
import TableSection from './TableSection';
import FooterSection from './FooterSection';
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const [geolocation, setGeolocation] = useState(
      {date: null, weatherCode: null, minTemperature: null, maxTemperature: null, approximateEnergy: null}
  );

  useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position) => {
          setGeolocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
      });
  },[]);

  return (
    <div className='App'>
      <TableSection geolocation={geolocation} />
      <FooterSection geolocation={geolocation} />
    </div>
  );
}

export default App;
