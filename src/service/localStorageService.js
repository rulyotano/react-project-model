export const REDIRECT_KEY = "redirect-url";

export default {
    save (key, value) {
        if (key && value)
            localStorage.setItem(key, JSON.stringify(value));
    },
    load (key) {
        if (key)
            return JSON.parse(localStorage.getItem(key));
        return null;
    },
    remove(key){
        if (key)
            localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    }
};