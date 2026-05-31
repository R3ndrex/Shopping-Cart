export type ProductDTO = {
    id: string;
    name: string;
    category: string;
    images: Image[];
    size: string;
    color: string;
    stock: number;
    slug: string;
    rating: number;
    description: string;
    price: number;
};
export interface ProductMinimalDTO {
    id: string;
    images: Image[];
    name: string;
    rating: number;
    price: number;
    slug: string;
}
export interface Image {
    id: string;
    url: string;
}
