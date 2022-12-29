import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  chargeMomoPayment,
  useGenukaDispatch,
  useGenukaState,
} from "../store/genukaStore";
import Error from "./common/Error";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="xs"
        _checked={{
          bg: "orange.600",
          color: "white",
          borderColor: "orange.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function PaymentProcessMobileMoney({ order }) {
  const { company, loading, error } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canPay, setCanPay] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    phone: order?.customer?.phone,
    phoneService: "ORANGE",
    fees: true,
    amount: order.total,
    command_id: order.id,
  });

  const onChange = (value, field) => {
    setPaymentSettings({ ...paymentSettings, [field]: value });
    if (paymentSettings.phone != "" && paymentSettings.phoneService != "") {
      setCanPay(true);
    } else {
      setCanPay(false);
    }
  };

  useEffect(() => {
    if (!window.alreadyAskedToPay) {
      window.alreadyAskedToPay = true;
      onOpen();
    }
    if (paymentSettings.phone != "" && paymentSettings.phoneService != "") {
      setCanPay(true);
    } else {
      setCanPay(false);
    }
  }, []);

  const options = ["ORANGE", "MTN"];

  const { getRadioProps } = useRadioGroup({
    name: "phoneService",
    defaultValue: paymentSettings.phoneService,
    onChange: (value) => {
      onChange(value, "phoneService");
    },
  });

  const chargeMobileMoneyPayment = () => {
    let phone = paymentSettings.phone.trim();
    if (phone.substr(0, 3) != "237" && phone.substr(0, 4) != "+237") {
      phone = "237" + phone;
    } else {
      phone = phone.replaceAll("+", "");
    }
    chargeMomoPayment(dispatch, { ...paymentSettings, phone });
  };

  return (
    <div>
      <Button width={"full"} onClick={onOpen}>
        Effectuer le paiement
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />{" "}
        <ModalContent>
          <ModalHeader>
            Paiement par{" "}
            {company.payment_modes
              ? company.payment_modes[order.payment_mode].full_name
              : order.payment_mode}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Votre numéro de téléphone</FormLabel>
              <Input
                type="tel"
                onChange={(e) => {
                  onChange(e.target.value, "phone");
                  e.preventDefault();
                }}
                defaultValue={order.customer.phone}
                placeholder="Numéro de téléphone*"
              />
            </FormControl>
            <FormControl my="5">
              <FormLabel>Selectionnez un opérateur</FormLabel>
              <HStack>
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack>
            </FormControl>
            {error && <Error error_text={error} />}
          </ModalBody>
          <ModalFooter>
            <Button
              width="full"
              colorScheme="whatsapp"
              disabled={!canPay || (loading && loading.payment)}
              isLoading={loading && loading.payment}
              onClick={chargeMobileMoneyPayment}
            >
              Payer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PaymentProcessMobileMoney;
