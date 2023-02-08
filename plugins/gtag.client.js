const gtagId = "G-WRFN33PBRR"

export default (_, inject) => {
  // Create gtag function & define gtag deps (window.dataLayer array)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag("js", new Date())

  // Config with gtagId & send initial page view
  gtag("config", gtagId, { send_page_view: true })

  // Inject gtag function
  inject("gtag", gtag)
}
