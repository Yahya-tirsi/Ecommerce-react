import { Link, useNavigate } from "react-router-dom";
import Product from "./product";
import { useEffect, useState } from "react";
import axios from "axios";

function Products({ category }) {  
  
  const navigate = useNavigate();
  const [getdataproducts, setGetdataproducts] = useState([]);

  const handleProductClick = (product) => {
    navigate("/product", {state : product});
  };  

      

  // Get produts data from API 
    useEffect(() => {
      fetch("http://localhost:3001/products")
        .then((response) => response.json())
        .then((data) => setGetdataproducts(data));
    }, []);

 
    // shoping product
    const handleChangePage = (nom,price,img1) => {
      axios
        .post("http://localhost:3001/cart", {
          name: nom,
          image: img1,
          price: price,
        })
        .then((data) => console.log(data));
    };

  return (
    <section className="section product" id="shop" aria-label="product">
      <div className="container">
        <h2 className="h2 section-title">
          <span className="span">Best</span> Seller
        </h2>

        <ul className="grid-list">
          {getdataproducts.map((eo) => {            
            const imgProduct = eo.imgProduct || {};
            const img1 = imgProduct.img1
              ? `${process.env.PUBLIC_URL}${imgProduct.img1}`
              : "";
            const img2 = imgProduct.img2
              ? `${process.env.PUBLIC_URL}${imgProduct.img2}`
              : "";

            return (
                <li style={{cursor: "pointer"}} key={eo.id} onClick={() => handleProductClick(eo)}>
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
                        onClick={()=> {handleChangePage(eo.name,eo.price,img1)}}
                      >
                        <i style={{fontSize: "16px"}} class="fa-solid fa-cart-plus"></i>
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

                      <h3 className="h3">
                        <a href="#" className="card-title">
                          {eo.name}
                        </a>
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
    </section>
  );
}
export default Products;
