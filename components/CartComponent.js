import React, { useEffect, useState } from "react";
import {
  placeOrder,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import ProductImage from "./ProductImage";
import ToggleTitle from "./ToggleTitle";
import { validateEmail, validatePhoneNumber } from "../utils/helpers";

function CartComponent({ company }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { cart, loading } = useGenukaState();
  const dispatch = useGenukaDispatch();

  const [allowToBuy, setAllowToBuy] = useState(false);
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    payment_mode: "",
  });

  useEffect(() => {
    if (localStorage && localStorage.getItem("formState")) {
      setFormState({
        ...JSON.parse(localStorage.getItem("formState")),
        payment_mode: "",
      });
    }
    if (company && localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders")).filter((o) => {
        return o.company_id === company.id;
      });
      const current_order = orders.pop();
      dispatch({ type: "init_orders", payload: { orders, current_order } });
    }
  }, [company]);

  useEffect(() => {
    setAllowToBuy(
      formState.payment_mode != "" &&
        formState.last_name != "" &&
        ((formState.phone != "" && validatePhoneNumber(formState.phone)) ||
          (formState.email != "" && validateEmail(formState.email)))
    );
  }, [formState]);

  const makeOrder = () => {
    // save formState
    localStorage.setItem("formState", JSON.stringify(formState));

    // place the order
    const subtotal = total;
    const order = {
      client_email: formState.email,
      customer_details: formState,
      company_id: company.id,
      subtotal,
      shipping: company.shipping_fee || 0,
      total: subtotal + (company.shipping_fee || 0),
      note: formState.note,
      source: "Website",
      payment: {
        date: new Date(),
        mode: formState.payment_mode,
        state: 0,
      },
      shipping: undefined,
      produits: cart.items.map((item) => {
        return {
          ...item,
          id: item.product.id,
          quantity: item.product.id,
          price: item.product.id,
          properties: item.variants.map((v) => {
            return {
              [v.name]: v.options.map((o) => o.name),
            };
          }),
          complement: item.complement,
          note: item.note,
        };
      }),
    };
    placeOrder(dispatch, order);
  };
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (cart && cart.items.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [cart]);

  const total = cart.items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
  // const requiredVariantsSlug = cart.items.flat((item) =>
  //   item.product.variants.filter((v) => v.required).map((v) => v.slug)
  // );
  // console.log({ requiredVariantsSlug });
  // const canOrder =
  //   productInCart.variants.length >= requiredVariantsSlug.length &&
  //   productInCart.variants
  //     .filter((v) => v.required)
  //     .every(
  //       (v) => requiredVariantsSlug.includes(v.slug) && v.options.length > 0
  //     );
  return (
    <div>
      {isVisible && (
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer floating-btn rounded-full fixed right-4 z-20 top-1/2 w-14 h-14 shadow-lg flex justify-center items-center bg-primary"
        >
          <svg
            id="Layer_1"
            enableBackground="new 0 0 24 24"
            height="28"
            viewBox="0 0 24 24"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <path
                  d="m21.4 7c-.35-.61-1-.99-1.7-1h-12.8l-.58-2.26c-.12-.45-.54-.76-1-.74h-2c-.55 0-1 .45-1 1s.45 1 1 1h1.24l2.76 10.26c.12.45.54.76 1 .74h9c.38 0 .72-.21.89-.55l3.28-6.56c.29-.6.25-1.31-.09-1.89z"
                  fill="white"
                />
                <circle cx="7.82" cy="19.5" r="1.5" fill="white" />
                <circle cx="17.82" cy="19.5" r="1.5" fill="white" />
              </g>
            </g>
          </svg>
        </div>
      )}
      {isVisible && isOpen && (
        <div className="fixed z-50 bottom-0 inset-x-0 px-0 pb-0 sm:inset-0 sm:flex sm:items-center sm:justify-end ">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
          <div
            className="bg-white  overflow-auto relative shadow-xl sm:h-screen h-3/5  sm:w-1/3 py-4 "
            // style={{ maxHeight: "80vh" }}
          >
            <div className="flex items-center justify-between mb-2 px-4 pb-4">
              <h2 className="text-xl sm:text-2xl leading-6 font-sm text-gray-900">
                Panier
              </h2>
              <button
                onClick={closeModal}
                className="text-xl sm:text-3xl leading-none font-semibold text-black hover:text-black focus:outline-none focus:text-black"
              >
                ×
              </button>
            </div>
            <div className="mt-2  px-4">
              <ToggleTitle title={"Récapitulatif"} isOpenByDefault={true}>
                <div className="recap">
                  {cart.items.map((item, i) => {
                    return (
                      <div
                        key={"item_" + i}
                        className="flex justify-between items-center min-h-16 mb-2 border-b-slate-200 border-0 border-b"
                      >
                        <div className="w-14 relative peh-14">
                          <ProductImage
                            product={item.product}
                            width={56}
                            height={56}
                          />
                        </div>
                        <div className="w-full h-full ml-2 flex-col flex">
                          <div className="flex justify-between">
                            <span className="truncate mr-4">
                              {item.quantity} &times; {item.product.name}
                            </span>
                            <span className="font-semibold">
                              {item.price} {company.currency.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <div className="variants">
                              <span className="">
                                {item.complement.length > 0 ? (
                                  item.complement.map((_item) => {
                                    const [key, value] =
                                      Object.entries(_item)[0];
                                    return (
                                      <small className="block" key={key}>
                                        {key}: {value?.join(", ")}
                                      </small>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </span>
                            </div>
                            <div className=" flex justify-between w-16  bg-white rounded-md overflow-hidden">
                              <span
                                onClick={() => {
                                  dispatch({
                                    type: "add_product",
                                    payload: {
                                      ...item,
                                      quantity: -1,
                                    },
                                  });
                                }}
                                className="w-6 h-6 flex justify-center items-center cursor-pointer hover:bg-slate-100"
                              >
                                -
                              </span>
                              <span className="w-6 h-6 flex justify-center items-center">
                                {item.quantity}
                              </span>
                              <span
                                onClick={() => {
                                  dispatch({
                                    type: "add_product",
                                    payload: {
                                      ...item,
                                      quantity: 1,
                                    },
                                  });
                                }}
                                className="w-6 h-6 flex justify-center items-center cursor-pointer hover:bg-slate-100"
                              >
                                +
                              </span>
                            </div>
                          </div>
                          <div className="note">
                            <span className="italic">{item.note}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ToggleTitle>
              <ToggleTitle title={"Informations"} isOpenByDefault={true}>
                <div className="shippingInfos">
                  <form>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="md:w-1/2 md:mr-2 mt-4 sm:mt-0">
                        <label
                          className="block  text-gray-700 text-sm mb-1"
                          htmlFor="first_name"
                        >
                          Prénom
                        </label>
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formState.first_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="md:w-1/2 mt-4 sm:mt-0">
                        <label
                          className="block  text-gray-700 text-sm mb-1"
                          htmlFor="last_name"
                        >
                          Nom*
                        </label>
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                          type="text"
                          id="last_name"
                          required
                          name="last_name"
                          value={formState.last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className=" mt-4">
                      <label
                        className="block  text-gray-700 text-sm mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" mt-4">
                      <label
                        className="block  text-gray-700 text-sm mb-1"
                        htmlFor="phone"
                      >
                        N° de Téléphone*
                      </label>
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        type="tel"
                        id="phone"
                        required
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>{" "}
                    <div className=" mt-4">
                      <label
                        className="block  text-gray-700 text-sm mb-1"
                        htmlFor="address"
                      >
                        Adresse pour la livraison
                      </label>
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Nom du quartier ou n° de rue"
                        value={formState.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" mt-4">
                      <label
                        className="block  text-gray-700 text-sm mb-1"
                        htmlFor="address"
                      >
                        Notes pour la commande
                      </label>
                      <textarea
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        id="note"
                        name="note"
                        placeholder="À l'attention du marchand"
                        value={formState.note}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </ToggleTitle>
              <ToggleTitle title={"Modes de paiement*"} isOpenByDefault={true}>
                {company.payment_modes ? (
                  Object.keys(company.payment_modes)
                    .filter((key) => company.payment_modes[key].accept)
                    .filter((key) => key !== "paypal")
                    .map((key, id) => {
                      return (
                        <div key={id}>
                          <input
                            type="radio"
                            id={key}
                            key={key}
                            value={key}
                            name={"payment_mode"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label htmlFor={key}>
                            {company.payment_modes[key].full_name}{" "}
                            {key === "cash"
                              ? "(à la livraison)"
                              : key === "mobilemoney"
                              ? "(Orange/MTN)"
                              : ""}
                          </label>
                        </div>
                      );
                    })
                ) : (
                  <div>
                    <input
                      type="radio"
                      value="cash"
                      id="cash"
                      className="mr-2"
                      name={"payment_mode"}
                      onChange={handleChange}
                    />
                    <label htmlFor={"cash"}>Espèces à la livraison</label>
                  </div>
                )}
              </ToggleTitle>
            </div>
            <div className=" absolute l-0 b-0 mt-2 px-2 py-2 w-full">
              <div className=" px-2">
                <button
                  className={
                    "btn border-primary border-2 my-2 rounded-md w-full px-4 py-2"
                  }
                  width="full"
                  onClick={() => {
                    if (
                      confirm("Vous êtes sûre de vouloir vider votre panier")
                    ) {
                      dispatch({ type: "clear_cart" });
                    }
                  }}
                >
                  Vider mon panier
                </button>
                <button
                  className={
                    (!allowToBuy || (loading && loading.order)
                      ? "disabled bg-gray-200 text-gray-400 "
                      : "bg-primary border-primary text-white ") +
                    "btn  border-2 my-2 rounded-md w-full px-4 py-2"
                  }
                  disabled={!allowToBuy || (loading && loading.order)}
                  isLoading={loading && loading.order}
                  width="full"
                  onClick={makeOrder}
                >
                  Finaliser la commande (
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: company.currency.code,
                    maximumFractionDigits: 0,
                  }).format(total + company.shipping_fee)}
                  )
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
