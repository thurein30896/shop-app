import { initialRender } from "./src/js/initialRender";
import { listener } from "./src/js/listener";
import { recordObserver } from "./src/js/observer";

class Shop {
    init() {
        console.log("Shop App Start");
        initialRender();
        listener();
        recordObserver();
    }
}


export default Shop;