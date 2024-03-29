import { countShow, totalCartAmount } from "./function";
import { cartItems, speechSynthesis, utterance } from "./selector";

export const recordObserver = () => {
    const run = () => {
        totalCartAmount();
        countShow();
        utterance.text = cartTotalAmount.innerText;
        speechSynthesis.speak(utterance);
    }

    const observerOption = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(run);
    observer.observe(cartItems,observerOption);
}