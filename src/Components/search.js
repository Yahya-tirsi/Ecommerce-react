import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dataproduct } from "./data";
import Navbar from "./navbar";

function Search() {
  const data = useContext(Dataproduct); // Assuming you have a context for products

  const [text, setText] = useState(""); // Search input text
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const [minOrder, setMinOrder] = useState(500);
  const [priceRange, setPriceRange] = useState([100, 6000]);
  const [getdataproducts, setGetdataproducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // For input price
  const [changeprice, setChangeprice] = useState("");

  // Get products data from API
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setGetdataproducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Filter by price
  const handleChangeprice = (eo) => {
    const price = eo.target.value;
    setChangeprice(price);

    const filterprice = getdataproducts.map((eo) =>
      eo.price.toString().includes(price)
    );
    setFilteredProducts(filterprice);
  };

  // console.log(filteredProducts);

  // Filter products based on the `text` state
  useEffect(() => {
    if (text.length === 0) {
      setFilteredProducts(getdataproducts);
      return;
    }

    const filtered = getdataproducts.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    console.log(filtered);

    setFilteredProducts(filtered);
  }, [text, getdataproducts]);

  // Handle category filtering
  const handleChangeCategory = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategory(isChecked ? category : "");

    if (isChecked) {
      // Filter products based on the selected category
      const filtered = getdataproducts.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      // Return other all
      setFilteredProducts(getdataproducts);
    }
  };

  // Navigation to product details
  const handleProductClick = (product) => {
    navigate("/product", { state: product });
  };

  return (
    <div>
      <Navbar />

      <nav
        className="section slider-search"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/sidebar-product.svg`,
        }}
      ></nav>

      <div className="content-product-search">
        <div
          className="sidebar"
          style={{
            width: "250px",
            padding: "20px",
            borderRight: "1px solid #ddd",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h3>Filter</h3>

          <div className="filter-section">
            <p>
              <b>By categories</b>
            </p>
            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value={selectedCategory}
                checked={selectedCategory === `${selectedCategory}`}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">All</span>
            </label>
            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value="Travel Backpacks"
                checked={selectedCategory === "Travel Backpacks"}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">Travel Backpacks</span>
            </label>
            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value="School Backpacks"
                checked={selectedCategory === "School Backpacks"}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">School Backpacks</span>
            </label>
            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value="Laptop Backpacks"
                checked={selectedCategory === "Laptop Backpacks"}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">Laptop Backpacks</span>
            </label>
            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value="Business Backpacks"
                checked={selectedCategory === "Business Backpacks"}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">Business Backpacks</span>
            </label>

            <label id="label-category-search">
              <input
                className="input-category-search"
                type="checkbox"
                value="Fashion Backpacks"
                checked={selectedCategory === "Fashion Backpacks"}
                onChange={handleChangeCategory}
              />
              <span className="custom-checkbox"></span>
              <span className="input-category-label">Fashion Backpacks</span>
            </label>
          </div>
          <hr />

          <div className="filter-section">
            <p>
              <b>By price</b>
            </p>
            <div className="price-range">
              <input
                className="input-price-search"
                type="number"
                value={changeprice}
                onChange={handleChangeprice}
                placeholder="Filter price"
              />
            </div>
          </div>

          {/* <div className="filter-section">
            <h4>Product Types</h4>
            <label>
              <input type="checkbox" /> Ready to Ship
            </label>
            <label>
              <input type="checkbox" /> Paid Samples
            </label>
          </div>

          <div className="filter-section">
            <h4>Condition</h4>
            <label>
              <input type="radio" name="condition" /> New Stuff
            </label>
            <label>
              <input type="radio" name="condition" /> Second Hand
            </label>
          </div> */}

          {/* <div className="filter-section">
            <h4>Min Order</h4>
            <input
              type="range"
              min="10"
              max="1000"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="range-input-search"
            />
            <p>Min Order: {minOrder}</p>
          </div> */}
        </div>

        <div className="content-search">
          <div className="top-bar-search">
            <p>
              <b>{selectedCategory}</b>
            </p>
          </div>
          <ul className="grid-list grid-list-search">
            {filteredProducts.length === 0 ? (
              <h1 style={{ textAlign: "center" }}>No products found</h1>
            ) : (
              filteredProducts.map((product) => {
                const imgProduct = product.imgProduct || {};
                const img1 = imgProduct.img1
                  ? `${process.env.PUBLIC_URL}/${imgProduct.img1}`
                  : "";
                const img2 = imgProduct.img2
                  ? `${process.env.PUBLIC_URL}/${imgProduct.img2}`
                  : "";

                return (
                  <li
                    style={{ cursor: "pointer" }}
                    key={product.id}
                    onClick={() => handleProductClick(product)}
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
                            alt={product.name}
                            className="img-cover default"
                          />
                        )}
                        {img2 && (
                          <img
                            src={img2}
                            width="360"
                            height="360"
                            loading="lazy"
                            alt={product.name}
                            className="img-cover hover"
                          />
                        )}
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
                          <a href="#" className="card-title">
                            {product.name}
                          </a>
                        </h3>

                        <data className="card-price" value={product.price}>
                          {product.price} DH
                        </data>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        {/* Product listing */}
      </div>
    </div>
  );
}

export default Search;
