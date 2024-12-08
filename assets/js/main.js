// Function to handle registration form submission
function handleRegistrationSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let valid = true;

  // Validate Email
  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    valid = false;
  } else {
    emailError.textContent = "";
    emailError.style.display = "none";
  }

  // Validate Password
  if (!validatePassword(password)) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }

  if (valid) {
    console.log("Registration successful");
  }
}

// Add event listener to the registration form
document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", handleRegistrationSubmit);
  }
});

/* Show Menu */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu Show */
/* Validate if it exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu Hidden */
/* Validate if it exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* Showing Cart */
const cart = document.getElementById("cart"),
  cartShop = document.getElementById("cart-shop"),
  cartClose = document.getElementById("cart-close");

/* Cart Show */
/* Validate if it exists */
if (cartShop) {
  cartShop.addEventListener("click", () => {
    cart.classList.add("show-cart");
  });
}

/*===== CART Hidden =====*/
/* Validate if it exists */
if (cartClose) {
  cartClose.addEventListener("click", () => {
    cart.classList.remove("show-cart");
  });
}

/* Increase, Decrease, Or Delete Quantity In Cart =======*/
const cartItems = document.querySelectorAll(".cart__card");

cartItems.forEach((item) => {
  const minusButton = item.querySelector(".bx-minus");
  const plusButton = item.querySelector(".bx-plus");
  const quantityElement = item.querySelector(".cart__amount-number");
  const trashButton = item.querySelector(".bx-trash-alt");

  let quantity = parseInt(quantityElement.textContent);

  // Decrease quantity
  minusButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
      updateCartTotals();
    }
  });

  // Increase quantity
  plusButton.addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
    updateCartTotals();
  });

  // Delete item
  trashButton.addEventListener("click", () => {
    item.remove();
    updateCartTotals();
  });
});

// Function to update cart totals
function updateCartTotals() {
  const cartItems = document.querySelectorAll(".cart__card");
  const totalItemsElement = document.querySelector(".cart__prices-item");
  const totalPriceElement = document.querySelector(".cart__prices-total");

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const quantityElement = item.querySelector(".cart__amount-number");
    const priceElement = item.querySelector(".cart__price");

    const quantity = parseInt(quantityElement.textContent);
    const price = parseFloat(priceElement.textContent.replace("$", ""));

    totalItems += quantity;
    totalPrice += price * quantity;
  });

  totalItemsElement.textContent = `${totalItems} item${
    totalItems !== 1 ? "s" : ""
  }`;
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to update cart item (increase, decrease, delete)
function updateCartItem(item) {
  const minusButton = item.querySelector(".bx-minus");
  const plusButton = item.querySelector(".bx-plus");
  const trashButton = item.querySelector(".bx-trash-alt");
  const quantityElement = item.querySelector(".cart__amount-number");

  // Decrease quantity
  minusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
    } else {
      // Remove item if quantity is 1
      item.remove();
    }
    updateCartTotals();
  });

  // Increase quantity
  plusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateCartTotals();
  });

  // Delete item from cart
  trashButton.addEventListener("click", () => {
    item.remove();
    updateCartTotals();
  });
}

// Function to add item to cart
function addToCart(event) {
  event.preventDefault();

  const button = event.target.closest(".add-to-cart");
  const productTitle = button.getAttribute("data-title");
  const productPrice = button.getAttribute("data-price");
  const productImage = button.getAttribute("data-image");

  const cartContainer = document.querySelector(".cart__container");

  // Check if the item is already in the cart
  const cartItems = cartContainer.querySelectorAll(".cart__card");
  let itemExists = false;

  cartItems.forEach((item) => {
    const itemTitle = item.querySelector(".cart__title").textContent;
    if (itemTitle === productTitle) {
      const quantityElement = item.querySelector(".cart__amount-number");
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      itemExists = true;
    }
  });

  if (!itemExists) {
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__card");
    cartItem.innerHTML = `
      <div class="cart__box">
        <img src="${productImage}" alt="" class="cart__img" />
      </div>
      <div class="cart__details">
        <h3 class="cart__title">${productTitle}</h3>
        <span class="cart__price">$${productPrice}</span>
        <div class="cart__amount">
          <div class="cart__amount-content">
            <span class="cart__amount-box">
              <i class="bx bx-minus"></i>
            </span>
            <span class="cart__amount-number">1</span>
            <span class="cart__amount-box">
              <i class="bx bx-plus"></i>
            </span>
          </div>
          <i class="bx bx-trash-alt cart__amount-trash"></i>
        </div>
      </div>
    `;

    cartContainer.appendChild(cartItem);

    // Add event listeners for the new cart item
    updateCartItem(cartItem);
  }

  updateCartTotals();

  const cart = document.getElementById("cart");
  cart.classList.add("show-cart");
}

// Add event listeners to "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
});

/* Showing Login */
const login = document.getElementById("login"),
  loginButton = document.getElementById("login-button"),
  loginClose = document.getElementById("login-close");

/* Show Login After I Click On "Sign In Now" */
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("showLogin") === "true") {
    login.classList.add("show-login");
  }
});

/* Validate if it exists */
if (loginButton) {
  loginButton.addEventListener("click", () => {
    login.classList.add("show-login");
  });
}

/* Login Hidden */
/* Validate if it exists */
if (loginClose) {
  loginClose.addEventListener("click", () => {
    login.classList.remove("show-login");
  });
}

/* Home Swiper */
var homeSwiper = new Swiper(".home-swiper", {
  spaceBetween: 30,
  loop: "true",

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* Change Background Header */
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* New Swiper */
var newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 16,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: "true",
});

/* Show Scroll Up */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* Questions */
const accordionItem = document.querySelectorAll(".questions__item");

accordionItem.forEach((item) => {
  const accordionHeader = item.querySelector(".questions__header");

  accordionHeader.addEventListener("click", () => {
    const openItem = document.querySelector(".accordion-open");

    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector(".questions__content");

  if (item.classList.contains("accordion-open")) {
    accordionContent.removeAttribute("style");
    item.classList.remove("accordion-open");
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
    item.classList.add("accordion-open");
  }
};

/* Style Switcher */
const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
  document.querySelector(".style__switcher").classList.toggle("open");
});

// Hide style switcher when scrolling
window.addEventListener("scroll", () => {
  if (document.querySelector(".style__switcher").classList.contains("open")) {
    document.querySelector(".style__switcher").classList.remove("open");
  }
});

// Theme Colors
function themeColors() {
  const colorStyle = document.querySelector(".js-color-style"),
    themeColorsContainer = document.querySelector(".js-theme-colors");
  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColors();
    }
  });
  function setColors() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );

    if (document.querySelector(".js-theme-color-item.active")) {
      document
        .querySelector(".js-theme-color-item.active")
        .classList.remove("active");
    }
    document
      .querySelector(
        "[data-js-theme-color=" + localStorage.getItem("color") + "]"
      )
      .classList.add("active");
  }
  if (localStorage.getItem("color") !== null) {
    setColors();
  } else {
    const defaultColor = colorStyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-js-theme-color" + defaultColor + "]")
      .classList.add("active");
  }
}

themeColors();

// Validating Email input format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Validating Password input format
function validatePassword(password) {
  return password.length >= 6;
}

// Function to handle newsletter form submission
function handleNewsletterSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById("newsletter-input");
  const errorElement = document.getElementById("newsletter-error");

  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    errorElement.textContent = "Please enter a valid email address.";
    errorElement.style.display = "block";
  } else {
    errorElement.style.display = "none";
    console.log("Email is valid:", email);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
});
