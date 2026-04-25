const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    image: "assets/images/iphone.png", // Using the generated high quality logo
    featured: true,
    condition: "New",
    specs: {
      screen: "6.7\" Super Retina XDR OLED, 120Hz",
      chip: "A17 Pro (3 nm)",
      camera: "48MP Main | 12MP 5x Telephoto | 12MP Ultrawide",
      battery: "4422 mAh, Up to 29 hrs video"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    image: "assets/images/s24_ultra.png", 
    featured: true,
    condition: "New",
    specs: {
      screen: "6.8\" Dynamic LTPO AMOLED 2X, 120Hz",
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main | 50MP 5x Telephoto | 10MP 3x | 12MP Ultra",
      battery: "5000 mAh, 45W wired charging"
    }
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999,
    image: "assets/images/pixel8.png",
    featured: true,
    condition: "New",
    specs: {
      screen: "6.7\" Super Actua LTPO OLED, 120Hz",
      chip: "Google Tensor G3 (4 nm)",
      camera: "50MP Main | 48MP 5x Telephoto | 48MP Ultrawide",
      battery: "5050 mAh, 30W wired charging"
    }
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Fold 5 (Used)",
    brand: "Samsung",
    price: 899,
    image: "assets/images/fold5.png",
    featured: false,
    condition: "Good",
    specs: {
      screen: "7.6\" Foldable Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Gen 2",
      camera: "50MP Main | 10MP 3x Telephoto | 12MP Ultrawide",
      battery: "4400 mAh, 25W wired"
    }
  }
];

const categories = [
  { name: "Apple", icon: "fa-brands fa-apple" },
  { name: "Samsung", icon: "fa-brands fa-android" },
  { name: "Used Phones", icon: "fa-solid fa-recycle" },
  { name: "Accessories", icon: "fa-solid fa-headphones" }
];

let cart = JSON.parse(localStorage.getItem('saf_cart')) || [];
