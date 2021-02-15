import React from "react";
import Layout from "../components/Layout";

const NotFoundPage = ({ location }) => (
  <Layout>
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      {location.pathname}
    </div>
  </Layout>
);

export default NotFoundPage;
