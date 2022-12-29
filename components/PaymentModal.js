/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

function PaymentModal({ order, company }) {
  const {
    isOpen: isRedirectionModalOpen,
    onOpen: onOpenRedirectionModal,
    onClose: onCloseRedirectionModal,
  } = useDisclosure();
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
      <Button width={"full"} onClick={onOpenRedirectionModal}>
        Réessayer le paiement
      </Button>
      <Modal
        isCentered
        isOpen={isRedirectionModalOpen}
        onClose={onCloseRedirectionModal}
        size={"sm"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />{" "}
        <ModalContent>
          <ModalHeader>Commande passée 🎉</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Votre commande a bien été enregistrée. Afin qu'elle soit traitée,
              vous devez finaliser le piement. Vous devez alors aller vers la
              page de paiement 😊.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button width="full">
              <Link size="lg" colorScheme="whatsapp" href={link}>
                Continuer vers la page de paiement
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PaymentModal;
