export function loadMainPageContent() {
  document.querySelector<HTMLDivElement>("#main-page-content")!.innerHTML = `
    <div class="main-page-banner vignette">
      <img src="/toucan-shannon-potter-unsplash.jpg">

      <div class="banner-text">
        <div class="main-page-banner-header">Img Banner header</div>
        <div class="main-page-banner-header-description">
          Some really short description
        </div>
      </div>
    </div>
  `
}
