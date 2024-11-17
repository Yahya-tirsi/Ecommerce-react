function Footer() {
  return (
    <footer
      class="footer"
      // style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/footer-shape.jpg})` }}
    >
      <div class="footer-top section">
        <div class="container">
          <div class="footer-brand">
            <img
              src={`${process.env.PUBLIC_URL}/online_shopping__1512_x_784_px_-removebg-preview.png`}
              alt=""
              class="logo"
            />

            <p class="footer-text">
              If you have any question, please contact us at
              <a href="mailto:support@gmail.com" class="link">
                support@gmail.com
              </a>
            </p>

            <ul class="contact-list">
              <li class="contact-item">
                <ion-icon name="location-outline" aria-hidden="true"></ion-icon>

                <address class="address"><i style={{color: "orangered"}} class="fa-solid fa-location-dot"></i> Darb Omar Rue 69 No 46</address>
              </li>

              <li class="contact-item">
                <ion-icon name="call-outline" aria-hidden="true"></ion-icon>

                <a href="tel:+16234567891011" class="contact-link">
                <i style={{color: "orangered"}} class="fa-solid fa-phone"></i> (+212)-0644737828
                </a>
              </li>
            </ul>

            <ul class="social-list">
              <li>
                <a href="#" class="social-link">
                <i class="fa-brands fa-facebook"></i>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                <i class="fa-brands fa-twitter"></i>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                <i class="fa-brands fa-youtube"></i>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                <i class="fa-brands fa-square-instagram"></i>
                </a>
              </li>
            </ul>
          </div>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Corporate</p>
            </li>
            <li>
              <a href="#" class="footer-link">
                About Us
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Contact Us
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                FAQs
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Vendors
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Affiliate Program
              </a>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Information</p>
            </li>

            <li>
              <a href="#" class="footer-link">
                Online Store
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Refund Policy
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Shipping Policy
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Terms of Service
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Track Order
              </a>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Services</p>
            </li>

            <li>
              <a href="#" class="footer-link">
                Grooming
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Backpacks every day
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Backpacks travel
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Backpacks student
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Backpacks for work
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                Resource Center
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p class="copyright">
            &copy; 2024 Made with{" "}
            <a href="#" class="copyright-link">
              Yahya Tirsi.
            </a>
          </p>

          <img
            src={`${process.env.PUBLIC_URL}/payment.png`}
            width="397"
            height="32"
            loading="lazy"
            alt="payment method"
            class="img"
          />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
