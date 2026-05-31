import bcrypt from "bcrypt";
import { Role } from "../src/generated/prisma/enums.js";
import { prisma } from "../src/lib/prisma.js";

const categories = ["Sneakers", "Hoodies", "Accessories"];
const sizes = ["XS", "S", "M", "L", "XL", "One Size"];
const colors = ["Black", "White", "Navy", "Gray", "Red", "Green"];

const products = [
    {
        name: "Classic Runner",
        slug: "classic-runner",
        category: "Sneakers",
        info: [
            {
                title: "Upper",
                description: "Breathable mesh with reinforced overlays.",
            },
            {
                title: "Sole",
                description: "Lightweight foam midsole for everyday comfort.",
            },
        ],
        variants: [
            {
                size: "M",
                color: "White",
                price: 89.99,
                stock: 24,
                isDefault: true,
                images: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                    "https://images.unsplash.com/photo-1549298916-b41d501d3772",
                ],
            },
            {
                size: "L",
                color: "Black",
                price: 94.99,
                stock: 18,
                isDefault: false,
                images: [
                    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
                ],
            },
        ],
    },
    {
        name: "Everyday Hoodie",
        slug: "everyday-hoodie",
        category: "Hoodies",
        info: [
            {
                title: "Material",
                description: "Soft cotton fleece with a structured hood.",
            },
            {
                title: "Fit",
                description: "Relaxed fit designed for layering.",
            },
        ],
        variants: [
            {
                size: "M",
                color: "Navy",
                price: 59.99,
                stock: 32,
                isDefault: true,
                images: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                ],
            },
            {
                size: "L",
                color: "Gray",
                price: 59.99,
                stock: 27,
                isDefault: false,
                images: [
                    "https://images.unsplash.com/photo-1572495641004-28421ae52e52",
                ],
            },
        ],
    },
    {
        name: "Canvas Tote",
        slug: "canvas-tote",
        category: "Accessories",
        info: [
            {
                title: "Capacity",
                description: "Roomy main compartment for daily essentials.",
            },
            {
                title: "Details",
                description: "Durable canvas handles and reinforced stitching.",
            },
        ],
        variants: [
            {
                size: "One Size",
                color: "Green",
                price: 24.99,
                stock: 45,
                isDefault: true,
                images: [
                    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
                ],
            },
            {
                size: "One Size",
                color: "Red",
                price: 24.99,
                stock: 21,
                isDefault: false,
                images: [
                    "https://images.unsplash.com/photo-1575032617751-6ddec2089882",
                ],
            },
        ],
    },
];

async function main() {
    console.log("Seeding...");

    const password = await bcrypt.hash("Password123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {
            password,
            role: Role.ADMIN,
        },
        create: {
            email: "admin@example.com",
            password,
            role: Role.ADMIN,
        },
    });

    const customer = await prisma.user.upsert({
        where: { email: "customer@example.com" },
        update: {
            password,
            role: Role.USER,
        },
        create: {
            email: "customer@example.com",
            password,
            role: Role.USER,
        },
    });

    const basket = await prisma.basket.upsert({
        where: { userId: customer.id },
        update: {},
        create: { userId: customer.id },
    });

    const categoryByName = new Map<string, string>();
    for (const name of categories) {
        const category = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        categoryByName.set(name, category.id);
    }

    const sizeByName = new Map<string, string>();
    for (const name of sizes) {
        const size = await prisma.size.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        sizeByName.set(name, size.id);
    }

    const colorByName = new Map<string, string>();
    for (const name of colors) {
        const color = await prisma.color.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        colorByName.set(name, color.id);
    }

    for (const productData of products) {
        const categoryId = categoryByName.get(productData.category);
        if (!categoryId) {
            throw new Error(`Missing category: ${productData.category}`);
        }

        await prisma.product.upsert({
            where: { slug: productData.slug },
            update: {
                name: productData.name,
                categoryId,
                productInfo: {
                    deleteMany: {},
                    create: productData.info,
                },
                variants: {
                    deleteMany: {},
                    create: productData.variants.map((variant) => {
                        const sizeId = sizeByName.get(variant.size);
                        const colorId = colorByName.get(variant.color);
                        if (!sizeId || !colorId) {
                            throw new Error(
                                `Missing size or color for ${productData.slug}`,
                            );
                        }

                        return {
                            sizeId,
                            colorId,
                            price: variant.price,
                            stock: variant.stock,
                            isDefault: variant.isDefault,
                            images: {
                                create: variant.images.map((url) => ({ url })),
                            },
                        };
                    }),
                },
            },
            create: {
                name: productData.name,
                slug: productData.slug,
                categoryId,
                productInfo: {
                    create: productData.info,
                },
                variants: {
                    create: productData.variants.map((variant) => {
                        const sizeId = sizeByName.get(variant.size);
                        const colorId = colorByName.get(variant.color);
                        if (!sizeId || !colorId) {
                            throw new Error(
                                `Missing size or color for ${productData.slug}`,
                            );
                        }

                        return {
                            sizeId,
                            colorId,
                            price: variant.price,
                            stock: variant.stock,
                            isDefault: variant.isDefault,
                            images: {
                                create: variant.images.map((url) => ({ url })),
                            },
                        };
                    }),
                },
            },
        });
    }

    const seededProducts = await prisma.product.findMany({
        where: {
            slug: {
                in: products.map((product) => product.slug),
            },
        },
        include: {
            variants: true,
        },
    });

    for (const product of seededProducts) {
        await prisma.rating.upsert({
            where: {
                productId_userId: {
                    productId: product.id,
                    userId: customer.id,
                },
            },
            update: {
                rating: 4.5,
            },
            create: {
                productId: product.id,
                userId: customer.id,
                rating: 4.5,
            },
        });
    }

    const defaultVariant = seededProducts
        .flatMap((product) => product.variants)
        .find((variant) => variant.isDefault);

    if (defaultVariant) {
        await prisma.basketItem.upsert({
            where: {
                basketId_variantId: {
                    basketId: basket.id,
                    variantId: defaultVariant.id,
                },
            },
            update: {
                quantity: 2,
            },
            create: {
                basketId: basket.id,
                variantId: defaultVariant.id,
                quantity: 2,
            },
        });
    }

    console.log("Seeding done");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
