import React, { createContext, useEffect, useState } from "react";
import "./AdminPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfermationDeleteModal from "./ConfirmationDeleteModal";

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
          </ul>
        </aside>

        <main className="content-admin">
          {activeSection === "productList" && <ProductList />}
          {activeSection === "addProduct" && <AddProduct />}
          {activeSection === "categoryList" && <CategoryList />}
          {activeSection === "addCategory" && <AddCategory />}
          {activeSection === "home" && <Home />}
          {activeSection === "acount" && <Acount />}
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
    navigate("/login");
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
    </div>
  );
}


function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products
  const fetchProducts = () => {
    fetch("http://localhost:3001/products/")
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
      fetch(`http://localhost:3001/products/${productToDelete}`, {
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
      <div className="top-add-shopingcart">
        <h2 className="h2-admin">Product List</h2>
        <button>
          <i className="fa-solid fa-plus"></i> Add product
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Id</th>
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
            <tr key={product.id}>
              <td>
                <img
                  src={product.imgProduct?.img1}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>#{product.id}</td>
              <td>
                <div className="types-adminpage">Active</div>
              </td>
              <td>{product.name}</td>
              <td>MAD {product.price}</td>
              <td>{product.discount} %</td>
              <td>{product.category}</td>
              <td>{product.description.slice(0, 200)}...</td>
              <td>
                <div className="btn-actions-adminpage">
                  <button
                    className="btn-view-product-adminpage"
                    title="Update product"
                  >
                    <i className="fa-solid fa-pen-to-square" style={{ color: "white" }}></i>
                  </button>
                  <button
                    className="btn-view-product-adminpage"
                    title="View Product"
                  >
                    <i className="fa-solid fa-eye" style={{ color: "white" }}></i>
                  </button>
                  <button
                    className="btn-trash-product-adminpage"
                    onClick={() => {
                      setProductToDelete(product.id);
                      setIsModalOpen(true);
                    }}
                    title="Delete Product"
                  >
                    <i className="fa-solid fa-trash" style={{ color: "white" }}></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  function sendInfoproduct() {
    const imgProduct = ["img1", "img2", "img3", "img4"]
      .filter((imgKey) => fileImage[imgKey]) // Filter out empty images
      .map((imgKey) => URL.createObjectURL(fileImage[imgKey]));

    axios
      .post("http://localhost:3001/products/", {
        name: name,
        imgProduct: imgProduct,
        qte: qte,
        discount: discount,
        description: description,
        category: category,
        price: price,
      })
      .then((data) => console.log(data));

    alert("Produit ajouter avec succe");
    cancelProductinfoimg();
  }

  // Function drag and drop file
  function addImage(eo) {
    eo.preventDefault();
    const droppedFile = eo.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith("image/")) {
      // Find the first empty image slot
      for (let i = 1; i <= 4; i++) {
        if (!fileImage[`img${i}`]) {
          setFileImage((prevState) => ({
            ...prevState,
            [`img${i}`]: droppedFile,
          }));
          break;
        }
      }
    } else {
      alert("Please upload a valid image file.");
    }
  }

  // Prevent default handling for drag events
  function handleDragOver(event) {
    event.preventDefault();
  }

  function deleteImage(imgKey) {
    setFileImage((prevState) => ({
      ...prevState,
      [imgKey]: "",
    }));
  }

  // function cancel product
  function cancelProductinfoimg() {
    for (let i = 1; i <= 4; i++) {
      if (fileImage[`img${i}`]) {
        setFileImage((prevState) => ({
          ...prevState,
          [`img${i}`]: null,
        }));
      }
    }
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
              cancelProductinfoimg();
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
                  onDrop={addImage}
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
              onDrop={addImage}
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

  useEffect(() => {
    deleteProduct();
  }, []);

  // function get products
  const deleteProduct = () => {
    fetch("http://localhost:3001/category/")
      .then((reponse) => reponse.json())
      .then((data) => setGetdata(data));
  };

  const handleDelete = (eo) => {
    alert(`Are you shure you want to delete product id : ${eo}`);
    fetch(`http://localhost:3001/category/${eo}`, { method: "DELETE" })
      .then((reponse) => reponse.json())
      .then((data) => deleteProduct());
  };
  return (
    <div>
      <div>
        <h2 className="h2-admin">Category List</h2>
        <table>
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Types</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          {getdata.map((eo) => (
            <tr>
              <td>
                <img src={eo.imageCategory} alt={eo.imageCategory} />
              </td>
              <td>#{eo.id}</td>
              <td>
                <div className="types-adminpage">Active</div>
              </td>
              <td>{eo.nameCategory}</td>
              {/* <button></button> */}
              <td>
                <div className="btn-actions-adminpage">
                  <button class="btn-view-product-adminpage">
                    <i style={{ color: "white" }} class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="btn-trash-product-adminpage"
                    onClick={() => {
                      handleDelete(eo.id);
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

function AddCategory() {
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the image file for uploading

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Upload Function to Send Data to API
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", imageFile); // Image file data
    formData.append("nameCategory", inputValue);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:3001/category",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      alert("Category added successfully!");
      setImageUrl(response.data.imageUrl); // Save the image URL from response
    } catch (error) {
      console.error(error);
      alert("Error adding category");
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
  const sendProductInfo = () => {
    handleUpload();
    axios
      .post("http://localhost:3001/category", {
        nameCategory: inputValue,
        description: description,
        imageCategory: imageUrl,
      })
      .then((data) => {
        console.log(data);
        alert("Category added successfully!");
        cancelProductInfo();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding category");
      });
  };

  return (
    <div>
      <div className="addprobtn-admin">
        <h2 className="h2-admin">Add Categories</h2>
        <div className="btn-publish-cancel-admin">
          <button className="cancel-admin" onClick={cancelProductInfo}>
            Cancel
          </button>
          <button onClick={sendProductInfo}>Publish Category</button>
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
                value={description} // Using description state for description field
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
                >
                  {file ? (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
