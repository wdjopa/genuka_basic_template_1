/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

function PaymentModal({ order, company }) {
  const [isOpen, setIsOpen] = useState(false);
  const link =
    order.payment_mode === "card"
      ? `https://dashboard.genuka.com/bill/${order.total}/${
          company.currency.code
        }/${
          order.customer.email
        }/0/Finalisation%20de%20votre%20commande%20${order.reference.replace(
          "#",
          ""
        )}%20chez%20${company.name}?name=${company.name}&image=${
          company.logo || ""
        }&command_id=${order.id}&success_url=${
          window.location.href
        }&cancel_url=${window.location.href}`
      : ``;
  useEffect(() => {
    if (
      order.payment_mode === "card" &&
      order.payment_state === 0 &&
      !window.hasBeenRedirected
    ) {
      window.hasBeenRedirected = true;
      window.open(link, "_blank");
    }
  }, []);

  return (
    <>
      <button
        className="w-full"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Réessayer le paiement
      </button>
      <Modal title={"Commande passée 🎉"} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <p>
            Votre commande a bien été enregistrée. Afin qu'elle soit traitée,
            vous devez finaliser le piement. Vous devez alors aller vers la page
            de paiement 😊.
          </p>
        </div>
        <div>
          <button className="w-full">
            <a className="text-lg " href={link}>
              Continuer vers la page de paiement
            </a>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default PaymentModal;
