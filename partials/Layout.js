import Head from "next/head";
import React, { useEffect } from "react";
import Loader from "../components/Loader.js";
import Notifications from "../components/Notification.js";
import { useGenukaState } from "../utils/genuka.store.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

function Layout({ company, children, head }) {
  // useEffect(() => {
  //   let addScriptGA = document.createElement("script");
  //   addScriptGA.setAttribute("async", "true");
  //   addScriptGA.setAttribute(
  //     "src",
  //     "https://www.googletagmanager.com/gtag/js?id=G-MRPCJW45BE"
  //   );
  //   document.body.appendChild(addScriptGA);
  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push("js", new Date());
  //   window.dataLayer.push("config", "G-MRPCJW45BE");
  // }, []);
  // useEffect(() => {
  //   if (!window.is_google_translated_added) {
  //     window.is_google_translated_added = true;

  //     let addScriptGA = document.createElement("script");
  //     addScriptGA.setAttribute("async", "true");
  //     addScriptGA.setAttribute(
  //       "src",
  //       "https://www.googletagmanager.com/gtag/js?id=G-Q83E2K8TPB"
  //     );
  //     document.body.appendChild(addScriptGA);

  //     let addScriptGA2 = document.createElement("script");
  //     window.dataLayer = window.dataLayer || [];
  //     window.dataLayer.push("js", new Date());
  //     window.dataLayer.push("config", "G-Q83E2K8TPB");
  //     document.body.appendChild(addScriptGA2);

  //     // let addScript = document.createElement("script");
  //     // addScript.setAttribute(
  //     //   "src",
  //     //   "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     // );
  //     // document.body.appendChild(addScript);
  //     // window.googleTranslateElementInit = googleTranslateElementInit;
  //     // window.selectLanguage = setInterval(() => {
  //     //   if (window.languageSelected) {
  //     //     clearInterval(window.selectLanguage);
  //     //     return;
  //     //   }
  //     //   if (!window.navigator?.language?.includes("fr")) {
  //     //     let select = document.getElementsByClassName("goog-te-combo")[0];
  //     //     if (select) {
  //     //       select.selectedIndex = 1;
  //     //       select.addEventListener("click", function () {
  //     //         select.dispatchEvent(new Event("change"));
  //     //       });
  //     //       select.click();
  //     //       window.languageSelected = true;
  //     //     }
  //     //   } else {
  //     //     window.languageSelected = true;
  //     //   }
  //     // }, 1000);
  //   }
  // }, []);

  // const googleTranslateElementInit = () => {
  //   return new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "fr",
  //       // layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
  //       layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
  //       autoDisplay: false,
  //       includedLanguages: "fr,en",
  //     },
  //     "google_translate_element"
  //   );
  // };

  const { loading, error } = useGenukaState();
  return (
    <div className="container md:px-6 max-w-4xl px-4 mx-auto">
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
