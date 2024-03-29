import Image from "next/image";
import React from "react";

function SocialNetworks({ company }) {
  const social_networks = company.settings.default_template?.social_networks;
  if (!social_networks || (social_networks && !Object.keys(social_networks).length)) return <></>;
  return (
    <>
      <h4 className="block text-base text-center">Suivez-nous sur les réseaux</h4>
      <div className="flex my-3 justify-center ">
        {social_networks &&
          Object.keys(social_networks)
            .filter((s) => social_networks[s] !== "")
            .filter((s) => social_networks[s])
            .map((social_n) => (
              <a
                key={social_n}
                target={"_blank"}
                rel="noreferrer"
                href={social_networks[social_n]}
                className="inline-block mr-3"
              >
                <Image
                  src={"/assets/" + social_n + ".svg"}
                  alt={social_n + " icon"}
                  height={40}
                  width={40}
                  style={{ fill: "red" }}
                  className="fill-primary"
                />
              </a>
            ))}
      </div>
    </>
  );
}

export default SocialNetworks;
