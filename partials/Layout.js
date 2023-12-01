import Head from "next/head";
import React, { useEffect } from "react";
import Loader from "../components/Loader.js";
import Notifications from "../components/Notification.js";
import { useGenukaState } from "../utils/genuka.store.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

function Layout({ company, children, head }) {
  
  const { loading, error } = useGenukaState();
  return (
    <div className="container md:px-6  px-4 mx-auto">
      {head && <Head>{head}</Head>}
      <Header company={company} />
      <main className="mt-4 mb-10 ">{children}</main>
      <Footer company={company} />
      <Notifications />

      {loading?.global && <Loader company={company} />}
    </div>
  );
}

export default Layout;
