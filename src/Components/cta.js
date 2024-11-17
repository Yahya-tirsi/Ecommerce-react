function Cta() {
  return (
    <section
      className="cta has-bg-image"
      aria-label="cta"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/sliderCta.png` }}
    >
      <div className="container">
        <figure className="cta-banner">
          <img
            src={`${process.env.PUBLIC_URL}/cta-2.png`}
            width="900"
            height="660"
            loading="lazy"
            alt="cat"
            className="w-100"
          />
        </figure>

        <div className="cta-content">
          {/* <img src={`${process.env.PUBLIC_URL}/`} width="120" height="35" loading="lazy" alt="taste guarantee"
              className="img" /> */}
          <div className="ico-cta">
            <i
              class="fa-solid fa-bag-shopping"
              style={{ color: "#000000", fontSize: "55px" }}
            ></i>
            <div className="ico-info-cta">
            <h3>Bag</h3>
            <h1>Guarantee</h1>
            </div>
          </div>

          <h2 className="h2 section-title">
            Backpacks it, love it or we’ll replace it… Guaranteed!
          </h2>

          <p className="section-text">
            This sleek urban backpack features multiple compartments for tech
            gadgets and a padded laptop sleeve, complemented by reflective
            strips for safety. Its minimalist design is perfect for both work
            and leisure.
          </p>

          <a href="#" className="btn">
            Find out more
          </a>
        </div>
      </div>
    </section>
  );
}

export default Cta;
