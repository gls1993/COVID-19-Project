import React from "react";
import Layout from "components/Layout";
import Container from "components/Container";
import "../assets/stylesheets/pages/_info.scss";

const InfoPage = () => {
  return (
    <Layout pageName="info">
      <Container type="content">
        <title>Information</title>
            <h1>COVID-19 Information</h1>

            <h2>COVID-19</h2>
            <p className="info-content">
            COVID-19, also known as Coronavirus Disease 2019, is a highly contagious respiratory illness caused by the SARS-CoV-2 virus. It was first identified in Wuhan, China, in late 2019 and has since spread globally, leading to a pandemic.
            </p>
            <p className="info-content">
            The symptoms of COVID-19 can range from mild to severe and may include fever, cough, shortness of breath, and loss of taste or smell. It is important to stay informed about the latest developments and safety guidelines.
            </p>

            <h2>COVID-19 Vaccination</h2>
            <p className="info-content">
            Vaccination is a critical tool in controlling the spread of COVID-19 and reducing the severity of the disease. Several vaccines have been developed and authorized for emergency use to protect individuals from COVID-19.
            </p>
            <p className="info-content">
            It is essential to follow the guidance of local health authorities regarding vaccine eligibility, scheduling, and safety precautions. Vaccination is a key step towards ending the pandemic and protecting public health.
            </p>

            <h2>Resources</h2>
            <p className="info-content">
            Stay informed about COVID-19 and vaccination by referring to reputable sources such as:
            </p>
            <ul className="info-content">
            <li>
                <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">
                World Health Organization (WHO)
                </a>
            </li>
            <li>
                <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer">
                Centers for Disease Control and Prevention (CDC)
                </a>
            </li>
            <li>
                <a href="https://www.cdph.ca.gov/" target="_blank" rel="noopener noreferrer">
                    California Department of Public Health
                </a>
            </li>
            </ul>

            <h2>Get Vaccinated!</h2>
            <p className="info-content">
            Getting vaccinated is one of the most effective ways to protect yourself and others from COVID-19. Check with your healthcare provider or local vaccination centers to schedule your vaccination appointment today.
            </p>

            <h2>Stay Safe</h2>
            <p className="info-content">
            Follow recommended safety measures, including wearing masks, practicing social distancing, and frequent handwashing, even after vaccination, to prevent the spread of COVID-19.
            </p>
        </Container>
        </Layout>
  );
};

export default InfoPage;
