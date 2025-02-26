import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

function CategoryProducts() {
  const navigate = useNavigate();
  const categoryName = useParams();
  const [color, setColor] = useState("black");
  const [backcolor, setBackcolor] = useState("white");
  const [margin, setMargin] = useState("relative");
  const [getdataproducts, setGetdataproducts] = useState([]);

// Get produts data from API 
  useEffect(() => {
    fetch("http://localhost:5000/api/produits")
      .then((response) => response.json())
      .then((data) => setGetdataproducts(data));
  }, []);

// Find products category
  const productData = getdataproducts.filter(
    (product) => product.category === categoryName.nameCategory
  );  

  const handleProductClick = (product) => {
    navigate("/product", { state: product });
  };

  return (
    <div>
        <Navbar/>
      <ul className="grid-list" background={backcolor} color={color} margin={margin}>
        {productData.map((eo) => {
          // Ensure imgProduct is an object before trying to access its properties
          const imgProduct = eo.imgProduct || {};
          const img1 = imgProduct.img1
            ? `${process.env.PUBLIC_URL}/${imgProduct.img1}`
            : "";
          const img2 = imgProduct.img2
            ? `${process.env.PUBLIC_URL}/${imgProduct.img2}`
            : "";

          return (
            <li
              style={{ cursor: "pointer" }}
              key={eo.id}
              onClick={() => handleProductClick(eo)}
            >
              <div className="product-card">
                <div
                  className="card-banner img-holder"
                  style={{ "--width": "360", "--height": "360" }}
                >
                  {img1 && (
                    <img
                      src={img1}
                      width="360"
                      height="360"
                      loading="lazy"
                      alt={eo.name}
                      className="img-cover default"
                    />
                  )}
                  {img2 && (
                    <img
                      src={img2}
                      width="360"
                      height="360"
                      loading="lazy"
                      alt={eo.name}
                      className="img-cover hover"
                    />
                  )}

                  <button
                    className="card-action-btn"
                    aria-label="add to cart"
                    title="Add To Cart"
                  >
                    <ion-icon
                      name="bag-add-outline"
                      aria-hidden="true"
                    ></ion-icon>
                  </button>
                </div>

                <div className="card-content">
                  <div className="wrapper">
                    <div className="rating-wrapper gray">
                      <ion-icon name="star" aria-hidden="true"></ion-icon>
                      <ion-icon name="star" aria-hidden="true"></ion-icon>
                      <ion-icon name="star" aria-hidden="true"></ion-icon>
                      <ion-icon name="star" aria-hidden="true"></ion-icon>
                      <ion-icon name="star" aria-hidden="true"></ion-icon>
                    </div>

                    <span className="span">(0)</span>
                  </div>

                  <h3 className="h3">
                    <Link to="#" className="card-title">
                      {eo.name}
                    </Link>
                  </h3>

                  <data className="card-price" value={eo.price}>
                    {eo.price} DH
                  </data>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryProducts;
