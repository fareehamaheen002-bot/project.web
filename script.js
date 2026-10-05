/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   MENU FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        menuItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


/* =========================
   CART
========================= */

let cart = [];

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        openCart();

    });

});


function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bag-x fs-1"></i>
                <p class="mt-3">Your order is empty.</p>
            </div>
        `;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h5>${item.name}</h5>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <button class="remove-item"
                    onclick="removeFromCart(${index})">
                <i class="bi bi-trash"></i>
            </button>
        `;

        cartItems.appendChild(div);

    });

    cartCount.textContent = count;
    cartTotal.textContent = `₹${total}`;

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

}


function closeCart() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


document.getElementById("openCart").addEventListener(
    "click",
    openCart
);

document.getElementById("closeCart").addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);


/* =========================
   CHECKOUT
========================= */

document.getElementById("checkoutBtn").addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Your order is empty!");

            return;
        }

        alert(
            "Thank you! Your order has been placed successfully."
        );

        cart = [];

        updateCart();

        closeCart();

    }
);


/* =========================
   RESERVATION
========================= */

const reservationForm =
    document.getElementById("reservationForm");

const reservationMessage =
    document.getElementById("reservationMessage");


reservationForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("guestName").value;

    reservationMessage.innerHTML = `
        Thank you, ${name}! Your table request has been received.
    `;

    reservationForm.reset();

});


/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryImages =
    document.querySelectorAll(".gallery-img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

const nextImage =
    document.getElementById("nextImage");

const prevImage =
    document.getElementById("prevImage");

let currentImage = 0;


galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImage = index;

        showImage();

        lightbox.classList.add("active");

    });

});


function showImage() {

    lightboxImage.src =
        galleryImages[currentImage].src;

}


nextImage.addEventListener("click", () => {

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    showImage();

});


prevImage.addEventListener("click", () => {

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    showImage();

});


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});


/* =========================
   BACK TO TOP
========================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.style.display = "block";

    } else {

        backTop.style.display = "none";

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   MOBILE NAVBAR CLOSE
========================= */

const navLinks =
    document.querySelectorAll(".navbar-nav .nav-link");

const navCollapse =
    document.getElementById("mainNav");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth < 992) {

            const collapse =
                bootstrap.Collapse.getInstance(navCollapse);

            if (collapse) {
                collapse.hide();
            }

        }

    });

});


/* =========================
   INITIAL CART
========================= */

updateCart();