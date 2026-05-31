import type { Prisma } from "../generated/prisma/client.js";

export type ProductMinimal = Prisma.ProductGetPayload<{
    include: {
        variants: {
            include: {
                images: {
                    omit: {
                        variantId: true;
                    };
                };
            };
        };
        ratings: {
            omit: {
                productId: true;
            };
        };
    };
}>;

export type Product = Prisma.ProductGetPayload<{
    include: {
        variants: {
            include: {
                color: true;
                size: true;
                images: {
                    omit: {
                        variantId: true;
                    };
                };
            };
        };
        ratings: {
            omit: {
                productId: true;
            };
        };
    };
}>;

export function getDefaultVariant(
    product: Product,
): Product["variants"][number];

export function getDefaultVariant(
    product: ProductMinimal,
): ProductMinimal["variants"][number];
export function getDefaultVariant(product: ProductMinimal) {
    return product.variants.find((v) => v.isDefault) || product.variants[0];
}

export function getRating(product: ProductMinimal) {
    const sum = product.ratings.reduce(
        (acc, current) => acc + Number(current.rating),
        0,
    );
    return sum / product.ratings.length;
}
