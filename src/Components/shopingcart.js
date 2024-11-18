import Footer from "./footer";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import Products from "./products";
import ConfirmationModal from "./ConfirmationModal";
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

  // Total Price calculation
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    fetch("http://localhost:3001/cart/")
      .then((response) => response.json())
      .then((data) => setCart(data.map((item) => ({ ...item, quantity: 1 }))));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/cart/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => getdata());
    setIsModalOpen(false);
  }

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Delete all items
  function handleDeleteAll() {
    cart.forEach((item) => {
      fetch(`http://localhost:3001/cart/${item.id}`, { method: "DELETE" });
    });
    setCart([]);
    setIsModalOpen(false);
  }

  return (
    <div>
      <Navbar background={backcolor} color={color} margin={margin} />
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
            <p id="delete-url-shopingcart" onClick={() => setIsModalOpen(true)}>
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
                <div className="cart-item-shopingcart" key={eo.id}>
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
                      onClick={() => handleDelete(eo.id)}
                    >
                      <i
                        style={{ color: "white" }}
                        className="fa-solid fa-xmark"
                      ></i>
                    </span>
                    <div className="btnQTE-shopingcart">
                      <button
                        className="btnMinus"
                        onClick={() => decreaseQuantity(eo.id)}
                      >
                        -
                      </button>
                      <span>
                        <b>{eo.quantity}</b>
                      </span>
                      <button
                        className="btnPlus"
                        onClick={() => increaseQuantity(eo.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-shopingcart">
            <h2>Summary</h2>
            <p>Subtotal : MAD {totalPrice}</p>
            <p>Shipping : MAD 20</p>
            <div className="total-price">Total: MAD {totalPrice + 20}</div>
            <button className="btn-checkout-shopingcart">
              <i className="fa-regular fa-credit-card"></i> Checkout (
              {cart.length})
            </button>
          </div>
        </div>
        <div className="cart-pay-shopingcart">
          <h2>Pay with</h2>
          <img src={`${process.env.PUBLIC_URL}/payment.png`} alt=""/>
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
