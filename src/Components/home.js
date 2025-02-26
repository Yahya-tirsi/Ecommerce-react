import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div>
      <main>
        <article>
          <section
            className="section hero has-bg-image"
            id="home"
            aria-label="home"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/sidbar1.svg)`,
            }}
          >
            <div className="container">
              <h1 className="h1 hero-title">
                <span className="span">High Quality</span> Backpacks
              </h1>

              <p className="hero-text">Sale up to 40% off today</p>

              <Link to="/products" className="btn">
                Shop Now
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
export default Home;
