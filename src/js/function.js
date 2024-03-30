import { productRender } from "./product";
import {
  cartBtn,
  cartBtnCount,
  cartCount,
  cartItems,
  cartTotalAmount,
} from "./selector";
import { products } from "./variable";
import Swal from "sweetalert2";

export const categoryBtnRender = (e) => {
  const categoryBtnName = e.target;
  const currentCategoryBtn = categoryBtnName.innerText.toLowerCase();
  const lastActiveBtn = document.querySelector(".category-badge.active");
  lastActiveBtn.classList.toggle("active");
  categoryBtnName.classList.add("active");
  productRender(
    products.filter(
      (el) => el.category === currentCategoryBtn || currentCategoryBtn === "all"
    )
  );
};

export const createCart = ({ id, image, title, price, quantity = 1 }) => {
  const cartTemplate = document.querySelector("#cartTemplate");
  const cartCard = cartTemplate.content.cloneNode(true);
  cartCard.querySelector(".cart-img").src = image;
  cartCard.querySelector(".cart-img").src = image;
  cartCard.querySelector(".cart-title").innerText = title;
  cartCard.querySelector(".cart-price").innerText = price;
  cartCard.querySelector(".cart-quantity").innerText = quantity;
  cartCard.querySelector(".cart-item").setAttribute("cart-id", id);
  const cost = price * quantity;
  cartCard.querySelector(".cart-cost").innerText = cost;

  return cartCard;
};

export const addToCartBtnDisabled = (id) => {
  const productCard = document.querySelector(`[product-card-id='${id}']`);

  if (productCard) {
    const btn = productCard.querySelector(".add-to-cart-btn");

    if (btn.getAttribute === false) {
      btn.toggleAttribute("disabled");
      btn.innerText = "Added";
    } else {
      btn.toggleAttribute("disabled");
      btn.innerText = "Add to Cart";
    }
  }
};

export const countShow = () => {
  const count = document.querySelectorAll(".cart-item");
  cartBtnCount.innerText = count.length;
  cartCount.innerText = count.length;
};

export const totalCartAmount = () => {
  const total = [...cartItems.querySelectorAll(".cart-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  cartTotalAmount.innerText = total.toFixed(2);
};

export const addToCart = (e) => {
  const product = e.target.closest(".product-card");
  const currentProductId = product.getAttribute("product-card-id");
  addToCartBtnDisabled(currentProductId);
  const currentProduct = products.find(
    (el) => el.id === parseInt(currentProductId)
  );
  cartItems.append(createCart(currentProduct));
  const currentImage = product.querySelector(".product-img");
  const img = currentImage.getBoundingClientRect();
  const cartIcon = cartBtn.querySelector("svg");
  const icon = cartIcon.getBoundingClientRect();

  const newImg = new Image(img.width, img.height);
  newImg.src = currentImage.src;
  newImg.style.position = "fixed";
  newImg.style.top = img.top + "px";
  newImg.style.left = img.left + "px";
  newImg.style.border = "30px";
  newImg.style.zIndex = "50";
  document.body.append(newImg);

  const keyFrame = [
    {
      top: img.top + "px",
      left: img.left + "px",
      width: img.width + "px",
      rotate: 0 + "deg",
    },
    {
      top: icon.top + "px",
      left: icon.left + "px",
      width: 0,
      rotate: 360 + "deg",
    },
  ];

  const timeline = {
    duration: 500,
    iterations: 1,
  };

  const newImgAnimation = newImg.animate(keyFrame, timeline);

  const animateEnd = () => {
    cartBtn.classList.add("animate__bounce");
    cartBtn.addEventListener("animationend", () => {
      cartBtn.classList.remove("animate__bounce");
    });
    newImg.remove();
  };

  newImgAnimation.addEventListener("finish", animateEnd);
  // countShow();
  // totalCartAmount();
};

export const cartRemove = (e) => {
  const currentCart = e.target.closest(".cart-item");
  const currentProductId = currentCart.getAttribute("cart-id");

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      currentCart.classList.add("animate__rotateOutDownLeft");
      currentCart.addEventListener("animationend", () => {
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
        currentCart.remove();
        addToCartBtnDisabled(currentProductId);
      });
    }
  });
  // countShow();
  // totalCartAmount();
};

export const updateQuantity = (e, q) => {
  const currentCart = e.target.closest(".cart-item");
  const currentQuantity = currentCart.querySelector(".cart-quantity");
  const cost = currentCart.querySelector(".cart-cost");
  const price = currentCart.querySelector(".cart-price");
  if (q > 0 || currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) + q;
    cost.innerText = (
      parseInt(currentQuantity.innerText) * price.innerText
    ).toFixed(2);
  }
  // totalCartAmount();
};

export const orderFunction = () => {
  Swal.fire({
    title: "Order Confirm?",
    // text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      const customer_id = Math.floor(Math.random() * 1000);
  const total = parseFloat(cartTotalAmount.innerText);
  const time = Date.now();

  const order_items = [];

  document.querySelectorAll(".cart-item").forEach((el) => {
    const id = el.getAttribute("cart-id");
    const productId = id;
    const productQuantity = parseInt(
      el.querySelector(".cart-quantity").innerText
    );

    order_items.push({
      product_id: productId,
      quantity: productQuantity,
    });

    el.remove();
    addToCartBtnDisabled(id);
  });

  const order = { customer_id, total, time, order_items };
  console.table(order.order_items);
  console.table("Total = $" + order.total);
      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success"
      // });
    }
  });
  
  //  console.table(order);
};
