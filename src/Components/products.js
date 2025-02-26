import { Link, useNavigate } from "react-router-dom";
// import Product from "./product";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Products() {
  const navigate = useNavigate();
  const [getdataproducts, setGetdataproducts] = useState([]);

  // confirm add to cart
  const [addtocart, setAddtocart] = useState(false);

  const [isOpenExist, setConfirmexist] = useState(false);
  // Fonction pour fermer la modale
  const closeModal = () => {
    setConfirmexist(false);
  };

  const handleProductClick = (product) => {
    navigate("/product", { state: product });
  };

  function handleAddToCart(name, img, price) {
    const quantitysProducts = getdataproducts.map((eo) => eo.qte_produit > 0);

    if (quantitysProducts) {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        axios.post("http://localhost:5000/api/cart", {
          client: userId,
          name: name,
          image: img,
          price: price,
          quantity: 1,
        });
        setAddtocart(true);
      } catch (err) {
        console.error("Error adding product to cart:", err);
        setConfirmexist(!isOpenExist);
      }
    }
  }

  // Get produts data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/produits")
      .then((response) => response.json())
      .then((data) => setGetdataproducts(data));
  }, []);

  // shoping product
  // const handleChangePage = (nom,price,img1) => {
  //   axios
  //     .post("http://localhost:3001/cart", {
  //       name: nom,
  //       image: img1,
  //       price: price,
  //     })
  //     .then((data) => console.log(data));
  // };

  return (
    <section className="section product" id="shop" aria-label="product">
      <div className="container">
        <h2 className="h2 section-title">
          <span className="span">Best</span> Seller
        </h2>

        <ul className="grid-list">
          {getdataproducts.map((eo) => {
            const imgProduct = eo.img_produit || {};
            const img1 = imgProduct.img1
              ? `${process.env.PUBLIC_URL}${imgProduct.img1}`
              : "";
            const img2 = imgProduct.img2
              ? `${process.env.PUBLIC_URL}${imgProduct.img2}`
              : "";

            return (
              <li style={{ cursor: "pointer" }} key={eo.id}>
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
                        onClick={() => handleProductClick(eo)}
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
                        onClick={() => handleProductClick(eo)}
                      />
                    )}

                    <button
                      className="card-action-btn"
                      aria-label="add to cart"
                      title="Add To Cart"
                      onClick={() => {
                        handleAddToCart(
                          eo.name,
                          img1,
                          eo.price,
                          eo.qte_produit,
                          eo._id
                        );
                      }}
                    >
                      <i
                        style={{ fontSize: "16px" }}
                        class="fa-solid fa-cart-plus"
                      ></i>
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

                      {/* <span className="span">(0)</span> */}
                    </div>

                    <h3 className="h3" onClick={() => handleProductClick(eo)}>
                      <Link to="#" className="card-title">
                        {eo.name}
                      </Link>
                    </h3>

                    <data className="card-price" value={eo.price}>
                      {eo.price} MAD
                    </data>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {/* La modale elle-même */}
        {isOpenExist && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>🤔​ Exists deja</h2>
              <p>Le produit il exist deja dans vore cart.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <button className="btnConfirmModalExits" onClick={closeModal}>
                  OK
                </button>
                <Link to="/shoping-cart">
                  <button className="goToCart">Go to your cart</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal for order add to cart */}
      <div>
        {/* modal add to cart */}
        {addtocart && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2> ✔️​​ </h2>
              <p>Your product added sucefuly, check your card now. 😊​</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Link to="/shoping-cart" className="goToCart">
                  Go to cart
                </Link>
                <button
                  className="goToCart"
                  onClick={() => setAddtocart(false)}
                >
                  ​continue shoping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default Products;
