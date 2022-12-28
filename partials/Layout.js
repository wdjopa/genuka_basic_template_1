import Head from "next/head";
import React, { useEffect } from "react";
import Loader from "../components/Loader.js";
import { useGenukaState } from "../utils/genuka.store.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

function Layout({ company, children, head }) {
  useEffect(() => {
    if (!window.is_google_translated_added) {
      window.is_google_translated_added = true;

      let addScriptGA = document.createElement("script");
      addScriptGA.setAttribute("async", "true");
      addScriptGA.setAttribute(
        "src",
        "https://www.googletagmanager.com/gtag/js?id=G-Q83E2K8TPB"
      );
      document.body.appendChild(addScriptGA);

      let addScriptGA2 = document.createElement("script");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push("js", new Date());
      window.dataLayer.push("config", "G-Q83E2K8TPB");
      document.body.appendChild(addScriptGA2);

      // let addScript = document.createElement("script");
      // addScript.setAttribute(
      //   "src",
      //   "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      // );
      // document.body.appendChild(addScript);
      // window.googleTranslateElementInit = googleTranslateElementInit;
      // window.selectLanguage = setInterval(() => {
      //   if (window.languageSelected) {
      //     clearInterval(window.selectLanguage);
      //     return;
      //   }
      //   if (!window.navigator?.language?.includes("fr")) {
      //     let select = document.getElementsByClassName("goog-te-combo")[0];
      //     if (select) {
      //       select.selectedIndex = 1;
      //       select.addEventListener("click", function () {
      //         select.dispatchEvent(new Event("change"));
      //       });
      //       select.click();
      //       window.languageSelected = true;
      //     }
      //   } else {
      //     window.languageSelected = true;
      //   }
      // }, 1000);
    }
  }, []);

  const googleTranslateElementInit = () => {
    return new window.google.translate.TranslateElement(
      {
        pageLanguage: "fr",
        // layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        includedLanguages: "fr,en",
      },
      "google_translate_element"
    );
  };

  const { loading, error } = useGenukaState();
  return (
    <div className="container md:px-10 max-w-4xl px-4 mx-auto">
      <Head>{head}</Head>
      <Header company={company} />
      <main className="my-10 ">{children}</main>
      <Footer company={company} />
      {loading?.global && <Loader company={company} />}
    </div>
  );
}

export default Layout;
