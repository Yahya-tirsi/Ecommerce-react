import Footer from "./footer";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import Products from "./products";
import ConfirmationModal from "./ConfirmationModal";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SpinnerComponent from "./SpinnerComponent";
import { Link } from "react-router-dom";

function Shopingcart() {
  const [cart, setCart] = useState([]);
  const [color, setColor] = useState("black");
  const [backcolor, setBackcolor] = useState("white");
  const [margin, setMargin] = useState("relative");
  // Show message delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Change list item and grid item
  const [listitem, setlistitem] = useState("product-list");

  const [selectedProductId, setSelectedProductId] = useState(null);

  // Spiner
  const [isLoading, setIsLoading] = useState(true);

  const [erreur, setErreur] = useState(null);

  const [isOpenExist, setConfirmexist] = useState(false);
  const [orderEmpty, setOrderEmpty] = useState(false);

  // Fonction pour ouvrir la modale
  const openModal = (id) => {
    setConfirmexist(true);
    setSelectedProductId(id);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setConfirmexist(false);
    setSelectedProductId(null);
  };

  // List des id des produits et qantity
  // const listProduct = cart.map((eo) => ({
  //   product: eo._id,
  //   quantity: eo.quantity,
  // }));

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  // Total Price calculation
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data);
      setIsLoading(false);
    } catch (err) {
      setErreur("Failed to fetch orders. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCommande = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (cart.length <= 0) {
        setOrderEmpty(true);
      } else {        
        console.log(cart);
        
        await axios.post(`http://localhost:5000/api/commandes`, {
          client: userId,
          products: cart,
          totalPrice: totalPrice,
        });

        alert("Order placed successfully!");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserOrders();
    handleDelete();
    getdata();
  }, []);

  if (erreur) {
    return <p>{erreur}</p>;
  }

  function getdata() {
    fetch("http://localhost:5000/cart/")
      .then((response) => response.json())
      .then((data) => setCart(data.map((item) => ({ ...item, quantity: 1 }))));
  }

  function handleDelete(id) {
    fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
    closeModal();
    fetchUserOrders();
  }

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Delete all items
  function handleDeleteAll() {
    fetch(`http://localhost:5000/api/cart`, { method: "DELETE" });
    setCart([]);
    setIsModalOpen(false);
    fetchUserOrders();
  }

  return (
    <div>
      <Navbar background={backcolor} color={color} margin={margin} />

      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div className="shop-container">
          <div className="shoping-cart-shopingcart">
            <h2>Shopping Cart ({cart.length})</h2>
            <div className="selected-cart-shopingcart">
              <p>
                <i
                  style={{ color: "orangered" }}
                  class="fa-solid fa-circle-check"
                ></i>
              </p>
              <p
                id="delete-url-shopingcart"
                onClick={() => setIsModalOpen(true)}
              >
                Delete all items
              </p>
              <i
                class="fa-solid fa-list items-grid-list-shopingcart"
                onClick={() => setlistitem("listItem")}
                title="List items"
              ></i>
              <i
                class="fa-solid fa-border-all items-grid-list-shopingcart"
                onClick={() => setlistitem("product-list")}
                title="Grid items"
              ></i>
            </div>
          </div>
          <div className="cart-wrapper">
            <div
              className={
                listitem === "product-list" ? "product-list" : "listItem"
              }
            >
              {cart.length === 0 ? (
                <>
                  <img
                    className="empty-cart-shoping-cart"
                    src={`${process.env.PUBLIC_URL}/empty-cart.png`}
                    alt=""
                  />
                </>
              ) : (
                cart.map((eo) => (
                  <div className="cart-item-shopingcart" key={eo._id}>
                    <div className="product-image-shopingcart">
                      <img
                        src={`${process.env.PUBLIC_URL}/${eo.image}`}
                        alt={eo.name}
                        className="product-img-shopingcart"
                      />
                    </div>
                    <div className="product-details">
                      <p className="product-name-shopingcart">{eo.name}</p>
                      <h3 className="product-price">MAD {eo.price}</h3>
                    </div>
                    <div className="quantity-controls">
                      <span
                        className="remove-btn"
                        onClick={() => openModal(eo._id)}
                      >
                        <i
                          style={{ color: "white" }}
                          className="fa-solid fa-xmark"
                        ></i>
                      </span>
                      <div className="btnQTE-shopingcart">
                        <button
                          className="btnMinus"
                          onClick={() => decreaseQuantity(eo._id)}
                        >
                          -
                        </button>
                        <span>
                          <b>{eo.quantity}</b>
                        </span>
                        <button
                          className="btnPlus"
                          onClick={() => increaseQuantity(eo._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Modale spécifique à chaque produit */}
                    {selectedProductId === eo._id && (
                      <div className="modal-overlay">
                        <div className="modal-content">
                          <h2>⚠️​​ Êtes-vous sûr ?</h2>
                          <p>Voulez-vous vraiment supprimer ce produit ?</p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "1rem",
                            }}
                          >
                            <button
                              className="btnConfirmModalExits"
                              onClick={closeModal}
                            >
                              Non
                            </button>
                            <button
                              className="goToCart"
                              onClick={() => handleDelete(eo._id)}
                            >
                              Supprimer du panier
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary-shopingcart">
              <h2>Summary</h2>
              <p>Subtotal : MAD {totalPrice}</p>
              <p>Shipping : MAD {totalPrice === 0 ? 0 : 20}</p>
              <div className="total-price">Total: MAD {totalPrice > 0 ? totalPrice + 20 : totalPrice + 0}</div>
              <button
                className="btn-checkout-shopingcart"
                onClick={() => handleCommande()}
              >
                <i className="fa-regular fa-credit-card"></i> Checkout (
                {cart.length})
              </button>
            </div>
          </div>
          <div className="cart-pay-shopingcart">
            <h2>Pay with</h2>
            <img src={`${process.env.PUBLIC_URL}/payment.png`} alt="" />
            <hr></hr>
            <h3>
              <i style={{ color: "orangered" }} class="fa-solid fa-check"></i>
              Buyer protection
            </h3>
            <p>
              Get full refund if the item is not as described or if is not
              delivered
            </p>
          </div>
        </div>
      )}

      <div>
        {/* La modale elle-même */}
        {orderEmpty && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>​🤨​​​ orders are empty!</h2>
              <p>Your cart is empty.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Link to="/">
                  <button
                    className="goToCart"
                    onClick={() => setOrderEmpty(false)}
                  >
                    ​🤗​ continue shoping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAll}
      />
      <Products />
      <Footer />
    </div>
  );
}

export default Shopingcart;
