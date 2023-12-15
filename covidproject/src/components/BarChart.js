import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Paper, Typography } from '@mui/material';

const data = [
  {
    country: 'USA',
    cases: 1000000,
  },
  {
    country: 'China',
    cases: 900000,
  },
  {
    country: 'India',
    cases: 800000,
  },
];

const BarChart = () => {
  return (
    <Paper elevation={3} style={{ padding: '1em' }}>
      <Typography variant="h5">COVID-19 Cases by Country</Typography>
      <div style={{ height: '400px' }}>
        <ResponsiveBar
          data={data}
          keys={['cases']}
          indexBy="country"
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          enableLabel={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </Paper>
  );
};

export default BarChart;
