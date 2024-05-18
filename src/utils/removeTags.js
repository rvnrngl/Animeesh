export const removeTags = (str) => {
  return str.replace(/<\/?[^>]+(>|$)|\([^()]*\)/g, "").trim();
};
