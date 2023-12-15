import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { commafy, friendlyDate } from 'lib/util';
import '../assets/stylesheets/components//_statistics.scss';

const CountryStatistics = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA'); // Set the default country to 'USA'
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    // Filter data for the selected country
    const selectedData = countriesData.find((country) => country.country === event.target.value);
    setSelectedCountryData(selectedData);
  };

  useEffect(() => {
    // Fetch data for individual countries
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries');
        setCountriesData(response.data);
        
        // Default country "USA"
        const defaultCountryData = response.data.find((country) => country.country === 'USA');
        setSelectedCountryData(defaultCountryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="country-select-label" className='country-select-label'>Select a Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          label="Select a Country"
          onChange={handleChange}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="">None</MenuItem>
          {Array.isArray(countriesData) &&
            countriesData.map((country) => (
              <MenuItem key={country.country} value={country.country}>
                {country.country}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedCountryData && (
        <div className="selected-country">
          <h3>{selectedCountryData.country}</h3>
          <p>Population: {commafy(selectedCountryData.population)}</p>
          <p>Cases: {commafy(selectedCountryData.cases)}</p>
          <p>Deaths: {commafy(selectedCountryData.deaths)}</p>
          <p>Recovered: {commafy(selectedCountryData.recovered )}</p>
        </div>
      )}
    </Box>
  );
};

export default CountryStatistics;







