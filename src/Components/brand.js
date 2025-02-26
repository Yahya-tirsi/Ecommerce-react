function Brand(){
    return(
        <section class="section brand" aria-label="brand">
        <div class="container">

          <h2 class="h2 section-title">
            <span class="span">Popular</span> Brands
          </h2>

          <ul class="has-scrollbar">

            <li class="scrollbar-item">
              <div class="brand-card img-holder" style={{width: "150", height: "150"}}>
                <img src={`${process.env.PUBLIC_URL}/brand1.jpg`} width="150" height="150" loading="lazy" alt="brand logo"
                  class="img-cover" />
              </div>
            </li>

            <li class="scrollbar-item">
              <div class="brand-card img-holder" style={{width: "150", height: "150"}}>
                <img src={`${process.env.PUBLIC_URL}/brand2.jpg`} width="150" height="150" loading="lazy" alt="brand logo"
                  class="img-cover" />
              </div>
            </li>

            <li class="scrollbar-item">
              <div class="brand-card img-holder" style={{width: "150", height: "150"}}>
                <img src={`${process.env.PUBLIC_URL}/brand3.jpg`} width="150" height="150" loading="lazy" alt="brand logo"
                  class="img-cover" />
              </div>
            </li>

            <li class="scrollbar-item">
              <div class="brand-card img-holder" style={{width: "150", height: "150"}}>
                <img src={`${process.env.PUBLIC_URL}/Eastpak_logo.png`} width="150" height="150" loading="lazy" alt="brand logo"
                  class="img-cover" />
              </div>
            </li>

            <li class="scrollbar-item">
              <div class="brand-card img-holder" style={{width: "150", height: "150"}}>
                <img src={`${process.env.PUBLIC_URL}/brand5.png`} width="150" height="150" loading="lazy" alt="brand logo"
                  class="img-cover" />
              </div>
            </li>

          </ul>

        </div>
      </section>
    );
}

export default Brand;