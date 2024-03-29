import { categoryLists } from "./selector";

export const categoryUi = (name) => {
    const categoryTemplate = document.querySelector("#categoryTemplate");
    const categoryBtn = categoryTemplate.content.cloneNode(true);
    categoryBtn.querySelector(".category-btn-name").innerText = name;
    return categoryBtn;
}

export const categoryRender = (lists) => {
    lists.forEach((el) => categoryLists.append(categoryUi(el)));
}