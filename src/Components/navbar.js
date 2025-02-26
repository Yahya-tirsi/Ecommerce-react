import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = (props) => {
  // in mobile
  const [isMobile, setIsMobile] = useState(false);
  // When scrolling down
  const [scrolled, setScrolled] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [getdataproducts, setGetdataproducts] = useState([]);

  // Get data cart
  const [getdatacart, setGetdatacart] = useState([]);

  // Navigate when i search
  const navigate = useNavigate();

  // Get products data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/produits")
      .then((response) => response.json())
      .then((data) => setGetdataproducts(data));
  }, []);

  // Get cart data from API
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const res = await axios.get(
          `http://localhost:5000/api/cart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGetdatacart(res.data);
      } catch (err) {
        console.log("Failed to fetch orders. Please try again.");
      }
    };

    fetchUserOrders();
  }, []);

  // Handle logout
  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    navigate("/login-user");
  };

  // Handle changes in the input field
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredSuggestions = getdataproducts.filter(
        (suggestion) =>
          suggestion.name &&
          suggestion.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle when a user clicks on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    navigate("/search", { state: `${suggestion.name}` });
  };

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="header"
      data-header
      style={{ backgroundColor: `${props.background}` }}
    >
      <div className="container">
        <button
          className="nav-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <i class="fa-solid fa-bars"></i>
        </button>

        <Link to="/" className="logo">
          <img
            className="imgLogo"
            src={`${process.env.PUBLIC_URL}/online_shopping-removebg-preview.png`}
            alt="Logo"
          />
        </Link>

        <nav className={`navbar ${isMobile ? "active" : ""}`} data-navbar>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link
                style={{ color: `${props.color}` }}
                to="/"
                className="navbar-link"
              >
                Home
              </Link>
            </li>

          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-content">
            <div className="searchBox">
              <input
                className="searchInput"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search something"
              />
              <button className="searchButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2_17)">
                    <g filter="url(#filter0_d_2_17)">
                      <path
                        d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        shapeRendering="crispEdges"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_17"
                      x="-0.418549"
                      y="3.70435"
                      width="29.7139"
                      height="29.7139"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_17"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_17"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <clipPath id="clip0_2_17">
                      <rect
                        width="28.0702"
                        height="28.0702"
                        fill="white"
                        transform="translate(0.403503 0.526367)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              {showSuggestions && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    listStyleType: "none",
                    padding: "0",
                    margin: "4px 0 0 0",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                >
                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {suggestion.name}
                      </li>
                    ))
                  ) : (
                    <li style={{ padding: "8px", color: "gray" }}>
                      <i className="fa-solid fa-magnifying-glass-minus"></i> Not
                      found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <button
            className="action-btn user"
            aria-label="User"
            onClick={() => handleLogout()}
          >
            <i
              className="fa-solid fa-user"
              style={{ color: `${props.color}` }}
            ></i>
          </button>

          <button className="action-btn" aria-label="cart">
            <Link to="/shoping-cart">
              <i
                className="fa-solid fa-cart-shopping"
                style={{ color: `${props.color}` }}
              ></i>
            </Link>
            <span className="btn-badge">{getdatacart.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
