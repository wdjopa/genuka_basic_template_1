/* eslint-disable react/no-unescaped-entities */
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState } from "react";
import {
  loadOrder,
  useGenukaDispatch,
  useGenukaState,
  cancelMyOrder,
} from "../utils/genuka.store";
import Error from "./Error";
import PaymentModal from "./PaymentModal";
import PaymentProcessMobileMoney from "./PaymentProcessMobileMoney";

function OrderStatusPage() {
  const {
    current_order: order,
    order_loaded,
    orders,
    company,
    error,
  } = useGenukaState();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const [openConfirm, setOpenConfirm] = useState(false);
  const onOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const [openArchiveConfirm, setOpenArchiveConfirm] = useState(false);
  const onOpenArchiveConfirm = () => {
    setOpenArchiveConfirm(true);
  };
  const onCloseArchiveConfirm = () => {
    setOpenArchiveConfirm(false);
  };

  const btnRef = React.useRef();
  const dispatch = useGenukaDispatch();
  useEffect(() => {
    if (order) {
      if (!order_loaded) {
        loadOrder(dispatch, order);
      }
      onOpen();
    }
  }, [order]);

  const cancelOrder = (order) => {
    // Les clients peuvent annuler leur commande tant que le paiement n'est pas effectué
    cancelMyOrder(dispatch, order);
  };

  if (!order) {
    return <></>;
  }
  return (
    <>
      {orders.map((order) => (
        <button
          key={Math.random()}
          ref={btnRef}
          onClick={() => {
            onOpen();
            dispatch({ type: "current_order", payload: order });
          }}
          className="h-14 w-full bg-primary text-white"
        >
          SUIVRE LA COMMANDE {order.reference}
        </button>
      ))}
      {orders.length > 0 && <hr my="5" />}
      <div isOpen={isOpen} size="lg" placement="bottom" onClose={onClose}>
        <div className="overlay" />
        <div>
          <div className="container max-w-2xl max-h-screen overflow-auto">
            <div>&times;</div>
            <h3>Commande {order.reference}</h3>
            <div>
              <div>
                <span className={"font-lg"}>
                  ✅ Commande passée (
                  <span className="font-md inline font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: company.currency.code,
                      maximumFractionDigits: 0,
                    }).format(order.total)}
                  </span>
                  )
                </span>
                <span className="font-sm">
                  Vous avez commandé
                  {order.products &&
                    order.products.map((product) => {
                      return (
                        <span key={Math.random()}>
                          {product.quantity} {product.name}
                        </span>
                      );
                    })}
                  <br />
                  le {new Date(order.created_at).toLocaleString()}
                </span>
              </div>
              <hr my="3" />
              <div>
                {order.payment_state === 0 ? (
                  <>
                    <span className="text-lg">
                      ⌛ Paiement en attente par{" "}
                      <strong>
                        {company.payment_modes
                          ? company.payment_modes[order.payment_mode].full_name
                          : order.payment_mode}
                      </strong>
                    </span>
                    <Player
                      autoplay
                      loop
                      src="/assets/payment_process_animation.json"
                      style={{ height: "300px", width: "300px" }}
                    />
                    {/* {order &&
                      ["mobilemoney", "momo"].includes(order.payment_mode) && (
                        <PaymentProcessMobileMoney order={order} />
                      )} */}
                    {order &&
                      ["paypal", "card"].includes(order.payment_mode) && (
                        <PaymentModal order={order} company={company} />
                      )}
                  </>
                ) : (
                  <>
                    <span className="text-lg">
                      ✅ Paiement effectué par{" "}
                      <strong>
                        {company.payment_modes
                          ? company.payment_modes[order.payment_mode].full_name
                          : order.payment_mode}
                      </strong>
                    </span>
                    {/* <Player autoplay loop src="/assets/check.json" style={{ height: "300px", width: "300px" }} /> */}
                  </>
                )}
              </div>
              <hr my="3" />
              <div>
                {order.shipping_state === 0 ? (
                  <>
                    {order.payment_state === 0 && (
                      <span className="text-lg">
                        ❌ Le traitement de la commande aura lieu après le
                        paiement
                      </span>
                    )}
                    {order.payment_state === 1 && (
                      <span className="text-lg">
                        ⌛ Commande en cours de préparation
                      </span>
                    )}
                    {order.payment_state === 1 && (
                      <Player
                        autoplay
                        loop
                        src="/assets/loading.json"
                        style={{ height: "300px", width: "300px" }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-lg">✅ Commande terminée</span>
                  </>
                )}
              </div>
              {order.payment_state === 1 && order.shipping_state === 1 && (
                <Player
                  autoplay
                  loop
                  src="/assets/check.json"
                  style={{ height: "300px", width: "300px" }}
                />
              )}
            </div>
            <div className="">
              <div className="flex flex-col">
                {error && <Error error_text={error} />}
                {order.payment_state === 1 && order.shipping_state === 1 && (
                  <button
                    colorScheme="whatsapp"
                    width="full"
                    onClick={() => {
                      onOpenArchiveConfirm();
                    }}
                  >
                    Marquer la commande comme terminée 👍🏾
                  </button>
                )}

                <button colorScheme="yellow" width="full" mt="5">
                  <a
                    href={
                      company.phone
                        ? "tel:" + company.phone
                        : "email:" + company.email
                    }
                  >
                    📞 Contacter {company.name}
                  </a>
                </button>
                <hr m="2" />
                {order.payment_state === 0 ? (
                  <button
                    colorScheme="red"
                    width="full"
                    onClick={() => {
                      onOpenConfirm();
                    }}
                  >
                    Annuler la commande
                  </button>
                ) : (
                  <></>
                )}
                <button
                  width="full"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Retour
                </button>
                {/* <Modal
                  isCentered
                  isOpen={openArchiveConfirm}
                  onClose={onCloseArchiveConfirm}
                  size={"xs"}
                >
                  <ModalOverlay
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px) hue-rotate(90deg)"
                  />{" "}
                  <ModalContent>
                    <ModalHeader>Archivage de la commande</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Si vous êtes là, alors votre commande s'est bien
                        déroulée. Merci d'avoir fait confiance à {company.name}{" "}
                        😊.
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        size="lg"
                        colorScheme="whatsapp"
                        width="full"
                        onClick={() => {
                          dispatch({
                            type: "orders",
                            payload: orders.filter((o) => o.id !== order.id),
                          });
                          onClose();
                          onCloseArchiveConfirm();
                        }}
                      >
                        Marquer comme terminée
                      </button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  isCentered
                  isOpen={openConfirm}
                  onClose={onCloseConfirm}
                  size={"xs"}
                >
                  <ModalOverlay
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px) hue-rotate(90deg)"
                  />{" "}
                  <ModalContent>
                    <ModalHeader>Annulation de la commande</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Souhaitez vous vraiment annuler cette commande ? Cette
                        action est irrévocable !
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        size="lg"
                        colorScheme="red"
                        width="full"
                        onClick={() => {
                          cancelOrder(order);
                          onCloseConfirm();
                        }}
                      >
                        Oui, annuler
                      </button>
                    </ModalFooter>
                  </ModalContent>
                </Modal> */}
                <small>
                  Tant que le paiement n'est pas effectué, vous pouvez annuler
                  votre commande. Une fois le paiement effectué, veuillez vous
                  rapprocher des services de {order.entreprise?.nom}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderStatusPage;
