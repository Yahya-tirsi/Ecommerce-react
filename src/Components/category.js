import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Category() {
  const [getdatacategories,setGetdatacategories] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3001/category")
      .then((response) => response.json())
      .then((data) => setGetdatacategories(data))
  },[]);

  return (
    <div>
      <section className="section category" aria-label="category">
        <div className="container">
          <h2 className="h2 section-title">
            <span className="span">Top</span> categories
          </h2>

          <ul className="has-scrollbar">
            {getdatacategories.map((eo) => {
              return (
                <li className="scrollbar-item" key={eo.id}>
                  <div className="category-card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "330", "--height": "300" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/${eo.imageCategory}`}
                        width="330"
                        height="300"
                        loading="lazy"
                        alt={eo.category}
                        className="img-cover"
                      />
                    </figure>

                    <h3 className="h3">
                      <Link
                        to={`/category-products/${eo.nameCategory}`}
                        className="card-title"
                      >
                        {eo.nameCategory}
                      </Link>
                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Category;
