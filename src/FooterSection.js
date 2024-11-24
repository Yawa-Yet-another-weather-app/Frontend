import { useEffect } from "react";
import { useState } from "react";

function FooterSection({geolocation}){

    const [averageWeather, setAverageWeather] = useState(
        {avgPressure: null, avgSunExposure: null, minTemperature: null, maxTemperature: null, description: null}
    );

    useEffect(()=>{
        async function fetchData(){
            try{
                if(geolocation == null)
                    return;

                const response = await fetch("http://localhost:8080/weather/average?" + new URLSearchParams({
                    latitude: geolocation.latitude,
                    longitude: geolocation.longitude,
                }).toString());
                const json = await response.json();

                setAverageWeather(json);

            }catch(error){
                console.log(error);
            }

        }
        fetchData();
    },[geolocation]);

    return (
        <footer>
            <p>Average pressure: {averageWeather.avgPressure.toFixed(1)}</p>
            <p>Average sun exposure: {averageWeather.avgSunExposure.toFixed(1)}</p>
            <p>Minimal temperature: {averageWeather.minTemperature.toFixed(1)}</p>
            <p>Maximum temperature: {averageWeather.maxTemperature.toFixed(1)}</p>
            <p>{averageWeather.description}</p>
        </footer>
    )
}

export default FooterSection;