import './index.css';
import TableSection from './TableSection';
import FooterSection from './FooterSection';
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const [geolocation, setGeolocation] = useState(
    {latitude: null, longitude: null}
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
