// import { Image, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GenukaBar from "../components/GenukaBar";
import SocialNetworks from "./SocialNetworks";
import Link from "next/link";
// import { version } from "../package.json";

const version = "1.0.0";

function LegalsModal({ legal, open, close }) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   useEffect(() => {
  //     if (open) {
  //       onOpen();
  //     }
  //   }, [open, onOpen]);

  //   const closeModal = () => {
  //     onClose();
  //     close();
  //   };
  if (!legal) return <></>;
  return (
    <></>
    // <Modal isOpen={isOpen} onClose={closeModal}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader>{legal.title}</ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       <div dangerouslySetInnerHTML={{ __html: legal.text }}></div>
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button colorScheme="blue" mr={3} onClick={closeModal}>
    //         Close
    //       </Button>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  );
}
function Footer({ company }) {
  const [isOpen, setIsOpen] = useState(false);
  const [legalPageToShow, setLegalPageToShow] = useState();
  if (!company) return <></>;
  return (
    <footer className="footer pb-0">
      <GenukaBar />
      <SocialNetworks company={company} />
      <h3 className="mt-20 text-center text-2xl text-primary">{company.name}</h3>
      <div className="text-center text-sm">{company.description}</div>
      {company.legals && company.legals.length > 0 ? (
        <>
          <hr className="my-5" />
          <div className="my-3">
            <div spacing={4} className="text-left">
              {company.legals.map((legal) => (
                <div
                  key={"legals-" + legal.id}
                  className="mb-1 text-xs"
                  onClick={() => {
                    setIsOpen(true);
                    setLegalPageToShow(legal);
                  }}
                >
                  {legal.title}
                </div>
              ))}
            </div>
          </div>
          <LegalsModal
            legal={legalPageToShow}
            open={isOpen}
            close={() => {
              setIsOpen(false);
              setLegalPageToShow(undefined);
            }}
          />
        </>
      ) : (
        <></>
      )}
      <div className="text-center font-normal mt-10">
        Copyright &#169;{" "}
        <Link href="/" className="text-primary">
          {company.name}
        </Link>{" "}
        {new Date().getFullYear()}.
      </div>
    </footer>
  );
}

export default Footer;
