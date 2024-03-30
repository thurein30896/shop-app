import { addToCart, cartRemove, categoryBtnRender, orderFunction, updateQuantity } from "./function"
import { productRender } from "./product";
import { cartBtn, drawerRight, searchBtn, searchInput } from "./selector";
import { products } from "./variable";


export const categoryListsHandler = (e) => {
    if(e.target.classList.contains("category-btn-name")){
        categoryBtnRender(e);
    }
}

export const productSectionHandler = (e) => {
    if(e.target.classList.contains("add-to-cart-btn")){
        addToCart(e);
    }
}

export const cartItemsHandler = (e) => {
    if(e.target.classList.contains("cart-remove-btn")){
        cartRemove(e);
    }else if(e.target.classList.contains("sub-quantity")){
        updateQuantity(e,-1)
    }else if(e.target.classList.contains("add-quantity")){
        updateQuantity(e,1)
    }
}

export const orderNowHandler = () => {
    const count = document.querySelectorAll(".cart-item").length;
    if(count > 0){
        orderFunction();
    }else {
        alert("Buy Something");
    }
}

export const cartBtnHandler = () => {
    drawerRight.classList.toggle("translate-x-full");
}

export const searchBtnHandler = () => {
    searchBtn.classList.add("hidden");
    searchInput.classList.remove("hidden");
    searchInput.focus();  
}

export const inputHandler = (e) => {
    if(e.key === "Enter"){
        productRender(products.filter((product) => product.title.toLowerCase().search(searchInput.value.toLowerCase()) >= 0))

        searchInput.value = "";
    }
}