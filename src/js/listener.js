import { cartBtnHandler, cartItemsHandler, categoryListsHandler, inputHandler, orderNowHandler, productSectionHandler, searchBtnHandler } from "./handler";
import { cartBtn, cartItems, categoryLists, drawerClose, orderNow, productSection, searchBtn, searchInput } from "./selector";

export const listener = () => {
  categoryLists.addEventListener("click", categoryListsHandler);
  productSection.addEventListener("click",productSectionHandler);
  cartItems.addEventListener("click",cartItemsHandler);
  orderNow.addEventListener("click",orderNowHandler);
  cartBtn.addEventListener("click",cartBtnHandler);
  drawerClose.addEventListener("click",cartBtnHandler);
  searchBtn.addEventListener("click",searchBtnHandler);
  searchInput.addEventListener("keyup",inputHandler);
};
