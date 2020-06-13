import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import Markers from '@somarmeteorologia/react-leaflet-markers'


const MyMapComponent = () => {
    const [activePark, setActivePark] = React.useState(null);

    const parkData = {
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "PARK_ID": 960,
                    "NAME": "Bearbrook Skateboard Park",
                    "DESCRIPTIO": "Flat asphalt surface, 5 components"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [25.0135914, 121.2332019]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "PARK_ID": 1219,
                    "NAME": "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
                    "DESCRIPTIO": "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-75.546518086577947, 45.467134581917357]
                }
            }
        ]
    }
    return (
        <Map center={[25.0338438, 121.543350]} zoom={20}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {parkData.features.map(park => (
                <Marker
                    // markers={
                    //     markers.map(marker => (
                    //         <Marker
                    //             key={marker.key}
                    //             icon={defaultIcon}
                    //             position={[marker.latitude, marker.longitude]}
                    //             properties={marker}   />
                    //             ))
                    //           }
                        key={park.properties.PARK_ID}
                        position={[
                                    25.0338438
                                    , 121.543321
                                ]}
                        onClick={() => {
                                    setActivePark(park);
                                }}
                            />
                        ))}
      </Map>


    );
}

export default MyMapComponent
