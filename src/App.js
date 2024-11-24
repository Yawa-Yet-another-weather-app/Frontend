import './index.css';
import TableSection from './TableSection';
import FooterSection from './FooterSection';
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const [geolocation, setGeolocation] = useState(
      {latitude: 52.52, longitude: 13.41}//default location
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
