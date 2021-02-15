// import HeroImage from "../../components/HeroImage";
import { styled } from "linaria/react";
import React from "react";
// import { getCurrentDate } from "../../utils/helpers";
// import FeaturedProjectsTiles from "../../components/FeaturedProjectsTiles";
import Donate from "../../components/Donate";
import EventsRoll from "../../components/EventsRoll";
import Layout from "../../components/Layout";
import Seo from "../../components/seo";
import useSiteMetadata from "../../hooks/use-site-metadata";

const Section = styled.section`
  background: #fff;
  margin: 0 auto;
  max-width: 1180px;
  position: relative;
  width: 100%;
`;

// var currentDate = getCurrentDate();

const EventsIndexPage = () => {
  // const heroImage = "/img/hero/retreat-yurt.jpg";
  // const heroMsg = "Forthcoming events";
  const { siteUrl } = useSiteMetadata();
  const title = "Latest events - African Vision Malawi";
  const description = "Latest events from African Vision Malawi.";
  const pathname = siteUrl + "/events/";

  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        pathname={pathname}
        article={false}
      />

      <div className="container">
        <article>
          {/* <section>
              <HeroImage heroImage={heroImage} heroMsg={heroMsg} />
            </section> */}
          <Section>
            <main>
              <EventsRoll />
            </main>
          </Section>
        </article>
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </div>
    </Layout>
  );
};

export default EventsIndexPage;
