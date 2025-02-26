import React, { createContext, useEffect, useState } from "react";
import "./AdminPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfermationDeleteModal from "./ConfirmationDeleteModal";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const SendData = createContext();

function AdminPage() {
  const [activeSection, setActiveSection] = useState("productList");
  const navigate = useNavigate();

  // Logout function
  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="admin-page">
      <nav className="navbar-admin">
        <div className="logo-admin">E-SHOP</div>

        <div className="admintoggle-adminpage" onClick={toggleMenu}>
          <img
            className="img-admintoggle-adminpage"
            src={`${process.env.PUBLIC_URL}/DSC06699.png`}
            alt=""
          />
          <div>
            <button className="menu-button-adminpage">Yahya Tirsi</button>
            <p style={{ color: "gray" }}>Admin</p>
          </div>
          <span className="arrow">
            {isOpen ? (
              <i
                style={{ marginLeft: "1rem" }}
                class="fa-solid fa-caret-up"
              ></i>
            ) : (
              <i
                style={{ marginLeft: "1rem" }}
                class="fa-solid fa-caret-down"
              ></i>
            )}
          </span>
          {isOpen && (
            <div className="dropdown-adminpage">
              <ul className="menu-list-adminpage">
                <li onClick={() => setActiveSection("acount")}>
                  <i
                    style={{ marginRight: "1rem" }}
                    class="fa-solid fa-user"
                  ></i>{" "}
                  Manage acount
                </li>
                <li>
                  <i
                    style={{ marginRight: "1rem" }}
                    class="fa-solid fa-gear"
                  ></i>{" "}
                  Setting
                </li>
                {/* Add more items as needed */}
              </ul>

              <hr></hr>
              <button className="logout-adminpage" onClick={handleLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="container-admin">
        <aside className="sidebar-admin">
          <p className="para-admin">NAVIGATION</p>
          <ul>
            <li onClick={() => setActiveSection("home")}>
              <i class="fa-solid icon-admin fa-house"></i>
              Home
            </li>
            <p className="para-admin">PRODUCT</p>
            <li onClick={() => setActiveSection("productList")}>
              <i class="fa-brands icon-admin fa-product-hunt"></i>
              Product list
            </li>
            <li onClick={() => setActiveSection("addProduct")}>
              <i class="fa-solid icon-admin fa-plus"></i>
              Add Product
            </li>
            <p className="para-admin">CATEGORY</p>
            <li onClick={() => setActiveSection("categoryList")}>
              <i class="fa-solid icon-admin fa-layer-group"></i>
              Category list
            </li>
            <li onClick={() => setActiveSection("addCategory")}>
              <i class="fa-solid icon-admin fa-folder-plus"></i>
              Add Category
            </li>
            <p className="para-admin">Orders</p>
            <li onClick={() => setActiveSection("commandesList")}>
              <i class="fa-solid icon-admin fa-folder-plus"></i>
              Orders list
            </li>
            <p className="para-admin">Users</p>
            <li onClick={() => setActiveSection("userList")}>
              <i class="fa-solid icon-admin fa-folder-plus"></i>
              Users list
            </li>
          </ul>
        </aside>

        <main className="content-admin">
          {activeSection === "productList" && <ProductList />}
          {activeSection === "addProduct" && <AddProduct />}
          {activeSection === "categoryList" && <CategoryList />}
          {activeSection === "addCategory" && <AddCategory />}
          {activeSection === "commandesList" && <CommandesList />}
          {activeSection === "userList" && <UserList />}
          {activeSection === "home" && <Home />}
          {activeSection === "acount" && <Acount />}
          {activeSection === "oders-user" && <OrdersUsers />}
        </main>
      </div>
    </div>
  );
}

// Components for each section
function Acount() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Yahya Tirsi",
    email: "yahya@gmail.com",
    phone: "0644356664",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login-admin");
  }

  return (
    <div className="user-account-container">
      <h1>Account</h1>
      <div className="account-details">
        <label>
          Name:
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </label>
        <label>
          Email:
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </label>
        <label>
          Phone:
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </label>
        <div className="buttons">
          <button onClick={handleEditToggle} className="edit-button">
            {isEditing ? "Save" : "Edit Profile"}
          </button>
          <button className="logout-adminpage" onClick={handleLogout}>
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-adminpage">
      <h1 className="h2-admin">
        Welcome Back <span style={{ color: "orangered" }}>Yahya</span>
      </h1>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Fetch products
  const fetchProducts = () => {
    fetch("http://localhost:5000/api/produits")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = () => {
    if (productToDelete) {
      fetch(`http://localhost:5000/api/produits/${productToDelete}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          fetchProducts();
          setIsModalOpen(false);
          setProductToDelete(null);
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <div>
      {isAddingProduct ? (
        <AddProduct />
      ) : (
        <div>
          <div className="top-add-shopingcart">
            <h2 className="h2-admin">Product List</h2>
            <button onClick={() => setIsAddingProduct(true)}>
              <i className="fa-solid fa-plus"></i> Add product
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Types</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.img_produit?.img1}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <div className="types-adminpage">Active</div>
                  </td>
                  <td title={product.name}>{product.name.slice(0, 5)}...</td>
                  <td>{product.price} DH</td>
                  <td>{product.discount} %</td>
                  <td>{product.categorie}</td>
                  <td title={product.desc}>{product.desc.slice(0, 10)}...</td>
                  <td>
                    <div className="btn-actions-adminpage">
                      <button
                        className="btn-view-product-adminpage"
                        title="Update product"
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                      <button
                        className="btn-view-product-adminpage"
                        title="View Product"
                      >
                        <i
                          className="fa-solid fa-eye"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                      <button
                        className="btn-trash-product-adminpage"
                        onClick={() => {
                          setProductToDelete(product._id);
                          setIsModalOpen(true);
                        }}
                        title="Delete Product"
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <ConfermationDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function AddProduct() {
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [fileImage, setFileImage] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });

  // Create Hooks to send data
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [qte, setQte] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState({});
  const [imageCategory, setImagecategory] = useState("");

  // Send data to API
  function sendInfoproduct(event) {
    event.preventDefault();
    const imgProduct = ["img1", "img2", "img3", "img4"]
      .filter((imgKey) => fileImage[imgKey])
      .map((imgKey) => URL.createObjectURL(fileImage[imgKey]));

    axios
      .post("http://localhost:5000/api/produits", {
        name: name,
        img_produit: imgProduct,
        qte_produit: qte,
        discount: discount,
        desc: description,
        categorie: category,
        price: price,
      })
      .then((data) => console.log(data));

    cancelAllImages();
    console.log("Product added!");
  }

  function handleImageUpload(eo) {
    eo.preventDefault();

    // Récupérer le fichier en fonction de la méthode d'entrée (glisser-déposer ou sélection via input)
    const file =
      eo.type === "drop" ? eo.dataTransfer.files[0] : eo.target.files[0];

    if (file && file.type.startsWith("image/")) {
      for (let i = 1; i <= 4; i++) {
        if (!fileImage[`img${i}`]) {
          setFileImage((prevState) => ({
            ...prevState,
            [`img${i}`]: file,
          }));
          break;
        }
      }
    } else {
      alert("Veuillez télécharger un fichier image valide.");
    }
  }

  function handleDragOver(eo) {
    eo.preventDefault();
  }

  function deleteImage(imgKey) {
    setFileImage((prevState) => ({
      ...prevState,
      [imgKey]: null,
    }));
  }

  // Fonction pour annuler toutes les images téléchargées
  function cancelAllImages() {
    setFileImage({
      img1: null,
      img2: null,
      img3: null,
      img4: null,
    });
    setInputValue("");
  }

  const handleInputChange = (e) => {
    const { value } = e.target.value;
    if (inputValue === "") {
      setInputValue(value);
    }
  };

  // const [productname, setProductname] = useState("");
  // function handlechangeName(eo) {
  //   setProductname(eo.target.value);
  // }

  return (
    <div>
      <div className="addprobtn-admin">
        <h2 className="h2-admin">Add Products</h2>
        <div className="btn-publish-cancel-admin">
          <button
            className="cancel-admin"
            onClick={() => {
              cancelAllImages();
            }}
          >
            Cancel
          </button>
          <button onClick={sendInfoproduct}>Publish Product</button>
        </div>
      </div>

      <div className="add-product-admin">
        <div className="add-product-form-admin">
          <form>
            <div className="form-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputValue}
                placeholder="Enter product name"
                onChange={(eo) => {
                  handleInputChange(eo);
                  // handlechangeName(eo);
                  setName(eo.target.value);
                }}
                required
              />
            </div>

            <div className="qtyCaty-admin">
              <div className="form-group-admin">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={inputValue}
                  placeholder="Enter price"
                  onChange={(eo) => {
                    handleInputChange(eo);
                    setPrice(eo.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-group-admin">
                <label htmlFor="discount">Discount</label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={inputValue}
                  placeholder="Enter discount"
                  onChange={(eo) => {
                    handleInputChange(eo);
                    setDiscount(eo.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="qtyCaty-admin">
              <div className="form-group-admin">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={inputValue}
                  placeholder="Enter category..."
                  onChange={(eo) => {
                    handleInputChange(eo);
                    setCategory(eo.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-group-admin">
                <label htmlFor="qty">Qty</label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  value={inputValue}
                  placeholder="Enter Qty"
                  onChange={(eo) => {
                    handleInputChange(eo);
                    setQte(eo.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={inputValue}
                placeholder="Enter description"
                onChange={(eo) => {
                  handleInputChange(eo);
                  setDescription(eo.target.value);
                }}
                required
              />
            </div>
          </form>
        </div>

        <div className="add-images-admin">
          <div className="add-image-product-admin">
            <div className="img-product-admin">
              <div className="apload-info-admin">
                <p>
                  <b>Upoad Image</b>
                </p>
                <i
                  class="fa-solid fa-circle-info info-icon-upload"
                  data-tooltip="Upload an image file by dragging and dropping it into the designated area or by selecting it from your device. Supported file types include JPEG, PNG, and GIF. For best results, please ensure the image size does not exceed 5MB."
                ></i>
              </div>

              <div className="content-uploadfile-info-admin">
                <div
                  className="upload-img-product-admin"
                  onDrop={handleImageUpload}
                  onDragOver={handleDragOver}
                >
                  {file ? (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded Preview"
                        className="uploaded-image"
                      />
                      <i
                        className="fa-solid fa-circle-xmark delete-icon-admin"
                        onClick={deleteImage}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-images img-upload-file-admin"></i>
                      <h3>Drag and drop file here</h3>
                      <p>You can just upload (4 image max)</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="images-uploads">
            <div
              className="image-UP-admin"
              onDrop={handleImageUpload}
              onDragOver={handleDragOver}
            >
              {["img1", "img2", "img3", "img4"].map((imgKey) => (
                <div key={imgKey} className="image-UP-admin">
                  {fileImage[imgKey] ? (
                    <>
                      <img
                        src={URL.createObjectURL(fileImage[imgKey])}
                        alt="Uploaded Preview"
                        className="uploaded-image"
                      />
                      <i
                        className="fa-solid fa-circle-xmark delete-icon-admin"
                        onClick={() => deleteImage(imgKey)}
                      ></i>
                    </>
                  ) : (
                    <i className="fa-solid fa-image image-upload-file-admin"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryList() {
  const [getdata, setGetdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    deleteProduct();
  }, []);

  // function get products
  const deleteProduct = () => {
    fetch("http://localhost:5000/api/categories")
      .then((reponse) => reponse.json())
      .then((data) => setGetdata(data));
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (productToDelete) {
      fetch(`http://localhost:5000/api/categories/${productToDelete}`, { method: "DELETE" })
        .then((reponse) => reponse.json())
        .then((data) => deleteProduct());
        setProductToDelete(null);
    }
  };
  return (
    <div>
      <div>
        <h2 className="h2-admin">Category List</h2>
        <table>
          <tr>
            <th>Image</th>
            <th>Types</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {getdata.map((eo) => (
            <tr>
              <td>
                <img src={eo.imageCategory} alt={eo.imageCategory} />
              </td>
              <td>
                <div className="types-adminpage">Active</div>
              </td>
              <td>{eo.nameCategory}</td>
              <td title={eo.description}>{eo.description.slice(0, 16)}...</td>
              {/* <button></button> */}
              <td>
                <div className="btn-actions-adminpage">
                  <button class="btn-view-product-adminpage">
                    <i style={{ color: "white" }} class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="btn-trash-product-adminpage"
                    onClick={() => {
                      setProductToDelete(eo._id);
                      setIsModalOpen(true);
                    }}
                  >
                    <i style={{ color: "white" }} class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
      {isModalOpen && (
        <ConfermationDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function CommandesList() {
  const [getdata, setGetdata] = useState([]);

  useEffect(() => {
    deleteProduct();
  }, []);

  // function get products
  const deleteProduct = () => {
    fetch("http://localhost:5000/api/commandes")
      .then((reponse) => reponse.json())
      .then((data) => setGetdata(data));
  };

  const handleDelete = (eo) => {
    alert(`Are you shure you want to delete product id : ${eo}`);
    fetch(`http://localhost:5000/api/commandes/${eo}`, { method: "DELETE" })
      .then((reponse) => reponse.json())
      .then((data) => deleteProduct());
  };

  return (
    <div>
      <div>
        <h2 className="h2-admin">Commandes List</h2>
        <table>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Total price</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {getdata.map((eo) => (
            <tr>
              <td>{eo.client.username}</td>
              <td>
                <div className="types-adminpage">{eo.status}</div>
              </td>
              <td>{eo.totalPrice} DH</td>
              <td>
                {formatDistanceToNow(new Date(eo.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </td>

              {/* <button></button> */}
              <td>
                <div className="btn-actions-adminpage">
                  <button class="btn-view-product-adminpage">
                    <i style={{ color: "white" }} class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="btn-trash-product-adminpage"
                    onClick={() => {
                      handleDelete(eo._id);
                    }}
                  >
                    <i style={{ color: "white" }} class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

function OrdersUsers() {
  const [getdata, setGetdata] = useState([]);

  useEffect(() => {
    deleteProduct();
  }, []);

  // function get products
  const deleteProduct = () => {
    fetch("http://localhost:5000/api/clients")
      .then((reponse) => reponse.json())
      .then((data) => setGetdata(data));
  };

  // const handleDelete = (eo) => {
  //   alert(`Are you shure you want to delete product id : ${eo}`);
  //   fetch(`http://localhost:5000/api/commandes/${eo}`, { method: "DELETE" })
  //     .then((reponse) => reponse.json())
  //     .then((data) => deleteProduct());
  // };
  return (
    <div>
      <div>
        <h2 className="h2-admin">User {}</h2>
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* <th>Actions</th> */}
          </tr>
          {getdata.map((eo) => (
            <tr>
              <td>{eo.username}</td>
              <td>{eo.email}</td>

              {/* <button></button> */}
              {/* <td>
                <div className="btn-actions-adminpage">
                  <button class="btn-view-product-adminpage">
                    <i style={{ color: "white" }} class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="btn-trash-product-adminpage"
                    onClick={() => {
                      handleDelete(eo._id);
                    }}
                  >
                    <i style={{ color: "white" }} class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

function UserList() {
  const [getdata, setGetdata] = useState([]);

  useEffect(() => {
    deleteProduct();
  }, []);

  // function get products
  const deleteProduct = () => {
    fetch("http://localhost:5000/api/clients")
      .then((reponse) => reponse.json())
      .then((data) => setGetdata(data));
  };

  // const handleDelete = (eo) => {
  //   alert(`Are you shure you want to delete product id : ${eo}`);
  //   fetch(`http://localhost:5000/api/commandes/${eo}`, { method: "DELETE" })
  //     .then((reponse) => reponse.json())
  //     .then((data) => deleteProduct());
  // };
  return (
    <div>
      <div>
        <h2 className="h2-admin">Users List</h2>
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* <th>Actions</th> */}
          </tr>
          {getdata.map((eo) => (
            <tr>
              <td>{eo.username}</td>
              <td>{eo.email}</td>

              {/* <button></button> */}
              {/* <td>
                <div className="btn-actions-adminpage">
                  <button class="btn-view-product-adminpage">
                    <i style={{ color: "white" }} class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="btn-trash-product-adminpage"
                    onClick={() => {
                      handleDelete(eo._id);
                    }}
                  >
                    <i style={{ color: "white" }} class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

function AddCategory() {
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the image file for uploading

  // Iamge liks for imgure
  const [imgLink, setImgLink] = useState("");

  // Alert succes message
  const [sucesMessage, setsucesMessage] = useState(false);
  // Alert danger message
  const [dangererror, setdangererror] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleChangeImage = (evt) => {
    var file = evt.target.files[0];
    const data = new FormData();
    data.append("image", file);
    const config = {
      headers: {
        Authorization: "Client-ID c18c5d2eda99431",
      },
    };
    axios
      .post("https://api.imgur.com/3/image", data, config)
      .then((res) => {
        console.log("imgur link image: " + res.data.data.link);
        setImgLink(res.data.data.link);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Upload Function to Send Data to API
  const handleUpload = async () => {
    try {
      await axios.post("http://localhost:5000/api/categories", {
        nameCategory: inputValue,
        imageCategory: imgLink,
        description: description,
      });
      setsucesMessage(!sucesMessage);
      cancelProductInfo();
    } catch (error) {
      setdangererror(!dangererror);
    }
  };

  // Handle drag and drop file upload
  const addImage = (eo) => {
    eo.preventDefault();
    const droppedFile = eo.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile); // Update file state with dropped image
      setSelectedImage(droppedFile);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Prevent default handling for drag events
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Delete image handler
  const deleteImage = () => {
    setFile(null);
    setSelectedImage(null);
  };

  // Cancel product information and image
  const cancelProductInfo = () => {
    setFile(null);
    setInputValue("");
    setDescription("");
    setSelectedImage(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle form submit to add category
  // const sendProductInfo = () => {
  //   axios
  //     .post("http://localhost:5000/api/categories", {
  //       nameCategory: inputValue,
  //       description: description,
  //       imageCategory: imageUrl,
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       alert("Category added successfully!");
  //       cancelProductInfo();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Error adding category");
  //     });
  // };

  return (
    <div>
      <div className="addprobtn-admin">
        <h2 className="h2-admin">Add Categories</h2>
        <div className="btn-publish-cancel-admin">
          <button className="cancel-admin" onClick={cancelProductInfo}>
            Cancel
          </button>
          <button onClick={handleUpload}>Publish Category</button>
        </div>
      </div>
      <div className="add-product-admin">
        <div className="add-product-form-admin">
          <form>
            <div className="form-group-admin">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputValue}
                placeholder="Enter category name"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                placeholder="Enter description"
                onChange={handleDescriptionChange}
                required
              />
            </div>
          </form>
        </div>

        <div className="add-images-admin">
          <div className="add-image-product-admin">
            <div className="img-product-admin">
              <div className="apload-info-admin">
                <p>
                  <b>Upload Image</b>
                </p>
                <i
                  className="fa-solid fa-circle-info info-icon-upload"
                  data-tooltip="Upload an image file by dragging and dropping it into the designated area or by selecting it from your device. Supported file types include JPEG, PNG, and GIF. For best results, please ensure the image size does not exceed 5MB."
                ></i>
              </div>

              <div className="content-uploadfile-info-admin">
                <div
                  className="upload-img-product-admin"
                  onDrop={addImage}
                  onDragOver={handleDragOver}
                  onChange={handleImageChange}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleChangeImage}
                    style={{ display: "none" }}
                  />

                  {selectedImage ? (
                    <>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded Preview"
                        className="uploaded-image-category"
                      />
                      <i
                        className="fa-solid fa-circle-xmark delete-icon-admin"
                        onClick={deleteImage}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-images img-upload-file-admin"></i>
                      <h3>Drag and drop file here</h3>
                      <p>You can upload 1 image (max)</p>
                    </>
                  )}
                </div>
                {/* Suces message when added category */}
                {sucesMessage && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="alert-category-added-sucecfully">
                      ​✔️​ Category added successfully
                    </div>
                  </div>
                )}
                {/* danger message when added category */}
                {dangererror && (
                  <div className="alerte-erreur">
                    ❌ Une erreur est survenue, veuillez réessayer !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
