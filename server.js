// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Save files in 'public/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static files from 'public/uploads'
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Endpoint to handle category creation
app.post('/category', upload.single('image'), (req, res) => {
  const { nameCategory, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`; // Relative URL

  // TODO: Save category data to your database here, including imageUrl

  // For demonstration, we'll return the received data
  res.json({
    nameCategory,
    description,
    imageUrl,
  });
});

// Endpoint to fetch products (example)
app.get('/products', (req, res) => {
  // TODO: Fetch products from your database
  // Example response:
  res.json([
    {
      id: 1,
      name: 'Product 1',
      price: '100',
      imgProduct: {
        img1: '/uploads/product1-img1.jpg',
        img2: '/uploads/product1-img2.jpg',
      },
    },
    // Add more products as needed
  ]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
