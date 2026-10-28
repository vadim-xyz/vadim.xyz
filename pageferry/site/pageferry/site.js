const viewer = document.querySelector('.viewer');
let previousFocus;
const imageViewport = viewer?.querySelector('.viewer-image');
const zoomButton = viewer?.querySelector('.viewer-zoom');

function setZoom(zoomed) {
  imageViewport.classList.toggle('is-zoomed', zoomed);
  zoomButton.setAttribute('aria-pressed', String(zoomed));
  zoomButton.querySelector('span').textContent = zoomed ? 'Fit screen' : 'Zoom in';
  imageViewport.scrollTo(0, 0);
}

document.querySelectorAll('[data-screenshot]').forEach(link => {
  link.addEventListener('click', event => {
    if (!viewer || !viewer.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    previousFocus = link;
    viewer.querySelector('img').src = link.href;
    viewer.querySelector('img').alt = link.dataset.screenshot;
    viewer.querySelector('h2').textContent = link.dataset.screenshot;
    setZoom(false);
    viewer.showModal();
  });
});

if (viewer) {
  zoomButton.addEventListener('click', () => {
    const zoomed = zoomButton.getAttribute('aria-pressed') !== 'true';
    setZoom(zoomed);
    if (zoomed) imageViewport.focus();
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => previousFocus?.focus());
}

const tour = document.querySelector('.product-tour');
if (tour) {
  const buttons = [...tour.querySelectorAll('[data-tour]')];
  const image = tour.querySelector('.screen-link img');
  const link = tour.querySelector('.screen-link');
  const caption = tour.querySelector('.tour-caption');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      image.src = button.dataset.src;
      image.alt = button.dataset.caption;
      link.href = button.dataset.full;
      link.dataset.screenshot = button.dataset.caption;
      caption.textContent = button.dataset.caption;
    });
  });
}
