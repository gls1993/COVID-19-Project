import React from 'react'
import Layout from "components/Layout";
import Charts from '../components/Charts';
import '../assets/stylesheets/pages/_charts.scss'
export const charts = () => {
  return (
    <Layout>
      <title>Charts</title>
      <div className='charts-container'></div>
        <div>
          <Charts/>
        </div>
    </Layout>
  )
}


export default charts