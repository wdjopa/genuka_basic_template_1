import React, { useEffect, useState } from "react";
import {
  chargeMomoPayment,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import Error from "./Error";
import Modal from "./Modal";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <label>
      <input {...input} />
      <div
        {...checkbox}
        className="px-5 py-2 cursor-pointer border rounded-md shadow-sm focus:shadow checked:bg-primary checked:text-white checked:border-primary"
      >
        {props.children}
      </div>
    </label>
  );
}

function PaymentProcessMobileMoney({ order }) {
  const { company, loading, error } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const [isOpen, setIsOpen] = useState(false);
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
    let phone = paymentSettings.phone.trim() || "";
    if (phone.substr(0, 3) != "237" && phone.substr(0, 4) != "+237") {
      phone = "237" + phone;
    } else {
      phone = phone?.replaceAll("+", "");
    }
    chargeMomoPayment(dispatch, { ...paymentSettings, phone });
  };

  return (
    <div>
      <button width={"full"} onClick={() => setIsOpen(true)}>
        Effectuer le paiement
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={
          <>
            {" "}
            Paiement par{" "}
            {company.payment_modes
              ? company.payment_modes[order.payment_mode].full_name
              : order.payment_mode}
          </>
        }
      >
        <div>
          <div>
            <label>Votre numéro de téléphone</label>
            <input
              type="tel"
              onChange={(e) => {
                onChange(e.target.value, "phone");
                e.preventDefault();
              }}
              defaultValue={order.customer.phone}
              placeholder="Numéro de téléphone*"
            />
          </div>
          <div my="5">
            <label>Selectionnez un opérateur</label>
            <div className="flex ">
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </div>
          </div>
          {error && <Error error_text={error} />}
        </div>
        <div>
          <button
            className="w-full bg-primary"
            disabled={!canPay || (loading && loading.payment)}
            onClick={chargeMobileMoneyPayment}
          >
            Payer
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentProcessMobileMoney;
