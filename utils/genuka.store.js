import axios from "axios";
import React from "react";
import { genuka_api_2021_10 } from "./configs";
import { deleteCookie, setCookie } from "./cookies";
import { addAVariantOption } from "./helpers";

const GenukaStateContext = React.createContext();
const GenukaDispatchContext = React.createContext();
const DEFAULT_ITEMS_PER_PAGE = 18;

async function getCompanyById(dispatch, company_id) {
  dispatch({ type: "loading", payload: { global: true } });
  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/details/${company_id}`
    );
    if (response.data) {
      dispatch({ type: "company_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting company",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting company",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getCompany(dispatch, domain_url) {
  dispatch({ type: "loading", payload: { global: true } });
  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/byurl?url=${domain_url}`
    );
    if (response.data) {
      dispatch({ type: "company_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting company",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting company",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getPaginatedCollections(
  dispatch,
  company_id,
  collection_list_pagination
) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/${company_id}/collections?per_page=${collection_list_pagination.per_page}&page=${collection_list_pagination.page}&sort_by=${collection_list_pagination.sort_by}&sort_dir=${collection_list_pagination.sort_dir}`
    );
    if (response.data) {
      dispatch({ type: "collections_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getCollection(dispatch, company_id, collection_id) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/${company_id}/collections/${collection_id}?per_page=1000`
    );
    if (response.data) {
      dispatch({ type: "collection_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getCollectionProducts(
  dispatch,
  company_id,
  collection_id,
  collection_product_list_pagination
) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/${company_id}/collections/${collection_id}?per_page=${collection_product_list_pagination.per_page}&page=${collection_product_list_pagination.page}&sort_by=${collection_product_list_pagination.sort_by}&sort_dir=${collection_product_list_pagination.sort_dir}`
    );
    console.log(response);
    if (response.data) {
      dispatch({ type: "collection_products_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getProducts(
  dispatch,
  company_id,
  collection_product_list_pagination
) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/${company_id}/products?per_page=${collection_product_list_pagination.per_page}&page=${collection_product_list_pagination.page}&sort_by=${collection_product_list_pagination.sort_by}&sort_dir=${collection_product_list_pagination.sort_dir}`
    );
    if (response.data) {
      dispatch({ type: "products_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting products",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting products",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function searchProducts(dispatch, company_id, searchTerm) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.post(
      `${genuka_api_2021_10}/companies/${company_id}/products/search?q=${searchTerm}&per_page=${DEFAULT_ITEMS_PER_PAGE}&page=1`
    );
    if (response.data) {
      dispatch({ type: "products_success_search", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting products",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting products",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getProduct(dispatch, product_slug) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/products/slug/${product_slug}`
    );
    if (response.data) {
      dispatch({ type: "product_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting product",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting product",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function getProductById(dispatch, company_id, product_slug) {
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/companies/${company_id}/products/${product_slug}`
    );
    if (response.data) {
      dispatch({ type: "featured_product_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting product",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting product",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function registerUser(dispatch, company_id, user) {
  try {
    let data = {
      ...user,
      fromApi: true,
      company_id: company_id,
    };

    const response = await axios.post(
      `${genuka_api_2021_10}/clients/register`,
      data
    );
    if (response.data) {
      dispatch({
        type: "user_register",
        payload: {
          ...response.data.user,
          access_token: response.data.access_token,
        },
      });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when login user",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({
        type: "notification",
        payload: error.response.data.message,
        color: "red",
      });
    }
    dispatch({
      type: "error",
      payload: "An error occur when login user",
    });
  }
}

async function loginUser(dispatch, company_id, { email, password }) {
  try {
    let data = {
      password,
      fromApi: true,
      company_id: company_id,
    };
    if (email.includes("@")) {
      data.email = email;
    } else {
      data.tel = email;
    }
    const response = await axios.post(
      `${genuka_api_2021_10}/clients/login`,
      data
    );
    if (response.data) {
      dispatch({
        type: "user_login",
        payload: {
          ...response.data.user,
          access_token: response.data.access_token,
        },
      });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when login user",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({
        type: "notification",
        payload: "Email/Tel or password invalid",
        color: "red",
      });
    }
    dispatch({
      type: "error",
      payload: "An error occur when login user",
    });
  }
}

async function loadOrder(dispatch, order) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/customers/orders/${order.id}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data) {
      dispatch({ type: "current_order", payload: response.data.order });
    }
  } catch (e) {
    dispatch({ type: "order_canceled", payload: order });
  }
}
async function getAddresses(dispatch) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/customers/addresses`,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data) {
      dispatch({ type: "list_addresses", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting addresses",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting addresses",
    });
  }
}

async function getUser(dispatch) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { global: true } });

  try {
    const response = await axios.get(`${genuka_api_2021_10}/user`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (response.data) {
      dispatch({ type: "get_user", payload: response.data });
    } else {
      dispatch({
        type: "error",
        color: "red",
        payload: "An error occur when getting user",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      color: "red",
      payload: error.message,
    });
  }
  dispatch({ type: "loading", payload: { global: false } });

  return false;
}

async function updateUser(dispatch, user) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${genuka_api_2021_10}/customers/account/update`,
      { ...user, fromApi: true },
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data) {
      dispatch({
        type: "notification",
        payload: "Informations updated successfully",
      });
      dispatch({ type: "updated_user", payload: response.data });
      return true;
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when updating user",
      });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload: error.message,
    });
  }
  return false;
}

async function updatePassword(dispatch, user) {
  const token = localStorage.getItem("access_token");
  try {
    // TPDP : Update user
    const response = await axios.put(
      `${genuka_api_2021_10}/clients/password/update`,
      { ...user, fromApi: true },
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data) {
      if (response.data.success) {
        dispatch({ type: "notification", payload: response.data.message });
        return true;
      } else {
        dispatch({
          type: "notification",
          payload: response.data.message,
          color: "red",
        });
      }
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when updating password",
      });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload: error.message,
    });
  }
  return false;
}
async function updateAddress(dispatch, address) {
  dispatch({ type: "loading", payload: { global: true } });

  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${genuka_api_2021_10}/customers/addresses`,
      { ...address },
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data) {
      dispatch({ type: "updated_address", payload: response.data });
      return true;
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when getting addresses",
      });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload: "An error occur when getting addresses",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function loginWithToken(dispatch) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { global: true } });
  try {
    if (token) {
      const response = await axios.get(`${genuka_api_2021_10}/user`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (response.data) {
        dispatch({ type: "user_login", payload: response.data });
      }
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting addresses",
    });
  }
  dispatch({ type: "loading", payload: { global: false } });
}

async function cancelMyOrder(dispatch, order) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { order: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axios.post(
      `${genuka_api_2021_10}/orders/${order.id}/cancel`,
      {},
      { headers }
    );
    if (response.data.success) {
      dispatch({ type: "order_canceled", payload: order });
    } else {
      dispatch({
        type: "error",
        payload: response.data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload:
        "An error occured when placing your order. Error : " + error.message,
    });
  }
  dispatch({ type: "loading", payload: { order: false } });
}

async function placeOrder(dispatch, order) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { order: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axios.post(
      `${genuka_api_2021_10}/commands`, // TO REPLACE WITH THE UPDATE
      order,
      { headers }
    );
    if (response.data) {
      dispatch({ type: "order_placed", payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload:
        "An error occured when placing your order. Error : " + error.message,
    });
    dispatch({
      type: "error",
      payload:
        "An error occured when placing your order. Error : " + error.message,
    });
  }
  dispatch({ type: "loading", payload: { order: false } });
}

async function chargeMomoPayment(dispatch, paymentSettings) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { payment: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    let phone = paymentSettings.phone.replace("+", "");
    if (phone.substr(0, 3) !== "237") {
      phone = "237" + phone;
    }
    const response = await axios.post(
      `${genuka_api_2021_10}/payments/mobilemoney/charge`, // TO REPLACE WITH THE UPDATE
      { ...paymentSettings, phone: phone },
      { headers }
    );
    if (response.data && windows) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "Veuillez vérifier votre solde ou réessayez plus tard",
    });
  }
  dispatch({ type: "loading", payload: { payment: false } });
}

async function getReviews(dispatch, product) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { review: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axios.get(
      `${genuka_api_2021_10}/reviews/products/${product.id}?sort_by=created_at&sort_dir=desc`,
      { headers }
    );
    const new_product = await axios.get(
      `${genuka_api_2021_10}/products/${product.id}`,
      { headers }
    );
    dispatch({
      type: "reviews",
      payload: {
        avg_reviews: new_product.data.avg_reviews,
        total_reviews: new_product.data.total_reviews,
        list: response.data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: "error",
      payload: "Veuillez vérifier votre solde ou réessayez plus tard",
    });
  }
  dispatch({ type: "loading", payload: { review: false } });
}

async function sendAReview(dispatch, product, { note, message }) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { review: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    await axios.post(
      `${genuka_api_2021_10}/reviews/add`,
      { message, note, model_type: "product", model_id: product.id },
      { headers }
    );
    getReviews(dispatch, product);
  } catch (error) {
    dispatch({
      type: "error",
      payload: "Une erreur est survenue lors de l'enregistrement de l'avis",
    });
  }
  dispatch({ type: "loading", payload: { review: false } });
}

async function updateAReview(dispatch, product, { id, note, message }) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { review: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    await axios.put(
      `${genuka_api_2021_10}/reviews/${id}/edit`,
      { message, note, model_type: "product", model_id: product.id },
      { headers }
    );
    getReviews(dispatch, product);
  } catch (error) {
    dispatch({
      type: "error",
      payload: "Une erreur est survenue lors de la modification de l'avis",
    });
  }
  dispatch({ type: "loading", payload: { review: false } });
}

async function deleteAReview(dispatch, product, review) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { review: true } });
  let headers = {};
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  try {
    await axios.delete(`${genuka_api_2021_10}/reviews/${review.id}/delete`, {
      headers,
    });
    getReviews(dispatch, product);
  } catch (error) {
    dispatch({
      type: "error",
      payload: "Une erreur est survenue lors de la suppression de l'avis",
    });
  }
  dispatch({ type: "loading", payload: { review: false } });
}

function evaluateNewPrice(pC) {
  console.log({ pC });
  if (!pC.product) return 0;
  // evaluate new price
  let price = pC.product.discounted_price;
  // cherchons toutes les variants qui ont des variantes avec des prix (!= 0). On prendra le prix le plus élevé comme le prix de base
  const variantsToExclude = []; // les variantes dont les options fixent le prix, ne pourront plus être utilisées pour les prix additionnels
  pC.variants.forEach((variant) => {
    variant.options.forEach((option) => {
      if (option.price > price) {
        variantsToExclude.push(variant.id);
        price = option.price;
      }
    });
  });

  // Ensuite, on ajoute tous les prix additionnels des autres variantes
  pC.variants.forEach((variant) => {
    if (!variantsToExclude.includes(variant.id)) {
      variant.options.forEach((option) => {
        price += option.additionnal_fee;
      });
    }
  });
  return price;
}

function commentReducer(state, action) {
  console.log("Entrée 1, ProductInCart");
  switch (action.type) {
    case "hydrate_product": {
      let pC = { ...state.productInCart, product: action.payload.product };
      let variants = [];
      for (let variant of pC.product.variants) {
        variants = addAVariantOption(variants, {
          variant: variant,
          option: variant.options[0],
        });
      }
      pC.variants = variants;
      pC.price = evaluateNewPrice(pC);
      return { ...state, company: action.payload.company, productInCart: pC };
    }
    case "clear_variant": {
      let pC = { ...state.productInCart };
      const variants = state.productInCart.variants.map((v) => {
        if (v.slug === action.payload.slug) {
          return { ...v, options: [] };
        }
        return v;
      });
      pC.variants = variants;
      pC.price = evaluateNewPrice(pC);
      return { ...state, productInCart: pC };
    }
    case "add_variant_option": {
      let pC = JSON.parse(
        JSON.stringify({
          ...state.productInCart,
          variants: addAVariantOption(
            state.productInCart.variants,
            action.payload
          ),
        })
      );
      pC.complement = pC.variants.map((v) => {
        return {
          [v.name]: v.options.map((o) => o.name),
        };
      });
      pC.price = evaluateNewPrice(pC);
      return { ...state, productInCart: pC };
    }
    case "reviews": {
      return { ...state, reviews: action.payload };
    }
    case "update_product_qty": {
      return {
        ...state,
        productInCart: {
          ...state.productInCart,
          quantity: state.productInCart.quantity + action.payload,
        },
      };
    }
    case "token": {
      return { ...state, token: action.payload };
    }
    case "company": {
      return { ...state, company: action.payload };
    }
    case "product_success": {
      return { ...state, product: action.payload };
    }
    case "collection": {
      return { ...state, collection: action.payload };
    }
    case "collections_success": {
      return {
        ...state,
        collections_list: action.payload.data,
        collection_list_pagination: {
          ...action.payload.meta,
          ...action.payload.links,
          page: state.collection_list_pagination.page,
        },
      };
    }
    case "collection_success": {
      let collections = state.collections;
      collections[action.payload.collection.id] = action.payload;
      return { ...state, collections };
    }
    case "featured_product_success": {
      let products = state.products;
      products[action.payload.id] = action.payload;
      return { ...state, products };
    }
    case "products_success": {
      return {
        ...state,
        products: action.payload.data,
        collection_product_list_pagination: {
          ...action.payload.meta,
          ...action.payload.links,
          page: state.collection_product_list_pagination.page,
        },
      };
    }
    case "products_success_search": {
      return {
        ...state,
        search_mode: true,
        searched_products: action.payload,
        collection_product_list_pagination: {
          ...state.collection_product_list_pagination,
          page: 1,
          totalPages: 1,
          last_page: 1,
        },
      };
    }
    case "collection_products_success": {
      console.log("collection_products_success", action.payload);
      return {
        ...state,
        collection: action.payload.collection,
        products: action.payload.products.data,
        collection_product_list_pagination: {
          ...action.payload.products.meta,
          ...action.payload.products.links,
          page: state.collection_product_list_pagination.page,
        },
      };
    }
    case "company_success": {
      return { ...state, company: action.payload, loading: { company: false } };
    }
    case "cart": {
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return { ...state, cart: action.payload, current_order: undefined };
    }
    case "remove_product": {
      let cart = state.cart;
      const productCart = {
        add_to_cart_date: new Date(),
        note: "",
        complement: "",
        ...action.payload,
      };
      cart.items = cart.items.map((item) => {
        if (item.product.id === productCart.product.id) {
          return { ...item, quantity: item.quantity - productCart.quantity };
        }
        return item;
      });
      cart = { ...cart, items: cart.items.filter((item) => item.quantity > 0) };
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart };
    }
    case "add_product": {
      let cart = state.cart;
      const productCart = {
        add_to_cart_date: new Date(),
        note: "",
        complement: "",
        ...action.payload,
      };
      const alreadyExistsInCart =
        cart.items
          .map((item) => item.product.id)
          .includes(productCart.product.id) &&
        cart.items.filter(
          (item) =>
            item.price === productCart.price &&
            JSON.stringify(item.complement) ===
              JSON.stringify(productCart.complement)
        ).length > 0;
      if (alreadyExistsInCart) {
        cart.items = cart.items.map((item) => {
          if (
            item.product.id === productCart.product.id &&
            item.price === productCart.price &&
            JSON.stringify(item.complement) ===
              JSON.stringify(productCart.complement)
          ) {
            return { ...item, quantity: item.quantity + productCart.quantity };
          }
          return item;
        });
      } else {
        cart.items.push(productCart);
      }
      cart = { ...cart, items: cart.items.filter((item) => item.quantity > 0) };
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart };
    }
    case "get_user": {
      return { ...state, user: action.payload };
    }
    case "user_login": {
      let notifications = state.notifications;
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        setCookie("access_token", action.payload.access_token);
        notifications = [
          ...state.notifications,
          {
            value: Date.now(),
            label: "Welcome back " + action.payload.first_name,
          },
        ];
      }
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        notifications,
        token: action.payload.access_token,
      };
    }
    case "user_register": {
      let notifications = state.notifications;
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        setCookie("access_token", action.payload.access_token);
        notifications = [
          ...state.notifications,
          { value: Date.now(), label: "Welcome  " + action.payload.first_name },
        ];
      }
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        notifications,
        token: action.payload.access_token,
      };
    }
    case "updated_user": {
      return { ...state, user: { ...state.user, ...action.payload } };
    }

    case "list_addresses": {
      return { ...state, addresses: action.payload };
    }
    case "updated_address": {
      return {
        ...state,
        addresses: state.addresses.map((address) => {
          if (address.id === action.payload.id) {
            return action.payload;
          }
          return address;
        }),
        notifications: [
          ...state.notifications,
          { value: Date.now(), label: "Address updated with success." },
        ],
      };
    }
    case "order_canceled": {
      const orders = state.orders.filter((o) => o.id === action.payload.id);
      if (localStorage) {
        localStorage.setItem("orders", JSON.stringify(orders));
      }
      return { ...state, current_order: undefined, orders };
    }
    case "clear_cart": {
      let cart = {
        created_at: new Date(),
        items: [],
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart };
    }
    case "order_placed": {
      let cart = {
        created_at: new Date(),
        items: [],
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      let notifications = state.notifications;
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        setCookie("access_token", action.payload.access_token);
        notifications = [
          ...state.notifications,
          {
            value: Date.now(),
            label: "You have been automatically logged in ",
          },
          {
            value: Date.now(),
            label: "Order " + action.payload.reference + " with success.",
          },
        ];
      }
      const _orders = [...state.orders, action.payload];
      if (localStorage) {
        localStorage.setItem("orders", JSON.stringify(_orders));
      }

      return {
        ...state,
        cart,
        current_order: action.payload,
        notifications,
        isLogged: true,
        user: action.payload.client,
        orders: _orders,
        token: action.payload.access_token,
      };
    }
    case "init_orders": {
      return {
        ...state,
        orders: action.payload.orders,
        current_order: action.payload.current_order,
      };
    }
    case "orders": {
      if (localStorage) {
        localStorage.setItem("orders", JSON.stringify(action.payload));
      }
      return { ...state, orders: action.payload };
    }
    case "current_order": {
      const _orders = [
        ...state.orders.filter((o) => o.id !== action.payload.id),
        action.payload,
      ];
      if (localStorage) {
        localStorage.setItem("orders", JSON.stringify(_orders));
      }
      return {
        ...state,
        current_order: action.payload,
        orders: _orders,
        order_loaded: true,
      };
    }
    case "logout": {
      localStorage.removeItem("access_token");
      deleteCookie("access_token");
      return { ...state, isLogged: false, user: undefined };
    }
    case "notification": {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            label: action.payload,
            value: Date.now(),
            color: action.color || "black",
          },
        ],
      };
    }
    case "notifications": {
      return { ...state, notifications: action.payload };
    }
    case "error":
      return { ...state, error: action.payload, loading: { company: false } };
    case "loading":
      return { ...state, loading: action.payload };
    default: {
      state[action.type] = action.payload;
      return { ...state };
      // throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GenukaProvider({ children }) {
  const [state, dispatch] = React.useReducer(commentReducer, {
    loading: { company: false },
    notifications: [],
    isLogged: false,
    user: undefined,
    collections: undefined,
    products: undefined,
    activeProduct: undefined,
    productInCart: {
      product: undefined,
      price: 0,
      quantity: 1,
      variants: [],
    },
    cart:
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {
            created_at: new Date(),
            items: [],
          },
    error: undefined,
    company: undefined,
    collections_list: undefined,
    collection: undefined,
    collection_list_pagination: {
      current_page: 1,
      page: 1,
      per_page: DEFAULT_ITEMS_PER_PAGE,
      sort_by: "created_at",
      sort_dir: "desc",
    },
    collection_product_list_pagination: {
      current_page: 1,
      page: 1,
      per_page: DEFAULT_ITEMS_PER_PAGE,
      sort_by: "created_at",
      sort_dir: "desc",
    },
    orders: [],
    current_order: undefined,
    order_loaded: undefined,
    reviews: {
      list: [],
      total_reviews: 0,
      avg_reviews: 0,
    },
  });
  return (
    <GenukaStateContext.Provider value={state}>
      <GenukaDispatchContext.Provider value={dispatch}>
        {children}
      </GenukaDispatchContext.Provider>
    </GenukaStateContext.Provider>
  );
}

function useGenukaState() {
  const context = React.useContext(GenukaStateContext);
  if (context === undefined) {
    throw new Error("useGenukaState must be used within a GenukaProvider");
  }
  return context;
}

function useGenukaDispatch() {
  const context = React.useContext(GenukaDispatchContext);
  if (context === undefined) {
    throw new Error("useGenukaDispatch must be used within a GenukaProvider");
  }
  return context;
}

export {
  GenukaProvider,
  useGenukaState,
  useGenukaDispatch,
  getCompany,
  getCompanyById,
  getCollection,
  getProducts,
  getProduct,
  getProductById,
  getPaginatedCollections,
  getCollectionProducts,
  loginUser,
  registerUser,
  getAddresses,
  loginWithToken,
  placeOrder,
  cancelMyOrder,
  updateAddress,
  updateUser,
  updatePassword,
  getUser,
  loadOrder,
  chargeMomoPayment,
  sendAReview,
  updateAReview,
  deleteAReview,
  searchProducts,
};
