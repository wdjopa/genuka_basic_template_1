import React from "react";

function Admin() {
  return <></>;
}

export default Admin;

export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "https://dashboard.genuka.com",
    },
  };
}
