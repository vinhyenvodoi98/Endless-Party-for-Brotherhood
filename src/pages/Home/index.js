import React, { useState, useEffect } from 'react';
import addMarkers from 'geolocation/addMarkers';
import useGeolocation from 'geolocation/useGeolocation';
import Map from 'components/Map';
import SelectMap from 'components/SelectMap';

import { Row, Col } from 'antd';

import './index.css';

export default function Home() {
  const [yourLocaltion, setYourLocaltion] = useState(null);
  const [showMarkers, setShowMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState([]);
  const [load, setLoad] = useState(true);

  // get your Geolocation
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      setYourLocaltion({ lat: geolocation.latitude, lng: geolocation.longitude });
    }
  }, [geolocation]);

  return (
    <Row style={{ height: '75vh' }}>
      <Col span={16}>
        {!geolocation.error ? (
          <Map
            onMount={addMarkers}
            options={{
              center: { lat: geolocation.latitude, lng: geolocation.longitude },
              zoom: 19,
            }}
            showMarkers={showMarkers}
            setShowMarkers={setShowMarkers}
            yourLocaltion={yourLocaltion}
            isShowOnly={true}
          />
        ) : (
          <p>No geolocation, sorry.</p>
        )}
      </Col>
      <Col span={8}>
        <div className='site-layout-title'>
          <SelectMap
            yourLocaltion={yourLocaltion}
            showMarkers={showMarkers}
            setShowMarkers={setShowMarkers}
            geolocation={geolocation}
            markerIndex={markerIndex}
            setMarkerIndex={setMarkerIndex}
            setLoad={setLoad}
          />
        </div>
      </Col>
    </Row>
  );
}
