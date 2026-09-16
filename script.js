document.addEventListener("DOMContentLoaded", () => {
  const menu = [
    { name: "Pizza", price: 249, category: "pizza", image: "./images/Pizza img.webp", description: "Cheesy and freshly baked" },
    { name: "Burger", price: 199, category: "main", image: "./images/Burger.webp", description: "Juicy and delicious" },
    { name: "Pasta", price: 229, category: "main", image: "./images/Pasta.webp", description: "Creamy and comforting" },
    { name: "Chicken Biryani", price: 299, category: "main", image: "./images/delicious-chicken-biryani-png.webp", description: "Aromatic and flavorful" }
  ];

  const container = document.querySelector(".memu-container");
  const search = document.getElementById("menu-search");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartSummary = document.getElementById("cart-summary");
  const CART_KEY = "findYourPlaceCart";
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  function save() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function renderMenu() {
    const active = document.querySelector(".active-filter")?.dataset.category || "all";
    const term = search.value.trim().toLowerCase();
    const filtered = menu.filter(item =>
      (active === "all" || item.category === active) &&
      item.name.toLowerCase().includes(term)
    );

    container.innerHTML = filtered.length ? filtered.map(item => `
      <article class="memu-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3><p>${item.description}</p>
        <p class="price">₹${item.price}</p>
        <button class="order-btn" data-name="${item.name}">Add to Order</button>
      </article>
    `).join("") : "<p class='no-results'>No matching dishes found.</p>";

    container.querySelectorAll(".order-btn").forEach(button => {
      button.addEventListener("click", () => {
        const item = menu.find(product => product.name === button.dataset.name);
        const existing = cart.find(product => product.name === item.name);
        if (existing) existing.qty++;
        else cart.push({ ...item, qty: 1 });
        save(); renderCart(); toast(`${item.name} added`);
      });
    });
  }

  function renderCart() {
    cartItems.innerHTML = cart.length ? cart.map(item => `
      <div class="cart-row">
        <span>${item.name}</span><span>₹${item.price} × ${item.qty}</span>
        <button class="cart-remove" data-name="${item.name}">−</button>
      </div>
    `).join("") : "<p>Your order is empty.</p>";

    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartSummary.textContent = `Cart: ${qty} item${qty === 1 ? "" : "s"}`;
    cartTotal.textContent = `Total: ₹${total}`;

    cartItems.querySelectorAll(".cart-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = cart.find(product => product.name === btn.dataset.name);
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(product => product.name !== item.name);
        save(); renderCart();
      });
    });
  }

  function toast(message) {
    const el = document.createElement("div");
    el.className = "toast"; el.textContent = message;
    document.body.appendChild(el); setTimeout(() => el.remove(), 1800);
  }

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active-filter"));
      button.classList.add("active-filter"); renderMenu();
    });
  });
  search.addEventListener("input", renderMenu);
  document.getElementById("clear-cart").addEventListener("click", () => { cart=[]; save(); renderCart(); });

  const bookingForm = document.querySelector("#book form");
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("book").querySelector("#name").value.trim();
    const phone = document.getElementById("book").querySelector("#phone").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guest").value.trim();
    if (!name || !phone || !date || !time || !guests) return toast("Please complete booking details");
    if (!/^[0-9]{10}$/.test(phone)) return toast("Enter a valid 10-digit phone number");
    localStorage.setItem("lastBooking", JSON.stringify({name, phone, date, time, guests}));
    bookingForm.reset(); toast("Table booked successfully!");
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) { event.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
    });
  });

  renderMenu(); renderCart();
});