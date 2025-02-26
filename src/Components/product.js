import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Product = () => {
  const [color, setColor] = useState("black");
  const [backcolor, setBackcolor] = useState("white");
  const [margin, setMargin] = useState("relative");
  // Hooks for set data in Array
  const [getdataproducts, setGetdataproducts] = useState([]);
  const [getdatacart, setGetdatacart] = useState([]);

  const [cartMessage, setCartMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenExist, setConfirmexist] = useState(false);

  // confirm add to cart
  const [addtocart, setAddtocart] = useState(false);

  // Fonction pour fermer la modale
  const closeModal = () => {
    setConfirmexist(false);
  };

  const product = location.state || {};

  const [img, setImg] = useState(product.img_produit?.img1);
  const [quantity, setQuantity] = useState(1);

  const handleShowMessage = () => setCartMessage(true);
  const handleHideMessage = () => setCartMessage(false);

  const handleChangePage = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.post("http://localhost:5000/api/cart", {
        client: userId,
        name: product.name,
        image: product.img_produit?.img1,
        price: product.price,
        quantity: quantity,
      });
      setAddtocart(true);
      console.log(response);
    } catch (err) {
      console.error("Error adding product to cart:", err);
      setConfirmexist(!isOpenExist);
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const setMainImage = (src) => setImg(src);

  // Get produts data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/produits")
      .then((response) => response.json())
      .then((data) => setGetdataproducts(data));
  }, []);

  // Get cart data from API
  // useEffect(() => {
  //   fetch("http://localhost:5000/cart")
  //     .then((response) => response.json())
  //     .then((data) => setGetdatacart(data));
  // }, []);

  return (
    <>
      <Navbar background={backcolor} color={color} margin={margin} />
      <div className="product-page">
        {/* Sidebar with Thumbnails */}
        <div className="thumbnail-sidebar">
          {product.img_produit &&
            Object.values(product.img_produit).map((thumb, index) => (
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/${thumb}`}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(thumb)}
                className="thumbnail"
              />
            ))}
        </div>

        {/* Left Side - Product Image */}
        <div className="product-left">
          <div className="product-image">
            <img src={`${process.env.PUBLIC_URL}/${img}`} alt="Product" />
          </div>
        </div>

        {/* Right Side - Product Details and Options */}
        <div className="product-right">
          {/* Product Details */}
          <div className="product-details">
            <p className="price">
              <span className="discount-price">
                MAD {(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="original-price">MAD {product.price}</span>
              <span className="discount">{product.discount}% off</span>
            </p>
            <h1>{product.name}</h1>

            <p className="reviews">⭐ 4.0 | 4 Reviews | 17 sold</p>
            <hr />
            <p>
              <b>Description:</b>
              <span>{product.desc}</span>
            </p>
          </div>
        </div>

        {/* Quantity Selector and Purchase Options */}
        <div className="quantity-selector">
          <div className="shipping-info">
            <p>
              <b>Free shipping</b> over MAD100
            </p>
            <p>
              Delivery: <b>Nov. 14 - 20</b>
            </p>
            <p>
              <b>Security & Privacy:</b> Safe payments, no sharing of personal
              details without consent.
            </p>
          </div>
          <hr style={{ color: "lightgray" }} />
          <p>
            <b>Quantity</b>
          </p>
          <div className="btnQTE">
            <button className="btnMinus" onClick={decreaseQuantity}>
              -
            </button>
            <span>
              <b>{quantity}</b>
            </span>
            <button className="btnPlus" onClick={increaseQuantity}>
              +
            </button>
          </div>

          <button className="add-to-cart" onClick={() => handleChangePage()}>
            Add to cart
          </button>
          <button className="shop-now">Shop now</button>
        </div>
      </div>

      <hr style={{ color: "lightgray", width: "75%", textAlign: "center" }} />

      {cartMessage && (
        <div className="cartMessage">
          <div className="cartTop">
            <p>
              <b>Your item :</b> {getdatacart.length}
            </p>
            <p className="continue" onClick={handleHideMessage}>
              Continue shopping
            </p>
          </div>
          <div className="cartMessageInfo">
            <img src={product.imgProduct?.img1} alt="Product" />
            <div>
              <h3>{product.name}</h3>
              <h5>MAD {product.price}</h5>
              <h6>
                <b>QTE:</b> {quantity}
              </h6>
            </div>
          </div>
          <button className="add-to-cart">Go to cart</button>
          <button className="shop-now">Shop now</button>
        </div>
      )}

      <section className="section product" id="shop" aria-label="product">
        <div className="container">
          <h2 className="h2 section-title">
            <span className="span">Related</span> items
          </h2>

          <ul className="grid-list">
            {getdataproducts.map((eo) => {
              const img1 = eo.img_produit?.img1
                ? `${process.env.PUBLIC_URL}/${eo.img_produit.img1}`
                : "";
              const img2 = eo.img_produit?.img2
                ? `${process.env.PUBLIC_URL}/${eo.img_produit.img2}`
                : "";

              const handleProductClick = (product) =>
                navigate("/product", { state: product });

              return (
                <li
                  key={eo.id}
                  style={{ cursor: "pointer" }}
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
                          alt={eo.name}
                          className="img-cover default"
                        />
                      )}
                      {img2 && (
                        <img
                          src={img2}
                          width="360"
                          height="360"
                          alt={eo.name}
                          className="img-cover hover"
                        />
                      )}
                      <button
                        className="card-action-btn"
                        aria-label="add to cart"
                        title="Add To Cart"
                      ></button>
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
                        <Link tp="/" className="card-title">
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
          <button id="call-to-action-product">Add to cart</button>
        </div>

        <div>
          {/* La modale elle-même */}
          {isOpenExist && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>🤔​ Exists deja</h2>
                <p>
                  Le produit <b>{product.name}</b> il exist deja dans vore cart.
                </p>
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
                <h2>​🥳​​ Thank you! 🥳​</h2>
                <p>Your orders added sucefuly, take your phone turn on. 😊​</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    className="goToCart"
                    onClick={() => setAddtocart(false)}
                  >
                    ​🤗​ ok
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Product;
