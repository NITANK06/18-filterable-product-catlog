const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    rating: 4.5,
    image: "https://via.placeholder.com/250"
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Fashion",
    price: 75,
    rating: 4.2,
    image: "https://via.placeholder.com/250"
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 120,
    rating: 4.8,
    image: "https://via.placeholder.com/250"
  },
  {
    id: 4,
    name: "Backpack",
    category: "Accessories",
    price: 45,
    rating: 3.9,
    image: "https://via.placeholder.com/250"
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "Fashion",
    price: 60,
    rating: 4.1,
    image: "https://via.placeholder.com/250"
  },
  {
    id: 6,
    name: "Keyboard",
    category: "Electronics",
    price: 80,
    rating: 4.6,
    image: "https://via.placeholder.com/250"
  }
];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");
const sortOption = document.getElementById("sortOption");

function displayProducts(items) {
  productContainer.innerHTML = "";

  if (items.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(product => {
    productContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">₹${product.price}</p>
        <p class="rating">⭐ ${product.rating}</p>
      </div>
    `;
  });
}

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(category => {
    categoryFilter.innerHTML += `
      <option value="${category}">${category}</option>
    `;
  });
}

function filterProducts() {
  let filtered = [...products];

 
  const searchText = searchInput.value.toLowerCase();
  filtered = filtered.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );


  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(
      product => product.category === categoryFilter.value
    );
  }

  // Price
  if (priceFilter.value !== "all") {
    const [min, max] = priceFilter.value.split("-").map(Number);

    filtered = filtered.filter(
      product => product.price >= min && product.price <= max
    );
  }

  
  if (ratingFilter.value !== "all") {
    filtered = filtered.filter(
      product => product.rating >= Number(ratingFilter.value)
    );
  }

  switch (sortOption.value) {
    case "priceLow":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "priceHigh":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;

    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
ratingFilter.addEventListener("change", filterProducts);
sortOption.addEventListener("change", filterProducts);

populateCategories();
displayProducts(products);
