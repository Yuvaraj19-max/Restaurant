document.addEventListener("DOMContentLoaded", () => {
  const menu = [
    { name: "Espresso", price: 120, category: "coffee", image: "./images/Espresso.png", description: "Strong and rich" },
    { name: "Cappuccino", price: 180, category: "coffee", image: "./images/Cappuccino.png", description: "Creamy and smooth" },
    { name: "Latte", price: 200, category: "coffee", image: "./images/Latte1.webp", description: "Milk and coffee" },
    { name: "Premium Cappuccino", price: 299, category: "special", image: "./images/coffee pre.webp", description: "Arabica beans with steamed milk and rich foam" }
  ];

  const menuContainer = document.getElementById("memu-container");
  const searchInput = document.getElementById("menu-search");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartSummary = document.getElementById("cart-summary");
  const CART_KEY = "coffeeHouseCart";

  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function renderMenu() {
    const term = searchInput.value.trim().toLowerCase();
    const active = document.querySelector(".active-filter")?.dataset.category || "all";
    const filtered = menu.filter(item =>
      (active === "all" || item.category === active) &&
      item.name.toLowerCase().includes(term)
    );

    menuContainer.innerHTML = filtered.length ? filtered.map(item => `
      <article class="memu-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">₹${item.price}</p>
        <button class="order-btn" data-name="${item.name}">Add to Order</button>
      </article>
    `).join("") : `<p class="no-results">No coffee found.</p>`;

    menuContainer.querySelectorAll(".order-btn").forEach(button => {
      button.addEventListener("click", () => {
        const item = menu.find(product => product.name === button.dataset.name);
        const existing = cart.find(product => product.name === item.name);
        if (existing) existing.qty += 1;
        else cart.push({ ...item, qty: 1 });
        saveCart();
        renderCart();
        showToast(`${item.name} added to order`);
      });
    });
  }

  function renderCart() {
    if (!cart.length) {
      cartItems.innerHTML = "<p>Your order is empty. Add a coffee from the menu.</p>";
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-row">
          <span>${item.name}</span>
          <span>₹${item.price} × ${item.qty}</span>
          <button class="cart-remove" data-name="${item.name}" aria-label="Remove ${item.name}">−</button>
        </div>
      `).join("");
    }

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartSummary.textContent = `Cart: ${totalQty} item${totalQty === 1 ? "" : "s"}`;
    cartTotal.textContent = `Total: ₹${total}`;

    cartItems.querySelectorAll(".cart-remove").forEach(button => {
      button.addEventListener("click", () => {
        const item = cart.find(product => product.name === button.dataset.name);
        if (!item) return;
        item.qty -= 1;
        if (item.qty <= 0) cart = cart.filter(product => product.name !== item.name);
        saveCart();
        renderCart();
      });
    });
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  }

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active-filter"));
      button.classList.add("active-filter");
      renderMenu();
    });
  });

  searchInput.addEventListener("input", renderMenu);

  document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  document.querySelector("#contact form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !message) {
      showToast("Please complete all contact fields");
      return;
    }
    event.target.reset();
    showToast("Message sent successfully!");
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  renderMenu();
  renderCart();
});