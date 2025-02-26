function Servises(){
    return(
        <section class="section service" aria-label="service">
        <div class="container">

          {/* <img src="./assets/images/service-image.png" width="122" height="136" loading="lazy" alt="" class="img" /> */}

          <h2 class="h2 section-title">
            <span class="span">What you need,</span> when they need it.
          </h2>

          <ul class="grid-list">

            <li>
              <div class="service-card">

                <figure class="card-icon">
                  <img src={`${process.env.PUBLIC_URL}/Servises/service-icon-1.png`} width="70" height="70" loading="lazy"
                    alt="service icon" />
                </figure>

                <h3 class="h3 card-title">Free Same-Day Delivery</h3>

                <p class="card-text">
                  Order by 2pm local time to get free delivery on orders 349MAD+ today.
                </p>

              </div>
            </li>

            <li>
              <div class="service-card">

                <figure class="card-icon">
                  <img src={`${process.env.PUBLIC_URL}/Servises/service-icon-2.png`} width="70" height="70" loading="lazy"
                    alt="service icon" />
                </figure>

                <h3 class="h3 card-title">30 Day Return</h3>

                <p class="card-text">
                  35% off your first order plus 5% off all future orders.
                </p>

              </div>
            </li>

            <li>
              <div class="service-card">

                <figure class="card-icon">
                  <img src={`${process.env.PUBLIC_URL}/Servises/service-icon-3.png`} width="70" height="70" loading="lazy"
                    alt="service icon" />
                </figure>

                <h3 class="h3 card-title">Security payment</h3>

                <p class="card-text">
                  25% off your online order of 499MAD+. Available at most locations.
                </p>

              </div>
            </li>

            <li>
              <div class="service-card">

                <figure class="card-icon">
                  <img src={`${process.env.PUBLIC_URL}/Servises/service-icon-4.png`} width="70" height="70" loading="lazy"
                    alt="service icon" />
                </figure>

                <h3 class="h3 card-title">24/7 Support</h3>

                <p class="card-text">
                  Shop online to get orders over 498MAD shipped fast and free.
                </p>

              </div>
            </li>

          </ul>

        </div>
      </section>
    );
}

export default Servises;