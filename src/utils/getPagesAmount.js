import { ITEMS_PER_PAGE } from "./consts";
export default async function getPagesAmount() {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        return Math.floor(data.length / ITEMS_PER_PAGE);
    } catch (e) {
        console.error(e);
        return 0;
    }
}
