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
  console.log(company);
  if (!company) return <></>;
  return (
    <footer className="footer">
      <GenukaBar />
      {/* <div my="5">
        <div>
          Cette page a été générée avec{" "}
          <a
            href={"https://genuka.com/?from=" + company.name}
            color="#ffab01"
          >
            Genuka
          </a>{" "}
          V{version}
        </div>
      </div>
      <div>
        <div
          href={"https://genuka.com/?from=" + company.name}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <div
            color="white"
            bg="#ff8800"
            _hover={{ background: "#FFAB01CC" }}
            size="sm"
          >
            <Image
              src="https://dashboard.genuka.com/logo.png"
              boxSize="20px"
              alt="Boutton Genuka"
              width={100}
              height={100}
            />
            &nbsp;&nbsp;Créez votre page de vente sur Genuka
          </div>
        </div>
      </div> */}

      {company.legals && company.legals.length > 0 ? (
        <>
          <hr my="5" />
          <div my="3">
            <div spacing={4} align="center">
              {company.legals.map((legal) => (
                <div
                  key={"legals-" + legal.id}
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
