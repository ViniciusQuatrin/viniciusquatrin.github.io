/** Internal route → trailing-slash form (static export uses folder/index.html). */
export function withTrailingSlash(href: string) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function isExternal(href: string) {
  return /^https?:/.test(href);
}
