import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Next/Turbopack static imports are objects with `.src`; Vite used plain URL strings. */
function assetSrc(moduleOrUrl) {
  if (moduleOrUrl == null) return "";
  if (typeof moduleOrUrl === "string") return moduleOrUrl;
  if (typeof moduleOrUrl === "object") {
    if (typeof moduleOrUrl.src === "string") return moduleOrUrl.src;
    if (moduleOrUrl.default != null) return assetSrc(moduleOrUrl.default);
  }
  return "";
}

const PRODUCT_CARD_IMAGES = {
  meducampus: "/products/mums.png",
};

function productCardImageUrl(productId) {
  return PRODUCT_CARD_IMAGES[productId] ?? `/products/${productId}.png`;
}

export { assetSrc, cn, productCardImageUrl };
