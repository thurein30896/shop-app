import { categoryRender } from "./category";
import { productRender } from "./product";
import { categories, products } from "./variable";

export const initialRender = () => {
  categoryRender(categories);
  productRender(products);
};
