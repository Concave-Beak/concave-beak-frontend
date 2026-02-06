export function loadMainPageContent() {
  document.querySelector<HTMLDivElement>("#main-page-content")!.innerHTML = `
    <div class="main-page-banner vignette">
      <div class="banner-media">
        <img src="/toucan-shannon-potter-unsplash.jpg">
      </div>

      <div class="banner-text">
        <div class="main-page-banner-header">Img Banner header</div>
        <div class="main-page-banner-header-description">
          Some really short description
        </div>
      </div>
    </div>
    <div class="main-page-articles">
      <div class="main-page-article-header">
        Recent Articles
      </div>
      <a href="/article-link" class="article-preview">
        <div class="article-preview-banner smooth-edges-img-sm">
          <img src="/makaw-caio_delarolle.jpg">
        </div>
        <div class="article-preview-text">
          <div class="article-preview-title">
            Name example
          </div>
          <div class="article-preview-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div class="article-preview-date">
            10-10-1010
          </div>
        </div>
      </a>
      <a href="/article-link" class="article-preview">
        <div class="article-preview-banner smooth-edges-img-sm">
          <img src="/makaw-caio_delarolle.jpg">
        </div>
        <div class="article-preview-text">
          <div class="article-preview-title">
            Name example
          </div>
          <div class="article-preview-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div class="article-preview-date">
            10-10-1010
          </div>
        </div>
      </a>
    </div>
  `
}

function scrollHide() {
  const banner = document.querySelector<HTMLDivElement>('.main-page-banner');
  const bannerHeight = banner!.offsetHeight;

  let ticking = false;

  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      const progress = Math.min(scrollTop / bannerHeight * 2, 1);

      banner!.style.opacity = (1 - progress).toString();
      banner!.style.transform = `translateY(${progress * -50}px)`;
      banner!.style.filter = `blur(${progress * 3}px)`;

      const text = banner!.querySelector<HTMLDivElement>('.banner-text');
      if (text) {
        text!.style.opacity = (1 - (progress * 1.5)).toString();
        text.style.transform = `translate(-50%, ${progress * -20}px)`;
      }

      ticking = false;
    });
    ticking = true;
  }

}

window.addEventListener('scroll', () => {
  scrollHide();
});
