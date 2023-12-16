import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { Paper, Typography } from '@mui/material';
import { format } from 'date-fns';


// yarn add @nivo/pie @nivo/axes @nivo/line
// sample data
const worldwideData = {
  id: 'Worldwide',
  label: 'Worldwide',
  deaths: 5000000,
  recovered: 75000000,
  active: 25000000,
};

const pieData = [
  {
    id: 'Deaths',
    label: 'Deaths',
    value: worldwideData.deaths,
  },
  {
    id: 'Recovered',
    label: 'Recovered',
    value: worldwideData.recovered,
  },
  {
    id: 'Active',
    label: 'Active',
    value: worldwideData.active,
  },
];



const Charts = () => {

  const [chartData, setChartData] = useState([]);
  const [deathLineData, setDeathLineData] = useState([]);
  const [recoveredLineData, setRecoveredLineData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const casesData = data.cases || {};
        const deathData = data.deaths || {};
        const recoveredData = data.recovered || {};

        const transformedData = Object.entries(casesData).map(([date, cases]) => ({
          x: new Date(date), 
          y: cases,
        }));

        const transformedDeathData = Object.entries(deathData).map(([date, deaths]) => ({
          x: new Date(date), 
          y: deaths,
        }));

        const transformedRecoveredData = Object.entries(recoveredData).map(([date, recovered]) => ({
          x: new Date(date), 
          y: recovered,
        }));

        setChartData([
          {
            id: 'COVID-19 Cases',
            data: transformedData,
          },
        ]);
        setDeathLineData([
          {
            id: 'COVID-19 Deaths',
            data: transformedDeathData,
          },
        ]);
        setRecoveredLineData([
          {
            id: 'COVID-19 Recovers',
            data: transformedRecoveredData,
          },
        ]);
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '1em' }}>


        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* First graph in the first row */}
          <div style={{ height: '250px', width: '48%' }}>
            <Typography variant="h5">Total Deaths Over Time</Typography>
            <ResponsiveLine
              data={deathLineData}
              margin={{ top: 50, right: 80, bottom: 50, left: 100 }}
              xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
              curve="monotoneX"
              axisBottom={{
                format: date => new Date(date).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                legendOffset: -40,
                legendPosition: 'middle',
                tickValues: [0, 1000000, 3000000, 5000000, 7000000, ], // Adjust tick values as needed
                // tickFormat: value => `${value / 1000000}M`
              }}
              tooltip={({ point }) => (
                <div style={{ background: 'white', padding: '5px' }}>
                  <p>{`Deaths: ${point.data.yFormatted}`}</p>
                </div>
              )}
              layers={[
                'grid',
                'markers',
                'axes',
                {
                  type: 'rule',
                  y: 0,
                  borderColor: 'red', // Customize line color if needed
                  label: 'Baseline', // Optional label for the line
                },
                'crosshair',
                'lines',
                'slices',
                'mesh',
                'legends',
              ]}
              enablePoints={true}
              lineWidth={3}
              colors={{ scheme: 'category10' }}
              enableGridX={false}
              enableGridY={true}
              useMesh={true}
              
            />
            
          </div>

          {/* Second graph in the first row */}
          <div style={{ height: '250px', width: '48%' }}>
            <Typography variant="h5">Current Cases Over Time</Typography>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 80, bottom: 50, left: 100 }}
              xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
              curve="monotoneX"
              axisBottom={{
                format: date => new Date(date).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                legendOffset: -40,
                legendPosition: 'middle',
                tickValues: [0, 100000000, 200000000, 300000000, 400000000, 500000000, 600000000, 700000000], // Adjust tick values as needed
                // tickFormat: value => `${value / 1000000}M`
              }}
              tooltip={({ point }) => (
                <div style={{ background: 'white', padding: '5px' }}>
                  <p>{`Cases: ${point.data.yFormatted}`}</p>
                </div>
              )}
              layers={[
                'grid',
                'markers',
                'axes',
                {
                  type: 'rule',
                  y: 0,
                  borderColor: 'red', // Customize line color if needed
                  label: 'Baseline', // Optional label for the line
                },
                'crosshair',
                'lines',
                'slices',
                'mesh',
                'legends',
              ]}
              enablePoints={true}
              lineWidth={3}
              colors={{ scheme: 'category10' }}
              enableGridX={false}
              enableGridY={true}
              useMesh={true}
              
            />
          </div>
        </div>

        <br></br><br></br>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* First graph in the second row */}
          <div style={{ height: '250px', width: '48%' }}>
            <Typography variant="h5">Recovered Cases Over Time</Typography>
            <ResponsiveLine
              data={recoveredLineData}
              margin={{ top: 50, right: 80, bottom: 50, left: 100 }}
              xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
              curve="monotoneX"
              axisBottom={{
                format: date => new Date(date).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                legendOffset: -40,
                legendPosition: 'middle',
                tickValues: [0, 10000000, 50000000, 90000000, 130000000, ], // Adjust tick values as needed
                // tickFormat: value => `${value / 1000000}M`
              }}
              tooltip={({ point }) => (
                <div style={{ background: 'white', padding: '5px' }}>
                  <p>{`Deaths: ${point.data.yFormatted}`}</p>
                </div>
              )}
              layers={[
                'grid',
                'markers',
                'axes',
                {
                  type: 'rule',
                  y: 0,
                  borderColor: 'red', // Customize line color if needed
                  label: 'Baseline', // Optional label for the line
                },
                'crosshair',
                'lines',
                'slices',
                'mesh',
                'legends',
              ]}
              enablePoints={true}
              lineWidth={3}
              colors={{ scheme: 'category10' }}
              enableGridX={false}
              enableGridY={true}
              useMesh={true}
              
            />
            
          </div>

          
          {/* Second graph in the second row */}
          <div style={{ height: '250px', width: '48%' }}>
            <Typography variant="h5">Comparing Current Cases, Deaths, And Recovered Over Time</Typography>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 80, bottom: 50, left: 60 }}
              xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
              curve="monotoneX"
              axisBottom={{
                format: '%b %d', // Format for displaying dates on X-axis
                tickValues: 'every 3 days', // Show ticks every 3 days
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                legend: 'Cases',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              enablePoints={true}
              lineWidth={3}
              colors={{ scheme: 'category10' }}
              enableGridX={false}
              enableGridY={true}
              useMesh={true}
            />
          </div>
        </div>

      
      <br></br><br></br>
    
      {/* pie charts */}
    
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* First pie chart */}
        <div style={{ height: '300px', width: '30%', textAlign:'center' }}>
        <Typography variant="h5">Total Worldwide Cases</Typography>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          colors={{ scheme: 'category10' }}
        />
        </div>
        
        {/* Second pie chart */}
        <div style={{ height: '300px', width: '30%', textAlign:'center' }}>
        <Typography variant="h5">Daily Worldwide Cases</Typography>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          colors={{ scheme: 'category10' }}
          legends={[
            {
              anchor: 'left',
              direction: 'column',
              translateY: 56,
              translateX: 10,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#333',
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
        </div>

        {/* Third pie chart */}
        <div style={{ height: '300px', width: '30%', textAlign:'center' }}>
         {/* selected country or USA */}
        <Typography variant="h5">(selectedCountry's or USA)'s Current Cases</Typography>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          colors={{ scheme: 'category10' }}
        />
        </div>
      </div>

    </Paper>
  );
};

export default Charts;
