import Cookies from "js-cookie";

export const getCookie = (cookiename) => {
  Cookies.get(cookiename); // => 'value'
};
export const setCookie = (cookiename, cookievalue) => {
  Cookies.set(cookiename, cookievalue, { expires: 365 });
};
export const deleteCookie = (cookiename) => {
  Cookies.remove(cookiename);
};
