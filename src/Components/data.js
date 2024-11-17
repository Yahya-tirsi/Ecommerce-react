import { createContext } from "react";
// import Navbar from "./navbar";
// import Search from "./search";
import CategoryProducts from "./CategoryProducts";
// import { SendData } from "./Admin/AdminPage";
export const Dataproduct = createContext();
export const DataCategories = createContext();

function Data() {

  const data = [
    {
      id: 1,
      name: "Sac a dos",
      imgProduct: {
        img1: "img1(3).png",
        img2: "products/img2 (4).png",
        img3: "",
        img4: "",
      },
      image: "img1 (2).png",
      discount: 20,
      description:
        "This sleek urban backpack features multiple compartments for tech gadgets and a padded laptop sleeve, complemented by reflective strips for safety. Its minimalist design is perfect for both work and leisure.",
      category: "Travel Backpacks",
      price: "45",
    },
    {
      id: 2,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img4.jpg",
        img2: "products/img2.jpg",
        img3: "products/img3.jpg",
        img4: "img1 (2).png",
      },
      image: "img2 (2).png",
      discount: 30,
      description:
        "Built for outdoor adventures, this rugged pack offers expandable compartments, a hydration reservoir, and adjustable straps for a comfortable fit. It’s weather-resistant, making it ideal for any hiking trip.",
      category: "School Backpacks",
      price: "199",
    },
    {
      id: 3,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img7.jpg",
        img2: "products/img6.jpg",
        img3: "products/img5.jpg",
        img4: "products/img8.jpg",
      },
      image: "img3.png",
      discount: 50,
      description:
        "This versatile carry-on backpack is perfect for weekend getaways, with a spacious main compartment that opens like a suitcase. It has a padded laptop sleeve and a quick-access front pocket, meeting airline carry-on standards.",
      category: "Laptop Backpacks",
      price: "550",
    },
    {
      id: 4,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img-1.jpg",
        img2: "products/img2.webp",
        img3: "products/img4.webp",
        img4: "products/img5.jpg",
      },
      image: "img4.png",
      discount: 10,
      description:
        "Combining fashion and function, this chic tote-backpack hybrid can be carried as a tote or worn as a backpack. It features a trendy design, interior pockets for organization, and durable materials suitable for both work and casual outings.",
      category: "Business Backpacks",
      price: "329",
    },
    {
      id: 5,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img-5-1.jpg",
        img2: "products/img-5-2.jpg",
        img3: "products/img-5-3.jpg",
      },
      image: "img5.png",
      discount: 70,
      description:
        "Designed for kids, this lightweight backpack showcases vibrant colors and playful patterns. It has a spacious main compartment for books, a front pocket for snacks, and padded straps for comfort during school days.",
      category: "Fashion Backpacks",
      price: "249",
    },
    {
      id: 6,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img-6-1.jpg",
        img2: "products/img-6-2.jpg",
        img3: "products/img-6-3.jpg",
        img4: "products/imh-6-4.jpg",
      },
      image: "img5.png",
      discount: 55,
      description:
        "Perfect for fitness enthusiasts, this gym backpack includes a ventilated shoe compartment, a water bottle holder, and ample space for workout gear. The durable, moisture-resistant fabric handles sweaty clothes and gym essentials with ease.",
      category: "Fashion Backpacks",
      price: "249",
    },
    {
      id: 7,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img-7-1.jpg",
        img2: "products/img-7-2.jpg",
        img3: "products/img-7-3.jpg",
        img4: "products/imh-7-4.jpg",
      },
      image: "img5.png",
      discount: 20,
      description:
        "This sophisticated backpack blends the practicality of a briefcase with the comfort of a backpack, featuring a padded laptop compartment and organizational pockets. Its sleek exterior provides a polished look for business professionals.",
      category: "Fashion Backpacks",
      price: "249",
    },
    {
      id: 8,
      name: "Sac a dos boy",
      imgProduct: {
        img1: "products/img-8-1.jpg",
        img2: "products/img-8-2.jpg",
        img3: "products/img-8-3.jpg",
        img4: "products/imh-8-4.jpg",
      },
      image: "img5.png",
      discount: 33,
      description:
        "Ideal for camping, this large-capacity backpack boasts multiple pockets for gear organization, adjustable straps for weight distribution, and a rain cover for unexpected weather, ensuring comfort during long treks in the wilderness.",
      category: "Fashion Backpacks",
      price: "249",
    },
  ];

  const category = [
    {
      id: 1,
      nameCategory: "Travel Backpacks",
      imageCategory: "img1 (2).png",
      description: "",
    },
    {
      id: 2,
      nameCategory: "School Backpacks",
      imageCategory: "img2 (2).png",
      description: "",
    },
    {
      id: 3,
      nameCategory: "Laptop Backpacks",
      imageCategory: "img3.png",
      description: "",
    },
    {
      id: 4,
      nameCategory: "Business Backpacks",
      imageCategory: "img4.png",
      description: "",
    },
    {
      id: 5,
      nameCategory: "Business Backpacks",
      imageCategory: "img5.png",
      description: "",
    },
    {
      id: 6,
      nameCategory: "Fashion Backpacks",
      imageCategory: "",
      description: "",
    },
  ];

  return (
    <>


      
    </>
  );
}
export default Data;
