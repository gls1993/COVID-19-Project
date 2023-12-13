import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the API endpoint URL
const API_URL = 'https://disease.sh/v3/covid-19/all'; // You can change this URL as needed

const useTracker = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const responseData = response.data;
        setData(responseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useTracker;
