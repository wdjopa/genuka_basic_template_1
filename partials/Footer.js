// import { Image, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GenukaBar from "../components/GenukaBar";
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
    <footer className="footer pb-10">
      <GenukaBar />
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
    </footer>
  );
}

export default Footer;
