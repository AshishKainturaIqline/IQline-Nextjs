function pushEvent(event, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
function trackPageView(pagePath, pageTitle) {
  pushEvent("page_view", { page_path: pagePath, page_title: pageTitle });
}
function trackFormStart(formType, sourcePage, sourceCta) {
  pushEvent("form_start", { form_type: formType, source_page: sourcePage, source_cta: sourceCta });
}
function trackFormSubmit(formType, productInterest, sourcePage) {
  pushEvent("form_submit", { form_type: formType, product_interest: productInterest, source_page: sourcePage });
}
function trackCtaClick(ctaLabel, page, product) {
  pushEvent("cta_click", { cta_label: ctaLabel, page, product });
}
function trackProductView(productId, productName) {
  pushEvent("product_view", { product_id: productId, product_name: productName });
}
function trackBlogView(slug, title) {
  pushEvent("blog_view", { blog_slug: slug, blog_title: title });
}
function trackWhatsAppClick(page, productContext) {
  pushEvent("whatsapp_click", { page, product_context: productContext });
}
function trackJobApply(position) {
  pushEvent("job_apply", { position });
}
function trackOutboundLink(url, linkText) {
  pushEvent("outbound_link", { url, link_text: linkText });
}
export {
  trackBlogView,
  trackCtaClick,
  trackFormStart,
  trackFormSubmit,
  trackJobApply,
  trackOutboundLink,
  trackPageView,
  trackProductView,
  trackWhatsAppClick
};
