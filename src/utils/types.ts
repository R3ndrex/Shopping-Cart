import type { ProductDTO } from "./dto/product.dto.js";

export type SelectedItemsType = ProductDTO & { amount: number };
