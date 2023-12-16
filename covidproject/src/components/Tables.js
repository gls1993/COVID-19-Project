import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { commafy } from 'lib/util';
import '../assets/stylesheets/components/_tables.scss';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState('countries');
  const [tableData, setTableData] = useState([]);
  const [californiaCountiesData, setCaliforniaCountiesData] = useState([]); 

  const handleTableChange = (table) => {
    setSelectedTable(table);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedTable === 'countries') {
          response = await axios.get('https://disease.sh/v3/covid-19/countries');
        } else if (selectedTable === 'states') {
          response = await axios.get('https://disease.sh/v3/covid-19/states/');
        } else if (selectedTable === 'county') {
          response = await axios.get('https://disease.sh/v3/covid-19/historical/usacounties/california?lastdays=1');
          setCaliforniaCountiesData(response.data);
        }

        setTableData(response.data);
        console.log("Data response: ", response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, [selectedTable]);
//   console.log("California data: ", californiaCountiesData);
  return (
    <div className="tables-container">
      {selectedTable === 'countries' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Population</th>
                <th>Cases</th>
                <th>Deaths</th>
                <th>Recovered</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((country) => (
                <tr key={country.country}>
                  <td>{country.country}</td>
                  <td>{commafy(country.population)}</td>
                  <td>{commafy(country.cases)}</td>
                  <td>{commafy(country.deaths)}</td>
                  <td>{commafy(country.recovered)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    {selectedTable === 'states' && (
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>State</th>
                <th>Cases</th>
                <th>Deaths</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((state) => (
                <tr key={state.state}>
                    <td>{state.state}</td>
                    <td>{commafy(state.cases)}</td>
                    <td>{commafy(state.deaths)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )}

    {selectedTable === 'county' && (
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>County</th>
                <th>Cases</th>
                <th>Deaths</th>
                </tr>
            </thead>
            <tbody>
                {console.log("California Data: ", californiaCountiesData)}
                {californiaCountiesData.map((county) => (
                <tr key={county.county}>
                    <td>{county.county.charAt(0).toUpperCase() + county.county.slice(1)}</td>
                    <td>{commafy(county.timeline.cases['3/9/23'])}</td>
                    <td>{commafy(county.timeline.deaths['3/9/23'])}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )}

      <div className="table-navigation">
        <Button
          variant="outlined"
          onClick={() => handleTableChange('countries')}
          className={selectedTable === 'countries' ? 'active' : ''}
        >
          Countries
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleTableChange('states')}
          className={selectedTable === 'states' ? 'active' : ''}
        >
          USA States
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleTableChange('county')}
          className={selectedTable === 'county' ? 'active' : ''}
        >
          California Counties
        </Button>
      </div>
    </div>
  );
};

export default Tables;
