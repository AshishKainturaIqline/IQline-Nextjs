/** Inline in <head> so the theme class is set before first paint. Mirrors ThemeProvider's storage key and system fallback. */
function themeInitScript(storageKey = "theme") {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(t)}catch(e){}})()`
}

export { themeInitScript }
