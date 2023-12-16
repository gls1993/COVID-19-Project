import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "hooks";
import Layout from "components/Layout";
import Container from "components/Container";

const AboutPage = () => {
  const { companyName, authorName, authorUrl, siteDescription } = useSiteMetadata();
  const gitUrl = "https://github.com/gls1993/COVID-19-Project/";

  return (
    <Layout pageName="about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container type="content">
        <h2>Project Description</h2>
        <p className="about-content">
          The <strong>COVID-19 Project</strong> is a web application designed to provide information and resources related to the COVID-19 pandemic.
        </p>
        <p className="about-content">
          Our platform offers real-time data, vaccination information, safety guidelines, and resources to help individuals stay informed and safe during these challenging times.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Real-time COVID-19 Data</li>
          <li>Vaccination Information</li>
          <li>Safety Guidelines</li>
          <li>Resources for Staying Safe</li>
        </ul>

        <h2>Technologies Used</h2>
        <p className="about-content">
          The COVID-19 Project is built using modern web technologies, including React for the frontend, Node.js for the backend, and various data sources for up-to-date information.
        </p>

        <h2>Project Team</h2>
        <ul>
          <li>Jonathan Luu - Team Lead</li>
          <li>Christian Lara - Team Member</li>
          <li>Gregory Sanchez - Team Member</li>
          <li>Andrew Higa - Team Member</li>
        </ul>

        <h2>Feedback and Contributions</h2>
        <p className="about-content">
          For feedback and contributions, please visit our{" "}
          <a href={gitUrl} className="about-link">
            GitHub repository
          </a>.
        </p>
      </Container>
    </Layout>
  );
};

export default AboutPage;
