import React from 'react'
import Layout from "components/Layout";
import Charts from '../components/Charts';
import '../assets/stylesheets/pages/_charts.scss'
export const charts = () => {
  return (
    <Layout>
      <div className='charts-container'></div>
        <div>charts</div>
        <Charts/>
    </Layout>
  )
}


export default charts