import { useEffect } from "react";
import { useState } from "react";


function TableSection({geolocation}){

    const [tableData, setTableData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                if(geolocation == null)
                    return;

                const response = await fetch("https://yawa-backend-0yoi.onrender.com/weather/forecast?" + new URLSearchParams({
                    latitude: geolocation.latitude,
                    longitude: geolocation.longitude,
                }).toString());
                const json = await response.json();
                console.log(json);
                setTableData(json);

            }catch(error){
                console.log(error);
            }

        }
        fetchData();
    },[geolocation]);

    function renderHeaders(){
        if(tableData === null)
            return;

        return tableData.map(row => {
                return (
                    <th>{row.date}</th>
                )
        });
    }

    function renderImages(){
        if(tableData === null)
            return;

        return tableData.map(row => {
            
            //obviously could map each weather code to one particular image, but it would take a lot of time so i simplified it

            if(row.weatherCode % 3 === 0){
                return (
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
                    </td>
                )
            }else if(row.weatherCode % 3 === 1){
                return (
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>
                    </td>
                )
            }else if(row.weatherCode % 3 === 2){
                return (
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>
                    </td>
                )
            }
        });
    }

    function renderRows(parameter){
        if(tableData === null)
            return;

        return tableData.map(row => {
            return (
                <th>{row[parameter].toFixed(2)}</th>
            )
        });
    }

    return (
        <div className="TableSection">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Date:</th>
                        {renderHeaders()}
                    </tr>
                    <tr>
                        <td>Weather Code: </td>
                        {renderImages()}
                    </tr>
                    <tr>
                        <td>Minimmal Temperature: </td>
                        {renderRows("minTemperature")}
                    </tr>
                    <tr>
                        <td>Maximum temperature: </td>
                        {renderRows("maxTemperature")}
                    </tr>
                    <tr>
                        <td>Approximate energy: </td>
                        {renderRows("approximateEnergy")}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableSection;