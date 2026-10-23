const HOME_SECTION_QUERY = "section";
const HOME_SECTION_IDS = [
  "watch",
  "products",
  "about",
  "why",
  "insights",
  "contact"
];
function isHomeSectionId(id) {
  return HOME_SECTION_IDS.includes(id);
}
function homeSectionTo(section, product) {
  const params = new URLSearchParams({ [HOME_SECTION_QUERY]: section });
  if (product) params.set("product", product);
  return {
    pathname: "/",
    search: `?${params.toString()}`
  };
}
function contactPageTo(product) {
  if (!product) return "/contact-us";
  const params = new URLSearchParams({ product });
  return {
    pathname: "/contact-us",
    search: `?${params.toString()}`
  };
}
export {
  HOME_SECTION_IDS,
  HOME_SECTION_QUERY,
  contactPageTo,
  homeSectionTo,
  isHomeSectionId
};
