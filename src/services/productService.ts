import ApiError from "../error/ApiError.js";
import type { ProductInfo, Variant } from "../generated/prisma/client.js";
import type {
    ProductModel,
    ProductOrderByWithRelationInput,
} from "../generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";
import {
    getDefaultVariant,
    getRating,
    type Product,
} from "../mappers/product.mapper.js";

class ProductService {
    async getAllProducts(
        page: number,
        items: number,
        orderValue: "name" | "popularity" = "name",
        sortOrder: "asc" | "desc" = "desc",
    ) {
        let orderBy: ProductOrderByWithRelationInput;
        if (orderValue === "popularity") {
            orderBy = {
                ratings: {
                    _count: sortOrder,
                },
            };
        } else {
            orderBy = {
                [orderValue]: sortOrder,
            };
        }

        const products = await prisma.product.findMany({
            include: {
                variants: {
                    include: {
                        images: {
                            omit: {
                                variantId: true,
                            },
                        },
                    },
                },

                ratings: {
                    omit: {
                        productId: true,
                    },
                },
            },
            orderBy,
            skip: (page - 1) * items,
            take: items,
        });

        if (products.length <= 0) {
            throw ApiError.notFound("Products not found");
        }
        const allProducts = products.map((product: ProductModel) => {
            const defaultVariant = getDefaultVariant(product);
            const rating = getRating(product);
            return {
                id: product.id,
                images: defaultVariant?.images || [],
                price: defaultVariant?.price || 0,
                slug: product.slug,
                name: product.name,
                rating,
            };
        });
        return { data: allProducts, total: products.length };
    }
    async createProduct({
        name,
        slug,
        variants,
        categoryId,
        productInfo,
    }: {
        name: string;
        slug: string;
        variants: Product["variants"];
        categoryId: string;
        productInfo: ProductInfo[];
    }) {
        const foundProduct = await prisma.product.findUnique({
            where: {
                slug,
            },
        });
        if (foundProduct) {
            throw ApiError.badRequest("Product already exists");
        }
        const createdProduct = await prisma.product.create({
            data: {
                name,
                slug,
                productInfo: {
                    createMany: { data: productInfo },
                },
                variants: {
                    create: variants.map((v: Variant) => {
                        return {
                            isDefault: v.isDefault,
                            color: {
                                connect: {
                                    id: v.colorId,
                                },
                            },
                            size: {
                                connect: {
                                    id: v.sizeId,
                                },
                            },
                            price: v.price,
                            stock: v.stock,
                            images: {
                                createMany: { data: v.images },
                            },
                        };
                    }),
                },
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
            include: {
                variants: {
                    include: {
                        color: true,
                        size: true,
                        images: {
                            omit: {
                                variantId: true,
                            },
                        },
                    },
                },
                productInfo: {
                    omit: {
                        productId: true,
                    },
                },
                category: true,
                ratings: {
                    omit: {
                        productId: true,
                    },
                },
            },
        });
        const defaultVariant = getDefaultVariant(createdProduct);
        const rating = getRating(createdProduct);
        return {
            id: createdProduct.id,
            name: createdProduct.name,
            category: createdProduct.category?.name,
            images: defaultVariant.images.map((i) => i.url) || [],
            price: defaultVariant.price,
            size: defaultVariant.size,
            color: defaultVariant.color,
            stock: defaultVariant.stock || 0,
            slug: createdProduct.slug,
            rating,
            description: createdProduct.productInfo,
        };
    }
    async getProduct(id: string, slug: string) {
        const product = await prisma.product.findFirst({
            where: {
                id,
                slug,
            },
            include: {
                variants: {
                    include: {
                        color: true,
                        size: true,
                        images: {
                            omit: {
                                variantId: true,
                            },
                        },
                    },
                },
                productInfo: {
                    omit: {
                        productId: true,
                    },
                },
                category: true,
                ratings: {
                    omit: {
                        productId: true,
                    },
                },
            },
        });
        if (!product) {
            throw ApiError.notFound("Product not found");
        }
        const defaultVariant = getDefaultVariant(product);
        const rating = getRating(product);
        return {
            id: product.id,
            name: product.name,
            category: product.category?.name,
            images: defaultVariant.images.map((i) => i.url) || [],
            price: defaultVariant.price,
            size: defaultVariant.size,
            color: defaultVariant.color,
            stock: defaultVariant.stock || 0,
            slug: product.slug,
            rating,
            description: product.productInfo,
        };
    }
    async deleteProduct(id: string, slug: string) {
        const deletedProduct = await prisma.product.delete({
            where: {
                id,
                slug,
            },
            include: {
                variants: {
                    include: {
                        color: true,
                        size: true,
                        images: {
                            omit: {
                                variantId: true,
                            },
                        },
                    },
                },
                productInfo: {
                    omit: {
                        productId: true,
                    },
                },
                category: true,
                ratings: {
                    omit: {
                        productId: true,
                    },
                },
            },
        });
        if (!deletedProduct) {
            throw ApiError.notFound("Product not found");
        }
        const defaultVariant = getDefaultVariant(deletedProduct);
        const rating = getRating(deletedProduct);
        return {
            id: deletedProduct.id,
            name: deletedProduct.name,
            category: deletedProduct.category?.name,
            images: defaultVariant.images.map((i) => i.url) || [],
            price: defaultVariant.price,
            size: defaultVariant.size,
            color: defaultVariant.color,
            stock: defaultVariant.stock || 0,
            slug: deletedProduct.slug,
            rating,
            description: deletedProduct.productInfo,
        };
    }
}
export default new ProductService();
