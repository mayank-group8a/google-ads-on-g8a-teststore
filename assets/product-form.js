if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      this.cartNotification.setActiveElement(document.activeElement);

    const submitButton = this.querySelector('[type="submit"]');


    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

const body = JSON.stringify({
  ...JSON.parse(serializeForm(this.form)),
  sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
  sections_url: window.location.pathname
});

fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
        .then((response) => response.json())
        .then((parsedState) => {
          console.log("parsedState ", parsedState);
          gtag_report_conversion('',parsedState);
          this.cartNotification.renderContents(parsedState);
          Shopify.AnnouncementAdvanced.update();
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('disabled');
        });
    }
  });
}
$('.main').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.thumb'
});
$('.thumb').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.main',
  dots: false,
  centerMode: false,
  focusOnSelect: true
});