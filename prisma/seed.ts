import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";

async function main() {
    await prisma;
    console.log("Seeding...");

    // --------------------
    // Categories
    // --------------------
    const [tshirts, hoodies, pants] = await Promise.all([
        prisma.category.upsert({
            where: { name: "T-Shirts" },
            update: {},
            create: { name: "T-Shirts" },
        }),
        prisma.category.upsert({
            where: { name: "Hoodies" },
            update: {},
            create: { name: "Hoodies" },
        }),
        prisma.category.upsert({
            where: { name: "Pants" },
            update: {},
            create: { name: "Pants" },
        }),
    ]);

    // --------------------
    // Sizes
    // --------------------
    const [s, m, l, xl] = await Promise.all(
        ["S", "M", "L", "XL"].map((name) =>
            prisma.size.upsert({
                where: { name },
                update: {},
                create: { name },
            }),
        ),
    );

    // --------------------
    // Colors
    // --------------------
    const [black, white, navy, grey] = await Promise.all(
        ["Black", "White", "Navy", "Grey"].map((name) =>
            prisma.color.upsert({
                where: { name },
                update: {},
                create: { name },
            }),
        ),
    );

    // --------------------
    // Users
    // --------------------
    const adminPass = await bcrypt.hash("admin123", 10);
    const userPass = await bcrypt.hash("user123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@shop.com" },
        update: {},
        create: {
            email: "admin@shop.com",
            password: adminPass,
            role: "ADMIN",
        },
    });

    const user = await prisma.user.upsert({
        where: { email: "user@shop.com" },
        update: {},
        create: {
            email: "user@shop.com",
            password: userPass,
            role: "USER",
        },
    });

    // --------------------
    // Products with Variants
    // --------------------
    const productsData = [
        {
            name: "Classic Black Tee",
            slug: "classic-black-tee",
            categoryId: tshirts.id,
            info: [
                { title: "Material", description: "100% organic cotton" },
                { title: "Fit", description: "Regular fit" },
            ],
            variants: [
                {
                    sizeId: m.id,
                    colorId: black.id,
                    price: 29.99,
                    stock: 10,
                    images: ["https://picsum.photos/seed/tee1/600/800"],
                },
                {
                    sizeId: l.id,
                    colorId: black.id,
                    price: 29.99,
                    stock: 6,
                    images: ["https://picsum.photos/seed/tee1b/600/800"],
                },
            ],
        },
        {
            name: "White Essential Tee",
            slug: "white-essential-tee",
            categoryId: tshirts.id,
            info: [
                { title: "Material", description: "95% cotton, 5% elastane" },
                { title: "Care", description: "Machine wash 30°C" },
            ],
            variants: [
                {
                    sizeId: s.id,
                    colorId: white.id,
                    price: 24.99,
                    stock: 12,
                    images: ["https://picsum.photos/seed/tee2/600/800"],
                },
            ],
        },
        {
            name: "Navy Pullover Hoodie",
            slug: "navy-pullover-hoodie",
            categoryId: hoodies.id,
            info: [
                {
                    title: "Material",
                    description: "80% cotton, 20% polyester fleece",
                },
                {
                    title: "Features",
                    description: "Kangaroo pocket, ribbed cuffs",
                },
            ],
            variants: [
                {
                    sizeId: l.id,
                    colorId: navy.id,
                    price: 64.99,
                    stock: 8,
                    images: ["https://picsum.photos/seed/hoodie1/600/800"],
                },
            ],
        },
        {
            name: "Grey Zip Hoodie",
            slug: "grey-zip-hoodie",
            categoryId: hoodies.id,
            info: [
                {
                    title: "Material",
                    description: "75% cotton, 25% polyester",
                },
                {
                    title: "Features",
                    description: "Full zip, side pockets",
                },
            ],
            variants: [
                {
                    sizeId: xl.id,
                    colorId: grey.id,
                    price: 74.99,
                    stock: 5,
                    images: ["https://picsum.photos/seed/hoodie2/600/800"],
                },
            ],
        },
        {
            name: "Black Slim Pants",
            slug: "black-slim-pants",
            categoryId: pants.id,
            info: [
                { title: "Material", description: "98% cotton, 2% elastane" },
                { title: "Fit", description: "Slim fit, mid-rise" },
            ],
            variants: [
                {
                    sizeId: m.id,
                    colorId: black.id,
                    price: 89.99,
                    stock: 7,
                    images: ["https://picsum.photos/seed/pants1/600/800"],
                },
            ],
        },
    ];

    // --------------------
    // Create Products + Variants
    // --------------------
    const createdProducts: any[] = [];

    for (const p of productsData) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                name: p.name,
                slug: p.slug,
                categoryId: p.categoryId,

                productInfo: {
                    create: p.info,
                },

                variants: {
                    create: p.variants.map((v) => ({
                        sizeId: v.sizeId,
                        colorId: v.colorId,
                        price: v.price,
                        stock: v.stock,

                        images: {
                            create: v.images.map((url) => ({ url })),
                        },
                    })),
                },
            },
            include: {
                variants: true,
            },
        });

        createdProducts.push(product);
    }
    await Promise.all([
        prisma.rating.upsert({
            where: {
                productId_userId: {
                    productId: createdProducts[0].id,
                    userId: user.id,
                },
            },
            create: {
                productId: createdProducts[0].id,
                userId: user.id,
                rating: 4.5,
            },
            update: {},
        }),
        prisma.rating.upsert({
            where: {
                productId_userId: {
                    productId: createdProducts[2].id,
                    userId: user.id,
                },
            },
            create: {
                productId: createdProducts[2].id,
                userId: user.id,
                rating: 5.0,
            },
            update: {},
        }),
        prisma.rating.upsert({
            where: {
                productId_userId: {
                    productId: createdProducts[4].id,
                    userId: user.id,
                },
            },
            create: {
                productId: createdProducts[4].id,
                userId: user.id,
                rating: 4.0,
            },
            update: {},
        }),
    ]);

    const basket = await prisma.basket.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id },
    });

    const firstVariant = createdProducts[0].variants[0];
    const thirdVariant = createdProducts[2].variants[0];

    await Promise.all([
        prisma.basketItem.upsert({
            where: {
                basketId_variantId: {
                    basketId: basket.id,
                    variantId: firstVariant.id,
                },
            },
            update: {},
            create: {
                basketId: basket.id,
                variantId: firstVariant.id,
                quantity: 2,
            },
        }),
        prisma.basketItem.upsert({
            where: {
                basketId_variantId: {
                    basketId: basket.id,
                    variantId: thirdVariant.id,
                },
            },
            update: {},
            create: {
                basketId: basket.id,
                variantId: thirdVariant.id,
                quantity: 1,
            },
        }),
    ]);

    console.log("Seeding done");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
