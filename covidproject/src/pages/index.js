import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { commafy, friendlyDate } from 'lib/util';

import Layout from "components/Layout";
import Map from "components/Map";

import axios from 'axios';
import useTracker from '../hooks/useTracker';
import '../assets/stylesheets/components/_tracker.scss'
import Tables from "../components/Tables";;

const LOCATION = { lat: 0, lng: 0 };   // middle of the world
  // { lat: 38.9072, lng: -77.0369 };  // in Los Angeles

const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

function countryPointToLayer (feature = {}, latlng) { 
  const { properties = {} } = feature;
  let updatedFormatted;
  let casesString;

  const {
    country,
    updated,
    cases, 
    deaths,
    recovered
  } = properties;

  casesString = `${cases}`;

  if      (cases > 1000000) { casesString = `${casesString.slice(0, -6)}M+`; }
  else if (cases > 1000)    { casesString = `${casesString.slice(0, -3)}k+`;  }
  
  if (updated)      { updatedFormatted = new Date(updated).toLocaleString(); }


  const html = `
    <span class="icon-marker">
      <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <ul>
          <li><strong>Confirmed:</strong> ${commafy(cases)}</li>
          <li><strong>Deaths:</strong> ${commafy(deaths)}</li>
          <li><strong>Recovered:</strong> ${commafy(recovered)}</li>
          <li><strong>Last Update:</strong> ${updatedFormatted}</li>
        </ul>
      </span>
      ${commafy(casesString)} 
    </span>
  `;

  return L.marker(latlng, {
    icon: L.divIcon({
      className: 'icon',
      html
    }),
    riseOnHover: true
  });
}


const MapEffect = ({ markerRef }) => {
  console.log('in MapEffect...');
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current || !map) return;

    (async function run() {
      console.log('about to call axios to get the data...');

      const options = {
        method: 'GET',
        url: 'https://disease.sh/v3/covid-19/countries',

      };
      
      let response; 
      
      try { response = await axios.request(options); 
      } catch (error) { 
        console.error(error);  
        return; 
      }
      console.log(response.data);

      const data = response.data;     // for disease.sh
      const hasData = Array.isArray(data) && data.length > 0;
      console.log('Stats Data:', data);
      if (!Array.isArray(data)) { console.log('not an array!'); return; }
      if (data.length === 0) { console.log('data length is === 0'); }

      if (!hasData) { console.log('No data, sorry!');  return; }

      const geoJson = {
        type: 'FeatureCollection',
        features: data.map((country = {}) => {
          const {countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: 'Feature',
            properties: {
              ...country,
            },
            geometry: {
              type: 'Point',
              coordinates: [ lng, lat]
            }
          }
        })
      }

      console.log('geoJson', geoJson);

      const geoJsonLayers = new L.GeoJSON(geoJson, { 
        pointToLayer: countryPointToLayer
      });
      var _map = markerRef.current._map;
      geoJsonLayers.addTo(_map);

      // setTimeout(async () => {
      //   await promiseToFlyTo(map, { zoom: ZOOM, center: location, });
      // }, timeToZoom);
    })();
  }, [map, markerRef]);

  return null;
};

MapEffect.propTypes = {
  markerRef: PropTypes.object,
};

const IndexPage = () => {
  const { data } = useTracker();
  console.log('in IndexPage, before useRef');
  const markerRef = useRef();

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };
  console.log("Data: ", data);
  return (
    <Layout pageName="home">
  <Helmet>
    <title>Home Page</title>
  </Helmet>
  <div className="dashboard-container">
    <div className="dashboard-left">
      <Tables/>
    </div>
    <div className="dashboard-map">
      <Map {...mapSettings}>
        <MapEffect markerRef={markerRef} />
        <Marker ref={markerRef} position={CENTER} />
      </Map>
    </div>
  </div>

  <div className="tracker-stats-container">
    <div className="tracker-stats">
      <div className="tracker-stat">
        <strong>Total Cases: </strong>
        {commafy(data.cases)}
      </div>
      <div className="tracker-stat">
        <strong>Cases per 1 million: </strong>
        {commafy(data.casesPerOneMillion)}
      </div>
      <div className="tracker-stat">
        <strong>Total Deaths: </strong>
        {commafy(data.deaths)}
      </div>
      <div className="tracker-stat">
        <strong>Deaths per 1 million: </strong>
        {data.deathsPerOneMillion}
      </div>
      <div className="tracker-stat tracker-stat-primary">
        <strong>Total Recovered: </strong> {commafy(data.recovered)}
      </div>
      <div className="tracker-stat tracker-stat-secondary">
        <strong>Last Updated: </strong> {friendlyDate(data.updated)}
      </div>
    </div>
  </div>
</Layout>

  );
};

export default IndexPage;