export const tail = ([x, ...xs], elt) => {
  return [...xs, elt];
};
export const addAVariantOption = (_variants, { variant, option }) => {
  let variants = [];
  // si la variant n'existe pas, on la rajoute, ensuite, on rajoute l'option
  if (!_variants.map((v) => v.slug).includes(variant.slug)) {
    let _new_variant = { ...variant, options: [] };
    _new_variant.options.push(option);
    variants = [..._variants, _new_variant];
  } else {
    // si la variante existe déjà, on vérifie
    // Si l'option existe déjà, on le retire
    // Si l'option n'existe pas encore, on vérifie le nombre d'options possibles
    variants = _variants.map((v) => {
      if (v.slug === variant.slug) {
        return {
          ...v,
          options:
            v.max_choices > v.options.length
              ? [...v.options, option]
              : tail(v.options, option),
        };
      }
      return v;
    });
  }
  return variants;
};

export const validatePhoneNumber = (input_str) => {
  var intlPhone = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  var localPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return intlPhone.test(input_str) || localPhone.test(input_str);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
